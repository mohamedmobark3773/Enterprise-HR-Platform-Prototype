import { projectSeeds, type ProjectSeedData } from "@/lib/projects/projects-data";
import type { ProjectRow, ProjectValue } from "@/types/projects";

/**
 * Frontend service boundary for Project Management (Stage 7) records.
 *
 * No project-management backend is connected, so this service implements honest
 * demo behaviour: seed data ships with the bundle and is labelled as demo data in
 * the UI; mutations persist in localStorage for the current browser; the API
 * surface (list/create/update/remove/reset) mirrors a REST resource so a real
 * endpoint can be swapped in later without touching presentation components.
 */

const STORAGE_KEY = "nexus-projects-v1";
const LATENCY_MS = 140;

export type ProjectSeedKey = keyof ProjectSeedData;

type StoreShape = Partial<{ [K in ProjectSeedKey]: ProjectRow[] }>;

let memoryStore: StoreShape = {};
let hydrated = false;
const listeners = new Set<() => void>();

function cloneRows<T extends ProjectRow>(rows: T[]): T[] {
  return rows.map((row) => ({ ...row })) as T[];
}

function seedFor(key: ProjectSeedKey): ProjectRow[] {
  return cloneRows(projectSeeds[key] as ProjectRow[]);
}

function readStorage(): StoreShape {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoreShape;
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function writeStorage() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
  } catch {
    // storage unavailable (private mode / quota) — in-memory state still works
  }
}

function seedForAll(): StoreShape {
  const all: StoreShape = {};
  (Object.keys(projectSeeds) as ProjectSeedKey[]).forEach((key) => {
    all[key] = seedFor(key);
  });
  return all;
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  memoryStore = { ...seedForAll(), ...readStorage() };
  hydrated = true;
}

function notify() {
  listeners.forEach((listener) => listener());
}

/** Subscribe to record mutations so every mounted screen stays in sync. */
export function subscribeProjects(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function delay(ms = LATENCY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function collectionRows(key: ProjectSeedKey): ProjectRow[] {
  hydrate();
  const rows = memoryStore[key];
  if (rows) return rows;
  const seeded = seedFor(key);
  memoryStore[key] = seeded;
  return seeded;
}

function nextId(key: ProjectSeedKey, rows: ProjectRow[]): string {
  const prefixes: Record<string, string> = {
    projects: "PM-2026-9",
    phases: "PH-9",
    tasks: "TASK-9",
    subtasks: "ST-9",
    assignments: "AS-9",
    workload: "WL-9",
    progress: "PG-9",
    milestones: "MS-9",
    costs: "CS-9",
    budget: "BG-9",
    risks: "RK-9",
    issues: "IS-9",
    dependencies: "DP-9",
    activity: "AL-9",
    documents: "DOC-9",
    approvals: "AP-9",
  };
  const prefix = prefixes[key] || "REC-";
  let index = rows.length + 1;
  let candidate = `${prefix}${index}`;
  while (rows.some((row) => row.id === candidate)) {
    index += 1;
    candidate = `${prefix}${index}`;
  }
  return candidate;
}

/** Load every demo record for one collection. */
export async function listRows<T extends ProjectRow>(key: ProjectSeedKey): Promise<T[]> {
  await delay();
  return cloneRows(collectionRows(key) as T[]);
}

/** Create a record; an `id` is assigned when the form does not provide one. */
export async function createRow<T extends ProjectRow>(
  key: ProjectSeedKey,
  input: Partial<T>
): Promise<T> {
  await delay();
  const rows = collectionRows(key);
  const record = { ...(input as ProjectRow) };
  if (!record.id) record.id = nextId(key, rows);
  const updated = [...rows, record];
  memoryStore[key] = updated;
  writeStorage();
  notify();
  return { ...(record as T) };
}

/** Patch an existing record by id. Throws when the record no longer exists. */
export async function updateRow<T extends ProjectRow>(
  key: ProjectSeedKey,
  id: string,
  patch: Partial<T>
): Promise<T> {
  await delay();
  const rows = collectionRows(key);
  const existing = rows.find((row) => row.id === id);
  if (!existing) throw new Error(`Record ${id} not found`);
  const updated = rows.map((row) => (row.id === id ? { ...row, ...(patch as ProjectRow) } : row));
  memoryStore[key] = updated;
  writeStorage();
  notify();
  return { ...(updated.find((row) => row.id === id) as T) };
}

/** Delete a record by id. Throws when the record no longer exists. */
export async function removeRow(key: ProjectSeedKey, id: string): Promise<void> {
  await delay();
  const rows = collectionRows(key);
  if (!rows.some((row) => row.id === id)) throw new Error(`Record ${id} not found`);
  memoryStore[key] = rows.filter((row) => row.id !== id);
  writeStorage();
  notify();
}

/** Restore the shipped demo data for one collection. */
export async function resetRows(key: ProjectSeedKey): Promise<ProjectRow[]> {
  await delay();
  const seeded = seedFor(key);
  memoryStore[key] = seeded;
  writeStorage();
  notify();
  return cloneRows(seeded);
}

/** Restore shipped demo data for every project collection. */
export async function resetAllProjectData(): Promise<void> {
  await delay(220);
  memoryStore = seedForAll();
  hydrated = true;
  writeStorage();
  notify();
}

export interface ProjectFieldRule {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "textarea";
  options?: string[];
  required?: boolean;
  min?: number;
  max?: number;
}

export type ProjectValidationErrors = Record<string, string>;

/**
 * Validate a project form payload against the field rules of a screen.
 * Returns translated-friendly English messages; callers pass them through `tr()`.
 */
export function validateProjectForm(
  rules: ProjectFieldRule[],
  values: Record<string, ProjectValue>
): ProjectValidationErrors {
  const errors: ProjectValidationErrors = {};
  rules.forEach((rule) => {
    const raw = values[rule.key];
    const value = typeof raw === "string" ? raw.trim() : raw;
    if (rule.required && (value === undefined || value === null || value === "")) {
      errors[rule.key] = "This field is required.";
      return;
    }
    if (value === undefined || value === "" || value === null) return;
    if (rule.type === "number") {
      const numeric = typeof value === "number" ? value : Number(value);
      if (Number.isNaN(numeric)) {
        errors[rule.key] = "Enter a valid number.";
        return;
      }
      if (rule.min !== undefined && numeric < rule.min) {
        errors[rule.key] = `Minimum value is ${rule.min}.`;
        return;
      }
      if (rule.max !== undefined && numeric > rule.max) {
        errors[rule.key] = `Maximum value is ${rule.max}.`;
        return;
      }
    }
    if (rule.type === "select" && rule.options && !rule.options.includes(String(value))) {
      errors[rule.key] = "Select one of the available options.";
      return;
    }
    if (rule.type === "date" && Number.isNaN(Date.parse(String(value)))) {
      errors[rule.key] = "Enter a valid date.";
    }
  });
  return errors;
}

function csvEscape(value: ProjectValue): string {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

/** Generate a real CSV file from the current rows and trigger a download. */
export function exportProjectCsv(
  fileName: string,
  columns: { key: string; label: string }[],
  rows: ProjectRow[]
): boolean {
  if (typeof document === "undefined") return false;
  try {
    const header = columns.map((column) => csvEscape(column.label)).join(",");
    const body = rows
      .map((row) => columns.map((column) => csvEscape(row[column.key] ?? "")).join(","))
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

/** Locale-aware money / number helpers used across project screens (DZD). */
export function formatDzd(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(2)} M DZD`;
  if (Math.abs(value) >= 1_000) return `${Math.round(value / 1_000)} K DZD`;
  return `${value} DZD`;
}

export function formatMoney(value: number): string {
  return formatDzd(value);
}

export function formatNumber(value: number, digits = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
