"use client";

import React, { useEffect, useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { LoadingState } from "@/components/ui/Feedback";
import { FleetBarChart } from "@/components/fleet/FleetBarChart";
import { FleetInsight } from "@/components/fleet/FleetInsight";
import { useApp } from "@/lib/context/AppContext";
import { DrillingNav } from "@/components/drilling/DrillingNav";
import { averageBy, countWhere, drillingTone, sumBy } from "@/lib/drilling/drilling-utils";
import { formatUsd, listRows, type DrillingSeedKey } from "@/lib/drilling/drilling-service";
import type { DrillingRow } from "@/types/drilling";

interface AnalyticsData {
  wells: DrillingRow[];
  rigs: DrillingRow[];
  npt: DrillingRow[];
  reports: DrillingRow[];
}

const analyticsKeys: DrillingSeedKey[] = ["wells", "rigs", "npt", "daily-reports"];

async function loadAnalytics(): Promise<AnalyticsData> {
  const [wells, rigs, npt, reports] = await Promise.all(analyticsKeys.map((key) => listRows(key)));
  return { wells, rigs, npt, reports } as AnalyticsData;
}

export function DrillingAnalyticsScreen() {
  const { tr } = useApp();
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    let alive = true;
    void loadAnalytics().then((result) => {
      if (alive) setData(result);
    });
    return () => {
      alive = false;
    };
  }, []);

  const nptHours = data ? sumBy(data.npt, "duration") : 0;
  const tourHours = data ? Math.max(data.reports.length * 24, 1) : 1;
  const nptShare = data ? Math.round((nptHours / tourHours) * 100) : 0;

  const kpis = [
    { label: "Average ROP", value: data ? `${averageBy(data.wells, "rop").toFixed(1)} m/h` : "—" },
    {
      label: "Footage progress",
      value: data
        ? `${Math.round(
            (sumBy(data.wells, "currentDepth") / Math.max(sumBy(data.wells, "targetDepth"), 1)) * 100
          )}%`
        : "—",
    },
    { label: "NPT share", value: data ? `${nptShare}%` : "—" },
    { label: "Rig utilisation", value: data ? `${averageBy(data.rigs, "utilization").toFixed(0)}%` : "—" },
    { label: "NPT cost impact", value: data ? formatUsd(sumBy(data.npt, "costImpact")) : "—" },
  ];

  const ropChart = data
    ? {
        title: "ROP by well",
        labels: data.wells.map((row) => String(row.name).slice(0, 10)),
        values: data.wells.map((row) => Number(row.rop) || 0),
      }
    : null;

  const utilChart = data
    ? {
        title: "Rig utilisation",
        labels: data.rigs.map((row) => String(row.id)),
        values: data.rigs.map((row) => Number(row.utilization) || 0),
      }
    : null;

  const nptCategories = data
    ? Array.from(new Set(data.npt.map((row) => String(row.category))))
    : [];

  const nptChart = data
    ? {
        title: "NPT hours by category",
        labels: nptCategories,
        values: nptCategories.map((category) =>
          sumBy(
            data.npt.filter((row) => String(row.category) === category),
            "duration"
          )
        ),
      }
    : null;

  return (
    <>
      <DrillingNav />
      <PageTitle
        eyebrow="Stage 6 · Drilling"
        title="Drilling performance"
        subtitle="Portfolio analytics for rate of penetration, utilisation and lost time"
        actions={
          <button
            className="secondary-button"
            type="button"
            onClick={() => window.print()}
          >
            <Icon name="download" size={15} /> {tr("Print view")}
          </button>
        }
      />

      <section className="panel inventory-kpi-panel">
        <div className={kpis.length >= 5 ? "inventory-kpi-grid inventory-kpi-grid-5" : "inventory-kpi-grid"}>
          {kpis.map((kpi) => (
            <div className="inventory-kpi" key={kpi.label}>
              <span>{tr(kpi.label)}</span>
              <strong>{kpi.value}</strong>
            </div>
          ))}
        </div>
      </section>

      {!data ? (
        <section className="panel">
          <LoadingState label="Loading performance data…" />
        </section>
      ) : (
        <>
          <div className="analytics-grid drilling-chart-grid">
            {ropChart && <FleetBarChart title={ropChart.title} labels={ropChart.labels} values={ropChart.values} />}
            {utilChart && <FleetBarChart title={utilChart.title} labels={utilChart.labels} values={utilChart.values} />}
            {nptChart && <FleetBarChart title={nptChart.title} labels={nptChart.labels} values={nptChart.values} />}
          </div>

          <div className="inventory-workspace">
            <section className="panel drilling-table-panel">
              <div className="panel-head">
                <div>
                  <h2>{tr("Plan versus actual by well")}</h2>
                  <p>{`${data.wells.length} ${tr("wells")} · ${tr("Demo data")}`}</p>
                </div>
              </div>
              <div className="drilling-table-scroll" role="region" aria-label={tr("Plan versus actual by well")} tabIndex={0}>
                <div className="drilling-table" style={{ ["--drill-cols" as string]: "7" }}>
                  <div className="drilling-row drilling-head" role="row">
                    <span>{tr("Well")}</span>
                    <span>{tr("Target depth")}</span>
                    <span>{tr("Current depth")}</span>
                    <span>{tr("Progress")}</span>
                    <span>{tr("ROP")}</span>
                    <span>{tr("NPT")}</span>
                    <span>{tr("Status")}</span>
                  </div>
                  {data.wells.map((well) => {
                    const target = Number(well.targetDepth) || 1;
                    const progress = Math.min(100, Math.round(((Number(well.currentDepth) || 0) / target) * 100));
                    return (
                      <div className="drilling-row" role="row" key={String(well.id)}>
                        <span data-label={tr("Well")}>
                          <strong>{tr(String(well.name))}</strong>
                          <small>{String(well.id)}</small>
                        </span>
                        <span data-label={tr("Target depth")}>{`${target.toLocaleString("en-US")} m`}</span>
                        <span data-label={tr("Current depth")}>{`${Number(well.currentDepth).toLocaleString("en-US")} m`}</span>
                        <span data-label={tr("Progress")}>
                          <span className="drilling-progress">
                            <i style={{ width: `${progress}%` }} />
                            <em>{`${progress}%`}</em>
                          </span>
                        </span>
                        <span data-label={tr("ROP")}>{`${Number(well.rop).toFixed(1)} m/h`}</span>
                        <span data-label={tr("NPT")}>{`${Number(well.nptHours)} h`}</span>
                        <span data-label={tr("Status")}>
                          <Badge tone={drillingTone(String(well.status))}>{tr(String(well.status))}</Badge>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <div className="fleet-side">
              <FleetInsight
                variant="rich"
                title="Performance insight"
                lines={[
                  `Average rate of penetration across the portfolio is ${averageBy(data.wells, "rop").toFixed(1)} m/h.`,
                  `${countWhere(data.wells, (row) => Number(row.rop) > 0 && Number(row.rop) < 10)} wells are drilling below 10 m/h and merit a program review.`,
                  `${nptHours.toFixed(1)} NPT hours were logged against ${tourHours} recorded tour hours.`,
                  `Rig utilisation averages ${averageBy(data.rigs, "utilization").toFixed(0)}% across ${data.rigs.length} units.`,
                ]}
                action="Open cost prediction"
              />
              <FleetBarChart
                title="NPT hours by event"
                labels={data.npt.slice(0, 7).map((row) => String(row.id))}
                values={data.npt.slice(0, 7).map((row) => Number(row.duration) || 0)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DrillingAnalyticsScreen;
