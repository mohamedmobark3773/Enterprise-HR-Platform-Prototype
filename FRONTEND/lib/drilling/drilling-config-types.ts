import type { DrillingChartModel, DrillingKpi, DrillingRow, DrillingValue } from "@/types/drilling";
import type { DrillingSeedKey } from "@/lib/drilling/drilling-service";

export type DrillingColumnKind = "text" | "status" | "number" | "currency" | "percent" | "date";

export interface DrillingColumnDef {
  key: string;
  label: string;
  kind?: DrillingColumnKind;
  align?: "start" | "end";
}

export interface DrillingFormField {
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

export interface DrillingInsight {
  title: string;
  lines: (rows: DrillingRow[]) => string[];
  action: string;
}

export interface DrillingListConfig {
  collection: DrillingSeedKey;
  eyebrow: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  createAction: string;
  exportName: string;
  columns: DrillingColumnDef[];
  fields: DrillingFormField[];
  statusField?: string;
  tabs?: string[];
  kpis: (rows: DrillingRow[]) => DrillingKpi[];
  chart?: (rows: DrillingRow[]) => DrillingChartModel | undefined;
  insight?: DrillingInsight;
  detailHref?: (row: DrillingRow) => string | undefined;
  emptyLabel?: string;
  pageSize?: number;
}

export type DrillingCellValue = DrillingValue;
