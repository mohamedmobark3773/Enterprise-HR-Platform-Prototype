"use client";

import React, { useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { Stage8Nav } from "@/components/stage8/Stage8Nav";
import { Stage8Kpis } from "@/components/stage8/Stage8Kpis";
import { Stage8Toolbar } from "@/components/stage8/Stage8Toolbar";
import { Stage8Table } from "@/components/stage8/Stage8Table";
import { AiInsightPanel } from "@/components/stage8/AiInsightPanel";
import { Stage8FormModal, type Stage8Field } from "@/components/stage8/Stage8FormModal";
import { Stage8Toast } from "@/components/stage8/Stage8Toast";
import { exportCsv } from "@/lib/stage8/format";
import type { Stage8Row } from "@/lib/stage8/types";
import {
  buildScheduledRows,
  reportAiForecast,
  scheduledReportsColumns,
} from "@/lib/reports/reports-data";

const kpis = [
  { label: "Scheduled reports", value: "18" },
  { label: "Active", value: "12" },
  { label: "Paused", value: "3" },
  { label: "Draft", value: "3" },
];

const statuses = ["Active", "Paused", "Draft", "Archived"];

const fields: Stage8Field[] = [
  { key: "name", label: "Report name", required: true, placeholder: "Weekly performance", wide: true },
  { key: "frequency", label: "Frequency", type: "select", options: ["Daily", "Weekly", "Monthly"] },
  { key: "recipients", label: "Recipients", placeholder: "ops@atlas.dz", wide: true },
  { key: "format", label: "Format", type: "select", options: ["PDF", "XLSX", "CSV"] },
  { key: "nextRun", label: "Next run", placeholder: "06 Oct 2026" },
];

export function ScheduledReportsScreen() {
  const { tr } = useApp();
  const [rows, setRows] = useState<Stage8Row[]>(buildScheduledRows);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [modal, setModal] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = rows.filter((row) => {
    if (status !== "all" && String(row.status) !== status) return false;
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return Object.values(row).some((value) => String(value).toLowerCase().includes(term));
  });

  const onAction = (action: string, id: string) => {
    if (action === "delete") {
      setRows((current) => current.filter((row) => row.id !== id));
      setNotice(`Schedule removed — ${id}`);
      return;
    }
    setNotice(action === "edit" ? `Editing ${id}` : `Opened ${id}`);
  };

  return (
    <>
      <Stage8Nav module="reports" />
      <PageTitle
        eyebrow="Stage 8 · Reports & Analytics"
        title="Scheduled Reports"
        subtitle="Algeria operations · Q4 2026 · Updated 09:42 UTC+1"
        actions={
          <>
            <button className="secondary-button" type="button" onClick={() => setNotice(exportCsv("scheduled-reports", scheduledReportsColumns, filtered) ? "CSV export downloaded" : "Export unavailable")}>
              <Icon name="download" size={15} /> {tr("Export CSV")}
            </button>
            <button className="primary-button" type="button" onClick={() => setModal(true)}>
              <Icon name="plus" size={15} /> {tr("New schedule")}
            </button>
          </>
        }
      />

      <Stage8Kpis kpis={kpis} />

      <Stage8Toolbar
        search={search}
        onSearch={setSearch}
        statuses={statuses}
        status={status}
        onStatus={setStatus}
        onFilters={() => setNotice("Filters applied · Demo scope")}
        onExport={() => setNotice("CSV export downloaded")}
        onCreate={() => setModal(true)}
        createLabel="New schedule"
      />

      <div className="stage8-workspace">
        <section className="stage8-main">
          <div className="stage8-panel-head">
            <h2>{tr("Scheduled Reports")}</h2>
            <p>{filtered.length} {tr("records")} · {tr("Verified ERP / daily logs · DZD · 01-05 Oct 2026")}</p>
          </div>
          <Stage8Table columns={scheduledReportsColumns} rows={filtered} onAction={onAction} />
        </section>
        <aside className="stage8-side">
          <AiInsightPanel
            insight={reportAiForecast}
            title="Schedule insight"
            lines={[
              "Three daily schedules run before 07:00 UTC+1.",
              "One schedule is paused pending owner review.",
              "Recipients receive PDF and XLSX formats.",
            ]}
          />
        </aside>
      </div>

      {modal && (
        <Stage8FormModal
          title="New schedule"
          subtitle="Scheduled Reports"
          fields={fields}
          submitLabel="Schedule report"
          onSubmit={(values) => {
            const id = `SCH-${String(rows.length + 1).padStart(3, "0")}`;
            setRows((current) => [
              {
                id,
                name: values.name || "Untitled",
                frequency: values.frequency,
                recipients: values.recipients || "ops@atlas.dz",
                format: values.format,
                nextRun: values.nextRun || "06 Oct 2026",
                status: "Active",
              },
              ...current,
            ]);
            setModal(false);
            setNotice(`Scheduled — ${values.name || id}`);
          }}
          onClose={() => setModal(false)}
        />
      )}

      <Stage8Toast message={notice} />
    </>
  );
}

export default ScheduledReportsScreen;
