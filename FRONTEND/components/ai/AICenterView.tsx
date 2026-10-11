"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { AIModel, AIPrediction } from "@/types/ai";
import { initialAIModels, initialPredictions } from "@/lib/ai/ai-contracts";
import { useApp } from "@/lib/context/AppContext";

export interface AICenterViewProps {
  initialTab?: string;
}

export function AICenterView({ initialTab = "Dashboard" }: AICenterViewProps) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ q: string; a: string }[]>([]);
  const [tab, setTab] = useState(initialTab);
  const [models, setModels] = useState<AIModel[]>(initialAIModels);
  const [selected, setSelected] = useState<AIModel | null>(null);
  const [selectedPrediction, setSelectedPrediction] = useState<AIPrediction | null>(
    null
  );
  const { tr } = useApp();

  const ask = () => {
    if (query.trim()) {
      setMessages([
        ...messages,
        {
          q: query,
          a: "Engineering has the highest late-arrival rate this month at 8.4%, up 1.6 points from February. This result is based on 2,184 attendance records and excludes approved permissions.",
        },
      ]);
      setQuery("");
    }
  };

  const mutateModel = (id: string, patch: Partial<AIModel>) => {
    setModels((all) =>
      all.map((m) =>
        m.modelId === id
          ? { ...m, ...patch, updatedAt: new Date().toISOString() }
          : m
      )
    );
    setSelected((s) => (s?.modelId === id ? { ...s, ...patch } : s));
  };

  return (
    <>
      <PageTitle
        eyebrow="Human-guided intelligence"
        title="AI HR Center"
        subtitle="Model-agnostic predictions, transparent explanations and human review"
        actions={
          <Badge tone="green">
            {models.filter((m) => m.health === "Healthy").length} {tr("models healthy")}
          </Badge>
        }
      />

      <div className="tabs">
        {["Dashboard", "Models", "Predictions", "Assistant"].map((x) => (
          <button
            className={tab === x ? "active" : ""}
            onClick={() => setTab(x)}
            key={x}
          >
            {tr(x)}
          </button>
        ))}
      </div>

      <div className="kpi-grid compact">
        {[
          ["Active models", "8", "green"],
          ["Predictions today", "1,842", "blue"],
          ["Require review", "23", "amber"],
          ["Low confidence", "7", "red"],
          ["Avg. processing", "164ms", "violet"],
        ].map(([x, y, z]) => (
          <div className="mini-kpi" key={x}>
            <span>
              <i className={z} />
              {tr(x)}
            </span>
            <strong>{y}</strong>
          </div>
        ))}
      </div>

      {tab === "Predictions" ? (
        <div className="prediction-grid">
          {initialPredictions.map((p) => (
            <button
              className="panel prediction-card"
              key={p.entityId}
              onClick={() => setSelectedPrediction(p)}
            >
              <div>
                <Badge
                  tone={
                    p.riskLevel === "High"
                      ? "red"
                      : p.riskLevel === "Medium"
                      ? "amber"
                      : "green"
                  }
                >
                  {p.riskLevel} {tr("Risk")}
                </Badge>
                <span>
                  {Math.round(p.confidence * 100)}% {tr("Confidence")}
                </span>
              </div>
              <h3>{p.prediction}</h3>
              <p>
                {p.entityType} · {p.entityId} · {tr(p.sourceModule || "")}
              </p>
              <div className="prediction-explanation">{p.explanation}</div>
              <strong>{tr("Recommended action")}</strong>
              <p>{p.recommendedAction}</p>
              <span className="text-button">
                {tr("Open prediction details")} <Icon name="arrow" />
              </span>
            </button>
          ))}
        </div>
      ) : tab === "Models" ? (
        <div className="panel model-registry">
          <div className="panel-head">
            <div>
              <h2>{tr("AI model registry")}</h2>
              <p>{tr("One standardized contract across every HR domain")}</p>
            </div>
            <button className="secondary-button">{tr("Register model")}</button>
          </div>
          {models.map((m) => (
            <button
              className="registry-row"
              key={m.modelId}
              onClick={() => setSelected(m)}
            >
              <span className="model-icon">
                <Icon name="spark" />
              </span>
              <span>
                <strong>{m.modelName}</strong>
                <small>
                  {m.modelId} · {m.modelType} · {tr(m.domain)}
                </small>
              </span>
              <span>
                <strong>v{m.modelVersion}</strong>
                <small>{m.environment}</small>
              </span>
              <Badge
                tone={
                  m.health === "Healthy"
                    ? "green"
                    : m.health === "Degraded"
                    ? "amber"
                    : "red"
                }
              >
                {m.health}
              </Badge>
              <Badge tone={m.deploymentStatus === "Deployed" ? "blue" : "neutral"}>
                {m.deploymentStatus}
              </Badge>
              <span>
                <strong>{m.predictionCount.toLocaleString()}</strong>
                <small>{tr("Predictions")}</small>
              </span>
              <Icon name="arrow" />
            </button>
          ))}
        </div>
      ) : (
        <div className="ai-layout">
          <section className="panel assistant">
            <div className="assistant-head">
              <span className="ai-mark large">
                <Icon name="spark" />
              </span>
              <div>
                <h2>{tr("HR Assistant")}</h2>
                <p>{tr("Prototype responses · No live AI connection")}</p>
              </div>
            </div>
            <div className="chat-area">
              {messages.length === 0 ? (
                <div className="prompt-grid">
                  {[
                    "Who has the highest late attendance?",
                    "Which contracts expire in 30 days?",
                    "Show payroll anomalies",
                    "What is overtime cost this month?",
                  ].map((x) => (
                    <button key={x} onClick={() => setQuery(x)}>
                      {tr(x)}
                      <Icon name="arrow" />
                    </button>
                  ))}
                </div>
              ) : (
                messages.map((m, i) => (
                  <div key={i}>
                    <div className="chat-user">{m.q}</div>
                    <div className="chat-ai">
                      <span className="ai-mark">
                        <Icon name="spark" />
                      </span>
                      <div>
                        <p>{tr(m.a)}</p>
                        <div className="source-box">
                          <strong>{tr("Sources")}</strong>
                          <span>
                            {tr(
                              "Attendance records · Mar 1–14 · Access-controlled"
                            )}
                          </span>
                        </div>
                        <button className="text-button">
                          {tr("Open attendance analytics")} <Icon name="arrow" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="chat-input">
              <input
                placeholder={tr("Ask about your workforce...")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ask()}
              />
              <button className="primary-button" onClick={ask}>
                <Icon name="arrow" />
              </button>
            </div>
          </section>

          <section className="panel model-panel">
            <div className="panel-head">
              <div>
                <h2>{tr("Model registry")}</h2>
                <p>{tr("Framework-independent contracts")}</p>
              </div>
              <button className="text-button" onClick={() => setTab("Models")}>
                {tr("View all")}
              </button>
            </div>
            {models.map((m) => (
              <button
                className="model-row model-row-button"
                key={m.modelId}
                onClick={() => setSelected(m)}
              >
                <span className="model-icon">
                  <Icon name="spark" />
                </span>
                <div>
                  <strong>{m.modelName}</strong>
                  <span>
                    {m.modelId} · v{m.modelVersion}
                  </span>
                </div>
                <Badge tone={m.health === "Healthy" ? "green" : "amber"}>
                  {m.health}
                </Badge>
                <strong>
                  {Math.round(m.predictionCount / 1000)}K
                  <small>{tr("Predictions")}</small>
                </strong>
              </button>
            ))}
          </section>
        </div>
      )}

      {selected && (
        <div className="drawer-backdrop" onMouseDown={() => setSelected(null)}>
          <div
            className="profile-drawer model-details"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <div>
                <div className="eyebrow">{tr("AI model details")}</div>
                <h2>{selected.modelName}</h2>
                <p>
                  {selected.modelId} · {tr(selected.domain)}
                </p>
              </div>
              <button className="icon-button" onClick={() => setSelected(null)}>
                ×
              </button>
            </div>
            <div className="profile-body">
              <div className="model-status-row">
                <Badge tone={selected.status === "Active" ? "green" : "neutral"}>
                  {selected.status}
                </Badge>
                <Badge
                  tone={
                    selected.health === "Healthy"
                      ? "green"
                      : selected.health === "Degraded"
                      ? "amber"
                      : "red"
                  }
                >
                  {selected.health}
                </Badge>
                <Badge tone="blue">{selected.deploymentStatus}</Badge>
              </div>
              <p className="model-description">{tr(selected.description)}</p>
              <div className="detail-grid">
                {[
                  ["Current version", selected.modelVersion],
                  ["Environment", selected.environment],
                  ["Framework", selected.framework],
                  ["Provider", selected.provider],
                  ["Owner", selected.owner],
                  ["Prediction count", selected.predictionCount.toLocaleString()],
                  ["Last prediction", selected.lastPrediction],
                  ["Updated", selected.updatedAt],
                ].map(([a, b]) => (
                  <div key={a}>
                    <span>{tr(a)}</span>
                    <strong>{b}</strong>
                  </div>
                ))}
              </div>
              <h3>{tr("Performance metrics")}</h3>
              <div className="match-summary">
                {Object.entries(selected.performanceMetrics).map(([a, b]) => (
                  <div key={a}>
                    <span>{a}</span>
                    <strong>{b < 1 ? `${Math.round(b * 100)}%` : b}</strong>
                  </div>
                ))}
              </div>
              <h3>{tr("Version history")}</h3>
              <div className="version-list">
                {selected.versions.map((v, i) => (
                  <div key={v}>
                    <span>
                      <Icon name="spark" />
                      <strong>v{v}</strong>
                    </span>
                    <span>
                      {i === 0
                        ? tr("Current production")
                        : tr("Previous version")}
                    </span>
                    {i > 0 && (
                      <button
                        onClick={() =>
                          mutateModel(selected.modelId, { modelVersion: v })
                        }
                      >
                        {tr("Rollback")}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <h3>{tr("Contract schemas")}</h3>
              <div className="schema-grid">
                <pre>{JSON.stringify(selected.inputSchema, null, 2)}</pre>
                <pre>{JSON.stringify(selected.outputSchema, null, 2)}</pre>
              </div>
              <div className="action-grid">
                <button
                  onClick={() =>
                    mutateModel(selected.modelId, {
                      status:
                        selected.status === "Active" ? "Inactive" : "Active",
                    })
                  }
                >
                  {selected.status === "Active" ? tr("Deactivate") : tr("Activate")}
                </button>
                <button
                  onClick={() =>
                    mutateModel(selected.modelId, {
                      deploymentStatus:
                        selected.deploymentStatus === "Deployed"
                          ? "Undeployed"
                          : "Deployed",
                    })
                  }
                >
                  {selected.deploymentStatus === "Deployed"
                    ? tr("Undeploy")
                    : tr("Deploy")}
                </button>
                <button
                  onClick={() =>
                    mutateModel(selected.modelId, { health: "Healthy" })
                  }
                >
                  {tr("Refresh health")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPrediction && (
        <div
          className="drawer-backdrop"
          onMouseDown={() => setSelectedPrediction(null)}
        >
          <div
            className="profile-drawer"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <div>
                <div className="eyebrow">{tr("AI prediction details")}</div>
                <h2>{selectedPrediction.prediction}</h2>
                <p>
                  {selectedPrediction.entityType} · {selectedPrediction.entityId}
                </p>
              </div>
              <button
                className="icon-button"
                onClick={() => setSelectedPrediction(null)}
              >
                ×
              </button>
            </div>
            <div className="profile-body">
              <div className="model-status-row">
                <Badge tone="amber">{selectedPrediction.status}</Badge>
                <Badge
                  tone={
                    selectedPrediction.riskLevel === "High"
                      ? "red"
                      : "amber"
                  }
                >
                  {selectedPrediction.riskLevel} {tr("Risk")}
                </Badge>
                <Badge tone="blue">
                  {Math.round(selectedPrediction.confidence * 100)}%{" "}
                  {tr("Confidence")}
                </Badge>
              </div>
              <div className="detail-grid">
                {[
                  ["Model", selectedPrediction.modelId],
                  ["Model version", selectedPrediction.modelVersion],
                  ["Source module", selectedPrediction.sourceModule || "—"],
                  ["Prediction type", selectedPrediction.predictionType || "—"],
                  ["Input reference", selectedPrediction.inputReference || "—"],
                  ["Processing time", `${selectedPrediction.processingTime || 0} ms`],
                  ["Review status", selectedPrediction.reviewStatus || "Pending"],
                  ["Created", selectedPrediction.createdAt],
                ].map(([a, b]) => (
                  <div key={a}>
                    <span>{tr(a)}</span>
                    <strong>{b}</strong>
                  </div>
                ))}
              </div>
              <h3>{tr("Explanation")}</h3>
              <p className="model-description">{selectedPrediction.explanation}</p>
              <div className="insight-action">
                <span>{tr("Recommended action")}</span>
                <strong>{selectedPrediction.recommendedAction}</strong>
              </div>
              <div className="action-grid">
                <button>{tr("Mark reviewed")}</button>
                <button>{tr("Provide feedback")}</button>
                <button onClick={() => setSelectedPrediction(null)}>
                  {tr("Close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AICenterView;
