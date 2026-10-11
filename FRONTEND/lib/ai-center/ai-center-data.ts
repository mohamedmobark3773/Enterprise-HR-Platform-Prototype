import type { AIModel, AIPrediction } from "@/types/ai";
import type {
  Stage8AiInsight,
  Stage8Chart,
  Stage8Column,
  Stage8Kpi,
  Stage8Row,
} from "@/lib/stage8/types";
import { barsChart, plannedVsActual } from "@/lib/reports/reports-data";

export const AI_SUBTITLE = "Algeria operations · Q4 2026 · Updated 09:42 UTC+1";

/**
 * Stage 8 AI model descriptor. It shares every field of the platform `AIModel`
 * contract but widens `domain` beyond the HR-only union and adds the operational
 * `predictionType` used by the AI Center.
 */
export type AiCenterModel = Omit<AIModel, "domain"> & {
  domain: string;
  predictionType: string;
};

export const aiPredictions: AIPrediction[] = [
  {
    entityId: "HM-104",
    entityType: "Well",
    modelId: "DR-COMP-02",
    modelVersion: "2.3.1",
    prediction: "Completion on 28 Oct, +3 days vs plan",
    confidence: 0.924,
    riskLevel: "Medium",
    explanation: "Reduced penetration rate and 6.2 h downtime over the last 5 days.",
    recommendedAction: "Inspect D65; allocate backup crew and confirm the weather window.",
    status: "Requires Human Review",
    createdAt: "2026-10-05T09:42:00Z",
    updatedAt: "2026-10-05T09:42:00Z",
    predictionType: "Schedule",
    sourceModule: "Drilling",
    inputReference: "DR-104",
    processingTime: 412,
    reviewStatus: "Pending",
    metadata: { horizonDays: 23 },
  },
  {
    entityId: "FL-44",
    entityType: "Vehicle",
    modelId: "FL-MAINT-03",
    modelVersion: "1.4.0",
    prediction: "Maintenance likely within 7 days",
    confidence: 0.871,
    riskLevel: "High",
    explanation: "Vibration trend and overdue service interval on the Adrar route.",
    recommendedAction: "Schedule service before the next Adrar run.",
    status: "Ready",
    createdAt: "2026-10-05T08:10:00Z",
    updatedAt: "2026-10-05T09:42:00Z",
    predictionType: "Maintenance",
    sourceModule: "Fleet",
    inputReference: "FL-44",
    processingTime: 288,
    reviewStatus: "Reviewed",
    reviewedBy: "Y. Khelifi",
    reviewedAt: "2026-10-05T09:05:00Z",
    metadata: { serviceDueKm: 420 },
  },
  {
    entityId: "PRJ-105",
    entityType: "Project",
    modelId: "PRJ-DELAY-04",
    modelVersion: "3.0.2",
    prediction: "Delay risk 0.71 for the In Salah package",
    confidence: 0.812,
    riskLevel: "High",
    explanation: "Supply corridor overlap and 6 open blockers on the critical path.",
    recommendedAction: "Re-sequence logistics and escalate the top two blockers.",
    status: "Warning",
    createdAt: "2026-10-04T16:20:00Z",
    updatedAt: "2026-10-05T09:42:00Z",
    predictionType: "Delivery",
    sourceModule: "Projects",
    inputReference: "PM-105",
    processingTime: 356,
    reviewStatus: "Pending",
    metadata: { openBlockers: 6 },
  },
  {
    entityId: "INV-03",
    entityType: "Material",
    modelId: "INV-OPT-01",
    modelVersion: "1.1.7",
    prediction: "Fuel-filter stock-out in 12 days",
    confidence: 0.902,
    riskLevel: "Medium",
    explanation: "Consumption rate exceeds replenishment lead time.",
    recommendedAction: "Raise a purchase order for 120 units.",
    status: "Ready",
    createdAt: "2026-10-05T07:00:00Z",
    updatedAt: "2026-10-05T09:42:00Z",
    predictionType: "Inventory",
    sourceModule: "Inventory",
    inputReference: "IN-03",
    processingTime: 173,
    reviewStatus: "Pending",
    metadata: { leadTimeDays: 9 },
  },
  {
    entityId: "OPS-Q4",
    entityType: "Operations",
    modelId: "ERP-FORE-01",
    modelVersion: "2.3.1",
    prediction: "Q4 operating cost +4.2% above budget",
    confidence: 0.906,
    riskLevel: "Medium",
    explanation: "Cost pressure concentrated in drilling logistics and fuel.",
    recommendedAction: "Review assumptions before circulating the forecast.",
    status: "Requires Human Review",
    createdAt: "2026-10-05T09:42:00Z",
    updatedAt: "2026-10-05T09:42:00Z",
    predictionType: "Forecast",
    sourceModule: "Reports",
    inputReference: "reports-dashboard",
    processingTime: 501,
    reviewStatus: "Pending",
    metadata: { variancePct: 4.2 },
  },
  {
    entityId: "HM-105",
    entityType: "Well",
    modelId: "GEO-RISK-01",
    modelVersion: "1.8.4",
    prediction: "Correlated downtime cluster within 12 km",
    confidence: 0.887,
    riskLevel: "Medium",
    explanation: "Two assets inside a 12 km radius show correlated downtime.",
    recommendedAction: "Confirm on-site conditions before relocating the D65 crew.",
    status: "Requires Human Review",
    createdAt: "2026-10-05T09:42:00Z",
    updatedAt: "2026-10-05T09:42:00Z",
    predictionType: "Risk",
    sourceModule: "GIS",
    inputReference: "HM-105",
    processingTime: 240,
    reviewStatus: "Pending",
    metadata: { radiusKm: 12 },
  },
  {
    entityId: "OPS-Q4",
    entityType: "Operations",
    modelId: "COST-VAR-05",
    modelVersion: "2.0.0",
    prediction: "Cost variance -1.2 M DZD for October",
    confidence: 0.764,
    riskLevel: "Low",
    explanation: "Under-spend driven by deferred maintenance activities.",
    recommendedAction: "Reconcile the deferred maintenance plan with finance.",
    status: "Ready",
    createdAt: "2026-10-03T11:30:00Z",
    updatedAt: "2026-10-05T09:42:00Z",
    predictionType: "Financial",
    sourceModule: "Reports",
    inputReference: "reports-financial",
    processingTime: 198,
    reviewStatus: "Reviewed",
    reviewedBy: "S. Boudiaf",
    reviewedAt: "2026-10-04T08:15:00Z",
    metadata: { varianceM: -1.2 },
  },
  {
    entityId: "HR-04",
    entityType: "Region",
    modelId: "HR-ATTR-02",
    modelVersion: "1.5.3",
    prediction: "Adrar attendance likely to drop below 92%",
    confidence: 0.688,
    riskLevel: "Low",
    explanation: "Rising leave requests combined with shift-coverage gaps.",
    recommendedAction: "Pre-position two relief operators in Adrar.",
    status: "Low Confidence",
    createdAt: "2026-10-05T06:30:00Z",
    updatedAt: "2026-10-05T09:42:00Z",
    predictionType: "Workforce",
    sourceModule: "HR",
    inputReference: "HR-04",
    processingTime: 132,
    reviewStatus: "Pending",
    metadata: { region: "Adrar" },
  },
];

export const aiModels: AiCenterModel[] = [
  {
    modelId: "ERP-FORE-01",
    modelName: "ERP Cost Forecast",
    modelVersion: "2.3.1",
    modelType: "Time series",
    domain: "Financial",
    predictionType: "Forecast",
    description: "Forecasts operating cost against budget from verified ERP records.",
    provider: "NEXUS Labs",
    framework: "Gradient boosted trees",
    environment: "Production",
    status: "Active",
    health: "Healthy",
    deploymentStatus: "Deployed",
    inputSchema: { revenue: "decimal", expenses: "decimal", period: "string" },
    outputSchema: { forecast: "decimal", variancePct: "decimal" },
    lastPrediction: "2026-10-05T09:42:00Z",
    predictionCount: 1284,
    performanceMetrics: { accuracy: 0.906, latency: 501 },
    owner: "Financial Planning",
    versions: ["1.0.0", "2.0.0", "2.3.1"],
    createdAt: "2025-04-11T00:00:00Z",
    updatedAt: "2026-10-01T00:00:00Z",
  },
  {
    modelId: "DR-COMP-02",
    modelName: "Drilling Completion",
    modelVersion: "2.3.1",
    modelType: "Regression",
    domain: "Drilling",
    predictionType: "Schedule",
    description: "Predicts well completion date and downtime risk.",
    provider: "NEXUS Labs",
    framework: "Random forest",
    environment: "Production",
    status: "Active",
    health: "Healthy",
    deploymentStatus: "Deployed",
    inputSchema: { well: "string", penetration: "decimal", downtime: "decimal" },
    outputSchema: { completionDate: "date", risk: "string" },
    lastPrediction: "2026-10-05T09:42:00Z",
    predictionCount: 2140,
    performanceMetrics: { accuracy: 0.924, latency: 412 },
    owner: "Drilling Operations",
    versions: ["2.0.0", "2.2.0", "2.3.1"],
    createdAt: "2025-02-02T00:00:00Z",
    updatedAt: "2026-10-02T00:00:00Z",
  },
  {
    modelId: "GEO-RISK-01",
    modelName: "Geospatial Risk",
    modelVersion: "1.8.4",
    modelType: "Clustering",
    domain: "Geospatial",
    predictionType: "Risk",
    description: "Detects correlated risk clusters across mapped assets.",
    provider: "NEXUS Labs",
    framework: "DBSCAN ensemble",
    environment: "Production",
    status: "Active",
    health: "Healthy",
    deploymentStatus: "Deployed",
    inputSchema: { lat: "decimal", lon: "decimal", downtime: "decimal" },
    outputSchema: { clusterId: "string", risk: "string" },
    lastPrediction: "2026-10-05T09:42:00Z",
    predictionCount: 860,
    performanceMetrics: { accuracy: 0.887, latency: 240 },
    owner: "GIS & Planning",
    versions: ["1.5.0", "1.8.4"],
    createdAt: "2025-06-19T00:00:00Z",
    updatedAt: "2026-09-20T00:00:00Z",
  },
  {
    modelId: "FL-MAINT-03",
    modelName: "Fleet Maintenance",
    modelVersion: "1.4.0",
    modelType: "Classification",
    domain: "Fleet",
    predictionType: "Maintenance",
    description: "Predicts maintenance events from vehicle telemetry.",
    provider: "NEXUS Labs",
    framework: "Gradient boosted trees",
    environment: "Production",
    status: "Active",
    health: "Degraded",
    deploymentStatus: "Deployed",
    inputSchema: { vehicle: "string", vibration: "decimal", km: "number" },
    outputSchema: { maintenanceDate: "date", probability: "decimal" },
    lastPrediction: "2026-10-05T08:10:00Z",
    predictionCount: 1975,
    performanceMetrics: { accuracy: 0.871, latency: 288 },
    owner: "Fleet Operations",
    versions: ["1.0.0", "1.4.0"],
    createdAt: "2025-03-08T00:00:00Z",
    updatedAt: "2026-09-28T00:00:00Z",
  },
  {
    modelId: "INV-OPT-01",
    modelName: "Inventory Optimizer",
    modelVersion: "1.1.7",
    modelType: "Optimization",
    domain: "Inventory",
    predictionType: "Inventory",
    description: "Forecasts stock-out and replenishment windows.",
    provider: "NEXUS Labs",
    framework: "Linear optimization",
    environment: "Production",
    status: "Active",
    health: "Healthy",
    deploymentStatus: "Deployed",
    inputSchema: { material: "string", consumption: "decimal", leadTime: "number" },
    outputSchema: { stockOutDate: "date", orderQty: "number" },
    lastPrediction: "2026-10-05T07:00:00Z",
    predictionCount: 1120,
    performanceMetrics: { accuracy: 0.902, latency: 173 },
    owner: "Supply Chain",
    versions: ["1.0.0", "1.1.7"],
    createdAt: "2025-05-14T00:00:00Z",
    updatedAt: "2026-09-30T00:00:00Z",
  },
  {
    modelId: "PRJ-DELAY-04",
    modelName: "Project Delay",
    modelVersion: "3.0.2",
    modelType: "Classification",
    domain: "Projects",
    predictionType: "Delivery",
    description: "Estimates schedule-delay probability for the portfolio.",
    provider: "NEXUS Labs",
    framework: "Random forest",
    environment: "Production",
    status: "Active",
    health: "Healthy",
    deploymentStatus: "Deployed",
    inputSchema: { project: "string", blockers: "number", workload: "decimal" },
    outputSchema: { delayProbability: "decimal", drivers: "string" },
    lastPrediction: "2026-10-04T16:20:00Z",
    predictionCount: 940,
    performanceMetrics: { accuracy: 0.812, latency: 356 },
    owner: "PMO",
    versions: ["2.0.0", "3.0.2"],
    createdAt: "2025-01-22T00:00:00Z",
    updatedAt: "2026-10-01T00:00:00Z",
  },
  {
    modelId: "COST-VAR-05",
    modelName: "Cost Variance",
    modelVersion: "2.0.0",
    modelType: "Regression",
    domain: "Financial",
    predictionType: "Financial",
    description: "Explains month-to-date cost variance.",
    provider: "NEXUS Labs",
    framework: "Gradient boosted trees",
    environment: "Staging",
    status: "Testing",
    health: "Healthy",
    deploymentStatus: "Deploying",
    inputSchema: { budget: "decimal", actual: "decimal" },
    outputSchema: { variance: "decimal" },
    lastPrediction: "2026-10-03T11:30:00Z",
    predictionCount: 410,
    performanceMetrics: { accuracy: 0.764, latency: 198 },
    owner: "Financial Control",
    versions: ["1.0.0", "2.0.0"],
    createdAt: "2025-08-30T00:00:00Z",
    updatedAt: "2026-09-25T00:00:00Z",
  },
  {
    modelId: "HR-ATTR-02",
    modelName: "Workforce Attendance",
    modelVersion: "1.5.3",
    modelType: "Regression",
    domain: "Workforce",
    predictionType: "Workforce",
    description: "Forecasts attendance by region from leave and shifts.",
    provider: "NEXUS Labs",
    framework: "Random forest",
    environment: "Production",
    status: "Active",
    health: "Healthy",
    deploymentStatus: "Deployed",
    inputSchema: { region: "string", leave: "number", shifts: "number" },
    outputSchema: { attendance: "decimal" },
    lastPrediction: "2026-10-05T06:30:00Z",
    predictionCount: 730,
    performanceMetrics: { accuracy: 0.688, latency: 132 },
    owner: "People Operations",
    versions: ["1.2.0", "1.5.3"],
    createdAt: "2025-07-11T00:00:00Z",
    updatedAt: "2026-09-18T00:00:00Z",
  },
];

export const aiCenterKpis: Stage8Kpi[] = [
  { label: "Models", value: "8" },
  { label: "Active predictions", value: "126" },
  { label: "Needs review", value: "9" },
  { label: "Avg confidence", value: "86.4%" },
];

export const aiCenterCharts: Stage8Chart[] = [
  plannedVsActual("Model accuracy", [78, 80, 82, 84, 86, 88], [74, 78, 81, 83, 85, 86]),
  barsChart("Predictions by type", [22, 30, 26, 34, 41, 38]),
  barsChart("Confidence distribution", [14, 22, 31, 28, 20, 16]),
  barsChart("Prediction volume", [40, 55, 61, 58, 66, 70]),
];

export const aiCenterModelsColumns: Stage8Column[] = [
  { key: "modelName", label: "Model" },
  { key: "modelId", label: "ID" },
  { key: "domain", label: "Domain" },
  { key: "predictionType", label: "Type" },
  { key: "version", label: "Version" },
  { key: "accuracy", label: "Accuracy" },
  { key: "predictions", label: "Predictions", kind: "number" },
  { key: "status", label: "Status", kind: "status" },
];

export function aiModelRows(): Stage8Row[] {
  return aiModels.map((model) => ({
    id: model.modelId,
    modelName: model.modelName,
    modelId: model.modelId,
    domain: model.domain,
    predictionType: model.predictionType,
    version: model.modelVersion,
    accuracy: `${(model.performanceMetrics.accuracy * 100).toFixed(1)}%`,
    predictions: model.predictionCount,
    status: model.status,
  }));
}

export const aiPredictionColumns: Stage8Column[] = [
  { key: "entityId", label: "Entity" },
  { key: "entityType", label: "Type" },
  { key: "prediction", label: "Prediction" },
  { key: "predictionType", label: "Prediction type" },
  { key: "confidence", label: "Confidence" },
  { key: "riskLevel", label: "Risk", kind: "status" },
  { key: "status", label: "Status", kind: "status" },
];

export function aiPredictionRows(): Stage8Row[] {
  return aiPredictions.map((prediction) => ({
    id: `${prediction.entityId}-${prediction.modelId}`,
    entityId: prediction.entityId,
    entityType: prediction.entityType,
    prediction: prediction.prediction,
    predictionType: prediction.predictionType ?? "—",
    confidence: `${(prediction.confidence * 100).toFixed(1)}%`,
    riskLevel: prediction.riskLevel,
    status: prediction.status,
  }));
}

export const aiDashboardInsight: Stage8AiInsight = {
  contextLabel: "NEXUS AI · Prediction · Needs review",
  headline: "HM-104 finish 28 Oct, +3 days · Confidence 92.4%",
  summary: "Medium risk. Reduced penetration and 6.2 h downtime.",
  explanation: "Inspect D65 and allocate a backup crew before the next operation.",
  recommendedAction: "Inspect D65; allocate backup crew and confirm the weather window.",
  confidence: 0.924,
  riskLevel: "Medium",
  modelId: "DR-COMP-02",
  modelVersion: "2.3.1",
  statusLabel: "Needs review",
  createdAt: "2026-10-05T09:42:00Z",
};

export interface AssistantPrompt {
  id: string;
  prompt: string;
}

export const assistantPrompts: AssistantPrompt[] = [
  { id: "p1", prompt: "Why is HM-105 at risk?" },
  { id: "p2", prompt: "Summarize October cost variance." },
  { id: "p3", prompt: "Which vehicles need maintenance this week?" },
  { id: "p4", prompt: "Show inventory stock-out risks." },
];

export interface AssistantExchange {
  id: string;
  role: "user" | "assistant";
  text: string;
  citations?: string[];
}

function findPrediction(term: string): AIPrediction | undefined {
  const lower = term.toLowerCase();
  return aiPredictions.find(
    (prediction) =>
      prediction.entityId.toLowerCase() === lower ||
      prediction.modelId.toLowerCase() === lower ||
      prediction.sourceModule?.toLowerCase() === lower
  );
}

/**
 * Deterministic, fully local demo responder. It only ever echoes seeded demo
 * records and clearly labels itself as demo output — never a live model call.
 */
export function answerQuery(query: string): AssistantExchange {
  const text = query.trim();
  const lower = text.toLowerCase();
  const id = `a-${Date.now()}`;

  const byEntity = findPrediction(text.replace(/[?.]/g, "").trim());
  if (byEntity) {
    return {
      id,
      role: "assistant",
      text: `${byEntity.entityId}: ${byEntity.prediction}. Risk ${byEntity.riskLevel}, confidence ${(byEntity.confidence * 100).toFixed(1)}%. ${byEntity.recommendedAction} (Demo output — NOT CONNECTED to a live model.)`,
      citations: [byEntity.modelId, byEntity.modelVersion, byEntity.inputReference ?? byEntity.entityId],
    };
  }
  if (lower.includes("cost") || lower.includes("variance") || lower.includes("budget")) {
    return {
      id,
      role: "assistant",
      text: "October operating cost is forecast 4.2% above budget, driven by drilling logistics and fuel. Net variance is -1.2 M DZD on the deferred-maintenance plan. (Demo output — NOT CONNECTED.)",
      citations: ["ERP-FORE-01 · v2.3.1", "COST-VAR-05 · v2.0.0"],
    };
  }
  if (lower.includes("maintenance") || lower.includes("vehicle") || lower.includes("fleet")) {
    return {
      id,
      role: "assistant",
      text: "One vehicle (FL-44) is maintenance-overdue on the Adrar route; service is likely due within 7 days at high risk. (Demo output — NOT CONNECTED.)",
      citations: ["FL-MAINT-03 · v1.4.0"],
    };
  }
  if (lower.includes("inventory") || lower.includes("stock") || lower.includes("material")) {
    return {
      id,
      role: "assistant",
      text: "Fuel-filter stock (INV-03) is projected to run out in 12 days; raise a purchase order for 120 units. (Demo output — NOT CONNECTED.)",
      citations: ["INV-OPT-01 · v1.1.7"],
    };
  }
  if (lower.includes("risk") || lower.includes("delay")) {
    return {
      id,
      role: "assistant",
      text: "Two items are high risk: FL-44 maintenance (0.871) and the In Salah package delay (0.71). Two items need human review. (Demo output — NOT CONNECTED.)",
      citations: ["PRJ-DELAY-04 · v3.0.2", "FL-MAINT-03 · v1.4.0"],
    };
  }
  return {
    id,
    role: "assistant",
    text: "I can summarize operational, financial, fleet or inventory predictions from the seeded demo records. Ask about a specific entity (e.g. HM-104) or a topic such as cost, maintenance or risk. (Demo output — NOT CONNECTED to a live model.)",
    citations: [],
  };
}
