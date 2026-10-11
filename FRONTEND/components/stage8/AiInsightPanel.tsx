"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { stage8Tone } from "@/lib/stage8/format";
import type { Stage8AiInsight } from "@/lib/stage8/types";

export interface AiInsightPanelProps {
  insight: Stage8AiInsight;
  title?: string;
  lines?: string[];
  variant?: "compact" | "rich";
  onReview?: () => void;
}

export function AiInsightPanel({
  insight,
  title = "AI insight",
  lines,
  variant = "rich",
  onReview,
}: AiInsightPanelProps) {
  const { tr } = useApp();
  const [decision, setDecision] = useState<string | null>(null);
  const confidence = `${(insight.confidence * 100).toFixed(1)}%`;

  return (
    <section className={`stage8-ai-panel ${variant}`} aria-label={tr(title)}>
      <header className="stage8-ai-head">
        <div>
          <div className="stage8-ai-eyebrow">
            <Icon name="spark" size={14} /> {tr(title)}
          </div>
          <p className="stage8-ai-context">{tr(insight.contextLabel)}</p>
        </div>
        <Badge tone="violet">{tr("Demo output")}</Badge>
      </header>

      <div className="stage8-ai-body">
        <p className="stage8-ai-headline">{tr(insight.headline)}</p>
        <p className="stage8-ai-summary">{tr(insight.summary)}</p>

        <div className="stage8-ai-row">
          <span>{tr("Confidence")}</span>
          <strong>{confidence}</strong>
        </div>
        <div className="stage8-ai-meter" aria-hidden="true">
          <i style={{ width: confidence }} />
        </div>

        <div className="stage8-ai-meta">
          <span>{tr("Risk")}</span>
          <Badge tone={stage8Tone(insight.riskLevel)}>{tr(insight.riskLevel)}</Badge>
          <span>{tr("Status")}</span>
          <Badge tone={stage8Tone(insight.statusLabel)}>{tr(insight.statusLabel)}</Badge>
        </div>

        {variant === "rich" && (
          <p className="stage8-ai-explanation">
            <strong>{tr("Explanation")}: </strong>
            {tr(insight.explanation)}
          </p>
        )}

        <p className="stage8-ai-action">
          <strong>{tr("Recommended action")}: </strong>
          {tr(insight.recommendedAction)}
        </p>

        {lines && lines.length > 0 && (
          <ul className="stage8-ai-lines">
            {lines.map((line) => (
              <li key={line}>{tr(line)}</li>
            ))}
          </ul>
        )}

        <p className="stage8-ai-prov">
          {insight.modelId} · v{insight.modelVersion} · {tr("Not connected to a live model")}
        </p>

        <div className="stage8-ai-actions">
          <button
            type="button"
            className="stage8-primary"
            onClick={() => {
              setDecision("Reviewed");
              onReview?.();
            }}
          >
            {tr("Review")}
          </button>
          <button type="button" className="stage8-tool" onClick={() => setDecision("Accepted")}>
            {tr("Accept")}
          </button>
          <button type="button" className="stage8-tool" onClick={() => setDecision("Dismissed")}>
            {tr("Dismiss")}
          </button>
        </div>
        {decision && (
          <p className="stage8-ai-decision" role="status">
            {tr("Recorded locally")}: {tr(decision)} · {tr("No backend submission")}
          </p>
        )}
      </div>
    </section>
  );
}

export default AiInsightPanel;
