"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageTitle } from "@/components/ui/PageTitle";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { EmptyState, LoadingState } from "@/components/ui/Feedback";
import { FleetBarChart } from "@/components/fleet/FleetBarChart";
import { FleetInsight } from "@/components/fleet/FleetInsight";
import { useApp } from "@/lib/context/AppContext";
import { DrillingNav } from "@/components/drilling/DrillingNav";
import { drillingTone, sumBy } from "@/lib/drilling/drilling-utils";
import { formatUsd, listRows, type DrillingSeedKey } from "@/lib/drilling/drilling-service";
import type { DrillingRow } from "@/types/drilling";

interface WellDetailData {
  well: DrillingRow | undefined;
  reports: DrillingRow[];
  surveys: DrillingRow[];
  costs: DrillingRow[];
  npt: DrillingRow[];
}

const relatedKeys: DrillingSeedKey[] = ["wells", "daily-reports", "surveys", "costs", "npt"];

function matchesWell(row: DrillingRow, id: string, name: string): boolean {
  const value = String(row.well ?? "");
  return value === id || value === name || value === name.split("-")[0];
}

export function DrillingWellDetailScreen({ id }: { id: string }) {
  const { tr } = useApp();
  const [data, setData] = useState<WellDetailData | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [wells, reports, surveys, costs, npt] = await Promise.all(
        relatedKeys.map((key) => listRows(key))
      );
      if (!alive) return;
      const well = wells.find((row) => String(row.id) === id);
      const name = String(well?.name ?? "");
      setData({
        well,
        reports: reports.filter((row) => matchesWell(row, id, name)),
        surveys: surveys.filter((row) => matchesWell(row, id, name)),
        costs: costs.filter((row) => matchesWell(row, id, name)),
        npt: npt.filter((row) => matchesWell(row, id, name)),
      });
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  const well = data?.well;

  const depthProgress = useMemo(() => {
    if (!well) return 0;
    const target = Number(well.targetDepth) || 1;
    return Math.min(100, Math.round(((Number(well.currentDepth) || 0) / target) * 100));
  }, [well]);

  if (!data) {
    return (
      <>
        <DrillingNav />
        <section className="panel">
          <LoadingState label="Loading well…" />
        </section>
      </>
    );
  }

  if (!well) {
    return (
      <>
        <DrillingNav />
        <EmptyState
          title="Well not found"
          detail={`No record matches ${id} in the demo register.`}
          action={
            <Link className="primary-button" href="/drilling/wells">
              {tr("Back to wells")}
            </Link>
          }
        />
      </>
    );
  }

  const budget = Number(well.budget) || 0;
  const spent = Number(well.spent) || 0;

  const details: { label: string; value: string }[] = [
    { label: "Well ID", value: String(well.id) },
    { label: "Field", value: String(well.field) },
    { label: "Country", value: String(well.country) },
    { label: "Rig", value: String(well.rig) },
    { label: "Type", value: String(well.type) },
    { label: "Target formation", value: String(well.formation) },
    { label: "Supervisor", value: String(well.supervisor) },
    { label: "Spud date", value: String(well.startDate) },
    { label: "Target depth", value: `${Number(well.targetDepth).toLocaleString("en-US")} m` },
    { label: "Current depth", value: `${Number(well.currentDepth).toLocaleString("en-US")} m` },
    { label: "ROP", value: `${Number(well.rop).toFixed(1)} m/h` },
    { label: "NPT hours", value: `${Number(well.nptHours)} h` },
    { label: "Budget", value: formatUsd(budget) },
    { label: "Spent", value: formatUsd(spent) },
    { label: "Remaining budget", value: formatUsd(budget - spent) },
    { label: "Risk", value: String(well.risk) },
  ];

  const surveyChart = {
    title: "Inclination by station",
    labels: data.surveys.map((row) => String(row.station)),
    values: data.surveys.map((row) => Number(row.inclination) || 0),
  };

  return (
    <>
      <DrillingNav />
      <PageTitle
        eyebrow="Stage 6 · Drilling · Well"
        title={String(well.name)}
        subtitle={`${String(well.field)} · ${String(well.country)} · ${String(well.id)}`}
        actions={
          <>
            <Badge tone={drillingTone(String(well.status))}>{tr(String(well.status))}</Badge>
            <Badge tone={drillingTone(String(well.risk))}>{`${tr("Risk")} ${tr(String(well.risk))}`}</Badge>
            <Link className="secondary-button" href="/drilling/wells">
              <Icon name="arrow" size={15} /> {tr("Back to register")}
            </Link>
          </>
        }
      />

      <section className="panel inventory-kpi-panel">
        <div className="inventory-kpi-grid inventory-kpi-grid-5">
          <div className="inventory-kpi">
            <span>{tr("Depth progress")}</span>
            <strong>{`${depthProgress}%`}</strong>
            <small>{`${Number(well.currentDepth).toLocaleString("en-US")} / ${Number(well.targetDepth).toLocaleString("en-US")} m`}</small>
          </div>
          <div className="inventory-kpi">
            <span>{tr("ROP")}</span>
            <strong>{`${Number(well.rop).toFixed(1)} m/h`}</strong>
          </div>
          <div className="inventory-kpi">
            <span>{tr("NPT hours")}</span>
            <strong>{`${Number(well.nptHours)} h`}</strong>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Budget used")}</span>
            <strong>{budget > 0 ? `${Math.round((spent / budget) * 100)}%` : "—"}</strong>
            <small>{formatUsd(spent)}</small>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Related records")}</span>
            <strong>{String(data.reports.length + data.surveys.length + data.costs.length + data.npt.length)}</strong>
            <small>{tr("Reports, surveys, costs, NPT")}</small>
          </div>
        </div>
      </section>

      <div className="inventory-workspace">
        <section className="panel drilling-detail-panel">
          <div className="panel-head">
            <div>
              <h2>{tr("Well record")}</h2>
              <p>{tr("Master data from the wells register")}</p>
            </div>
          </div>
          <div className="drilling-progress-block">
            <div className="drilling-progress">
              <i style={{ width: `${depthProgress}%` }} />
              <em>{`${depthProgress}% ${tr("to target depth")}`}</em>
            </div>
          </div>
          <div className="detail-grid drilling-detail-grid">
            {details.map((detail) => (
              <div key={detail.label}>
                <span>{tr(detail.label)}</span>
                <strong>{tr(detail.value)}</strong>
              </div>
            ))}
          </div>
        </section>

        <div className="fleet-side">
          <FleetInsight
            variant="compact"
            title="Well insight"
            lines={[
              `${data.reports.length} daily reports and ${data.surveys.length} survey stations are linked to this well.`,
              `${formatUsd(budget - spent)} of budget remains against ${formatUsd(budget)} approved.`,
              data.npt.length > 0
                ? `${data.npt.length} NPT events total ${sumBy(data.npt, "duration").toFixed(1)} hours on this well.`
                : "No NPT events are logged for this well yet.",
            ]}
            action="Open performance"
          />
          {data.surveys.length > 0 && (
            <FleetBarChart title={surveyChart.title} labels={surveyChart.labels} values={surveyChart.values} />
          )}
        </div>
      </div>

      <section className="panel drilling-table-panel">
        <div className="panel-head">
          <div>
            <h2>{tr("Daily reports for this well")}</h2>
            <p>{`${data.reports.length} ${tr("records")}`}</p>
          </div>
          <Link className="text-button" href="/drilling/daily-reports">
            {tr("Open register")}
          </Link>
        </div>
        {data.reports.length === 0 ? (
          <EmptyState title="No daily reports" detail="This well has no tour records in the demo data." />
        ) : (
          <div className="drilling-table-scroll" role="region" aria-label={tr("Daily reports for this well")} tabIndex={0}>
            <div className="drilling-table" style={{ ["--drill-cols" as string]: "6" }}>
              <div className="drilling-row drilling-head" role="row">
                <span>{tr("Report")}</span>
                <span>{tr("Date")}</span>
                <span>{tr("Operation")}</span>
                <span>{tr("Depth to")}</span>
                <span>{tr("NPT")}</span>
                <span>{tr("Status")}</span>
              </div>
              {data.reports.map((report) => (
                <div className="drilling-row" role="row" key={String(report.id)}>
                  <span data-label={tr("Report")}>{String(report.id)}</span>
                  <span data-label={tr("Date")}>{String(report.date)}</span>
                  <span data-label={tr("Operation")}>{tr(String(report.operation))}</span>
                  <span data-label={tr("Depth to")}>{`${Number(report.depthTo).toLocaleString("en-US")} m`}</span>
                  <span data-label={tr("NPT")}>{`${Number(report.nptHours)} h`}</span>
                  <span data-label={tr("Status")}>
                    <Badge tone={drillingTone(String(report.status))}>{tr(String(report.status))}</Badge>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {data.surveys.length > 0 && (
        <section className="panel drilling-table-panel">
          <div className="panel-head">
            <div>
              <h2>{tr("Survey stations")}</h2>
              <p>{`${data.surveys.length} ${tr("records")}`}</p>
            </div>
            <Link className="text-button" href="/drilling/surveys">
              {tr("Open register")}
            </Link>
          </div>
          <div className="drilling-table-scroll" role="region" aria-label={tr("Survey stations")} tabIndex={0}>
            <div className="drilling-table" style={{ ["--drill-cols" as string]: "6" }}>
              <div className="drilling-row drilling-head" role="row">
                <span>{tr("Station")}</span>
                <span>{tr("MD")}</span>
                <span>{tr("Inclination")}</span>
                <span>{tr("Azimuth")}</span>
                <span>{tr("TVD")}</span>
                <span>{tr("Status")}</span>
              </div>
              {data.surveys.map((survey) => (
                <div className="drilling-row" role="row" key={String(survey.id)}>
                  <span data-label={tr("Station")}>{String(survey.station)}</span>
                  <span data-label={tr("MD")}>{`${Number(survey.md).toLocaleString("en-US")} m`}</span>
                  <span data-label={tr("Inclination")}>{`${Number(survey.inclination).toFixed(1)}°`}</span>
                  <span data-label={tr("Azimuth")}>{`${Number(survey.azimuth).toFixed(1)}°`}</span>
                  <span data-label={tr("TVD")}>{`${Number(survey.tvd).toLocaleString("en-US")} m`}</span>
                  <span data-label={tr("Status")}>
                    <Badge tone={drillingTone(String(survey.status))}>{tr(String(survey.status))}</Badge>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default DrillingWellDetailScreen;
