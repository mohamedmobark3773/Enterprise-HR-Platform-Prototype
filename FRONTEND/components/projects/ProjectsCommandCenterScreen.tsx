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

interface CommandData {
  projects: ProjectRow[];
  risks: ProjectRow[];
  issues: ProjectRow[];
  approvals: ProjectRow[];
  budget: ProjectRow[];
  progress: ProjectRow[];
}

const commandKeys: ProjectSeedKey[] = ["projects", "risks", "issues", "approvals", "budget", "progress"];

async function loadCommand(): Promise<CommandData> {
  const [projects, risks, issues, approvals, budget, progress] = await Promise.all(
    commandKeys.map((key) => listRows(key))
  );
  return { projects, risks, issues, approvals, budget, progress } as CommandData;
}

export function ProjectsCommandCenterScreen() {
  const { tr } = useApp();
  const [data, setData] = useState<CommandData | null>(null);

  useEffect(() => {
    let alive = true;
    void loadCommand().then((result) => {
      if (alive) setData(result);
    });
    return () => {
      alive = false;
    };
  }, []);

  const planned = data ? sumBy(data.budget, "planned") : 0;
  const actual = data ? sumBy(data.budget, "actual") : 0;

  const kpis = [
    { label: "Active projects", value: data ? String(countWhere(data.projects, (row) => row.status === "Active" || row.status === "On track")) : "—" },
    { label: "Needs attention", value: data ? String(countWhere(data.projects, (row) => row.status === "At risk" || row.status === "Delayed")) : "—" },
    { label: "Open risks", value: data ? String(countWhere(data.risks, (row) => row.status !== "Closed")) : "—" },
    { label: "Open issues", value: data ? String(countWhere(data.issues, (row) => row.status === "Open" || row.status === "In progress")) : "—" },
    { label: "Pending approvals", value: data ? String(countWhere(data.approvals, (row) => row.status === "Pending")) : "—" },
    { label: "Budget variance", value: data ? formatDzd((actual - planned) * 1_000_000) : "—" },
  ];

  const severityChart = data
    ? {
        title: "Risks by severity",
        labels: ["High", "Medium", "Low"],
        values: ["High", "Medium", "Low"].map((severity) => countWhere(data.risks, (row) => String(row.severity) === severity)),
      }
    : null;

  const topRisks = (data?.risks ?? [])
    .filter((row) => row.status !== "Closed")
    .sort((a, b) => Number(b.probability) - Number(a.probability))
    .slice(0, 5);

  const pendingApprovals = (data?.approvals ?? []).filter((row) => row.status === "Pending").slice(0, 5);

  const aiLinks = [
    { label: "Delay prediction", href: "/projects/ai/delay" },
    { label: "Cost overrun prediction", href: "/projects/ai/cost-overrun" },
    { label: "Risk detection", href: "/projects/ai/risk" },
    { label: "Project health scoring", href: "/projects/ai/health" },
  ];

  return (
    <>
      <ProjectsNav />
      <PageTitle
        eyebrow="Stage 7 · Projects"
        title="Project command center"
        subtitle="Executive view of delivery health, risk and decisions awaiting action"
        actions={
          <Link className="primary-button" href="/projects/ai/health">
            <Icon name="spark" size={15} /> {tr("Run health scoring")}
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
          <LoadingState label="Loading command center…" />
        </section>
      ) : (
        <>
          <div className="inventory-workspace">
            <section className="panel projects-table-panel">
              <div className="panel-head">
                <div>
                  <h2>{tr("Top risks")}</h2>
                  <p>{`${topRisks.length} ${tr("highest-probability open risks")}`}</p>
                </div>
                <Link className="text-button" href="/projects/risks">
                  {tr("Open risks")}
                </Link>
              </div>
              <div className="projects-table-scroll" role="region" aria-label={tr("Top risks")} tabIndex={0}>
                <div className="projects-table" style={{ ["--projects-cols" as string]: "5" }}>
                  <div className="projects-row projects-head" role="row">
                    <span>{tr("Risk")}</span>
                    <span>{tr("Project")}</span>
                    <span>{tr("Probability")}</span>
                    <span>{tr("Severity")}</span>
                    <span>{tr("Owner")}</span>
                  </div>
                  {topRisks.map((risk) => (
                    <div className="projects-row" role="row" key={String(risk.id)}>
                      <span data-label={tr("Risk")}>{tr(String(risk.risk))}</span>
                      <span data-label={tr("Project")}>{tr(String(risk.project))}</span>
                      <span data-label={tr("Probability")}>{`${Number(risk.probability)}%`}</span>
                      <span data-label={tr("Severity")}>
                        <Badge tone={projectTone(String(risk.severity))}>{tr(String(risk.severity))}</Badge>
                      </span>
                      <span data-label={tr("Owner")}>{tr(String(risk.owner))}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="fleet-side">
              {severityChart && <FleetBarChart title={severityChart.title} labels={severityChart.labels} values={severityChart.values} />}
              <FleetInsight
                variant="compact"
                title="Command insight"
                lines={[
                  `${countWhere(data.projects, (row) => row.status === "At risk" || row.status === "Delayed")} projects require leadership attention.`,
                  `${countWhere(data.approvals, (row) => row.status === "Pending")} approval decisions are waiting.`,
                  `Average progress is ${Math.round(averageBy(data.projects, "progress"))}% across the portfolio.`,
                ]}
                action="Open approvals"
              />
            </div>
          </div>

          <div className="inventory-workspace">
            <section className="panel projects-table-panel">
              <div className="panel-head">
                <div>
                  <h2>{tr("Approvals awaiting decision")}</h2>
                  <p>{`${pendingApprovals.length} ${tr("pending requests")}`}</p>
                </div>
                <Link className="text-button" href="/projects/approvals">
                  {tr("Open approvals")}
                </Link>
              </div>
              <div className="projects-table-scroll" role="region" aria-label={tr("Approvals awaiting decision")} tabIndex={0}>
                <div className="projects-table" style={{ ["--projects-cols" as string]: "5" }}>
                  <div className="projects-row projects-head" role="row">
                    <span>{tr("Request")}</span>
                    <span>{tr("Requester")}</span>
                    <span>{tr("Approver")}</span>
                    <span>{tr("Date")}</span>
                    <span>{tr("Status")}</span>
                  </div>
                  {pendingApprovals.map((approval) => (
                    <div className="projects-row" role="row" key={String(approval.id)}>
                      <span data-label={tr("Request")}>{tr(String(approval.request))}</span>
                      <span data-label={tr("Requester")}>{tr(String(approval.requester))}</span>
                      <span data-label={tr("Approver")}>{tr(String(approval.approver))}</span>
                      <span data-label={tr("Date")}>{String(approval.date)}</span>
                      <span data-label={tr("Status")}>
                        <Badge tone={projectTone(String(approval.status))}>{tr(String(approval.status))}</Badge>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="fleet-side">
              <section className="panel projects-ai-shortcuts">
                <div className="panel-head">
                  <div>
                    <h2>{tr("AI intelligence")}</h2>
                    <p>{tr("Run an AI-ready prediction")}</p>
                  </div>
                </div>
                <div className="projects-shortcut-grid">
                  {aiLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <Icon name="spark" size={16} />
                      <span>{tr(link.label)}</span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProjectsCommandCenterScreen;
