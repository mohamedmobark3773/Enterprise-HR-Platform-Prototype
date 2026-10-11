"use client";

import React, { useEffect, useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { LoadingState } from "@/components/ui/Feedback";
import { FleetBarChart } from "@/components/fleet/FleetBarChart";
import { FleetInsight } from "@/components/fleet/FleetInsight";
import { useApp } from "@/lib/context/AppContext";
import { ProjectsNav } from "@/components/projects/ProjectsNav";
import { averageBy, countWhere, projectTone, sumBy } from "@/lib/projects/projects-utils";
import { formatDzd, listRows, type ProjectSeedKey } from "@/lib/projects/projects-service";
import type { ProjectRow } from "@/types/projects";

interface AnalyticsData {
  projects: ProjectRow[];
  phases: ProjectRow[];
  progress: ProjectRow[];
  costs: ProjectRow[];
  budget: ProjectRow[];
  risks: ProjectRow[];
}

const analyticsKeys: ProjectSeedKey[] = ["projects", "phases", "progress", "costs", "budget", "risks"];

async function loadAnalytics(): Promise<AnalyticsData> {
  const [projects, phases, progress, costs, budget, risks] = await Promise.all(
    analyticsKeys.map((key) => listRows(key))
  );
  return { projects, phases, progress, costs, budget, risks } as AnalyticsData;
}

export function ProjectsAnalyticsScreen() {
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

  const planned = data ? sumBy(data.budget, "planned") : 0;
  const actual = data ? sumBy(data.budget, "actual") : 0;
  const variance = planned > 0 ? Math.round(((actual - planned) / planned) * 100) : 0;

  const kpis = [
    { label: "Average progress", value: data ? `${Math.round(averageBy(data.projects, "progress"))}%` : "—" },
    { label: "Schedule variance", value: data ? `${Math.round(averageBy(data.progress, "variance"))} pts` : "—" },
    { label: "Budget variance", value: data ? `${variance >= 0 ? "+" : ""}${variance}%` : "—" },
    { label: "High-severity risks", value: data ? String(countWhere(data.risks, (row) => row.severity === "High")) : "—" },
    { label: "Budget committed", value: data ? formatDzd(planned * 1_000_000) : "—" },
  ];

  const progressChart = data
    ? {
        title: "Progress by project",
        labels: data.projects.map((row) => String(row.name).split(" ")[0]),
        values: data.projects.map((row) => Number(row.progress) || 0),
      }
    : null;

  const plannedActualChart = data
    ? {
        title: "Planned vs actual progress",
        labels: data.progress.map((row) => String(row.project).split(" ")[0]),
        values: data.progress.map((row) => Number(row.actual) || 0),
      }
    : null;

  const riskCategories = data ? Array.from(new Set(data.risks.map((row) => String(row.severity)))) : [];
  const riskChart = data
    ? {
        title: "Risks by severity",
        labels: riskCategories,
        values: riskCategories.map((severity) => countWhere(data.risks, (row) => String(row.severity) === severity)),
      }
    : null;

  return (
    <>
      <ProjectsNav />
      <PageTitle
        eyebrow="Stage 7 · Projects"
        title="Project analytics"
        subtitle="Portfolio analytics for schedule, cost, progress and risk"
        actions={
          <button className="secondary-button" type="button" onClick={() => window.print()}>
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
          <LoadingState label="Loading analytics data…" />
        </section>
      ) : (
        <>
          <div className="analytics-grid projects-chart-grid">
            {progressChart && <FleetBarChart title={progressChart.title} labels={progressChart.labels} values={progressChart.values} />}
            {plannedActualChart && <FleetBarChart title={plannedActualChart.title} labels={plannedActualChart.labels} values={plannedActualChart.values} />}
            {riskChart && <FleetBarChart title={riskChart.title} labels={riskChart.labels} values={riskChart.values} />}
          </div>

          <div className="inventory-workspace">
            <section className="panel projects-table-panel">
              <div className="panel-head">
                <div>
                  <h2>{tr("Plan versus actual by project")}</h2>
                  <p>{`${data.progress.length} ${tr("projects")} · ${tr("Demo data")}`}</p>
                </div>
              </div>
              <div className="projects-table-scroll" role="region" aria-label={tr("Plan versus actual by project")} tabIndex={0}>
                <div className="projects-table" style={{ ["--projects-cols" as string]: "6" }}>
                  <div className="projects-row projects-head" role="row">
                    <span>{tr("Project")}</span>
                    <span>{tr("Planned")}</span>
                    <span>{tr("Actual")}</span>
                    <span>{tr("Variance")}</span>
                    <span>{tr("Forecast")}</span>
                    <span>{tr("Milestone")}</span>
                  </div>
                  {data.progress.map((row) => (
                    <div className="projects-row" role="row" key={String(row.id)}>
                      <span data-label={tr("Project")}>{tr(String(row.project))}</span>
                      <span data-label={tr("Planned")}>{`${Number(row.planned)}%`}</span>
                      <span data-label={tr("Actual")}>{`${Number(row.actual)}%`}</span>
                      <span data-label={tr("Variance")}>
                        <Badge tone={Number(row.variance) < 0 ? "red" : "green"}>{`${Number(row.variance) > 0 ? "+" : ""}${Number(row.variance)}`}</Badge>
                      </span>
                      <span data-label={tr("Forecast")}>{`${Number(row.forecast)}%`}</span>
                      <span data-label={tr("Milestone")}>{tr(String(row.milestone))}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="fleet-side">
              <FleetInsight
                variant="rich"
                title="Analytics insight"
                lines={[
                  `Average portfolio progress is ${Math.round(averageBy(data.projects, "progress"))}%.`,
                  `${countWhere(data.progress, (row) => Number(row.variance) < 0)} projects are behind their baseline plan.`,
                  `Budget variance stands at ${variance >= 0 ? "+" : ""}${variance}% against plan.`,
                  `${countWhere(data.risks, (row) => row.severity === "High")} high-severity risks remain in the register.`,
                ]}
                action="Open AI health"
              />
              <FleetBarChart
                title="Cost actual by category"
                labels={data.costs.map((row) => String(row.category))}
                values={data.costs.map((row) => Number(row.actual) || 0)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProjectsAnalyticsScreen;
