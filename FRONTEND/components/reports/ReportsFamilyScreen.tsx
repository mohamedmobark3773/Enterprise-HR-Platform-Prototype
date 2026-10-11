"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { Stage8Nav } from "@/components/stage8/Stage8Nav";
import { Stage8Kpis } from "@/components/stage8/Stage8Kpis";
import { Stage8Toolbar } from "@/components/stage8/Stage8Toolbar";
import { Stage8Table } from "@/components/stage8/Stage8Table";
import { Stage8ChartPanel } from "@/components/stage8/Stage8ChartPanel";
import { AiInsightPanel } from "@/components/stage8/AiInsightPanel";
import { Stage8FormModal, type Stage8Field } from "@/components/stage8/Stage8FormModal";
import { Stage8Toast } from "@/components/stage8/Stage8Toast";
import { exportCsv } from "@/lib/stage8/format";
import type { Stage8Row } from "@/lib/stage8/types";
import { reportsDashboard, reportsFamilyConfigs, type ReportFamilyConfig } from "@/lib/reports/reports-data";

const reportsConfigs: Record<string, ReportFamilyConfig> = {
  "reports-dashboard": reportsDashboard,
  ...reportsFamilyConfigs,
};

const createFields: Stage8Field[] = [
  { key: "name", label: "Report name", required: true, placeholder: "Weekly performance", wide: true },
  { key: "category", label: "Category", type: "select", options: ["Executive", "Operational", "Financial", "HR", "Inventory", "Fleet", "Drilling", "Projects"] },
  { key: "schedule", label: "Schedule", type: "select", options: ["Manual", "Daily", "Weekly", "Monthly"] },
  { key: "format", label: "Format", type: "select", options: ["PDF", "XLSX", "CSV"] },
];

export function ReportsFamilyScreen({ configKey }: { configKey: string }) {
  const config = reportsConfigs[configKey];
  const { tr } = useApp();
  const [rows, setRows] = useState<Stage8Row[]>(config.rows);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [notice, setNotice] = useState<string | null>(null);
  const [modal, setModal] = useState<null | { mode: "create" | "edit"; id?: string }>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setRows(config.rows);
    setSearch("");
    setStatus("all");
  }, [config]);

  const showNotice = useCallback((message: string) => {
    setNotice(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(null), 3200);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const filtered = rows.filter((row) => {
    if (status !== "all" && config.statusField && String(row[config.statusField]) !== status) return false;
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return Object.values(row).some((value) => String(value).toLowerCase().includes(term));
  });

  const runExport = () => {
    const ok = exportCsv(config.exportName, config.columns, filtered);
    showNotice(ok ? "CSV export downloaded" : "Export unavailable in this browser");
  };

  const onAction = (action: string, id: string) => {
    if (action === "delete") {
      setRows((current) => current.filter((row) => row.id !== id));
      showNotice(`Record deleted — ${id}`);
      return;
    }
    if (action === "edit") {
      setModal({ mode: "edit", id });
      return;
    }
    showNotice(`Opened ${id}`);
  };

  const submitForm = (values: Record<string, string>) => {
    if (modal?.mode === "create") {
      const id = `RPT-${String(rows.length + 1).padStart(3, "0")}`;
      const created: Stage8Row = { id };
      config.columns.forEach((column) => {
        created[column.key] = column.key === "status" ? "Draft" : "—";
      });
      if (config.statusField) created[config.statusField] = "Draft";
      setRows((current) => [created, ...current]);
      showNotice(`${tr(config.createLabel)} — ${values.name || id}`);
    } else {
      showNotice("Record updated");
    }
    setModal(null);
  };

  const primaryLabel = config.primaryAction === "create" ? config.createLabel : config.createLabel;

  return (
    <>
      {configKey !== "reports-dashboard" && <Stage8Nav module="reports" />}
      <PageTitle
        eyebrow="Stage 8 · Reports & Analytics"
        title={config.title}
        subtitle={config.subtitle}
        actions={
          <>
            <button className="secondary-button" type="button" onClick={runExport}>
              <Icon name="download" size={15} /> {tr("Export CSV")}
            </button>
            <button className="primary-button" type="button" onClick={() => setModal({ mode: "create" })}>
              <Icon name="plus" size={15} /> {tr(primaryLabel)}
            </button>
          </>
        }
      />

      <Stage8Kpis kpis={config.kpis} stats={config.stats} />

      <section className="stage8-chart-grid">
        {config.charts.map((chart) => (
          <Stage8ChartPanel key={chart.title} chart={chart} />
        ))}
      </section>

      <Stage8Toolbar
        search={search}
        onSearch={setSearch}
        statuses={config.statuses}
        status={status}
        onStatus={setStatus}
        onFilters={() => showNotice("Filters applied · Demo scope")}
        onExport={runExport}
        onCreate={() => setModal({ mode: "create" })}
        createLabel={primaryLabel}
      />

      <div className="stage8-workspace">
        <section className="stage8-main">
          <div className="stage8-panel-head">
            <h2>{tr(config.title)}</h2>
            <p>
              {filtered.length} {tr("records")} · {tr("Verified ERP / daily logs · DZD · 01-05 Oct 2026")}
            </p>
          </div>
          <Stage8Table
            columns={config.columns}
            rows={filtered}
            actions={[
              { key: "view", label: "View" },
              { key: "edit", label: "Edit" },
              { key: "delete", label: "Delete", tone: "danger" },
            ]}
            onAction={onAction}
          />
        </section>

        <aside className="stage8-side">
          <AiInsightPanel
            insight={config.ai}
            title={config.insightTitle}
            lines={config.insightLines}
            variant="rich"
          />
        </aside>
      </div>

      <p className={`stage8-note tone-${config.footer.tone}`}>
        <Icon name="check" size={15} /> {tr(config.footer.text)}
      </p>

      {modal && (
        <Stage8FormModal
          title={modal.mode === "create" ? config.createLabel : "Edit report"}
          subtitle={config.title}
          fields={createFields}
          submitLabel={modal.mode === "create" ? config.createLabel : "Save"}
          onSubmit={submitForm}
          onClose={() => setModal(null)}
        />
      )}

      <Stage8Toast message={notice} />
    </>
  );
}

export default ReportsFamilyScreen;
