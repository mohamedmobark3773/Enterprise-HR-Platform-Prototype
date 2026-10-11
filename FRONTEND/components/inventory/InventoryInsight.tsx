"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";

export interface InventoryInsightProps {
  title?: string;
  model?: string;
  prediction?: string;
  confidence?: string;
  basedOn?: string;
  recommended?: string;
  status?: string;
  action?: string;
}

export function InventoryInsight({
  title = "AI Inventory Insight",
  model = "DemandCast v2.4 · UI preview",
  prediction = "74 SKUs below safety stock in 14 days",
  confidence = "91% · Risk: High",
  basedOn = "Based on approved demand, history and current stock.",
  recommended = "Create grouped reorder · 12 suppliers",
  status = "Review",
  action = "Human review required",
}: InventoryInsightProps) {
  const { tr } = useApp();
  return (
    <section className="panel inventory-insight">
      <div className="panel-head">
        <div>
          <h2>{tr(title)}</h2>
        </div>
      </div>
      <div className="inventory-insight-body">
        <p><strong>Model:</strong> {tr(model)}</p>
        <p>Prediction: {tr(prediction)}</p>
        <p>Confidence: {tr(confidence)}</p>
        <p className="inventory-insight-intro">{tr(basedOn)}</p>
        <p>Recommended: {tr(recommended)}</p>
        <p>Status: {tr(status)}</p>
        <button className="text-button" type="button">{tr(action)} →</button>
      </div>
    </section>
  );
}

export default InventoryInsight;
