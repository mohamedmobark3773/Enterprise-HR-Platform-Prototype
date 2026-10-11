"use client";

import { useMemo, useState } from "react";

export interface InventoryRecord {
  id: string;
  reference: string;
  name: string;
  context: string;
  value: string;
  status: string;
  tone: string;
}

export interface InventoryRecordInput {
  reference: string;
  name: string;
  context: string;
  value: string;
  status: string;
}

export type InventoryTone = "green" | "amber" | "red" | "blue" | "neutral";

const GREEN = ["healthy", "approved", "active", "available", "operational", "completed", "valid", "verified", "passed", "ready"];
const RED = ["critical", "blocked", "missing", "out of stock", "exception"];
const AMBER = ["low", "monitor", "review", "pending", "risk", "claim", "expiring", "near capacity", "quarantine", "restricted", "busy", "controlled"];
const BLUE = ["transit", "strategic", "action", "draft", "new", "inspection", "proposed"];

/** Derive a badge tone from a status label so created/edited rows stay consistent. */
export function statusTone(status: string): InventoryTone {
  const s = status.toLowerCase();
  if (GREEN.some((k) => s.includes(k))) return "green";
  if (RED.some((k) => s.includes(k))) return "red";
  if (AMBER.some((k) => s.includes(k))) return "amber";
  if (BLUE.some((k) => s.includes(k))) return "blue";
  return "neutral";
}

export function normalizeRecords(
  initial: ReadonlyArray<{ id?: string; reference: string; name: string; context: string; value: string; status: string; tone?: string }>,
): InventoryRecord[] {
  return initial.map((r, index) => ({
    id: r.id || `${r.reference.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `row-${index}`}`,
    reference: r.reference,
    name: r.name,
    context: r.context,
    value: r.value,
    status: r.status,
    tone: r.tone || statusTone(r.status),
  }));
}

export function uniqueStatuses(records: InventoryRecord[]): string[] {
  const seen: string[] = [];
  for (const r of records) {
    if (!seen.includes(r.status)) seen.push(r.status);
  }
  return seen;
}

export type SortKey = "reference" | "name" | "value" | "status";
export type SortDir = "asc" | "desc";

export function compareRecords(a: InventoryRecord, b: InventoryRecord, key: SortKey, dir: SortDir): number {
  const result = String(a[key]).localeCompare(String(b[key]), undefined, { numeric: true, sensitivity: "base" });
  return dir === "asc" ? result : -result;
}

export interface InventoryStore {
  records: InventoryRecord[];
  create: (input: InventoryRecordInput) => InventoryRecord;
  update: (id: string, input: InventoryRecordInput) => void;
  remove: (id: string) => void;
  isReferenceTaken: (reference: string, exceptId?: string) => boolean;
}

/**
 * Demo-session record store. The Inventory module ships with static mock data
 * and no mutation API, so create/edit/delete apply to in-memory session state
 * only. Callers label this scope in the UI; nothing here claims persistence.
 */
export function useInventoryRecords(
  initial: ReadonlyArray<{ id?: string; reference: string; name: string; context: string; value: string; status: string; tone?: string }>,
): InventoryStore {
  const [records, setRecords] = useState<InventoryRecord[]>(() => normalizeRecords(initial));

  const api = useMemo<InventoryStore>(() => {
    const isReferenceTaken = (reference: string, exceptId?: string) =>
      records.some((r) => r.id !== exceptId && r.reference.toLowerCase() === reference.trim().toLowerCase());
    return {
      records,
      isReferenceTaken,
      create: (input) => {
        const record: InventoryRecord = {
          id: `gen-${Date.now().toString(36)}`,
          reference: input.reference.trim(),
          name: input.name.trim(),
          context: input.context.trim(),
          value: input.value.trim(),
          status: input.status,
          tone: statusTone(input.status),
        };
        setRecords((current) => [record, ...current]);
        return record;
      },
      update: (id, input) => {
        setRecords((current) =>
          current.map((r) =>
            r.id === id
              ? {
                  ...r,
                  reference: input.reference.trim(),
                  name: input.name.trim(),
                  context: input.context.trim(),
                  value: input.value.trim(),
                  status: input.status,
                  tone: statusTone(input.status),
                }
              : r,
          ),
        );
      },
      remove: (id) => {
        setRecords((current) => current.filter((r) => r.id !== id));
      },
    };
  }, [records]);

  return api;
}

function toCsvCell(value: string): string {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** Download the given rows as CSV in the browser. Returns the row count written. */
export function downloadInventoryCsv(filename: string, header: string[], rows: string[][]): number {
  const lines = [header.map(toCsvCell).join(","), ...rows.map((row) => row.map(toCsvCell).join(","))];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  return rows.length;
}

export function exportSlugDate(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
}
