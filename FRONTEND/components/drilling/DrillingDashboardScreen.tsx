"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { LoadingState } from "@/components/ui/Feedback";
import { FleetBarChart } from "@/components/fleet/FleetBarChart";
import { FleetInsight } from "@/components/fleet/FleetInsight";
import { useApp } from "@/lib/context/AppContext";
import { averageBy, countWhere, drillingTone, sumBy } from "@/lib/drilling/drilling-utils";
import { formatUsd, listRows, type DrillingSeedKey } from "@/lib/drilling/drilling-service";
import type { DrillingRow } from "@/types/drilling";

interface DashboardData {
  wells: DrillingRow[];
  rigs: DrillingRow[];
  dailyReports: DrillingRow[];
  npt: DrillingRow[];
  hse: DrillingRow[];
  costs: DrillingRow[];
}

const overviewKeys: DrillingSeedKey[] = ["wells", "rigs", "daily-reports", "npt", "hse", "costs"];

async function loadOverview(): Promise<DashboardData> {
  const [wells, rigs, dailyReports, npt, hse, costs] = await Promise.all(
    overviewKeys.map((key) => listRows(key))
  );
  return { wells, rigs, dailyReports, npt, hse, costs } as DashboardData;
}

export function DrillingDashboardScreen() {
  const { tr } = useApp();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    let alive = true;
    void loadOverview().then((result) => {
      if (alive) setData(result);
    });
    return () => {
      alive = false;
    };
  }, []);

  const activeWells = data ? countWhere(data.wells, (row) => row.status === "Drilling") : 0;
  const rigsOperating = data ? countWhere(data.rigs, (row) => row.status === "Operating") : 0;
  const approved = data ? sumBy(data.costs, "approved") : 0;
  const actual = data ? sumBy(data.costs, "actual") : 0;

  const kpis = [
    { label: "Wells drilling", value: data ? String(activeWells) : "—" },
    { label: "Footage drilled", value: data ? `${sumBy(data.wells, "currentDepth").toLocaleString("en-US")} m` : "—" },
    { label: "Rigs operating", value: data ? `${rigsOperating}/${data.rigs.length}` : "—" },
    { label: "Average ROP", value: data ? `${averageBy(data.wells, "rop").toFixed(1)} m/h` : "—" },
    { label: "NPT hours", value: data ? `${sumBy(data.npt, "duration").toFixed(0)} h` : "—" },
    { label: "AFE variance", value: data ? formatUsd(actual - approved) : "—" },
  ];

  const depthChart = data
    ? {
        title: "Depth progress by well",
        labels: data.wells.slice(0, 7).map((row) => String(row.name).slice(0, 10)),
        values: data.wells.slice(0, 7).map((row) => {
          const target = Number(row.targetDepth) || 1;
          return Math.round(((Number(row.currentDepth) || 0) / target) * 100);
        }),
      }
    : null;

  const nptChart = data
    ? {
        title: "NPT hours by event",
        labels: data.npt.slice(0, 7).map((row) => String(row.id)),
        values: data.npt.slice(0, 7).map((row) => Number(row.duration) || 0),
      }
    : null;

  const recentReports = (data?.dailyReports ?? []).slice(0, 5);

  return (
    <>
      <PageTitle
        eyebrow="Stage 6 · Drilling"
        title="Drilling overview"
        subtitle="Portfolio position across wells, rigs, daily execution and cost"
        actions={
          <Link className="primary-button" href="/drilling/ai/performance">
            <Icon name="spark" size={15} /> {tr("Run AI prediction")}
          </Link>
        }
      />

      <section className="panel inventory-kpi-panel">
        <div className="inventory-kpi-grid inventory-kpi-grid-5">
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
          <LoadingState label="Loading drilling overview…" />
        </section>
      ) : (
        <>
          <div className="inventory-workspace">
            <section className="panel drilling-table-panel">
              <div className="panel-head">
                <div>
                  <h2>{tr("Active wells")}</h2>
                  <p>{`${data.wells.length} ${tr("wells")} · ${tr("Demo data")}`}</p>
                </div>
                <Link className="text-button" href="/drilling/wells">
                  {tr("Open wells")}
                </Link>
              </div>
              <div className="drilling-table-scroll" role="region" aria-label={tr("Active wells")} tabIndex={0}>
                <div className="drilling-table" style={{ ["--drill-cols" as string]: "7" }}>
                  <div className="drilling-row drilling-head" role="row">
                    <span>{tr("Well")}</span>
                    <span>{tr("Rig")}</span>
                    <span>{tr("Status")}</span>
                    <span>{tr("Depth")}</span>
                    <span>{tr("ROP")}</span>
                    <span>{tr("Risk")}</span>
                    <span>{tr("Actions")}</span>
                  </div>
                  {data.wells.slice(0, 6).map((well) => (
                    <div className="drilling-row" role="row" key={String(well.id)}>
                      <span data-label={tr("Well")}>
                        <strong>{tr(String(well.name))}</strong>
                        <small>{String(well.id)}</small>
                      </span>
                      <span data-label={tr("Rig")}>{tr(String(well.rig))}</span>
                      <span data-label={tr("Status")}>
                        <Badge tone={drillingTone(String(well.status))}>{tr(String(well.status))}</Badge>
                      </span>
                      <span data-label={tr("Depth")}>{`${Number(well.currentDepth).toLocaleString("en-US")} m`}</span>
                      <span data-label={tr("ROP")}>{`${Number(well.rop).toFixed(1)} m/h`}</span>
                      <span data-label={tr("Risk")}>
                        <Badge tone={drillingTone(String(well.risk))}>{tr(String(well.risk))}</Badge>
                      </span>
                      <span className="drilling-row-actions" data-label={tr("Actions")}>
                        <Link className="drilling-action-link" href={`/drilling/wells/${well.id}`}>
                          {tr("View")}
                        </Link>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="fleet-side">
              {depthChart && <FleetBarChart title={depthChart.title} labels={depthChart.labels} values={depthChart.values} />}
              <FleetInsight
                variant="compact"
                title="Portfolio insight"
                lines={[
                  `${activeWells} wells are drilling and ${rigsOperating} rigs are operating now.`,
                  `${countWhere(data.hse, (row) => row.status !== "Closed")} HSE items remain open.`,
                  `AFE variance stands at ${formatUsd(actual - approved)} against approved funding.`,
                ]}
                action="Open performance"
              />
            </div>
          </div>

          <div className="inventory-workspace">
            <section className="panel drilling-table-panel">
              <div className="panel-head">
                <div>
                  <h2>{tr("Latest daily reports")}</h2>
                  <p>{tr("Most recent tour records")}</p>
                </div>
                <Link className="text-button" href="/drilling/daily-reports">
                  {tr("Open reports")}
                </Link>
              </div>
              <div className="drilling-table-scroll" role="region" aria-label={tr("Latest daily reports")} tabIndex={0}>
                <div className="drilling-table" style={{ ["--drill-cols" as string]: "6" }}>
                  <div className="drilling-row drilling-head" role="row">
                    <span>{tr("Report")}</span>
                    <span>{tr("Date")}</span>
                    <span>{tr("Well")}</span>
                    <span>{tr("Operation")}</span>
                    <span>{tr("NPT")}</span>
                    <span>{tr("Status")}</span>
                  </div>
                  {recentReports.map((report) => (
                    <div className="drilling-row" role="row" key={String(report.id)}>
                      <span data-label={tr("Report")}>{String(report.id)}</span>
                      <span data-label={tr("Date")}>{String(report.date)}</span>
                      <span data-label={tr("Well")}>{tr(String(report.well))}</span>
                      <span data-label={tr("Operation")}>{tr(String(report.operation))}</span>
                      <span data-label={tr("NPT")}>{`${Number(report.nptHours)} h`}</span>
                      <span data-label={tr("Status")}>
                        <Badge tone={drillingTone(String(report.status))}>{tr(String(report.status))}</Badge>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {nptChart && (
              <div className="fleet-side">
                <FleetBarChart title={nptChart.title} labels={nptChart.labels} values={nptChart.values} />
                <FleetInsight
                  variant="compact"
                  title="Execution insight"
                  lines={[
                    `${data.dailyReports.length} daily reports recorded for the portfolio.`,
                    `Total NPT logged: ${sumBy(data.npt, "duration").toFixed(1)} hours.`,
                    "Open events are tracked on the NPT and events screen.",
                  ]}
                  action="Open NPT"
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default DrillingDashboardScreen;
