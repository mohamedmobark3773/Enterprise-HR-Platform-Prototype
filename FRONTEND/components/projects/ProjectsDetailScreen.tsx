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
import { ProjectsNav } from "@/components/projects/ProjectsNav";
import { countWhere, projectTone, sumBy } from "@/lib/projects/projects-utils";
import { formatDzd, listRows, type ProjectSeedKey } from "@/lib/projects/projects-service";
import type { ProjectRow } from "@/types/projects";

interface DetailData {
  project: ProjectRow | undefined;
  phases: ProjectRow[];
  tasks: ProjectRow[];
  milestones: ProjectRow[];
  risks: ProjectRow[];
  costs: ProjectRow[];
}

const relatedKeys: ProjectSeedKey[] = ["projects", "phases", "tasks", "milestones", "risks", "costs"];

function matchesProject(row: ProjectRow, id: string, name: string): boolean {
  const value = String(row.project ?? "");
  return value === id || value === name;
}

export function ProjectsDetailScreen({ id }: { id: string }) {
  const { tr } = useApp();
  const [data, setData] = useState<DetailData | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [projects, phases, tasks, milestones, risks, costs] = await Promise.all(
        relatedKeys.map((key) => listRows(key))
      );
      if (!alive) return;
      const project = projects.find((row) => String(row.id) === id);
      const name = String(project?.name ?? "");
      setData({
        project,
        phases: phases.filter((row) => matchesProject(row, id, name)),
        tasks: tasks.filter((row) => matchesProject(row, id, name)),
        milestones: milestones.filter((row) => matchesProject(row, id, name)),
        risks: risks.filter((row) => matchesProject(row, id, name)),
        costs: costs.filter((row) => matchesProject(row, id, name)),
      });
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  const project = data?.project;

  const costsChart = useMemo(() => {
    if (!data || data.costs.length === 0) return null;
    return {
      title: "Cost by category",
      labels: data.costs.map((row) => String(row.category)),
      values: data.costs.map((row) => Number(row.actual) || 0),
    };
  }, [data]);

  if (!data) {
    return (
      <>
        <ProjectsNav />
        <section className="panel">
          <LoadingState label="Loading project…" />
        </section>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <ProjectsNav />
        <EmptyState
          title="Project not found"
          detail={`No record matches ${id} in the demo register.`}
          action={
            <Link className="primary-button" href="/projects/list">
              {tr("Back to projects")}
            </Link>
          }
        />
      </>
    );
  }

  const budget = Number(project.budget) || 0;
  const spent = Number(project.actual) || 0;
  const spentPct = budget > 0 ? Math.round((spent / budget) * 100) : 0;

  const details: { label: string; value: string }[] = [
    { label: "Project ID", value: String(project.id) },
    { label: "Region", value: String(project.region) },
    { label: "Manager", value: String(project.manager) },
    { label: "Priority", value: String(project.priority) },
    { label: "Status", value: String(project.status) },
    { label: "Risk", value: String(project.risk) },
    { label: "Start", value: String(project.start) },
    { label: "End", value: String(project.end) },
    { label: "Budget", value: formatDzd(budget * 1_000_000) },
    { label: "Actual", value: formatDzd(spent * 1_000_000) },
    { label: "Remaining", value: formatDzd((budget - spent) * 1_000_000) },
    { label: "Progress", value: `${Number(project.progress)}%` },
  ];

  return (
    <>
      <ProjectsNav />
      <PageTitle
        eyebrow="Stage 7 · Projects · Project"
        title={String(project.name)}
        subtitle={`${String(project.region)} · ${String(project.manager)} · ${String(project.id)}`}
        actions={
          <>
            <Badge tone={projectTone(String(project.status))}>{tr(String(project.status))}</Badge>
            <Badge tone={projectTone(String(project.priority))}>{`${tr("Priority")} ${tr(String(project.priority))}`}</Badge>
            <Link className="secondary-button" href="/projects/list">
              <Icon name="arrow" size={15} /> {tr("Back to register")}
            </Link>
          </>
        }
      />

      <section className="panel inventory-kpi-panel">
        <div className="inventory-kpi-grid inventory-kpi-grid-5">
          <div className="inventory-kpi">
            <span>{tr("Progress")}</span>
            <strong>{`${Number(project.progress)}%`}</strong>
            <small>{`${String(project.start)} → ${String(project.end)}`}</small>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Budget")}</span>
            <strong>{formatDzd(budget * 1_000_000)}</strong>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Budget used")}</span>
            <strong>{`${spentPct}%`}</strong>
            <small>{formatDzd(spent * 1_000_000)}</small>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Open risks")}</span>
            <strong>{String(countWhere(data.risks, (row) => row.status !== "Closed"))}</strong>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Related records")}</span>
            <strong>{String(data.phases.length + data.tasks.length + data.milestones.length + data.costs.length)}</strong>
            <small>{tr("Phases, tasks, milestones, costs")}</small>
          </div>
        </div>
      </section>

      <div className="inventory-workspace">
        <section className="panel projects-detail-panel">
          <div className="panel-head">
            <div>
              <h2>{tr("Project record")}</h2>
              <p>{tr("Master data from the projects register")}</p>
            </div>
          </div>
          <div className="projects-progress-block">
            <div className="projects-progress">
              <i style={{ width: `${Number(project.progress)}%` }} />
              <em>{`${Number(project.progress)}% ${tr("complete")}`}</em>
            </div>
          </div>
          <div className="detail-grid projects-detail-grid">
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
            title="Project insight"
            lines={[
              `${data.phases.length} phases and ${data.tasks.length} tasks are linked to this project.`,
              `${formatDzd((budget - spent) * 1_000_000)} of budget remains against ${formatDzd(budget * 1_000_000)} approved.`,
              data.risks.length > 0
                ? `${countWhere(data.risks, (row) => row.status !== "Closed")} risks remain open on this project.`
                : "No risks are logged for this project yet.",
            ]}
            action="Open analytics"
          />
          {costsChart && <FleetBarChart title={costsChart.title} labels={costsChart.labels} values={costsChart.values} />}
        </div>
      </div>

      <section className="panel projects-table-panel">
        <div className="panel-head">
          <div>
            <h2>{tr("Phases")}</h2>
            <p>{`${data.phases.length} ${tr("records")}`}</p>
          </div>
          <Link className="text-button" href="/projects/phases">
            {tr("Open register")}
          </Link>
        </div>
        {data.phases.length === 0 ? (
          <EmptyState title="No phases" detail="This project has no phases in the demo data." />
        ) : (
          <div className="projects-table-scroll" role="region" aria-label={tr("Phases")} tabIndex={0}>
            <div className="projects-table" style={{ ["--projects-cols" as string]: "5" }}>
              <div className="projects-row projects-head" role="row">
                <span>{tr("Phase")}</span>
                <span>{tr("Owner")}</span>
                <span>{tr("Progress")}</span>
                <span>{tr("End")}</span>
                <span>{tr("Status")}</span>
              </div>
              {data.phases.map((phase) => (
                <div className="projects-row" role="row" key={String(phase.id)}>
                  <span data-label={tr("Phase")}>{tr(String(phase.name))}</span>
                  <span data-label={tr("Owner")}>{tr(String(phase.owner))}</span>
                  <span data-label={tr("Progress")}>{`${Number(phase.progress)}%`}</span>
                  <span data-label={tr("End")}>{String(phase.end)}</span>
                  <span data-label={tr("Status")}>
                    <Badge tone={projectTone(String(phase.status))}>{tr(String(phase.status))}</Badge>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="panel projects-table-panel">
        <div className="panel-head">
          <div>
            <h2>{tr("Tasks")}</h2>
            <p>{`${data.tasks.length} ${tr("records")}`}</p>
          </div>
          <Link className="text-button" href="/projects/tasks">
            {tr("Open register")}
          </Link>
        </div>
        {data.tasks.length === 0 ? (
          <EmptyState title="No tasks" detail="This project has no tasks in the demo data." />
        ) : (
          <div className="projects-table-scroll" role="region" aria-label={tr("Tasks")} tabIndex={0}>
            <div className="projects-table" style={{ ["--projects-cols" as string]: "6" }}>
              <div className="projects-row projects-head" role="row">
                <span>{tr("Task")}</span>
                <span>{tr("Assignee")}</span>
                <span>{tr("Priority")}</span>
                <span>{tr("Due")}</span>
                <span>{tr("Progress")}</span>
                <span>{tr("Status")}</span>
              </div>
              {data.tasks.map((task) => (
                <div className="projects-row" role="row" key={String(task.id)}>
                  <span data-label={tr("Task")}>
                    <Link className="projects-action-link" href={`/projects/tasks/${encodeURIComponent(String(task.id))}`}>
                      {tr(String(task.task))}
                    </Link>
                  </span>
                  <span data-label={tr("Assignee")}>{tr(String(task.assignee))}</span>
                  <span data-label={tr("Priority")}>
                    <Badge tone={projectTone(String(task.priority))}>{tr(String(task.priority))}</Badge>
                  </span>
                  <span data-label={tr("Due")}>{String(task.due)}</span>
                  <span data-label={tr("Progress")}>{`${Number(task.progress)}%`}</span>
                  <span data-label={tr("Status")}>
                    <Badge tone={projectTone(String(task.status))}>{tr(String(task.status))}</Badge>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="panel projects-table-panel">
        <div className="panel-head">
          <div>
            <h2>{tr("Milestones")}</h2>
            <p>{`${data.milestones.length} ${tr("records")} · ${sumBy(data.milestones, "progress").toFixed(0)} ${tr("total progress points")}`}</p>
          </div>
          <Link className="text-button" href="/projects/milestones">
            {tr("Open register")}
          </Link>
        </div>
        {data.milestones.length === 0 ? (
          <EmptyState title="No milestones" detail="This project has no milestones in the demo data." />
        ) : (
          <div className="projects-table-scroll" role="region" aria-label={tr("Milestones")} tabIndex={0}>
            <div className="projects-table" style={{ ["--projects-cols" as string]: "5" }}>
              <div className="projects-row projects-head" role="row">
                <span>{tr("Milestone")}</span>
                <span>{tr("Owner")}</span>
                <span>{tr("Due")}</span>
                <span>{tr("Progress")}</span>
                <span>{tr("Status")}</span>
              </div>
              {data.milestones.map((milestone) => (
                <div className="projects-row" role="row" key={String(milestone.id)}>
                  <span data-label={tr("Milestone")}>{tr(String(milestone.milestone))}</span>
                  <span data-label={tr("Owner")}>{tr(String(milestone.owner))}</span>
                  <span data-label={tr("Due")}>{String(milestone.due)}</span>
                  <span data-label={tr("Progress")}>{`${Number(milestone.progress)}%`}</span>
                  <span data-label={tr("Status")}>
                    <Badge tone={projectTone(String(milestone.status))}>{tr(String(milestone.status))}</Badge>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default ProjectsDetailScreen;
