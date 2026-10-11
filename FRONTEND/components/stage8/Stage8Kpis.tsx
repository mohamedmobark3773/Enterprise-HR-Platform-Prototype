"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";
import type { Stage8Kpi, Stage8Stat } from "@/lib/stage8/types";

export function Stage8Kpis({ kpis, stats }: { kpis: Stage8Kpi[]; stats?: Stage8Stat[] }) {
  const { tr } = useApp();
  return (
    <div className="stage8-kpi-wrap">
      <div className="stage8-kpi-grid">
        {kpis.map((kpi) => (
          <div className="stage8-kpi" key={kpi.label}>
            <span>{tr(kpi.label)}</span>
            <strong>{kpi.value}</strong>
            {kpi.detail && <small>{tr(kpi.detail)}</small>}
          </div>
        ))}
      </div>
      {stats && stats.length > 0 && (
        <div className="stage8-stat-strip">
          {stats.map((stat) => (
            <div className="stage8-stat" key={stat.label}>
              <span>{tr(stat.label)}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Stage8Kpis;
