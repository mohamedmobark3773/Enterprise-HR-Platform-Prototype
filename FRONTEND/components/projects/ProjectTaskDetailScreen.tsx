"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PageTitle } from "@/components/ui/PageTitle";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { EmptyState, LoadingState } from "@/components/ui/Feedback";
import { FleetInsight } from "@/components/fleet/FleetInsight";
import { useApp } from "@/lib/context/AppContext";
import { ProjectsNav } from "@/components/projects/ProjectsNav";
import { projectTone, sumBy } from "@/lib/projects/projects-utils";
import { listRows, type ProjectSeedKey } from "@/lib/projects/projects-service";
import type { ProjectRow } from "@/types/projects";

interface TaskDetailData {
  task: ProjectRow | undefined;
  subtasks: ProjectRow[];
  dependencies: ProjectRow[];
  activity: ProjectRow[];
}

const relatedKeys: ProjectSeedKey[] = ["tasks", "subtasks", "dependencies", "activity"];

export function ProjectTaskDetailScreen({ id }: { id: string }) {
  const { tr } = useApp();
  const [data, setData] = useState<TaskDetailData | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [tasks, subtasks, dependencies, activity] = await Promise.all(
        relatedKeys.map((key) => listRows(key))
      );
      if (!alive) return;
      const task = tasks.find((row) => String(row.id) === id);
      const taskName = String(task?.task ?? "");
      setData({
        task,
        subtasks: subtasks.filter((row) => String(row.parent) === id || String(row.task) === taskName),
        dependencies: dependencies.filter(
          (row) => String(row.source) === taskName || String(row.target) === taskName
        ),
        activity: activity.filter((row) => String(row.entity) === id),
      });
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  const task = data?.task;

  if (!data) {
    return (
      <>
        <ProjectsNav />
        <section className="panel">
          <LoadingState label="Loading task…" />
        </section>
      </>
    );
  }

  if (!task) {
    return (
      <>
        <ProjectsNav />
        <EmptyState
          title="Task not found"
          detail={`No record matches ${id} in the demo register.`}
          action={
            <Link className="primary-button" href="/projects/tasks">
              {tr("Back to tasks")}
            </Link>
          }
        />
      </>
    );
  }

  const details: { label: string; value: string }[] = [
    { label: "Task ID", value: String(task.id) },
    { label: "Project", value: String(task.project) },
    { label: "Assignee", value: String(task.assignee) },
    { label: "Priority", value: String(task.priority) },
    { label: "Status", value: String(task.status) },
    { label: "Due", value: String(task.due) },
    { label: "Progress", value: `${Number(task.progress)}%` },
    { label: "Dependencies", value: String(task.dependencies) },
  ];

  return (
    <>
      <ProjectsNav />
      <PageTitle
        eyebrow="Stage 7 · Projects · Task"
        title={String(task.task)}
        subtitle={`${String(task.project)} · ${String(task.assignee)} · ${String(task.id)}`}
        actions={
          <>
            <Badge tone={projectTone(String(task.status))}>{tr(String(task.status))}</Badge>
            <Badge tone={projectTone(String(task.priority))}>{`${tr("Priority")} ${tr(String(task.priority))}`}</Badge>
            <Link className="secondary-button" href="/projects/tasks">
              <Icon name="arrow" size={15} /> {tr("Back to register")}
            </Link>
          </>
        }
      />

      <section className="panel inventory-kpi-panel">
        <div className="inventory-kpi-grid inventory-kpi-grid-5">
          <div className="inventory-kpi">
            <span>{tr("Progress")}</span>
            <strong>{`${Number(task.progress)}%`}</strong>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Subtasks")}</span>
            <strong>{String(data.subtasks.length)}</strong>
            <small>{`${sumBy(data.subtasks, "hours")} ${tr("hours planned")}`}</small>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Dependencies")}</span>
            <strong>{String(data.dependencies.length)}</strong>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Due")}</span>
            <strong>{String(task.due)}</strong>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Change log")}</span>
            <strong>{String(data.activity.length)}</strong>
            <small>{tr("entries for this task")}</small>
          </div>
        </div>
      </section>

      <div className="inventory-workspace">
        <section className="panel projects-detail-panel">
          <div className="panel-head">
            <div>
              <h2>{tr("Task record")}</h2>
              <p>{tr("Master data from the tasks register")}</p>
            </div>
          </div>
          <div className="projects-progress-block">
            <div className="projects-progress">
              <i style={{ width: `${Number(task.progress)}%` }} />
              <em>{`${Number(task.progress)}% ${tr("complete")}`}</em>
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
            title="Task insight"
            lines={[
              `${data.subtasks.length} subtasks are linked to this task.`,
              data.dependencies.length > 0
                ? `${data.dependencies.length} dependencies connect this task to the plan.`
                : "No dependencies are logged for this task.",
              `${data.activity.length} change-log entries reference this task.`,
            ]}
            action="Open timeline"
          />
        </div>
      </div>

      <section className="panel projects-table-panel">
        <div className="panel-head">
          <div>
            <h2>{tr("Subtasks")}</h2>
            <p>{`${data.subtasks.length} ${tr("records")}`}</p>
          </div>
          <Link className="text-button" href="/projects/subtasks">
            {tr("Open register")}
          </Link>
        </div>
        {data.subtasks.length === 0 ? (
          <EmptyState title="No subtasks" detail="This task has no subtasks in the demo data." />
        ) : (
          <div className="projects-table-scroll" role="region" aria-label={tr("Subtasks")} tabIndex={0}>
            <div className="projects-table" style={{ ["--projects-cols" as string]: "5" }}>
              <div className="projects-row projects-head" role="row">
                <span>{tr("Subtask")}</span>
                <span>{tr("Assignee")}</span>
                <span>{tr("Hours")}</span>
                <span>{tr("Due")}</span>
                <span>{tr("Status")}</span>
              </div>
              {data.subtasks.map((subtask) => (
                <div className="projects-row" role="row" key={String(subtask.id)}>
                  <span data-label={tr("Subtask")}>{tr(String(subtask.task))}</span>
                  <span data-label={tr("Assignee")}>{tr(String(subtask.assignee))}</span>
                  <span data-label={tr("Hours")}>{`${Number(subtask.hours)} h`}</span>
                  <span data-label={tr("Due")}>{String(subtask.due)}</span>
                  <span data-label={tr("Status")}>
                    <Badge tone={projectTone(String(subtask.status))}>{tr(String(subtask.status))}</Badge>
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
            <h2>{tr("Dependencies")}</h2>
            <p>{`${data.dependencies.length} ${tr("records")}`}</p>
          </div>
          <Link className="text-button" href="/projects/dependencies">
            {tr("Open register")}
          </Link>
        </div>
        {data.dependencies.length === 0 ? (
          <EmptyState title="No dependencies" detail="This task has no dependencies in the demo data." />
        ) : (
          <div className="projects-table-scroll" role="region" aria-label={tr("Dependencies")} tabIndex={0}>
            <div className="projects-table" style={{ ["--projects-cols" as string]: "4" }}>
              <div className="projects-row projects-head" role="row">
                <span>{tr("Source task")}</span>
                <span>{tr("Target task")}</span>
                <span>{tr("Type")}</span>
                <span>{tr("Status")}</span>
              </div>
              {data.dependencies.map((dependency) => (
                <div className="projects-row" role="row" key={String(dependency.id)}>
                  <span data-label={tr("Source task")}>{tr(String(dependency.source))}</span>
                  <span data-label={tr("Target task")}>{tr(String(dependency.target))}</span>
                  <span data-label={tr("Type")}>
                    <Badge tone={projectTone(String(dependency.type))}>{tr(String(dependency.type))}</Badge>
                  </span>
                  <span data-label={tr("Status")}>
                    <Badge tone={projectTone(String(dependency.status))}>{tr(String(dependency.status))}</Badge>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {data.activity.length > 0 && (
        <section className="panel projects-table-panel">
          <div className="panel-head">
            <div>
              <h2>{tr("Change log")}</h2>
              <p>{`${data.activity.length} ${tr("records")}`}</p>
            </div>
            <Link className="text-button" href="/projects/activity">
              {tr("Open register")}
            </Link>
          </div>
          <div className="projects-table-scroll" role="region" aria-label={tr("Change log")} tabIndex={0}>
            <div className="projects-table" style={{ ["--projects-cols" as string]: "4" }}>
              <div className="projects-row projects-head" role="row">
                <span>{tr("Timestamp")}</span>
                <span>{tr("Action")}</span>
                <span>{tr("User")}</span>
                <span>{tr("New")}</span>
              </div>
              {data.activity.map((entry) => (
                <div className="projects-row" role="row" key={String(entry.id)}>
                  <span data-label={tr("Timestamp")}>{String(entry.timestamp)}</span>
                  <span data-label={tr("Action")}>{tr(String(entry.action))}</span>
                  <span data-label={tr("User")}>{tr(String(entry.user))}</span>
                  <span data-label={tr("New")}>{tr(String(entry.next))}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ProjectTaskDetailScreen;
