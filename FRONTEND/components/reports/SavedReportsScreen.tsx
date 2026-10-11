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
import { Stage8Toast } from "@/components/stage8/Stage8Toast";
import { exportCsv } from "@/lib/stage8/format";
import type { Stage8Row } from "@/lib/stage8/types";
import { buildSavedRows, reportAiForecast, savedReportsColumns } from "@/lib/reports/reports-data";

const kpis = [
  { label: "Saved reports", value: "42" },
  { label: "Favorites", value: "18" },
  { label: "Categories", value: "9" },
  { label: "Shared", value: "26" },
];

const categories = ["Reporting", "Financial", "Fleet", "Assurance", "Drilling"];

export function SavedReportsScreen() {
  const { tr } = useApp();
  const [rows, setRows] = useState<Stage8Row[]>(buildSavedRows);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = rows.filter((row) => {
    if (category !== "all" && String(row.category) !== category) return false;
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return Object.values(row).some((value) => String(value).toLowerCase().includes(term));
  });

  const onAction = (action: string, id: string) => {
    if (action === "delete") {
      setRows((current) => current.filter((row) => row.id !== id));
      setNotice(`Report removed — ${id}`);
      return;
    }
    setNotice(action === "edit" ? `Renamed ${id}` : `Opened ${id}`);
  };

  return (
    <>
      <Stage8Nav module="reports" />
      <PageTitle
        eyebrow="Stage 8 · Reports & Analytics"
        title="Saved Reports"
        subtitle="Algeria operations · Q4 2026 · Updated 09:42 UTC+1"
        actions={
          <button className="secondary-button" type="button" onClick={() => setNotice(exportCsv("saved-reports", savedReportsColumns, filtered) ? "CSV export downloaded" : "Export unavailable")}>
            <Icon name="download" size={15} /> {tr("Export CSV")}
          </button>
        }
      />

      <Stage8Kpis kpis={kpis} />

      <Stage8Toolbar
        search={search}
        onSearch={setSearch}
        statuses={categories}
        status={category}
        onStatus={setCategory}
        onFilters={() => setNotice("Filters applied · Demo scope")}
        onExport={() => setNotice("CSV export downloaded")}
      />

      <div className="stage8-workspace">
        <section className="stage8-main">
          <div className="stage8-panel-head">
            <h2>{tr("Saved Reports")}</h2>
            <p>{filtered.length} {tr("records")} · {tr("Verified ERP / daily logs · DZD · 01-05 Oct 2026")}</p>
          </div>
          <Stage8Table columns={savedReportsColumns} rows={filtered} onAction={onAction} />
        </section>
        <aside className="stage8-side">
          <AiInsightPanel
            insight={reportAiForecast}
            title="Saved insight"
            lines={[
              "Weekly performance was opened 28 times this month.",
              "Six saved reports are external sharing candidates.",
              "Two saved reports have no owner after handover.",
            ]}
          />
        </aside>
      </div>

      <Stage8Toast message={notice} />
    </>
  );
}

export default SavedReportsScreen;
