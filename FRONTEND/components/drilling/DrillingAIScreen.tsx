"use client";

import React, { useMemo, useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { LoadingState } from "@/components/ui/Feedback";
import { FleetBarChart } from "@/components/fleet/FleetBarChart";
import { useApp } from "@/lib/context/AppContext";
import { DrillingNav } from "@/components/drilling/DrillingNav";
import {
  drillingTone,
} from "@/lib/drilling/drilling-utils";
import {
  getCapability,
  isAiEndpointConfigured,
  runDrillingPrediction,
  type AICapabilityId,
  type AIPredictionOutcome,
  type AIPredictionResult,
} from "@/lib/drilling/drilling-ai";
import type { DrillingValue } from "@/types/drilling";

interface HistoryEntry {
  headline: string;
  confidence: number;
  riskLevel: string;
  provenance: string;
}

function defaultInputs(
  capability: ReturnType<typeof getCapability>
): Record<string, DrillingValue> {
  const values: Record<string, DrillingValue> = {};
  capability.inputs.forEach((field) => {
    if (field.type === "select") values[field.key] = field.options?.[0] ?? "";
    else if (field.type === "number") values[field.key] = field.min ?? 0;
    else values[field.key] = "";
  });
  return values;
}

export function DrillingAIScreen({ capabilityId }: { capabilityId: AICapabilityId }) {
  const { tr } = useApp();
  const capability = useMemo(() => getCapability(capabilityId), [capabilityId]);
  const [values, setValues] = useState<Record<string, DrillingValue>>(() => defaultInputs(capability));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<AIPredictionResult | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [elapsed, setElapsed] = useState<number | null>(null);

  const connected = isAiEndpointConfigured();

  const change = (key: string, value: DrillingValue) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const run = async () => {
    setRunning(true);
    setFailure(null);
    const started = performance.now();
    const outcome: AIPredictionOutcome = await runDrillingPrediction({
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
    } else if (outcome.status === "timeout") {
      setFailure(tr(outcome.message));
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
      <DrillingNav />
      <PageTitle
        eyebrow="Stage 6 · Drilling AI"
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
            <small>{tr("NEXT_PUBLIC_DRILLING_AI_URL")}</small>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Provenance")}</span>
            <strong>{result ? (result.provenance === "live" ? tr("Live model") : tr("Demo result")) : tr("Not run yet")}</strong>
            <small>{elapsed !== null ? `${elapsed} ms` : tr("Awaiting input")}</small>
          </div>
        </div>
      </section>

      <div className="inventory-workspace">
        <section className="panel drilling-ai-form">
          <div className="panel-head">
            <div>
              <h2>{tr("Prediction inputs")}</h2>
              <p>{tr(capability.purpose)}</p>
            </div>
          </div>
          <div className="form-grid drilling-form-grid">
            {capability.inputs.map((field) => {
              const value = values[field.key] ?? "";
              const error = errors[field.key];
              return (
                <label key={field.key}>
                  <span>
                    {tr(field.label)}
                    {field.unit && <em className="drilling-unit"> ({tr(field.unit)})</em>}
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
                  {error && <small className="drilling-field-error">{tr(error)}</small>}
                </label>
              );
            })}
          </div>
          <div className="drilling-ai-run">
            <button className="primary-button" type="button" onClick={run} disabled={running}>
              <Icon name="spark" size={15} /> {running ? tr("Running…") : tr("Run prediction")}
            </button>
            <small>{tr("Inputs are validated before the request is sent.")}</small>
          </div>
        </section>

        <div className="fleet-side">
          <section className="panel drilling-ai-result">
            <div className="panel-head">
              <div>
                <h2>{tr("Prediction result")}</h2>
                <p>
                  {result
                    ? `${new Date(result.computedAt).toLocaleString("en-US")} · ${result.processingTimeMs} ms`
                    : tr("Run the model to see a result")}
                </p>
              </div>
              {result && (
                <Badge tone={drillingTone(result.riskLevel)}>{`${tr("Risk")} ${tr(result.riskLevel)}`}</Badge>
              )}
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
              <div className="drilling-ai-body">
                <strong className="drilling-ai-headline">{tr(result.headline)}</strong>
                <div className="drilling-ai-conf">
                  <span>{tr("Confidence")}</span>
                  <div className="drilling-meter" role="img" aria-label={`${Math.round(result.confidence * 100)}%`}>
                    <i style={{ width: `${Math.round(result.confidence * 100)}%` }} />
                  </div>
                  <em>{`${Math.round(result.confidence * 100)}%`}</em>
                </div>

                <div className="drilling-ai-metrics">
                  {result.metrics.map((metric) => (
                    <div key={metric.label}>
                      <span>{tr(metric.label)}</span>
                      <strong>{tr(metric.value)}</strong>
                      <Badge tone={metric.tone}>{tr(metric.label)}</Badge>
                    </div>
                  ))}
                </div>

                {result.series && (
                  <FleetBarChart
                    title={capability.chartTitle}
                    labels={result.series.labels}
                    values={result.series.values}
                  />
                )}

                <div className="prediction-explanation">
                  <strong>{tr("Why")}</strong>
                  <p>{tr(result.explanation)}</p>
                  <strong>{tr("Recommended action")}</strong>
                  <p>{tr(result.recommendation)}</p>
                </div>

                <p className="drilling-ai-provenance">
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

          <section className="panel drilling-ai-history">
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
              <div className="drilling-history-list">
                {history.map((entry, index) => (
                  <div key={`${entry.headline}-${index}`}>
                    <Badge tone={drillingTone(entry.riskLevel)}>{tr(entry.riskLevel)}</Badge>
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

export default DrillingAIScreen;
