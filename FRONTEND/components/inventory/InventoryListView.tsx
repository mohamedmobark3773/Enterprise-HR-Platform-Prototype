"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { EmptyState } from "@/components/ui/Feedback";
import { useApp } from "@/lib/context/AppContext";
import { InventoryToolbar } from "@/components/inventory/InventoryToolbar";
import { InventoryInsight } from "@/components/inventory/InventoryInsight";
import { InventoryRecordDialog } from "@/components/inventory/InventoryRecordDialog";
import { InventoryConfirmDialog } from "@/components/inventory/InventoryConfirmDialog";
import {
  inventoryTabs,
  inventorySearchPlaceholder,
  inventoryRecordFooter,
} from "@/lib/inventory/inventory-data";
import {
  compareRecords,
  downloadInventoryCsv,
  exportSlugDate,
  uniqueStatuses,
  useInventoryRecords,
  type InventoryRecord,
  type InventoryRecordInput,
  type SortDir,
  type SortKey,
} from "@/lib/inventory/inventory-store";

export interface InventoryListKpi {
  label: string;
  value: string;
  detail?: string;
}

export interface InventoryListRecord {
  id?: string;
  reference: string;
  name: string;
  context: string;
  value: string;
  status: string;
  tone?: string;
}

export interface InventoryListInsight {
  model: string;
  prediction: string;
  confidence: string;
  basedOn?: string;
  recommended: string;
  status: string;
  action: string;
}

export interface InventoryListViewProps {
  eyebrow: string;
  title: string;
  tabsLabel: string;
  kpis: readonly InventoryListKpi[];
  records: ReadonlyArray<InventoryListRecord>;
  insight: InventoryListInsight;
  recordHref?: (record: InventoryRecord) => string;
  exportSlug: string;
  kpiGridClassName?: string;
}

const PAGE_SIZE = 5;

const toggleableColumns = [
  { key: "context", label: "Context" },
  { key: "value", label: "Value" },
  { key: "status", label: "Status" },
];

export function InventoryListView({
  eyebrow,
  title,
  tabsLabel,
  kpis,
  records: initialRecords,
  insight,
  recordHref,
  exportSlug,
  kpiGridClassName = "inventory-kpi-grid",
}: InventoryListViewProps) {
  const { tr, locale, navigatePath } = useApp();
  const store = useInventoryRecords(initialRecords);
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("reference");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [dialog, setDialog] = useState<{ mode: "create" | "edit"; record?: InventoryRecord } | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    },
    [],
  );

  const statuses = useMemo(() => uniqueStatuses(store.records), [store.records]);

  const showNotice = (message: string) => {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 4000);
  };

  const resetPage = () => setPage(0);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const matching = store.records.filter((r) => {
      if (status !== "all" && r.status !== status) return false;
      if (!term) return true;
      return `${r.reference} ${r.name} ${r.context} ${r.value} ${r.status}`.toLowerCase().includes(term);
    });
    return [...matching].sort((a, b) => compareRecords(a, b, sortKey, sortDir));
  }, [store.records, query, status, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const paged = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);
  const rangeStart = filtered.length === 0 ? 0 : safePage * PAGE_SIZE + 1;
  const rangeEnd = Math.min(filtered.length, safePage * PAGE_SIZE + PAGE_SIZE);

  const hasActiveFilters =
    query.trim() !== "" || status !== "all" || sortKey !== "reference" || sortDir !== "asc" || hiddenColumns.length > 0;

  const clearAll = () => {
    setQuery("");
    setStatus("all");
    setSortKey("reference");
    setSortDir("asc");
    setHiddenColumns([]);
    setPage(0);
  };

  const toggleColumn = (key: string) => {
    setHiddenColumns((current) => (current.includes(key) ? current.filter((k) => k !== key) : [...current, key]));
  };

  const exportRows = (rows: InventoryRecord[]) =>
    rows.map((r) => {
      const cells: string[] = [r.reference, r.name];
      if (!hiddenColumns.includes("context")) cells.push(r.context);
      if (!hiddenColumns.includes("value")) cells.push(r.value);
      if (!hiddenColumns.includes("status")) cells.push(r.status);
      return cells;
    });

  const exportHeader = () => {
    const header = [tr("Reference"), tr("Name")];
    if (!hiddenColumns.includes("context")) header.push(tr("Context"));
    if (!hiddenColumns.includes("value")) header.push(tr("Value"));
    if (!hiddenColumns.includes("status")) header.push(tr("Status"));
    return header;
  };

  const runExport = () => {
    const count = downloadInventoryCsv(`inventory-${exportSlug}-${exportSlugDate()}.csv`, exportHeader(), exportRows(filtered));
    showNotice(`${tr("Exported")} ${count} ${tr("records")}`);
  };

  const openCreate = () => setDialog({ mode: "create" });
  const openEdit = (record: InventoryRecord) => setDialog({ mode: "edit", record });

  const submitDialog = (input: InventoryRecordInput) => {
    if (dialog?.mode === "edit" && dialog.record) {
      store.update(dialog.record.id, input);
      showNotice(`${tr("Record updated")} · ${input.reference.trim()}`);
    } else {
      const created = store.create(input);
      showNotice(`${tr("Record created")} · ${created.reference}`);
    }
    setDialog(null);
    setPage(0);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    const target = store.records.find((r) => r.id === deleteId);
    store.remove(deleteId);
    setDeleteId(null);
    setPage(0);
    showNotice(`${tr("Record deleted")}${target ? ` · ${target.reference}` : ""}`);
  };

  const kpiLabel = (label: string) => {
    if (label !== "Review" || locale === "en") return tr(label);
    return locale === "fr" ? "À revoir" : "للمراجعة";
  };

  const goToRecord = (record: InventoryRecord) => {
    if (recordHref) navigatePath(recordHref(record));
  };

  return (
    <>
      <PageTitle
        eyebrow={eyebrow}
        title={title}
        subtitle="Operational inventory records and controls"
        actions={
          <>
            <button className="secondary-button" type="button" onClick={runExport}>
              <Icon name="download" size={15} /> {tr("Export")}
            </button>
            <button className="primary-button" type="button" onClick={openCreate}>
              <Icon name="plus" size={15} /> {tr("Create")}
            </button>
          </>
        }
      />

      <nav className="tabs inventory-desktop-tabs" aria-label={tabsLabel}>
        {inventoryTabs.map((tab, i) => (
          <button key={tab} className={i === activeTab ? "active" : ""} onClick={() => setActiveTab(i)} type="button">
            {tr(tab)}
          </button>
        ))}
      </nav>

      <nav className="inventory-mobile-tabs" aria-label={`${tabsLabel} mobile`}>
        {inventoryTabs.map((tab, i) => (
          <button key={tab} className={i === activeTab ? "active" : ""} onClick={() => setActiveTab(i)} type="button">
            {tr(tab)}
          </button>
        ))}
      </nav>

      <section className="panel inventory-kpi-panel">
        <div className={kpiGridClassName}>
          {kpis.map((kpi) => (
            <div className="inventory-kpi" key={kpi.label}>
              <span>{kpiLabel(kpi.label)}</span>
              <strong>{kpi.value}</strong>
              {kpi.detail && <small>{tr(kpi.detail)}</small>}
            </div>
          ))}
        </div>
      </section>

      <InventoryToolbar
        placeholder={inventorySearchPlaceholder}
        query={query}
        onQuery={(q) => {
          setQuery(q);
          resetPage();
        }}
        statuses={statuses}
        status={status}
        onStatus={(s) => {
          setStatus(s);
          resetPage();
        }}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={(key, dir) => {
          setSortKey(key);
          setSortDir(dir);
          resetPage();
        }}
        columns={toggleableColumns}
        hiddenColumns={hiddenColumns}
        onToggleColumn={toggleColumn}
        onCreate={openCreate}
        onClear={clearAll}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="inventory-workspace">
        <section className="panel inventory-records-panel">
          <div className="inventory-records">
            <div className="inventory-record-head">
              <span>{tr("Reference")}</span>
              <span>{tr("Name / Context")}</span>
              <span hidden={hiddenColumns.includes("value")}>{tr("Value")}</span>
              <span hidden={hiddenColumns.includes("status")}>{tr("Status")}</span>
              <span>{tr("Actions")}</span>
            </div>
            {paged.map((r) => (
              <div
                className={`inventory-record-row${recordHref ? " clickable" : ""}`}
                key={r.id}
                onClick={recordHref ? () => goToRecord(r) : undefined}
                role={recordHref ? "link" : undefined}
                tabIndex={recordHref ? 0 : undefined}
                onKeyDown={
                  recordHref
                    ? (e) => {
                        if (e.key === "Enter") goToRecord(r);
                      }
                    : undefined
                }
              >
                <span>{r.reference}</span>
                <span>
                  <strong>{tr(r.name)}</strong>
                  {!hiddenColumns.includes("context") && <small>{tr(r.context)}</small>}
                </span>
                <span hidden={hiddenColumns.includes("value")}>{r.value}</span>
                <span hidden={hiddenColumns.includes("status")}>
                  <Badge tone={r.tone}>{r.status}</Badge>
                </span>
                <span
                  className="inventory-row-actions"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <button
                    className="icon-button"
                    type="button"
                    aria-label={`${tr("Edit")} ${r.reference}`}
                    title={`${tr("Edit")} ${r.reference}`}
                    onClick={() => openEdit(r)}
                  >
                    <Icon name="edit" size={15} />
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    aria-label={`${tr("Delete")} ${r.reference}`}
                    title={`${tr("Delete")} ${r.reference}`}
                    onClick={() => setDeleteId(r.id)}
                  >
                    <Icon name="trash" size={15} />
                  </button>
                </span>
              </div>
            ))}
          </div>
          {filtered.length === 0 ? (
            <EmptyState
              title={tr("No records found")}
              detail={tr("Try a different search.")}
              action={
                <button className="secondary-button" type="button" onClick={clearAll}>
                  {tr("Clear filters")}
                </button>
              }
            />
          ) : (
            <div className="inventory-records-foot pager">
              <span>
                {rangeStart}–{rangeEnd} {tr("of")} {filtered.length}
                {notice ? ` · ${notice}` : ""}
              </span>
              {pageCount > 1 && (
                <div className="inventory-pager">
                  <button type="button" disabled={safePage === 0} onClick={() => setPage(safePage - 1)} aria-label={tr("Back")}>
                    ‹
                  </button>
                  {Array.from({ length: pageCount }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={i === safePage ? "active" : ""}
                      onClick={() => setPage(i)}
                      aria-label={`${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={safePage >= pageCount - 1}
                    onClick={() => setPage(safePage + 1)}
                    aria-label={tr("Next")}
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="inventory-records-tag">
            {inventoryRecordFooter.map((tag) => (
              <span key={tag}>{tr(tag)}</span>
            ))}
          </div>
        </section>

        <InventoryInsight
          model={insight.model}
          prediction={insight.prediction}
          confidence={insight.confidence}
          basedOn={insight.basedOn}
          recommended={insight.recommended}
          status={insight.status}
          action={insight.action}
        />
      </div>

      <InventoryRecordDialog
        open={dialog !== null}
        mode={dialog?.mode || "create"}
        initial={dialog?.record || null}
        statuses={statuses.length > 0 ? statuses : ["Active"]}
        isReferenceTaken={store.isReferenceTaken}
        onClose={() => setDialog(null)}
        onSubmit={submitDialog}
      />
      <InventoryConfirmDialog
        open={deleteId !== null}
        reference={store.records.find((r) => r.id === deleteId)?.reference || ""}
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default InventoryListView;
