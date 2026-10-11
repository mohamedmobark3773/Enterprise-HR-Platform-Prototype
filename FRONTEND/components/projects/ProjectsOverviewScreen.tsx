"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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

interface OverviewData {
  projects: ProjectRow[];
  progress: ProjectRow[];
  workload: ProjectRow[];
  milestones: ProjectRow[];
  phaseCount: number;
}

const overviewKeys: ProjectSeedKey[] = ["projects", "progress", "workload", "milestones", "phases"];

async function loadOverview(): Promise<OverviewData> {
  const [projects, progress, workload, milestones, phases] = await Promise.all(
    overviewKeys.map((key) => listRows(key))
  );
  return { projects, progress, workload, milestones, phaseCount: phases.length } as OverviewData;
}

export function ProjectsOverviewScreen() {
  const { tr } = useApp();
  const [data, setData] = useState<OverviewData | null>(null);

  useEffect(() => {
    let alive = true;
    void loadOverview().then((result) => {
      if (alive) setData(result);
    });
    return () => {
      alive = false;
    };
  }, []);

  const kpis = [
    { label: "Projects", value: data ? String(data.projects.length) : "—" },
    { label: "Phases", value: data ? String(data.phaseCount) : "—" },
    { label: "Average progress", value: data ? `${Math.round(averageBy(data.projects, "progress"))}%` : "—" },
    { label: "Team utilization", value: data ? `${Math.round(averageBy(data.workload, "utilization"))}%` : "—" },
    { label: "Open milestones", value: data ? String(countWhere(data.milestones, (row) => row.status !== "Completed")) : "—" },
  ];

  const workloadChart = data
    ? {
        title: "Utilization by employee",
        labels: data.workload.map((row) => String(row.employee).split(" ").pop() ?? String(row.employee)),
        values: data.workload.map((row) => Number(row.utilization) || 0),
      }
    : null;

  return (
    <>
      <ProjectsNav />
      <PageTitle
        eyebrow="Stage 7 · Projects"
        title="Project overview"
        subtitle="Portfolio-wide view of delivery, capacity and upcoming gates"
        actions={
          <Link className="secondary-button" href="/projects/timeline">
            <Icon name="clock" size={15} /> {tr("Open timeline")}
          </Link>
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
          <LoadingState label="Loading portfolio overview…" />
        </section>
      ) : (
        <div className="inventory-workspace">
          <section className="panel projects-table-panel">
            <div className="panel-head">
              <div>
                <h2>{tr("Portfolio progress")}</h2>
                <p>{`${data.projects.length} ${tr("projects")} · ${tr("Demo data")}`}</p>
              </div>
              <Link className="text-button" href="/projects/progress">
                {tr("Open progress")}
              </Link>
            </div>
            <div className="projects-table-scroll" role="region" aria-label={tr("Portfolio progress")} tabIndex={0}>
              <div className="projects-table" style={{ ["--projects-cols" as string]: "6" }}>
                <div className="projects-row projects-head" role="row">
                  <span>{tr("Project")}</span>
                  <span>{tr("Status")}</span>
                  <span>{tr("Progress")}</span>
                  <span>{tr("Planned")}</span>
                  <span>{tr("Actual")}</span>
                  <span>{tr("Variance")}</span>
                </div>
                {data.projects.map((project) => {
                  const progressRow = data.progress.find((row) => String(row.project) === String(project.name));
                  return (
                    <div className="projects-row" role="row" key={String(project.id)}>
                      <span data-label={tr("Project")}>
                        <Link className="projects-action-link" href={`/projects/${project.id}`}>
                          {tr(String(project.name))}
                        </Link>
                      </span>
                      <span data-label={tr("Status")}>
                        <Badge tone={projectTone(String(project.status))}>{tr(String(project.status))}</Badge>
                      </span>
                      <span data-label={tr("Progress")}>{`${Number(project.progress)}%`}</span>
                      <span data-label={tr("Planned")}>{progressRow ? `${Number(progressRow.planned)}%` : "—"}</span>
                      <span data-label={tr("Actual")}>{progressRow ? `${Number(progressRow.actual)}%` : "—"}</span>
                      <span data-label={tr("Variance")}>
                        {progressRow ? (
                          <Badge tone={Number(progressRow.variance) < 0 ? "red" : "green"}>
                            {`${Number(progressRow.variance) > 0 ? "+" : ""}${Number(progressRow.variance)}`}
                          </Badge>
                        ) : (
                          "—"
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <div className="fleet-side">
            {workloadChart && <FleetBarChart title={workloadChart.title} labels={workloadChart.labels} values={workloadChart.values} />}
            <FleetInsight
              variant="compact"
              title="Overview insight"
              lines={[
                `${countWhere(data.workload, (row) => row.status === "Overload")} team members are above optimal utilization.`,
                `Average utilization is ${Math.round(averageBy(data.workload, "utilization"))}%.`,
                `${countWhere(data.milestones, (row) => row.status !== "Completed")} milestones remain open.`,
              ]}
              action="Open workload"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectsOverviewScreen;
