"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageTitle } from "@/components/ui/PageTitle";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { EmptyState, LoadingState } from "@/components/ui/Feedback";
import { FleetInsight } from "@/components/fleet/FleetInsight";
import { useApp } from "@/lib/context/AppContext";
import { ProjectsNav } from "@/components/projects/ProjectsNav";
import { countWhere, projectTone } from "@/lib/projects/projects-utils";
import { listRows, type ProjectSeedKey } from "@/lib/projects/projects-service";
import type { ProjectRow } from "@/types/projects";

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseDate(value: string): number | null {
  const match = String(value).match(/^(\d{1,2}) (\w{3}) (\d{4})$/);
  if (!match) return null;
  const day = Number(match[1]);
  const month = MONTHS[match[2]];
  const year = Number(match[3]);
  if (month === undefined) return null;
  return Date.UTC(year, month, day);
}

interface TimelineBar {
  id: string;
  label: string;
  owner: string;
  status: string;
  start: number;
  end: number;
}

export function ProjectsTimelineScreen() {
  const { tr } = useApp();
  const [phases, setPhases] = useState<ProjectRow[] | null>(null);
  const [milestones, setMilestones] = useState<ProjectRow[] | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [phaseRows, milestoneRows] = await Promise.all<ProjectRow[]>([
        listRows("phases"),
        listRows("milestones"),
      ]);
      if (!alive) return;
      setPhases(phaseRows);
      setMilestones(milestoneRows);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const bars: TimelineBar[] = useMemo(() => {
    if (!phases) return [];
    return phases
      .map((phase) => {
        const start = parseDate(String(phase.start));
        const end = parseDate(String(phase.end));
        if (start === null || end === null) return null;
        return {
          id: String(phase.id),
          label: String(phase.name),
          owner: String(phase.owner),
          status: String(phase.status),
          start,
          end,
        };
      })
      .filter((bar): bar is TimelineBar => bar !== null);
  }, [phases]);

  const bounds = useMemo(() => {
    const dates = bars.flatMap((bar) => [bar.start, bar.end]);
    if (dates.length === 0) return { min: 0, max: 1 };
    const min = Math.min(...dates);
    const max = Math.max(...dates);
    return { min, max: max > min ? max : min + 1 };
  }, [bars]);

  const loading = phases === null || milestones === null;

  const position = (value: number) => ((value - bounds.min) / (bounds.max - bounds.min)) * 100;

  const milestoneMarkers = useMemo(() => {
    if (!milestones) return [];
    return milestones
      .map((milestone) => {
        const due = parseDate(String(milestone.due));
        if (due === null) return null;
        return {
          id: String(milestone.id),
          label: String(milestone.milestone),
          status: String(milestone.status),
          due,
        };
      })
      .filter((marker): marker is { id: string; label: string; status: string; due: number } => marker !== null);
  }, [milestones]);

  return (
    <>
      <ProjectsNav />
      <PageTitle
        eyebrow="Stage 7 · Projects"
        title="Project timeline"
        subtitle="Phase plan and milestone gates across the delivery schedule"
        actions={
          <Link className="secondary-button" href="/projects/milestones">
            <Icon name="calendar" size={15} /> {tr("Open milestones")}
          </Link>
        }
      />

      <section className="panel inventory-kpi-panel">
        <div className="inventory-kpi-grid">
          <div className="inventory-kpi">
            <span>{tr("Phases")}</span>
            <strong>{loading ? "—" : String(bars.length)}</strong>
            <small>{tr("In the active plan")}</small>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Milestones")}</span>
            <strong>{loading ? "—" : String(milestoneMarkers.length)}</strong>
          </div>
          <div className="inventory-kpi">
            <span>{tr("At risk")}</span>
            <strong>{loading ? "—" : String(bars.filter((bar) => bar.status === "At risk").length + countWhere(milestones ?? [], (row) => row.status === "At risk"))}</strong>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Baseline")}</span>
            <strong>01 Oct 2026</strong>
            <small>{tr("Approved schedule")}</small>
          </div>
        </div>
      </section>

      {loading ? (
        <section className="panel">
          <LoadingState label="Loading timeline…" />
        </section>
      ) : bars.length === 0 ? (
        <EmptyState title="No timeline data" detail="Restore the demo data to see the phase plan." />
      ) : (
        <div className="inventory-workspace">
          <section className="panel projects-timeline-panel">
            <div className="panel-head">
              <div>
                <h2>{tr("Phase plan")}</h2>
                <p>{`${bars.length} ${tr("phases")} · ${tr("Demo data")}`}</p>
              </div>
            </div>
            <div className="projects-timeline" role="region" aria-label={tr("Phase plan")} tabIndex={0}>
              {bars.map((bar) => {
                const left = Math.max(0, position(bar.start));
                const width = Math.max(4, position(bar.end) - position(bar.start));
                return (
                  <div className="projects-timeline-row" key={bar.id}>
                    <div className="projects-timeline-meta">
                      <strong>{tr(bar.label)}</strong>
                      <small>{tr(bar.owner)}</small>
                    </div>
                    <div className="projects-timeline-track">
                      <span
                        className={`projects-timeline-bar projects-tone-${projectTone(bar.status)}`}
                        style={{ left: `${left}%`, width: `${width}%` }}
                      >
                        <em>{tr(bar.status)}</em>
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="projects-timeline-markers">
                {milestoneMarkers.map((marker) => (
                  <div className="projects-timeline-marker" key={marker.id} style={{ left: `${Math.max(0, Math.min(100, position(marker.due)))}%` }}>
                    <i aria-hidden="true" />
                    <span>{tr(marker.label)}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="fleet-side">
            <FleetInsight
              variant="compact"
              title="Timeline insight"
              lines={[
                `The active plan contains ${bars.length} phases ending near ${String(phases?.[bars.length - 1]?.end ?? "")}.`,
                `${bars.filter((bar) => bar.status === "At risk").length} phases are flagged at risk.`,
                "Dependencies are finish-to-start unless noted on the dependencies register.",
              ]}
              action="Open dependencies"
            />
          </div>
        </div>
      )}

      {!loading && milestoneMarkers.length > 0 && (
        <section className="panel projects-table-panel">
          <div className="panel-head">
            <div>
              <h2>{tr("Milestone gates")}</h2>
              <p>{`${milestoneMarkers.length} ${tr("records")}`}</p>
            </div>
          </div>
          <div className="projects-table-scroll" role="region" aria-label={tr("Milestone gates")} tabIndex={0}>
            <div className="projects-table" style={{ ["--projects-cols" as string]: "3" }}>
              <div className="projects-row projects-head" role="row">
                <span>{tr("Milestone")}</span>
                <span>{tr("Due")}</span>
                <span>{tr("Status")}</span>
              </div>
              {milestoneMarkers.map((marker) => (
                <div className="projects-row" role="row" key={marker.id}>
                  <span data-label={tr("Milestone")}>{tr(marker.label)}</span>
                  <span data-label={tr("Due")}>{String(milestones?.find((row) => String(row.id) === marker.id)?.due ?? "")}</span>
                  <span data-label={tr("Status")}>
                    <Badge tone={projectTone(marker.status)}>{tr(marker.status)}</Badge>
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

export default ProjectsTimelineScreen;
