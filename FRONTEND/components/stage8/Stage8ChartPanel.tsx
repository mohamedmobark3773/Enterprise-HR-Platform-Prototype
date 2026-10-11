"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";
import type { Stage8Chart, Stage8Tone } from "@/lib/stage8/types";

const TONE_STROKE: Record<Stage8Tone, string> = {
  green: "var(--tone-green)",
  red: "var(--tone-red)",
  amber: "var(--tone-amber)",
  violet: "var(--tone-violet)",
  blue: "var(--tone-blue)",
  neutral: "var(--tone-neutral)",
};

export function Stage8ChartPanel({ chart, className = "" }: { chart: Stage8Chart; className?: string }) {
  const { tr } = useApp();
  const max = Math.max(1, ...chart.series.flatMap((series) => series.values));

  return (
    <section className={`stage8-chart-panel ${className}`} aria-label={tr(chart.title)}>
      <header className="stage8-chart-head">
        <h3>{tr(chart.title)}</h3>
        <span className="stage8-chart-legend">
          {chart.series.map((series) => (
            <em key={series.name} style={{ color: TONE_STROKE[series.tone ?? "blue"] }}>
              <i style={{ background: TONE_STROKE[series.tone ?? "blue"] }} />
              {tr(series.name)}
            </em>
          ))}
        </span>
      </header>
      {chart.kind === "bars" ? (
        <div className="stage8-bars" style={{ ["--cols" as string]: chart.labels.length }}>
          {chart.labels.map((label, index) => {
            const series = chart.series[0];
            const value = series?.values[index] ?? 0;
            const height = Math.max(4, Math.round((value / max) * 100));
            return (
              <div className="stage8-bar-col" key={label}>
                <div
                  className="stage8-bar"
                  style={{ height: `${height}%`, background: TONE_STROKE[series?.tone ?? "blue"] }}
                />
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="stage8-lines">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" role="img" aria-hidden="true">
            <line x1="0" y1="40" x2="100" y2="40" stroke="var(--border)" strokeWidth="0.5" />
            {chart.series.map((series) => {
              const points = series.values
                .map((value, index) => {
                  const x = (index / Math.max(1, series.values.length - 1)) * 100;
                  const y = 38 - (value / max) * 34;
                  return `${x},${y}`;
                })
                .join(" ");
              return (
                <polyline
                  key={series.name}
                  points={points}
                  fill="none"
                  stroke={TONE_STROKE[series.tone ?? "blue"]}
                  strokeWidth="1.6"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>
          <div className="stage8-line-labels">
            {chart.labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      )}
      {chart.footnote && <p className="stage8-chart-foot">{tr(chart.footnote)}</p>}
    </section>
  );
}

export default Stage8ChartPanel;
