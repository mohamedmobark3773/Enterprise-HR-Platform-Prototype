"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { FleetBarChart } from "@/components/fleet/FleetBarChart";
import { FleetInsight } from "@/components/fleet/FleetInsight";
import type { FleetDashboardConfig } from "@/lib/fleet/fleet-types";

export function FleetDashboardScreen({ config }: { config: FleetDashboardConfig }) {
  const { tr } = useApp();
  return (
    <>
      <PageTitle
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.subtitle}
        actions={
          <button className="secondary-button" type="button">
            <Icon name="plus" /> {tr(config.action)}
          </button>
        }
      />

      {config.banner && (
        <section className="panel fleet-banner">
          <div>
            <span>{tr(config.banner.label)}</span>
            <strong>{config.banner.value}</strong>
            <small>{tr(config.banner.detail)}</small>
          </div>
        </section>
      )}

      <section className="panel inventory-kpi-panel">
        <div className="inventory-kpi-grid inventory-kpi-grid-5 fleet-kpi-grid-5">
          {config.kpis.map((kpi) => (
            <div className="inventory-kpi" key={kpi.label}>
              <span>{tr(kpi.label)}</span>
              <strong>{kpi.value}</strong>
              {kpi.detail && <small>{tr(kpi.detail)}</small>}
            </div>
          ))}
        </div>
      </section>

      <div className="fleet-chart-grid">
        {config.charts.map((chart) => (
          <FleetBarChart key={chart.title} title={chart.title} labels={chart.labels} values={chart.values} />
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="fleet-panel-stack">
          {config.panels.map((panel) => (
            <section className="panel finance-list-panel" key={panel.title}>
              <div className="panel-head">
                <div>
                  <h2>{tr(panel.title)}</h2>
                  {panel.meta && <p>{tr(panel.meta)}</p>}
                </div>
                {panel.action && (
                  <button className="text-button" type="button">
                    {tr(panel.action)}
                  </button>
                )}
              </div>
              {panel.rows.map((row, i) => (
                <div className="finance-list-row" key={i}>
                  <span>
                    <strong>{tr(row.label)}</strong>
                    <small>{tr(row.value)}</small>
                  </span>
                  <Badge tone={row.tone}>{tr(row.status)}</Badge>
                </div>
              ))}
            </section>
          ))}
        </div>
        <FleetInsight variant="rich" title={config.insight.title} lines={config.insight.lines} action={config.insight.action} />
      </div>
    </>
  );
}

export default FleetDashboardScreen;
