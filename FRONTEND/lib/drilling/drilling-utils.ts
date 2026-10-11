import type { DrillingRow } from "@/types/drilling";
import { formatNumber, formatUsd } from "@/lib/drilling/drilling-service";
import type { DrillingColumnDef } from "@/lib/drilling/drilling-config-types";

const GREEN = /^(active|approved|available|closed|in stock|in spec|on budget|passed|producing|producing|verified|ready|complete|completed|on tour|submitted|running|holding)$/i;
const AMBER = /^(draft|pending|pending qc|review|under review|watch|adjusting|low stock|on order|standby|mitigating|building|in progress|planned|rest|training|completing|medium)$/i;
const RED = /^(over budget|out of spec|backordered|rejected|failed|junked|investigating|open|high|lost time|suspended|retired|maintenance|dropping|over budget|overbudget)$/i;
const BLUE = /^(drilling|planning|night|day|on order|submitted|measuring|landing)$/i;
const VIOLET = /^(exploration|development|appraisal|workover)$/i;

/** Map a drilling status value to the shared NEXUS badge tone palette. */
export function drillingTone(value: string): string {
  const text = String(value ?? "").trim();
  if (GREEN.test(text)) return "green";
  if (RED.test(text)) return "red";
  if (AMBER.test(text)) return "amber";
  if (VIOLET.test(text)) return "violet";
  if (BLUE.test(text)) return "blue";
  if (/^\d/.test(text)) return "neutral";
  return "neutral";
}

/** Format a cell value according to its column kind (locale-safe, deterministic). */
export function formatCell(row: DrillingRow, column: DrillingColumnDef): string {
  const raw = row[column.key];
  if (raw === undefined || raw === null || raw === "") return "—";
  switch (column.kind) {
    case "currency": {
      const numeric = Number(raw);
      return Number.isNaN(numeric) ? String(raw) : formatUsd(numeric);
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
export function sumBy(rows: DrillingRow[], key: string): number {
  return rows.reduce((total, row) => {
    const value = Number(row[key]);
    return total + (Number.isNaN(value) ? 0 : value);
  }, 0);
}

export function averageBy(rows: DrillingRow[], key: string): number {
  if (rows.length === 0) return 0;
  return sumBy(rows, key) / rows.length;
}

export function countWhere(rows: DrillingRow[], predicate: (row: DrillingRow) => boolean): number {
  return rows.filter(predicate).length;
}
