"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { PageTitle } from "@/components/ui/PageTitle";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Tabs } from "@/components/ui/Tabs";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState, LoadingState } from "@/components/ui/Feedback";
import { FleetBarChart } from "@/components/fleet/FleetBarChart";
import { FleetInsight } from "@/components/fleet/FleetInsight";
import { useApp } from "@/lib/context/AppContext";
import { DrillingNav } from "@/components/drilling/DrillingNav";
import {
  DrillingConfirmDialog,
  DrillingFormModal,
  defaultFormValues,
  type DrillingFormErrors,
  type DrillingFormValues,
} from "@/components/drilling/DrillingFormModal";
import type { DrillingColumnDef, DrillingListConfig } from "@/lib/drilling/drilling-config-types";
import { drillingListConfigs } from "@/lib/drilling/drilling-list-configs";
import { drillingTone } from "@/lib/drilling/drilling-utils";
import {
  createRow,
  exportDrillingCsv,
  formatUsd,
  listRows,
  removeRow,
  resetRows,
  subscribeDrilling,
  updateRow,
  validateDrillingForm,
  type DrillingFieldRule,
} from "@/lib/drilling/drilling-service";
import type { DrillingRow, DrillingValue } from "@/types/drilling";

function toRules(config: DrillingListConfig): DrillingFieldRule[] {
  return config.fields.map((field) => ({
    key: field.key,
    label: field.label,
    type: field.type,
    options: field.options,
    required: field.required,
    min: field.min,
    max: field.max,
  }));
}

function coerceValues(config: DrillingListConfig, values: DrillingFormValues): DrillingFormValues {
  const coerced: DrillingFormValues = { ...values };
  config.fields.forEach((field) => {
    if (field.type !== "number") return;
    const raw = values[field.key];
    if (raw === "" || raw === undefined) {
      coerced[field.key] = "";
      return;
    }
    coerced[field.key] = Number(raw);
  });
  return coerced;
}

function cellText(column: DrillingColumnDef, row: DrillingRow, tr: (k: string) => string): React.ReactNode {
  const raw = row[column.key];
  const text = raw === undefined || raw === null ? "" : String(raw);
  switch (column.kind) {
    case "status":
      return <Badge tone={drillingTone(text)}>{tr(text)}</Badge>;
    case "currency":
      return formatUsd(Number(raw) || 0);
    case "percent":
      return `${Number(raw) || 0}%`;
    case "number":
      return (Number(raw) || 0).toLocaleString("en-US");
    default:
      return tr(text);
  }
}

type SortState = { key: string; dir: "asc" | "desc" } | null;

export function DrillingListScreen({ configKey }: { configKey: keyof typeof drillingListConfigs }) {
  const config: DrillingListConfig = drillingListConfigs[configKey];
  const { tr } = useApp();
  const [rows, setRows] = useState<DrillingRow[] | null>(null);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [form, setForm] = useState<{ mode: "create" | "edit"; id?: string; values: DrillingFormValues; errors: DrillingFormErrors } | null>(null);
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<DrillingRow | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNotice = useCallback((message: string) => {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 3200);
  }, []);

  const load = useCallback(async () => {
    const data = await listRows(config.collection);
    setRows(data);
  }, [config.collection]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const data = await listRows(config.collection);
      if (alive) setRows(data);
    })();
    const unsubscribe = subscribeDrilling(() => {
      void load();
    });
    return () => {
      alive = false;
      unsubscribe();
    };
  }, [config.collection, load]);

  useEffect(() => {
    setPage(1);
  }, [query, activeTab]);

  useEffect(() => () => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
  }, []);

  const tabs = config.tabs ?? [];
  const statusField = config.statusField;

  const filtered = useMemo(() => {
    let result = rows ?? [];
    if (tabs.length > 0 && activeTab > 0 && statusField) {
      const wanted = tabs[activeTab];
      result = result.filter((row) => String(row[statusField] ?? "") === wanted);
    }
    const term = query.trim().toLowerCase();
    if (term) {
      result = result.filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(term))
      );
    }
    if (sort) {
      const { key, dir } = sort;
      result = [...result].sort((a, b) => {
        const left = a[key];
        const right = b[key];
        const numericLeft = Number(left);
        const numericRight = Number(right);
        let comparison: number;
        if (!Number.isNaN(numericLeft) && !Number.isNaN(numericRight) && left !== "" && right !== "") {
          comparison = numericLeft - numericRight;
        } else {
          comparison = String(left ?? "").localeCompare(String(right ?? ""));
        }
        return dir === "asc" ? comparison : -comparison;
      });
    }
    return result;
  }, [rows, query, tabs, activeTab, statusField, sort]);

  const pageSize = config.pageSize ?? 8;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const kpis = config.kpis(rows ?? []);
  const chart = config.chart?.(rows ?? []);
  const insightLines = config.insight?.lines(rows ?? []) ?? [];

  const toggleSort = (key: string) => {
    setSort((current) => {
      if (current?.key !== key) return { key, dir: "asc" };
      if (current.dir === "asc") return { key, dir: "desc" };
      return null;
    });
    setPage(1);
  };

  const openCreate = () => {
    setForm({ mode: "create", values: defaultFormValues(config.fields), errors: {} });
  };

  const openEdit = (row: DrillingRow) => {
    const values: DrillingFormValues = {};
    config.fields.forEach((field) => {
      values[field.key] = row[field.key] ?? "";
    });
    setForm({ mode: "edit", id: String(row.id), values, errors: {} });
  };

  const changeField = (key: string, value: DrillingValue) => {
    setForm((current) =>
      current
        ? { ...current, values: { ...current.values, [key]: value }, errors: { ...current.errors, [key]: "" } }
        : current
    );
  };

  const saveForm = async () => {
    if (!form) return;
    const values = coerceValues(config, form.values);
    const errors = validateDrillingForm(toRules(config), values);
    if (Object.keys(errors).length > 0) {
      setForm({ ...form, errors });
      return;
    }
    setSaving(true);
    try {
      if (form.mode === "create") {
        await createRow(config.collection, values);
        showNotice(`${tr(config.createAction)} — ${tr("record created")}`);
      } else if (form.id) {
        await updateRow(config.collection, form.id, values);
        showNotice(`${tr("Record updated")}`);
      }
      setForm(null);
      await load();
    } catch {
      showNotice(tr("Could not save the record."));
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setSaving(true);
    try {
      await removeRow(config.collection, String(pendingDelete.id));
      showNotice(tr("Record deleted"));
      setPendingDelete(null);
      await load();
    } catch {
      showNotice(tr("Could not delete the record."));
    } finally {
      setSaving(false);
    }
  };

  const runExport = () => {
    const ok = exportDrillingCsv(config.exportName, config.columns, filtered);
    showNotice(ok ? tr("CSV export downloaded") : tr("Export unavailable in this browser"));
  };

  const restoreDemo = async () => {
    await resetRows(config.collection);
    setQuery("");
    setActiveTab(0);
    setSort(null);
    await load();
    showNotice(tr("Demo data restored"));
  };

  const columnCount = config.columns.length + 1;
  const gridStyle = { ["--drill-cols" as string]: String(columnCount) } as React.CSSProperties;

  return (
    <>
      <DrillingNav />
      <PageTitle
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.subtitle}
        actions={
          <>
            <button className="secondary-button" type="button" onClick={runExport}>
              <Icon name="download" size={15} /> {tr("Export CSV")}
            </button>
            <button className="primary-button" type="button" onClick={openCreate}>
              <Icon name="plus" size={15} /> {tr(config.createAction)}
            </button>
          </>
        }
      />

      {tabs.length > 0 && <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />}

      <section className="panel inventory-kpi-panel">
        <div className={kpis.length >= 5 ? "inventory-kpi-grid inventory-kpi-grid-5" : "inventory-kpi-grid"}>
          {kpis.map((kpi) => (
            <div className="inventory-kpi" key={kpi.label}>
              <span>{tr(kpi.label)}</span>
              <strong>{kpi.value}</strong>
              {kpi.detail && <small>{tr(kpi.detail)}</small>}
            </div>
          ))}
        </div>
      </section>

      <section className="panel inventory-toolbar-panel">
        <div className="finance-toolbar inventory-toolbar">
          <div className="search-field">
            <Icon name="search" size={14} />
            <input
              placeholder={tr(config.searchPlaceholder)}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={tr(config.searchPlaceholder)}
            />
          </div>
          <button className="text-button" type="button" onClick={() => setSort(null)}>
            {tr("Clear sort")}
          </button>
          <button className="text-button" type="button" onClick={restoreDemo}>
            {tr("Restore demo data")}
          </button>
        </div>
      </section>

      <div className="inventory-workspace">
        <section className="panel drilling-table-panel">
          <div className="panel-head">
            <div>
              <h2>{tr(config.title)}</h2>
              <p>
                {rows === null
                  ? tr("Loading records…")
                  : `${filtered.length} ${tr("records")} · ${tr("Demo data")}`}
              </p>
            </div>
          </div>

          {rows === null ? (
            <LoadingState label="Loading records…" />
          ) : visible.length === 0 ? (
            <EmptyState
              title="No records found"
              detail="Try adjusting your search or filters, or restore the demo data."
              action={
                <button className="secondary-button" type="button" onClick={restoreDemo}>
                  {tr("Restore demo data")}
                </button>
              }
            />
          ) : (
            <div className="drilling-table-scroll" role="region" aria-label={tr(config.title)} tabIndex={0}>
              <div className="drilling-table" style={gridStyle}>
                <div className="drilling-row drilling-head" role="row">
                  {config.columns.map((column) => {
                    const active = sort?.key === column.key;
                    return (
                      <span key={column.key} role="columnheader" aria-sort={active ? (sort?.dir === "asc" ? "ascending" : "descending") : "none"}>
                        <button className="drilling-sort" type="button" onClick={() => toggleSort(column.key)}>
                          {tr(column.label)}
                          <em aria-hidden="true">{active ? (sort?.dir === "asc" ? "↑" : "↓") : "↕"}</em>
                        </button>
                      </span>
                    );
                  })}
                  <span role="columnheader">{tr("Actions")}</span>
                </div>

                {visible.map((row) => {
                  const href = config.detailHref?.(row);
                  return (
                    <div className="drilling-row" role="row" key={String(row.id)}>
                      {config.columns.map((column) => (
                        <span key={column.key} data-label={tr(column.label)}>
                          {cellText(column, row, tr)}
                        </span>
                      ))}
                      <span className="drilling-row-actions" data-label={tr("Actions")}>
                        {href && (
                          <Link className="drilling-action-link" href={href}>
                            {tr("View")}
                          </Link>
                        )}
                        <button type="button" onClick={() => openEdit(row)}>
                          {tr("Edit")}
                        </button>
                        <button type="button" className="drilling-action-danger" onClick={() => setPendingDelete(row)}>
                          {tr("Delete")}
                        </button>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {rows !== null && filtered.length > 0 && (
            <Pagination
              count={`${filtered.length} ${tr("records")} · ${tr("page")} ${safePage}/${pageCount}`}
              page={safePage}
              pages={pages}
              onPage={setPage}
            />
          )}
        </section>

        {(chart || config.insight) && (
          <div className="fleet-side">
            {chart && <FleetBarChart title={chart.title} labels={chart.labels} values={chart.values} />}
            {config.insight && (
              <FleetInsight
                variant="compact"
                title={config.insight.title}
                lines={insightLines}
                action={config.insight.action}
              />
            )}
          </div>
        )}
      </div>

      {form && (
        <DrillingFormModal
          title={form.mode === "create" ? config.createAction : tr("Edit record")}
          subtitle={config.subtitle}
          fields={config.fields}
          values={form.values}
          errors={form.errors}
          saving={saving}
          onChange={changeField}
          onSave={saveForm}
          onClose={() => setForm(null)}
        />
      )}

      {pendingDelete && (
        <DrillingConfirmDialog
          title="Delete record"
          detail={`${tr("You are about to delete")} ${String(pendingDelete.id)}.`}
          confirmLabel="Delete record"
          busy={saving}
          onConfirm={confirmDelete}
          onClose={() => setPendingDelete(null)}
        />
      )}

      {notice && (
        <div className="drilling-toast" role="status" aria-live="polite">
          <Icon name="check" size={14} /> {notice}
        </div>
      )}
    </>
  );
}

export default DrillingListScreen;
