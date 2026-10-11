"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";

export interface ChartSeries {
  name: string;
  values: number[];
  tone?: string;
}

export interface ChartProps {
  series: ChartSeries[];
  labels?: string[];
  height?: number;
  className?: string;
}

// Reusable SVG chart abstraction. Phase 0 decision: no chart library installed;
// Sparkline/CSS chart panels remain the baseline until a library decision is finalized.
export function AreaChart({ series, labels = [], height = 215, className = "" }: ChartProps) {
  const { tr } = useApp();
  const max = Math.max(1, ...series.flatMap((s) => s.values));
  return (
    <div className={`chart-area ${className}`} style={{ height }}>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        {series.map((s, i) => {
          const pts = s.values.map((v, j) => `${(j / Math.max(1, s.values.length - 1)) * 100},${40 - (v / max) * 38}`).join(" ");
          return <polyline key={i} points={pts} fill="none" stroke="currentColor" strokeWidth="1.5" />;
        })}
      </svg>
      {labels.length > 0 && (
        <div className="x-labels">
          {labels.map((l) => (
            <span key={l}>{tr(l)}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default AreaChart;
