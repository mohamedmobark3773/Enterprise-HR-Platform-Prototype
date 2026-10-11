import type { ProjectRow } from "@/types/projects";
import { formatDzd, formatNumber } from "@/lib/projects/projects-service";
import type { ProjectColumnDef } from "@/lib/projects/projects-config-types";

const GREEN = /^(active|approved|completed|done|on track|on budget|satisfied|current|assigned|balanced|available|resolved|closed|low|passed|in review)$/i;
const AMBER = /^(at risk|pending|watch|in progress|mitigating|medium|on hold|under review|adjusting|not started|planned|in review|superseded|available)$/i;
const RED = /^(delayed|over budget|blocked|open|high|critical|rejected|overload|archived|failed)$/i;
const BLUE = /^(planning|scheduled|active|tracking|fs|ss|ff)$/i;
const VIOLET = /^(procurement|drilling|completion|mobilization)$/i;

/** Map a project status value to the shared NEXUS badge tone palette. */
export function projectTone(value: string): string {
  const text = String(value ?? "").trim();
  if (GREEN.test(text)) return "green";
  if (RED.test(text)) return "red";
  if (AMBER.test(text)) return "amber";
  if (VIOLET.test(text)) return "violet";
  if (BLUE.test(text)) return "blue";
  return "neutral";
}

/** Format a cell value according to its column kind (locale-safe, deterministic). */
export function formatCell(row: ProjectRow, column: ProjectColumnDef): string {
  const raw = row[column.key];
  if (raw === undefined || raw === null || raw === "") return "—";
  switch (column.kind) {
    case "currency": {
      const numeric = Number(raw);
      return Number.isNaN(numeric) ? String(raw) : formatDzd(numeric * 1_000_000);
    }
    case "number": {
      const numeric = Number(raw);
      return Number.isNaN(numeric) ? String(raw) : formatNumber(numeric);
    }
    case "percent":
      return `${raw}%`;
    default:
      return String(raw);
  }
}

/** Numeric aggregation helper used by KPI and chart builders. */
export function sumBy(rows: ProjectRow[], key: string): number {
  return rows.reduce((total, row) => {
    const value = Number(row[key]);
    return total + (Number.isNaN(value) ? 0 : value);
  }, 0);
}

export function averageBy(rows: ProjectRow[], key: string): number {
  if (rows.length === 0) return 0;
  return sumBy(rows, key) / rows.length;
}

export function countWhere(rows: ProjectRow[], predicate: (row: ProjectRow) => boolean): number {
  return rows.filter(predicate).length;
}

/** Distinct values of a field, used to build grouping charts. */
export function distinctValues(rows: ProjectRow[], key: string): string[] {
  return Array.from(new Set(rows.map((row) => String(row[key] ?? "")))).filter((value) => value !== "");
}
