"use client";

import React, { useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Overlay";
import { useApp } from "@/lib/context/AppContext";
import { Stage8Nav } from "@/components/stage8/Stage8Nav";
import { Stage8Kpis } from "@/components/stage8/Stage8Kpis";
import { Stage8Toolbar } from "@/components/stage8/Stage8Toolbar";
import { Stage8Table } from "@/components/stage8/Stage8Table";
import { AiInsightPanel } from "@/components/stage8/AiInsightPanel";
import { Stage8Toast } from "@/components/stage8/Stage8Toast";
import { exportCsv, stage8Tone } from "@/lib/stage8/format";
import {
  aiDashboardInsight,
  aiPredictionColumns,
  aiPredictionRows,
  aiPredictions,
} from "@/lib/ai-center/ai-center-data";
import type { AIPrediction } from "@/types/ai";

const kpis = [
  { label: "Active predictions", value: "126" },
  { label: "Needs review", value: "9" },
  { label: "High risk", value: "4" },
  { label: "Avg confidence", value: "86.4%" },
];

export function AiPredictionsScreen() {
  const { tr } = useApp();
  const [search, setSearch] = useState("");
  const [risk, setRisk] = useState("all");
  const [selected, setSelected] = useState<AIPrediction | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const rows = aiPredictionRows().filter((row) => {
    if (risk !== "all" && String(row.riskLevel) !== risk) return false;
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return Object.values(row).some((value) => String(value).toLowerCase().includes(term));
  });

  const open = (id: string) => {
    const prediction = aiPredictions.find(
      (item) => `${item.entityId}-${item.modelId}` === id
    );
    setSelected(prediction ?? null);
  };

  return (
    <>
      <Stage8Nav module="ai-center" />
      <PageTitle
        eyebrow="Stage 8 · AI Center"
        title="AI Predictions & Insights"
        subtitle="Algeria operations · Q4 2026 · Updated 09:42 UTC+1"
        actions={
          <button className="secondary-button" type="button" onClick={() => setNotice(exportCsv("ai-predictions", aiPredictionColumns, rows) ? "CSV export downloaded" : "Export unavailable")}>
            <Icon name="download" size={15} /> {tr("Export CSV")}
          </button>
        }
      />

      <Stage8Kpis kpis={kpis} />

      <Stage8Toolbar
        search={search}
        onSearch={setSearch}
        statuses={["Low", "Medium", "High", "Critical"]}
        status={risk}
        onStatus={setRisk}
        onFilters={() => setNotice("Filters applied · Demo scope")}
        onExport={() => setNotice("CSV export downloaded")}
      />

      <div className="stage8-workspace">
        <section className="stage8-main">
          <div className="stage8-panel-head">
            <h2>{tr("Predictions")}</h2>
            <p>{rows.length} {tr("records")} · {tr("Demo output · NOT CONNECTED to a live model")}</p>
          </div>
          <Stage8Table
            columns={aiPredictionColumns}
            rows={rows}
            onRowClick={open}
            actions={[{ key: "view", label: "View" }, { key: "review", label: "Review" }, { key: "dismiss", label: "Dismiss" }]}
            onAction={(action, id) => {
              if (action === "view") {
                open(id);
                return;
              }
              setNotice(`${action === "review" ? "Marked for review" : "Dismissed"} — ${id} · recorded locally`);
            }}
          />
        </section>
        <aside className="stage8-side">
          <AiInsightPanel insight={aiDashboardInsight} title="Prediction insight" />
        </aside>
      </div>

      {selected && (
        <Modal
          title={selected.prediction}
          subtitle={`${selected.entityId} · ${selected.modelId} · v${selected.modelVersion}`}
          onClose={() => setSelected(null)}
          actions={
            <>
              <button className="stage8-tool" type="button" onClick={() => { setNotice(`Dismissed ${selected.entityId} · recorded locally`); setSelected(null); }}>
                {tr("Dismiss")}
              </button>
              <button className="stage8-primary" type="button" onClick={() => { setNotice(`Confirmed ${selected.entityId} · recorded locally`); setSelected(null); }}>
                {tr("Confirm")}
              </button>
            </>
          }
        >
          <div className="stage8-detail-grid">
            <div><span>{tr("Entity")}</span><strong>{selected.entityId}</strong></div>
            <div><span>{tr("Entity type")}</span><strong>{tr(selected.entityType)}</strong></div>
            <div><span>{tr("Prediction type")}</span><strong>{tr(selected.predictionType ?? "—")}</strong></div>
            <div><span>{tr("Source module")}</span><strong>{tr(selected.sourceModule ?? "—")}</strong></div>
            <div><span>{tr("Confidence")}</span><strong>{(selected.confidence * 100).toFixed(1)}%</strong></div>
            <div><span>{tr("Risk")}</span><Badge tone={stage8Tone(selected.riskLevel)}>{tr(selected.riskLevel)}</Badge></div>
            <div><span>{tr("Status")}</span><Badge tone={stage8Tone(selected.status)}>{tr(selected.status)}</Badge></div>
            <div><span>{tr("Review status")}</span><strong>{tr(selected.reviewStatus ?? "Pending")}</strong></div>
            <div className="wide"><span>{tr("Explanation")}</span><strong>{tr(selected.explanation)}</strong></div>
            <div className="wide"><span>{tr("Recommended action")}</span><strong>{tr(selected.recommendedAction)}</strong></div>
            <div><span>{tr("Created")}</span><strong>{selected.createdAt.replace("T", " ").replace("Z", " UTC")}</strong></div>
            <div><span>{tr("Updated")}</span><strong>{selected.updatedAt.replace("T", " ").replace("Z", " UTC")}</strong></div>
          </div>
          <p className="stage8-ai-prov">{tr("Demo output — NOT CONNECTED to a live model")}</p>
        </Modal>
      )}

      <Stage8Toast message={notice} />
    </>
  );
}

export default AiPredictionsScreen;
