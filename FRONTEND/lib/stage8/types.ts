import type { AIPrediction, PredictionRisk, PredictionStatus } from "@/types/ai";

/**
 * Stage 8 (Reports, GIS & AI) shared types.
 *
 * These types are deliberately presentation-layer only: every Stage 8 screen is
 * driven by typed demo data (no backend). The AI prediction shape reuses the
 * existing `AIPrediction` contract from `@/types/ai` so the AI Center speaks the
 * same language as the rest of the platform.
 */

export type Stage8Tone = "green" | "red" | "amber" | "violet" | "blue" | "neutral";

export interface Stage8Kpi {
  label: string;
  value: string;
  detail?: string;
}

export interface Stage8Stat {
  label: string;
  value: string;
}

export type Stage8ColumnKind = "text" | "status" | "number" | "currency" | "percent" | "date";

export interface Stage8Column {
  key: string;
  label: string;
  kind?: Stage8ColumnKind;
  align?: "start" | "end";
}

export type Stage8Cell = string | number;

export interface Stage8Row {
  id: string;
  [key: string]: Stage8Cell;
}

export interface Stage8Series {
  name: string;
  values: number[];
  tone?: Stage8Tone;
}

export interface Stage8Chart {
  title: string;
  kind: "bars" | "lines";
  labels: string[];
  series: Stage8Series[];
  footnote?: string;
}

export interface Stage8FooterNote {
  tone: Stage8Tone;
  text: string;
}

/** Domain/band used to group the 24 Stage 8 screen families. */
export type Stage8Module = "reports" | "gis" | "ai-center";

export type Stage8ScreenKind = "dashboard" | "family" | "builder" | "preview" | "scheduled" | "saved" | "map" | "analytics" | "models" | "predictions" | "assistant";

export interface Stage8ScreenDef {
  key: string;
  label: string;
  path: string;
  module: Stage8Module;
  kind: Stage8ScreenKind;
}

/** A reusable AI insight rendered on report, GIS and AI screens. */
export interface Stage8AiInsight {
  contextLabel: string;
  headline: string;
  summary: string;
  explanation: string;
  recommendedAction: string;
  confidence: number;
  riskLevel: PredictionRisk;
  modelId: string;
  modelVersion: string;
  statusLabel: string;
  createdAt: string;
}

export type Stage8Prediction = AIPrediction;
export type { AIPrediction, PredictionRisk, PredictionStatus };
