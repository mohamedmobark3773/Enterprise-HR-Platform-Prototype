import type { Stage8Cell, Stage8Column, Stage8Row, Stage8Tone } from "@/lib/stage8/types";

/** Locale-stable money/number helpers shared across Stage 8 screens (DZD). */
export function formatDzd(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(2)} M DZD`;
  if (Math.abs(value) >= 1_000) return `${Math.round(value / 1_000)} K DZD`;
  return `${value} DZD`;
}

export function formatNumber(value: number, digits = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

const TONES: Record<string, Stage8Tone> = {
  active: "green",
  "on track": "green",
  completed: "green",
  approved: "green",
  healthy: "green",
  delivered: "green",
  "at risk": "amber",
  delayed: "red",
  blocked: "red",
  critical: "red",
  failed: "red",
  overdue: "red",
  high: "red",
  pending: "amber",
  "requires human review": "amber",
  "needs review": "amber",
  "low confidence": "amber",
  scheduled: "blue",
  draft: "neutral",
  archived: "neutral",
  paused: "neutral",
  medium: "amber",
  low: "green",
  robust: "green",
  monitored: "blue",
  "demand-blind": "amber",
  "insufficient-data": "neutral",
};

/** Map any human status/risk label to a NEXUS tone. */
export function stage8Tone(value: string): Stage8Tone {
  return TONES[value.trim().toLowerCase()] ?? "neutral";
}

/** Render a cell for display using its column definition. */
export function formatCell(column: Stage8Column, row: Stage8Row): string {
  const raw = row[column.key];
  if (raw === undefined || raw === null || raw === "") return "—";
  switch (column.kind) {
    case "currency":
      return formatDzd(Number(raw) * 1_000_000);
    case "percent":
      return `${raw}%`;
    case "number":
      return formatNumber(Number(raw));
    default:
      return String(raw);
  }
}

/** CSV-ready value (currency/number columns export the raw number, not the formatted string). */
export function csvCell(column: Stage8Column, row: Stage8Row): string {
  const raw = row[column.key];
  return raw === undefined || raw === null ? "" : String(raw);
}

function csvEscape(value: Stage8Cell): string {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

/**
 * Generate a real CSV file from rows and trigger a client-side download.
 * Returns false when the browser blocks the operation so callers can avoid a
 * false success message.
 */
export function exportCsv(
  fileName: string,
  columns: Stage8Column[],
  rows: Stage8Row[]
): boolean {
  if (typeof document === "undefined") return false;
  try {
    const header = columns.map((column) => csvEscape(column.label)).join(",");
    const body = rows
      .map((row) => columns.map((column) => csvEscape(csvCell(column, row))).join(","))
      .join("\n");
    const csv = `${header}\n${body}`;
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch {
    return false;
  }
}
