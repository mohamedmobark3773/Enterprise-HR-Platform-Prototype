import type { ProjectChartModel, ProjectKpi, ProjectRow, ProjectValue } from "@/types/projects";
import type { ProjectSeedKey } from "@/lib/projects/projects-service";

export type ProjectColumnKind = "text" | "status" | "number" | "currency" | "percent" | "date";

export interface ProjectColumnDef {
  key: string;
  label: string;
  kind?: ProjectColumnKind;
  align?: "start" | "end";
}

export interface ProjectFormField {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "textarea";
  options?: string[];
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  help?: string;
  placeholder?: string;
  unit?: string;
}

export interface ProjectInsight {
  title: string;
  lines: (rows: ProjectRow[]) => string[];
  action: string;
}

export interface ProjectListConfig {
  collection: ProjectSeedKey;
  eyebrow: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  createAction: string;
  exportName: string;
  columns: ProjectColumnDef[];
  fields: ProjectFormField[];
  statusField?: string;
  tabs?: string[];
  kpis: (rows: ProjectRow[]) => ProjectKpi[];
  chart?: (rows: ProjectRow[]) => ProjectChartModel | undefined;
  insight?: ProjectInsight;
  detailHref?: (row: ProjectRow) => string | undefined;
  emptyLabel?: string;
  pageSize?: number;
}

export type ProjectCellValue = ProjectValue;
