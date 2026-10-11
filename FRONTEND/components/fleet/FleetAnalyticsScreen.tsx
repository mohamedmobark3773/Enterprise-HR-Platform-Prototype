"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { FleetNav } from "@/components/fleet/FleetNav";
import { FleetInsight } from "@/components/fleet/FleetInsight";
import type { FleetAnalyticsConfig } from "@/lib/fleet/fleet-types";

const toneFor = (value: string): string => {
  const v = value.toLowerCase();
  if (/(healthy|ready|normal|falling|low|stable)/.test(v)) return "green";
  if (/(watch|monitor|review|rising|medium)/.test(v)) return "amber";
  if (/(failed|critical|high|overdue)/.test(v)) return "red";
  return "neutral";
};

export function FleetAnalyticsScreen({ config }: { config: FleetAnalyticsConfig }) {
  const { tr } = useApp();
  return (
    <>
      <FleetNav />
      <PageTitle
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.subtitle}
        actions={
          <button className="secondary-button" type="button">
            <Icon name="download" /> {tr(config.action)}
          </button>
        }
      />

      <div className="finance-metric-grid fleet-metric-grid">
        {config.kpis.map((kpi) => (
          <div className="finance-metric" key={kpi.label}>
            <span className="finance-metric-label">
              {tr(kpi.label)}
              <i />
            </span>
            <strong>{kpi.value}</strong>
            {kpi.detail && <small>{tr(kpi.detail)}</small>}
          </div>
        ))}
      </div>

      <div className="fleet-chart-grid">
        {config.bars.map((bar) => (
          <section className="panel finance-chart" key={bar.title}>
            <div className="panel-head">
              <h2>{tr(bar.title)}</h2>
            </div>
            <div className="bar-list">
              {bar.items.map((item) => (
                <div key={item.label}>
                  <span>{tr(item.label)}</span>
                  <div>
                    <i style={{ width: `${Math.round((item.value / bar.max) * 100)}%` }} />
                  </div>
                  <strong>{item.display}</strong>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="dashboard-grid">
        {config.table && (
          <section className="panel finance-table-panel">
            <div className="panel-head">
              <div>
                <h2>{tr(config.table.title)}</h2>
              </div>
            </div>
            <div className="simple-table">
              <div
                className="tr th"
                style={{ ["--cols" as string]: String(config.table.columns.length) } as React.CSSProperties}
              >
                {config.table.columns.map((c) => (
                  <span key={c}>{tr(c)}</span>
                ))}
              </div>
              {config.table.rows.map((row, i) => (
                <div
                  className="tr"
                  key={i}
                  style={{ ["--cols" as string]: String(config.table?.columns.length ?? 0) } as React.CSSProperties}
                >
                  {row.map((cell, j) => (
                    <span key={j}>
                      {j === row.length - 1 ? <Badge tone={toneFor(cell)}>{tr(cell)}</Badge> : tr(cell)}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}
        <FleetInsight variant="rich" title={config.insight.title} lines={config.insight.lines} action={config.insight.action} />
      </div>
    </>
  );
}

export default FleetAnalyticsScreen;
