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
import { averageBy, countWhere, projectTone, sumBy } from "@/lib/projects/projects-utils";
import { formatDzd, listRows, type ProjectSeedKey } from "@/lib/projects/projects-service";
import type { ProjectRow } from "@/types/projects";

interface DashboardData {
  projects: ProjectRow[];
  tasks: ProjectRow[];
  milestones: ProjectRow[];
  risks: ProjectRow[];
  costs: ProjectRow[];
  budget: ProjectRow[];
}

const overviewKeys: ProjectSeedKey[] = ["projects", "tasks", "milestones", "risks", "costs", "budget"];

async function loadOverview(): Promise<DashboardData> {
  const [projects, tasks, milestones, risks, costs, budget] = await Promise.all(
    overviewKeys.map((key) => listRows(key))
  );
  return { projects, tasks, milestones, risks, costs, budget } as DashboardData;
}

export function ProjectsDashboardScreen() {
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

  const active = data ? countWhere(data.projects, (row) => row.status === "Active") : 0;
  const atRisk = data ? countWhere(data.projects, (row) => row.status === "At risk" || row.status === "Delayed") : 0;
  const planned = data ? sumBy(data.budget, "planned") : 0;
  const actual = data ? sumBy(data.budget, "actual") : 0;

  const kpis = [
    { label: "Active projects", value: data ? String(active) : "—" },
    { label: "At risk / delayed", value: data ? String(atRisk) : "—" },
    { label: "Average progress", value: data ? `${Math.round(averageBy(data.projects, "progress"))}%` : "—" },
    { label: "Open risks", value: data ? String(countWhere(data.risks, (row) => row.status !== "Closed")) : "—" },
    { label: "Blocked tasks", value: data ? String(countWhere(data.tasks, (row) => row.status === "Blocked")) : "—" },
    { label: "Budget variance", value: data ? formatDzd((actual - planned) * 1_000_000) : "—" },
  ];

  const progressChart = data
    ? {
        title: "Progress by project",
        labels: data.projects.map((row) => String(row.name).split(" ")[0]),
        values: data.projects.map((row) => Number(row.progress) || 0),
      }
    : null;

  const budgetChart = data
    ? {
        title: "Budget vs actual by category",
        labels: data.budget.map((row) => String(row.category)),
        values: data.budget.map((row) => Number(row.actual) || 0),
      }
    : null;

  const upcoming = (data?.milestones ?? []).filter((row) => row.status !== "Completed").slice(0, 5);

  return (
    <>
      <PageTitle
        eyebrow="Stage 7 · Projects"
        title="Project management dashboard"
        subtitle="Portfolio position across projects, delivery, risk and budget"
        actions={
          <Link className="primary-button" href="/projects/ai/health">
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
          <LoadingState label="Loading project overview…" />
        </section>
      ) : (
        <>
          <div className="inventory-workspace">
            <section className="panel projects-table-panel">
              <div className="panel-head">
                <div>
                  <h2>{tr("Active projects")}</h2>
                  <p>{`${data.projects.length} ${tr("projects")} · ${tr("Demo data")}`}</p>
                </div>
                <Link className="text-button" href="/projects/list">
                  {tr("Open projects")}
                </Link>
              </div>
              <div className="projects-table-scroll" role="region" aria-label={tr("Active projects")} tabIndex={0}>
                <div className="projects-table" style={{ ["--projects-cols" as string]: "7" }}>
                  <div className="projects-row projects-head" role="row">
                    <span>{tr("Project")}</span>
                    <span>{tr("Manager")}</span>
                    <span>{tr("Status")}</span>
                    <span>{tr("Progress")}</span>
                    <span>{tr("Priority")}</span>
                    <span>{tr("Risk")}</span>
                    <span>{tr("Actions")}</span>
                  </div>
                  {data.projects.map((project) => (
                    <div className="projects-row" role="row" key={String(project.id)}>
                      <span data-label={tr("Project")}>
                        <strong>{tr(String(project.name))}</strong>
                        <small>{String(project.id)}</small>
                      </span>
                      <span data-label={tr("Manager")}>{tr(String(project.manager))}</span>
                      <span data-label={tr("Status")}>
                        <Badge tone={projectTone(String(project.status))}>{tr(String(project.status))}</Badge>
                      </span>
                      <span data-label={tr("Progress")}>{`${Number(project.progress)}%`}</span>
                      <span data-label={tr("Priority")}>
                        <Badge tone={projectTone(String(project.priority))}>{tr(String(project.priority))}</Badge>
                      </span>
                      <span data-label={tr("Risk")}>
                        <Badge tone={projectTone(String(project.risk))}>{tr(String(project.risk))}</Badge>
                      </span>
                      <span className="projects-row-actions" data-label={tr("Actions")}>
                        <Link className="projects-action-link" href={`/projects/${project.id}`}>
                          {tr("View")}
                        </Link>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="fleet-side">
              {progressChart && <FleetBarChart title={progressChart.title} labels={progressChart.labels} values={progressChart.values} />}
              <FleetInsight
                variant="compact"
                title="Portfolio insight"
                lines={[
                  `${active} projects are active and ${atRisk} need attention this week.`,
                  `${countWhere(data.tasks, (row) => row.status === "Blocked")} tasks are blocked across the portfolio.`,
                  `Budget variance stands at ${formatDzd((actual - planned) * 1_000_000)} against plan.`,
                ]}
                action="Open analytics"
              />
            </div>
          </div>

          <div className="inventory-workspace">
            <section className="panel projects-table-panel">
              <div className="panel-head">
                <div>
                  <h2>{tr("Upcoming milestones")}</h2>
                  <p>{tr("Deadlines approaching across the portfolio")}</p>
                </div>
                <Link className="text-button" href="/projects/milestones">
                  {tr("Open milestones")}
                </Link>
              </div>
              <div className="projects-table-scroll" role="region" aria-label={tr("Upcoming milestones")} tabIndex={0}>
                <div className="projects-table" style={{ ["--projects-cols" as string]: "5" }}>
                  <div className="projects-row projects-head" role="row">
                    <span>{tr("Milestone")}</span>
                    <span>{tr("Project")}</span>
                    <span>{tr("Owner")}</span>
                    <span>{tr("Due")}</span>
                    <span>{tr("Status")}</span>
                  </div>
                  {upcoming.map((milestone) => (
                    <div className="projects-row" role="row" key={String(milestone.id)}>
                      <span data-label={tr("Milestone")}>{tr(String(milestone.milestone))}</span>
                      <span data-label={tr("Project")}>{tr(String(milestone.project))}</span>
                      <span data-label={tr("Owner")}>{tr(String(milestone.owner))}</span>
                      <span data-label={tr("Due")}>{String(milestone.due)}</span>
                      <span data-label={tr("Status")}>
                        <Badge tone={projectTone(String(milestone.status))}>{tr(String(milestone.status))}</Badge>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {budgetChart && (
              <div className="fleet-side">
                <FleetBarChart title={budgetChart.title} labels={budgetChart.labels} values={budgetChart.values} />
                <FleetInsight
                  variant="compact"
                  title="Financial insight"
                  lines={[
                    `Planned budget totals ${formatDzd(planned * 1_000_000)}.`,
                    `Actual spend stands at ${formatDzd(actual * 1_000_000)}.`,
                    "Cost lines are tracked on the project costs screen.",
                  ]}
                  action="Open budget"
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default ProjectsDashboardScreen;
