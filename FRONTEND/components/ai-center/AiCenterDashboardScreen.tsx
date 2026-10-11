"use client";

import React, { useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { Stage8Kpis } from "@/components/stage8/Stage8Kpis";
import { Stage8Toolbar } from "@/components/stage8/Stage8Toolbar";
import { Stage8Table } from "@/components/stage8/Stage8Table";
import { Stage8ChartPanel } from "@/components/stage8/Stage8ChartPanel";
import { AiInsightPanel } from "@/components/stage8/AiInsightPanel";
import { Stage8Toast } from "@/components/stage8/Stage8Toast";
import { exportCsv } from "@/lib/stage8/format";
import {
  aiCenterCharts,
  aiCenterKpis,
  aiCenterModelsColumns,
  aiDashboardInsight,
  aiModelRows,
} from "@/lib/ai-center/ai-center-data";

export function AiCenterDashboardScreen() {
  const { tr } = useApp();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [notice, setNotice] = useState<string | null>(null);

  const rows = aiModelRows().filter((row) => {
    if (status !== "all" && String(row.status) !== status) return false;
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return Object.values(row).some((value) => String(value).toLowerCase().includes(term));
  });

  return (
    <>
      <PageTitle
        eyebrow="Stage 8 · AI Center"
        title="AI Center Dashboard"
        subtitle="Algeria operations · Q4 2026 · Updated 09:42 UTC+1"
        actions={
          <>
            <button className="secondary-button" type="button" onClick={() => setNotice(exportCsv("ai-center-dashboard", aiCenterModelsColumns, rows) ? "CSV export downloaded" : "Export unavailable")}>
              <Icon name="download" size={15} /> {tr("Export CSV")}
            </button>
            <button className="primary-button" type="button" onClick={() => setNotice("Demo output — no live model request sent")}>
              <Icon name="spark" size={15} /> {tr("Run demo")}
            </button>
          </>
        }
      />

      <Stage8Kpis kpis={aiCenterKpis} />

      <section className="stage8-chart-grid">
        {aiCenterCharts.map((chart) => (
          <Stage8ChartPanel key={chart.title} chart={chart} />
        ))}
      </section>

      <Stage8Toolbar
        search={search}
        onSearch={setSearch}
        statuses={["Active", "Testing", "Inactive"]}
        status={status}
        onStatus={setStatus}
        onFilters={() => setNotice("Filters applied · Demo scope")}
        onExport={() => setNotice("CSV export downloaded")}
      />

      <div className="stage8-workspace">
        <section className="stage8-main">
          <div className="stage8-panel-head">
            <h2>{tr("Models")}</h2>
            <p>{rows.length} {tr("records")} · {tr("Demo output · NOT CONNECTED to a live model")}</p>
          </div>
          <Stage8Table
            columns={aiCenterModelsColumns}
            rows={rows}
            onAction={(_action, id) => setNotice(`Model ${id} · Demo view`)}
          />
        </section>
        <aside className="stage8-side">
          <AiInsightPanel insight={aiDashboardInsight} title="AI insight" />
        </aside>
      </div>

      <Stage8Toast message={notice} />
    </>
  );
}

export default AiCenterDashboardScreen;
