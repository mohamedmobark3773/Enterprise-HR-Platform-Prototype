"use client";

import React, { useMemo, useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { LoadingState } from "@/components/ui/Feedback";
import { FleetBarChart } from "@/components/fleet/FleetBarChart";
import { useApp } from "@/lib/context/AppContext";
import { ProjectsNav } from "@/components/projects/ProjectsNav";
import { projectTone } from "@/lib/projects/projects-utils";
import {
  getProjectCapability,
  isProjectAiEndpointConfigured,
  runProjectPrediction,
  type ProjectAICapabilityId,
  type ProjectAIPredictionOutcome,
  type ProjectAIPredictionResult,
} from "@/lib/projects/projects-ai";
import type { ProjectValue } from "@/types/projects";

interface HistoryEntry {
  headline: string;
  confidence: number;
  riskLevel: string;
  provenance: string;
}

function defaultInputs(capability: ReturnType<typeof getProjectCapability>): Record<string, ProjectValue> {
  const values: Record<string, ProjectValue> = {};
  capability.inputs.forEach((field) => {
    if (field.type === "select") values[field.key] = field.options?.[0] ?? "";
    else if (field.type === "number") values[field.key] = field.min ?? 0;
    else values[field.key] = "";
  });
  return values;
}

export function ProjectsAIScreen({ capabilityId }: { capabilityId: ProjectAICapabilityId }) {
  const { tr } = useApp();
  const capability = useMemo(() => getProjectCapability(capabilityId), [capabilityId]);
  const [values, setValues] = useState<Record<string, ProjectValue>>(() => defaultInputs(capability));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<ProjectAIPredictionResult | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [elapsed, setElapsed] = useState<number | null>(null);

  const connected = isProjectAiEndpointConfigured();

  const change = (key: string, value: ProjectValue) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const run = async () => {
    setRunning(true);
    setFailure(null);
    const started = performance.now();
    const outcome: ProjectAIPredictionOutcome = await runProjectPrediction({
      capability: capabilityId,
      inputs: values,
    });
    setElapsed(Math.round(performance.now() - started));

    if (outcome.status === "invalid") {
      setErrors(outcome.errors);
      setResult(null);
      setFailure(tr("Some inputs need attention before the prediction can run."));
    } else if (outcome.status === "success") {
      setErrors({});
      setResult(outcome.result);
      setHistory((current) =>
        [
          {
            headline: outcome.result.headline,
            confidence: outcome.result.confidence,
            riskLevel: outcome.result.riskLevel,
            provenance: outcome.result.provenance,
          },
          ...current,
        ].slice(0, 6)
      );
    } else {
      setFailure(tr(outcome.message));
    }
    setRunning(false);
  };

  const reset = () => {
    setValues(defaultInputs(capability));
    setErrors({});
    setResult(null);
    setFailure(null);
  };

  return (
    <>
      <ProjectsNav />
      <PageTitle
        eyebrow="Stage 7 · Projects AI"
        title={capability.title}
        subtitle={capability.subtitle}
        actions={
          <>
            <button className="secondary-button" type="button" onClick={reset}>
              {tr("Reset inputs")}
            </button>
            <button className="primary-button" type="button" onClick={run} disabled={running}>
              <Icon name="spark" size={15} /> {running ? tr("Running…") : tr("Run prediction")}
            </button>
          </>
        }
      />

      <section className="panel inventory-kpi-panel">
        <div className="inventory-kpi-grid">
          <div className="inventory-kpi">
            <span>{tr("Model")}</span>
            <strong>{capability.modelName}</strong>
            <small>{capability.modelId}</small>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Version")}</span>
            <strong>{capability.modelVersion}</strong>
            <small>{tr("Static build label")}</small>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Endpoint")}</span>
            <strong>{connected ? tr("Configured") : tr("Not connected")}</strong>
            <small>{tr("NEXT_PUBLIC_PROJECTS_AI_URL")}</small>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Provenance")}</span>
            <strong>{result ? (result.provenance === "live" ? tr("Live model") : tr("Demo result")) : tr("Not run yet")}</strong>
            <small>{elapsed !== null ? `${elapsed} ms` : tr("Awaiting input")}</small>
          </div>
        </div>
      </section>

      <div className="inventory-workspace">
        <section className="panel projects-ai-form">
          <div className="panel-head">
            <div>
              <h2>{tr("Prediction inputs")}</h2>
              <p>{tr(capability.purpose)}</p>
            </div>
          </div>
          <div className="form-grid projects-form-grid">
            {capability.inputs.map((field) => {
              const value = values[field.key] ?? "";
              const error = errors[field.key];
              return (
                <label key={field.key}>
                  <span>
                    {tr(field.label)}
                    {field.unit && <em className="projects-unit"> ({tr(field.unit)})</em>}
                  </span>
                  {field.type === "select" ? (
                    <select value={String(value)} onChange={(e) => change(field.key, e.target.value)}>
                      {(field.options ?? []).map((option) => (
                        <option key={option} value={option}>
                          {tr(option)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="number"
                      value={String(value)}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      onChange={(e) => change(field.key, e.target.value)}
                      aria-invalid={error ? true : undefined}
                    />
                  )}
                  {error && <small className="projects-field-error">{tr(error)}</small>}
                </label>
              );
            })}
          </div>
          <div className="projects-ai-run">
            <button className="primary-button" type="button" onClick={run} disabled={running}>
              <Icon name="spark" size={15} /> {running ? tr("Running…") : tr("Run prediction")}
            </button>
            <small>{tr("Inputs are validated before the request is sent.")}</small>
          </div>
        </section>

        <div className="fleet-side">
          <section className="panel projects-ai-result">
            <div className="panel-head">
              <div>
                <h2>{tr("Prediction result")}</h2>
                <p>
                  {result
                    ? `${new Date(result.computedAt).toLocaleString("en-US")} · ${result.processingTimeMs} ms`
                    : tr("Run the model to see a result")}
                </p>
              </div>
              {result && <Badge tone={projectTone(result.riskLevel)}>{`${tr("Risk")} ${tr(result.riskLevel)}`}</Badge>}
            </div>

            {running ? (
              <LoadingState label="Computing prediction…" />
            ) : failure ? (
              <div className="empty-state">
                <Icon name="shield" size={26} />
                <h3>{tr("Prediction unavailable")}</h3>
                <p>{failure}</p>
                <button className="secondary-button" type="button" onClick={run}>
                  {tr("Try again")}
                </button>
              </div>
            ) : !result ? (
              <div className="empty-state">
                <Icon name="spark" size={26} />
                <h3>{tr("No prediction yet")}</h3>
                <p>{tr("Fill in the inputs and run the model to generate a labelled result.")}</p>
              </div>
            ) : (
              <div className="projects-ai-body">
                <strong className="projects-ai-headline">{tr(result.headline)}</strong>
                <div className="projects-ai-conf">
                  <span>{tr("Confidence")}</span>
                  <div className="projects-meter" role="img" aria-label={`${Math.round(result.confidence * 100)}%`}>
                    <i style={{ width: `${Math.round(result.confidence * 100)}%` }} />
                  </div>
                  <em>{`${Math.round(result.confidence * 100)}%`}</em>
                </div>

                <div className="projects-ai-metrics">
                  {result.metrics.map((metric) => (
                    <div key={metric.label}>
                      <span>{tr(metric.label)}</span>
                      <strong>{tr(metric.value)}</strong>
                      <Badge tone={metric.tone}>{tr(metric.label)}</Badge>
                    </div>
                  ))}
                </div>

                {result.series && (
                  <FleetBarChart title={capability.chartTitle} labels={result.series.labels} values={result.series.values} />
                )}

                <div className="prediction-explanation">
                  <strong>{tr("Why")}</strong>
                  <p>{tr(result.explanation)}</p>
                  <strong>{tr("Recommended action")}</strong>
                  <p>{tr(result.recommendation)}</p>
                </div>

                <p className="projects-ai-provenance">
                  <Badge tone={result.provenance === "live" ? "green" : "amber"}>
                    {result.provenance === "live" ? tr("Live model output") : tr("Demo output")}
                  </Badge>{" "}
                  {result.provenance === "live"
                    ? tr("Computed by the connected prediction service.")
                    : tr("No prediction service is connected, so this result is a labelled demonstration computation.")}
                </p>
              </div>
            )}
          </section>

          <section className="panel projects-ai-history">
            <div className="panel-head">
              <div>
                <h2>{tr("Run history")}</h2>
                <p>{`${history.length} ${tr("runs this session")}`}</p>
              </div>
            </div>
            {history.length === 0 ? (
              <div className="empty-state">
                <p>{tr("Predictions you run will be listed here.")}</p>
              </div>
            ) : (
              <div className="projects-history-list">
                {history.map((entry, index) => (
                  <div key={`${entry.headline}-${index}`}>
                    <Badge tone={projectTone(entry.riskLevel)}>{tr(entry.riskLevel)}</Badge>
                    <span>
                      <strong>{tr(entry.headline)}</strong>
                      <small>{`${Math.round(entry.confidence * 100)}% · ${tr(entry.provenance === "live" ? "Live" : "Demo")}`}</small>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default ProjectsAIScreen;
