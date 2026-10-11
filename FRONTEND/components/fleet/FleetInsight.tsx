"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";

export interface FleetInsightProps {
  variant: "compact" | "rich";
  title: string;
  lines: string[];
  action?: string;
}

export function FleetInsight({ variant, title, lines, action }: FleetInsightProps) {
  const { tr } = useApp();
  return (
    <section className={`panel ${variant === "rich" ? "inventory-insight fleet-insight-rich" : "inventory-insight"}`}>
      <div className="panel-head">
        <div>
          <h2>{tr(title)}</h2>
        </div>
      </div>
      <div className="inventory-insight-body">
        {lines.map((line, i) => (
          <p key={i} className={i === 0 && variant === "rich" ? "inventory-insight-intro" : undefined}>
            {tr(line)}
          </p>
        ))}
        {action && (
          <button className="text-button" type="button">
            {tr(action)}
          </button>
        )}
      </div>
    </section>
  );
}

export default FleetInsight;
