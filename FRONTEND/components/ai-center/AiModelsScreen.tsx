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
  aiCenterModelsColumns,
  aiDashboardInsight,
  aiModelRows,
  aiModels,
  type AiCenterModel,
} from "@/lib/ai-center/ai-center-data";

const kpis = [
  { label: "Models", value: "8" },
  { label: "Deployed", value: "6" },
  { label: "Testing", value: "1" },
  { label: "Degraded", value: "1" },
];

export function AiModelsScreen() {
  const { tr } = useApp();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<AiCenterModel | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const rows = aiModelRows().filter((row) => {
    if (status !== "all" && String(row.status) !== status) return false;
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return Object.values(row).some((value) => String(value).toLowerCase().includes(term));
  });

  const open = (id: string) => setSelected(aiModels.find((model) => model.modelId === id) ?? null);

  return (
    <>
      <Stage8Nav module="ai-center" />
      <PageTitle
        eyebrow="Stage 8 · AI Center"
        title="AI Models"
        subtitle="Algeria operations · Q4 2026 · Updated 09:42 UTC+1"
        actions={
          <button className="secondary-button" type="button" onClick={() => setNotice(exportCsv("ai-models", aiCenterModelsColumns, rows) ? "CSV export downloaded" : "Export unavailable")}>
            <Icon name="download" size={15} /> {tr("Export CSV")}
          </button>
        }
      />

      <Stage8Kpis kpis={kpis} />

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
            <h2>{tr("Model registry")}</h2>
            <p>{rows.length} {tr("records")} · {tr("Demo output · NOT CONNECTED to a live model")}</p>
          </div>
          <Stage8Table
            columns={aiCenterModelsColumns}
            rows={rows}
            onRowClick={open}
            onAction={(_action, id) => open(id)}
          />
        </section>
        <aside className="stage8-side">
          <AiInsightPanel
            insight={aiDashboardInsight}
            title="Registry insight"
            lines={[
              "Six of eight models are deployed to production.",
              "One model is degraded and scheduled for retraining.",
              "Average confidence across active models is 86.4%.",
            ]}
          />
        </aside>
      </div>

      {selected && (
        <Modal title={selected.modelName} subtitle={`${selected.modelId} · v${selected.modelVersion}`} onClose={() => setSelected(null)}>
          <div className="stage8-detail-grid">
            <div><span>{tr("Domain")}</span><strong>{tr(selected.domain)}</strong></div>
            <div><span>{tr("Prediction type")}</span><strong>{tr(selected.predictionType)}</strong></div>
            <div><span>{tr("Provider")}</span><strong>{selected.provider}</strong></div>
            <div><span>{tr("Framework")}</span><strong>{selected.framework}</strong></div>
            <div><span>{tr("Environment")}</span><strong>{tr(selected.environment)}</strong></div>
            <div><span>{tr("Status")}</span><Badge tone={stage8Tone(selected.status)}>{tr(selected.status)}</Badge></div>
            <div><span>{tr("Health")}</span><Badge tone={stage8Tone(selected.health)}>{tr(selected.health)}</Badge></div>
            <div><span>{tr("Deployment")}</span><Badge tone={stage8Tone(selected.deploymentStatus)}>{tr(selected.deploymentStatus)}</Badge></div>
            <div><span>{tr("Accuracy")}</span><strong>{(selected.performanceMetrics.accuracy * 100).toFixed(1)}%</strong></div>
            <div><span>{tr("Predictions")}</span><strong>{selected.predictionCount}</strong></div>
            <div className="wide"><span>{tr("Description")}</span><strong>{tr(selected.description)}</strong></div>
            <div className="wide"><span>{tr("Owner")}</span><strong>{selected.owner}</strong></div>
          </div>
          <p className="stage8-ai-prov">{tr("Demo output — NOT CONNECTED to a live model")}</p>
        </Modal>
      )}

      <Stage8Toast message={notice} />
    </>
  );
}

export default AiModelsScreen;
