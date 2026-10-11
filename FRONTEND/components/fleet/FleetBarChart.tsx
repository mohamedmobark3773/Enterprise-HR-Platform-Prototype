"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";

export interface FleetBarChartProps {
  title: string;
  labels: string[];
  values: number[];
}

export function FleetBarChart({ title, labels, values }: FleetBarChartProps) {
  const { tr } = useApp();
  const max = Math.max(1, ...values);
  return (
    <section className="panel fleet-chart">
      <div className="panel-head">
        <h2>{tr(title)}</h2>
      </div>
      <div className="fleet-bars">
        {values.map((v, i) => (
          <div className="fleet-bar-col" key={`${labels[i]}-${i}`}>
            <div className="fleet-bar" style={{ height: `${Math.max(8, (v / max) * 100)}%` }} />
            <span>{labels[i]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FleetBarChart;
