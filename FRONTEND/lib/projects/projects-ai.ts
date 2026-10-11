/**
 * Project Management AI-ready capability contracts (Stage 7).
 *
 * Integrity rules mirror Stage 6 (Drilling):
 * - No model endpoint ships with this frontend, so the default path is an explicitly
 *   labelled DEMO result (`provenance: "demo"`, `modelStatus: "not-connected"`).
 * - When `NEXT_PUBLIC_PROJECTS_AI_URL` is configured the service performs a real POST
 *   with a timeout and surfaces honest failure states instead of pretending success.
 * - Request/response shapes are typed so a real inference service can be connected
 *   later without touching presentation components.
 */

export type ProjectAICapabilityId =
  | "delay"
  | "cost-overrun"
  | "resource-allocation"
  | "workload"
  | "milestone"
  | "prioritization"
  | "risk"
  | "health";

export interface ProjectAIInputField {
  key: string;
  label: string;
  type: "number" | "select" | "text" | "date";
  options?: string[];
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  required: boolean;
  help?: string;
}

export interface ProjectAICapability {
  id: ProjectAICapabilityId;
  title: string;
  subtitle: string;
  purpose: string;
  modelId: string;
  modelName: string;
  modelVersion: string;
  provider: string;
  chartTitle: string;
  inputs: ProjectAIInputField[];
}

export interface ProjectAIPredictionRequest {
  capability: ProjectAICapabilityId;
  inputs: Record<string, string | number>;
}

export interface ProjectAIMetric {
  label: string;
  value: string;
  tone: "green" | "amber" | "red" | "blue" | "neutral";
}

export interface ProjectAISeries {
  labels: string[];
  values: number[];
}

export interface ProjectAIPredictionResult {
  capability: ProjectAICapabilityId;
  headline: string;
  confidence: number;
  riskLevel: "Low" | "Medium" | "High";
  metrics: ProjectAIMetric[];
  series: ProjectAISeries | null;
  explanation: string;
  recommendation: string;
  provenance: "demo" | "live";
  modelStatus: "not-connected" | "connected";
  computedAt: string;
  processingTimeMs: number;
}

export type ProjectAIPredictionOutcome =
  | { status: "success"; result: ProjectAIPredictionResult }
  | { status: "invalid"; errors: Record<string, string> }
  | { status: "error"; message: string }
  | { status: "timeout"; message: string };

export const projectCapabilities: ProjectAICapability[] = [
  {
    id: "delay",
    title: "Project delay prediction",
    subtitle: "Probability and magnitude of schedule slippage",
    purpose:
      "Estimates the likelihood and size of schedule slippage from scope, dependence, crew and supply factors so mitigation can be scheduled before the milestone slips.",
    modelId: "mdl-projects-delay",
    modelName: "Schedule slippage estimator",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Weekly delay probability",
    inputs: [
      { key: "projectType", label: "Project type", type: "select", options: ["Drilling", "Completion", "Facilities", "Survey", "Expansion"], required: true },
      { key: "plannedDays", label: "Planned days remaining", type: "number", unit: "days", min: 5, max: 400, step: 1, required: true },
      { key: "criticalPathTasks", label: "Critical-path tasks open", type: "number", unit: "count", min: 0, max: 60, step: 1, required: true },
      { key: "crewAvailability", label: "Crew availability", type: "number", unit: "%", min: 20, max: 100, step: 1, required: true },
      { key: "supplyLeadTime", label: "Supply lead time", type: "number", unit: "days", min: 1, max: 120, step: 1, required: true },
      { key: "weatherWindow", label: "Weather window", type: "select", options: ["Favorable", "Variable", "Poor"], required: true },
    ],
  },
  {
    id: "cost-overrun",
    title: "Cost overrun prediction",
    subtitle: "Forecast spend against the approved budget",
    purpose:
      "Forecasts total project cost from day rate, duration and committed spend to expose variance against the approved budget before the overrun occurs.",
    modelId: "mdl-projects-cost",
    modelName: "Project cost forecaster",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Forecast cumulative spend",
    inputs: [
      { key: "budget", label: "Approved budget", type: "number", unit: "M DZD", min: 1, max: 500, step: 0.1, required: true },
      { key: "spentToDate", label: "Spent to date", type: "number", unit: "M DZD", min: 0, max: 500, step: 0.1, required: true },
      { key: "progress", label: "Physical progress", type: "number", unit: "%", min: 0, max: 100, step: 1, required: true },
      { key: "dayRate", label: "Day rate", type: "number", unit: "M DZD/day", min: 0.01, max: 5, step: 0.01, required: true },
      { key: "daysRemaining", label: "Days remaining", type: "number", unit: "days", min: 1, max: 400, step: 1, required: true },
      { key: "riskProfile", label: "Risk profile", type: "select", options: ["Low", "Medium", "High"], required: true },
    ],
  },
  {
    id: "resource-allocation",
    title: "Resource allocation forecast",
    subtitle: "Optimal staffing mix across active projects",
    purpose:
      "Recommends a staffing mix across active projects from demand, available headcount and priority so overloaded teams are relieved before delivery suffers.",
    modelId: "mdl-projects-resource",
    modelName: "Resource allocation optimizer",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Recommended allocation by project",
    inputs: [
      { key: "activeProjects", label: "Active projects", type: "number", unit: "count", min: 1, max: 30, step: 1, required: true },
      { key: "demandHours", label: "Open demand", type: "number", unit: "h", min: 20, max: 4000, step: 10, required: true },
      { key: "availableHeadcount", label: "Available headcount", type: "number", unit: "people", min: 1, max: 200, step: 1, required: true },
      { key: "priority", label: "Portfolio priority", type: "select", options: ["Critical", "High", "Medium", "Low"], required: true },
      { key: "contractorShare", label: "Contractor share", type: "number", unit: "%", min: 0, max: 80, step: 1, required: true },
    ],
  },
  {
    id: "workload",
    title: "Team workload forecast",
    subtitle: "Utilization outlook for the delivery team",
    purpose:
      "Forecasts utilization over the coming weeks from capacity, committed hours and leave so balancing decisions are made before burnout or idle time.",
    modelId: "mdl-projects-workload",
    modelName: "Workload forecaster",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Utilization by week",
    inputs: [
      { key: "teamSize", label: "Team size", type: "number", unit: "people", min: 1, max: 120, step: 1, required: true },
      { key: "committedHours", label: "Committed hours", type: "number", unit: "h/week", min: 5, max: 3000, step: 5, required: true },
      { key: "capacityHours", label: "Capacity hours", type: "number", unit: "h/week", min: 10, max: 4000, step: 5, required: true },
      { key: "leaveShare", label: "Planned leave share", type: "number", unit: "%", min: 0, max: 40, step: 1, required: true },
      { key: "skillMix", label: "Skill mix", type: "select", options: ["Balanced", "Specialist-heavy", "Junior-heavy"], required: true },
    ],
  },
  {
    id: "milestone",
    title: "Milestone risk prediction",
    subtitle: "Confidence that milestones will be met",
    purpose:
      "Estimates milestone completion confidence from progress, dependencies and float so at-risk gates are escalated with enough time to react.",
    modelId: "mdl-projects-milestone",
    modelName: "Milestone confidence estimator",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Milestone confidence by gate",
    inputs: [
      { key: "milestone", label: "Milestone", type: "select", options: ["Wellhead acceptance", "Casing complete", "Pilot section", "Ream to TD", "Well test", "Handover"], required: true },
      { key: "daysToMilestone", label: "Days to milestone", type: "number", unit: "days", min: 1, max: 300, step: 1, required: true },
      { key: "progress", label: "Current progress", type: "number", unit: "%", min: 0, max: 100, step: 1, required: true },
      { key: "openDependencies", label: "Open dependencies", type: "number", unit: "count", min: 0, max: 30, step: 1, required: true },
      { key: "floatDays", label: "Available float", type: "number", unit: "days", min: 0, max: 120, step: 1, required: true },
    ],
  },
  {
    id: "prioritization",
    title: "Task prioritization",
    subtitle: "Ranking of next actions by value and urgency",
    purpose:
      "Ranks open tasks by risk, dependency impact and effort so the team works the highest-value actions first instead of the loudest ones.",
    modelId: "mdl-projects-priority",
    modelName: "Task prioritizer",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Priority score by workstream",
    inputs: [
      { key: "workstream", label: "Workstream", type: "select", options: ["Drilling", "Completion", "Survey", "Logistics", "HSE"], required: true },
      { key: "openTasks", label: "Open tasks", type: "number", unit: "count", min: 1, max: 300, step: 1, required: true },
      { key: "blockedTasks", label: "Blocked tasks", type: "number", unit: "count", min: 0, max: 120, step: 1, required: true },
      { key: "criticalSeverity", label: "Critical severity share", type: "number", unit: "%", min: 0, max: 100, step: 1, required: true },
      { key: "avgEffort", label: "Average effort", type: "number", unit: "h", min: 0.5, max: 80, step: 0.5, required: true },
    ],
  },
  {
    id: "risk",
    title: "Project risk detection",
    subtitle: "Composite risk score for active projects",
    purpose:
      "Combines schedule, cost, resource, HSE and third-party signals into a composite risk score with the contributing categories exposed for human review.",
    modelId: "mdl-projects-risk",
    modelName: "Project risk detector",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Risk contribution by category",
    inputs: [
      { key: "scheduleVariance", label: "Schedule variance", type: "number", unit: "%", min: -60, max: 60, step: 1, required: true },
      { key: "costVariance", label: "Cost variance", type: "number", unit: "%", min: -60, max: 60, step: 1, required: true },
      { key: "openRisks", label: "Open risks", type: "number", unit: "count", min: 0, max: 60, step: 1, required: true },
      { key: "openIssues", label: "Open issues", type: "number", unit: "count", min: 0, max: 60, step: 1, required: true },
      { key: "hseIncidents", label: "HSE incidents this month", type: "number", unit: "count", min: 0, max: 30, step: 1, required: true },
      { key: "thirdPartyCount", label: "Third-party contractors", type: "number", unit: "count", min: 0, max: 30, step: 1, required: true },
    ],
  },
  {
    id: "health",
    title: "Project health scoring",
    subtitle: "Overall delivery health across dimensions",
    purpose:
      "Scores delivery health from schedule, cost, scope, quality and stakeholder dimensions so leadership sees one honest number with its drivers.",
    modelId: "mdl-projects-health",
    modelName: "Project health scorer",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Health by dimension",
    inputs: [
      { key: "scheduleHealth", label: "Schedule performance", type: "number", unit: "%", min: 0, max: 130, step: 1, required: true },
      { key: "costHealth", label: "Cost performance", type: "number", unit: "%", min: 0, max: 130, step: 1, required: true },
      { key: "scopeHealth", label: "Scope stability", type: "number", unit: "%", min: 0, max: 100, step: 1, required: true },
      { key: "qualityHealth", label: "Quality compliance", type: "number", unit: "%", min: 0, max: 100, step: 1, required: true },
      { key: "stakeholderHealth", label: "Stakeholder confidence", type: "number", unit: "%", min: 0, max: 100, step: 1, required: true },
    ],
  },
];

export function getProjectCapability(id: ProjectAICapabilityId): ProjectAICapability {
  const capability = projectCapabilities.find((entry) => entry.id === id);
  if (!capability) throw new Error(`Unknown AI capability: ${id}`);
  return capability;
}

function aiEndpoint(): string | undefined {
  const value =
    typeof process !== "undefined" && process.env ? process.env.NEXT_PUBLIC_PROJECTS_AI_URL : undefined;
  return value && value.trim() ? value.trim() : undefined;
}

function validateInputs(
  capability: ProjectAICapability,
  inputs: Record<string, string | number>
): Record<string, string> {
  const errors: Record<string, string> = {};
  capability.inputs.forEach((field) => {
    const raw = inputs[field.key];
    const value = typeof raw === "string" ? raw.trim() : raw;
    if (field.required && (value === undefined || value === "" || value === null)) {
      errors[field.key] = "This field is required.";
      return;
    }
    if (value === undefined || value === "") return;
    if (field.type === "number") {
      const numeric = Number(value);
      if (Number.isNaN(numeric)) {
        errors[field.key] = "Enter a valid number.";
        return;
      }
      if (field.min !== undefined && numeric < field.min) {
        errors[field.key] = `Minimum value is ${field.min}.`;
        return;
      }
      if (field.max !== undefined && numeric > field.max) {
        errors[field.key] = `Maximum value is ${field.max}.`;
      }
    }
    if (field.type === "select" && field.options && !field.options.includes(String(value))) {
      errors[field.key] = "Select one of the available options.";
    }
  });
  return errors;
}

function num(inputs: Record<string, string | number>, key: string, fallback = 0): number {
  const value = Number(inputs[key]);
  return Number.isNaN(value) ? fallback : value;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function stableJitter(seed: string, spread: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 1000;
  }
  return ((hash % 100) / 100) * spread - spread / 2;
}

function riskOf(score: number): "Low" | "Medium" | "High" {
  if (score >= 66) return "High";
  if (score >= 33) return "Medium";
  return "Low";
}

interface DemoOutput {
  headline: string;
  confidence: number;
  riskLevel: "Low" | "Medium" | "High";
  metrics: ProjectAIMetric[];
  series: ProjectAISeries | null;
  explanation: string;
  recommendation: string;
}

/** Deterministic demonstration computation. Clearly surfaced as demo output. */
function computeDemo(
  capability: ProjectAICapability,
  inputs: Record<string, string | number>
): DemoOutput {
  const key = JSON.stringify(inputs);

  switch (capability.id) {
    case "delay": {
      const type = { Drilling: 1.1, Completion: 1.0, Facilities: 1.25, Survey: 0.8, Expansion: 1.05 }[String(inputs.projectType)] ?? 1;
      const critical = num(inputs, "criticalPathTasks", 8);
      const crew = num(inputs, "crewAvailability", 80) / 100;
      const lead = num(inputs, "supplyLeadTime", 14);
      const weather = { Favorable: 0.5, Variable: 1.0, Poor: 1.7 }[String(inputs.weatherWindow)] ?? 1;
      const days = num(inputs, "plannedDays", 45);
      const probability = clamp(type * (18 + critical * 1.4 + lead * 0.8) * (2 - crew) * weather + stableJitter(key, 5), 3, 96);
      const slippage = clamp((probability / 100) * days * 0.32, 0.5, 80);
      return {
        headline: `${probability.toFixed(0)}% delay probability`,
        confidence: clamp(0.73 + stableJitter(key, 0.1), 0.5, 0.93),
        riskLevel: probability > 60 ? "High" : probability > 30 ? "Medium" : "Low",
        metrics: [
          { label: "Delay probability", value: `${probability.toFixed(0)}%`, tone: probability > 60 ? "red" : probability > 30 ? "amber" : "green" },
          { label: "Expected slippage", value: `${slippage.toFixed(1)} days`, tone: slippage > 10 ? "red" : "amber" },
          { label: "Critical-path load", value: `${critical} tasks`, tone: critical > 15 ? "amber" : "neutral" },
          { label: "Supply lead time", value: `${lead} days`, tone: lead > 30 ? "red" : "blue" },
        ],
        series: {
          labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
          values: [1, 2, 3, 4, 5, 6].map((week) => clamp(probability * (0.86 + week * 0.05) + stableJitter(key + week, 7), 3, 96)),
        },
        explanation: `${String(inputs.projectType)} project with ${critical} open critical-path tasks, ${Math.round(crew * 100)}% crew availability and a ${lead}-day supply lead time over ${days} remaining days; weather window ${String(inputs.weatherWindow)}.`,
        recommendation: probability > 45
          ? "Re-sequence the critical path, pre-position long-lead items and confirm the weather window before the next milestone."
          : "Monitor weekly; no schedule re-baseline is required at this time.",
      };
    }
    case "cost-overrun": {
      const budget = num(inputs, "budget", 100);
      const spent = num(inputs, "spentToDate", 40);
      const progress = num(inputs, "progress", 50);
      const dayRate = num(inputs, "dayRate", 0.1);
      const days = num(inputs, "daysRemaining", 30);
      const risk = { Low: 1.04, Medium: 1.12, High: 1.24 }[String(inputs.riskProfile)] ?? 1.1;
      const forecast = spent + dayRate * days * risk;
      const variance = ((forecast - budget) / budget) * 100;
      const cpi = progress / Math.max((spent / budget) * 100, 1);
      return {
        headline: `Forecast cost ${forecast.toFixed(1)} M DZD`,
        confidence: clamp(0.75 + stableJitter(key, 0.1), 0.52, 0.93),
        riskLevel: variance > 15 ? "High" : variance > 5 ? "Medium" : "Low",
        metrics: [
          { label: "Forecast cost", value: `${forecast.toFixed(1)} M DZD`, tone: "blue" },
          { label: "Variance vs budget", value: `${variance >= 0 ? "+" : ""}${variance.toFixed(1)}%`, tone: variance > 5 ? "red" : variance < -5 ? "green" : "amber" },
          { label: "Cost performance index", value: cpi.toFixed(2), tone: cpi >= 1 ? "green" : cpi >= 0.9 ? "amber" : "red" },
          { label: "Contingency reserve", value: `${(forecast * 0.08).toFixed(1)} M DZD`, tone: "amber" },
        ],
        series: {
          labels: ["M1", "M2", "M3", "M4", "M5", "M6"],
          values: [1, 2, 3, 4, 5, 6].map((month) => Math.round((spent + (forecast - spent) * (month / 6)) * 10) / 10),
        },
        explanation: `${spent.toFixed(1)} M DZD spent to date at ${progress}% physical progress, forecasting ${dayRate} M DZD/day over ${days} remaining days with a ${String(inputs.riskProfile)} risk profile against a ${budget} M DZD budget.`,
        recommendation: variance > 5
          ? "Raise a change request or de-scope support services before the next budget review."
          : "Hold the current contingency and re-forecast after the next progress cycle.",
      };
    }
    case "resource-allocation": {
      const projects = num(inputs, "activeProjects", 5);
      const demand = num(inputs, "demandHours", 600);
      const headcount = num(inputs, "availableHeadcount", 20);
      const priority = { Critical: 1.2, High: 1.1, Medium: 1.0, Low: 0.9 }[String(inputs.priority)] ?? 1;
      const contractor = num(inputs, "contractorShare", 20) / 100;
      const capacityHours = headcount * 40;
      const gap = demand - capacityHours;
      const coverage = clamp((capacityHours * (1 + contractor)) / Math.max(demand, 1) * 100 * priority, 10, 160);
      return {
        headline: `${coverage.toFixed(0)}% demand coverage`,
        confidence: clamp(0.7 + stableJitter(key, 0.12), 0.48, 0.9),
        riskLevel: coverage < 80 ? "High" : coverage < 100 ? "Medium" : "Low",
        metrics: [
          { label: "Demand coverage", value: `${coverage.toFixed(0)}%`, tone: coverage >= 100 ? "green" : coverage >= 80 ? "amber" : "red" },
          { label: "Weekly capacity", value: `${capacityHours} h`, tone: "blue" },
          { label: "Capacity gap", value: `${gap >= 0 ? "+" : ""}${gap} h`, tone: gap > 0 ? "amber" : "green" },
          { label: "Contractor cover", value: `${Math.round(contractor * 100)}%`, tone: "neutral" },
        ],
        series: {
          labels: ["P1", "P2", "P3", "P4", "P5", "P6"],
          values: [1, 2, 3, 4, 5, 6].map((step) => Math.round((demand / 6) * (0.85 + step * 0.03))),
        },
        explanation: `${demand} open hours across ${projects} active projects against ${headcount} available people (${capacityHours} h/week) at ${Math.round(contractor * 100)}% contractor cover and ${String(inputs.priority)} portfolio priority.`,
        recommendation: coverage < 100
          ? "Rebalance senior engineers to the critical project and convert part of the backlog to contractor capacity."
          : "Capacity covers demand; keep current allocation and re-check after the next intake.",
      };
    }
    case "workload": {
      const team = num(inputs, "teamSize", 16);
      const committed = num(inputs, "committedHours", 520);
      const capacity = num(inputs, "capacityHours", 640);
      const leave = num(inputs, "leaveShare", 8) / 100;
      const mix = { Balanced: 1.0, "Specialist-heavy": 1.08, "Junior-heavy": 0.92 }[String(inputs.skillMix)] ?? 1;
      const utilization = clamp((committed / Math.max(capacity * (1 - leave), 1)) * 100 * mix + stableJitter(key, 4), 10, 150);
      return {
        headline: `${utilization.toFixed(0)}% average utilization`,
        confidence: clamp(0.79 + stableJitter(key, 0.09), 0.56, 0.94),
        riskLevel: utilization > 95 ? "High" : utilization > 85 ? "Medium" : "Low",
        metrics: [
          { label: "Utilization", value: `${utilization.toFixed(0)}%`, tone: utilization > 95 ? "red" : utilization > 85 ? "amber" : "green" },
          { label: "Committed hours", value: `${committed} h`, tone: "blue" },
          { label: "Effective capacity", value: `${Math.round(capacity * (1 - leave))} h`, tone: "neutral" },
          { label: "Leave impact", value: `-${Math.round(capacity * leave)} h`, tone: "amber" },
        ],
        series: {
          labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
          values: [1, 2, 3, 4, 5, 6].map((week) => clamp(utilization * (0.94 + week * 0.015) + stableJitter(key + week, 5), 10, 150)),
        },
        explanation: `${team}-person team committing ${committed} h against ${capacity} h capacity with ${Math.round(leave * 100)}% planned leave and a ${String(inputs.skillMix)} skill mix.`,
        recommendation: utilization > 90
          ? "Rebalance the backlog and defer non-critical work; protect the critical path from overload."
          : "Utilization is healthy; keep the current plan and monitor leave clusters.",
      };
    }
    case "milestone": {
      const days = num(inputs, "daysToMilestone", 20);
      const progress = num(inputs, "progress", 60);
      const open = num(inputs, "openDependencies", 3);
      const floatDays = num(inputs, "floatDays", 5);
      const confidence = clamp(progress - open * 4 + floatDays * 2 - Math.max(0, 20 - days) * 1.5 + stableJitter(key, 4), 5, 99);
      return {
        headline: `${confidence.toFixed(0)}% milestone confidence`,
        confidence: clamp(0.74 + stableJitter(key, 0.1), 0.5, 0.92),
        riskLevel: confidence < 50 ? "High" : confidence < 75 ? "Medium" : "Low",
        metrics: [
          { label: "Confidence", value: `${confidence.toFixed(0)}%`, tone: confidence >= 75 ? "green" : confidence >= 50 ? "amber" : "red" },
          { label: "Days to milestone", value: `${days} days`, tone: days < 10 ? "amber" : "blue" },
          { label: "Open dependencies", value: `${open}`, tone: open > 4 ? "amber" : "neutral" },
          { label: "Available float", value: `${floatDays} days`, tone: floatDays < 3 ? "red" : "green" },
        ],
        series: {
          labels: ["Now", "+1w", "+2w", "+3w", "+4w", "Due"],
          values: [1, 2, 3, 4, 5, 6].map((step) => clamp(confidence + step * 5, 5, 99)),
        },
        explanation: `${String(inputs.milestone)} is ${days} days away at ${progress}% progress with ${open} open dependencies and ${floatDays} days of float.`,
        recommendation: confidence < 75
          ? "Escalate the top dependency and protect float; re-baseline if the gate cannot be recovered."
          : "Confidence is acceptable; keep the current plan and re-check at the next gate.",
      };
    }
    case "prioritization": {
      const open = num(inputs, "openTasks", 40);
      const blocked = num(inputs, "blockedTasks", 6);
      const severity = num(inputs, "criticalSeverity", 20);
      const effort = num(inputs, "avgEffort", 8);
      const score = clamp((severity * 1.4 + blocked * 2.2 + (open / Math.max(effort, 1)) * 1.6) + stableJitter(key, 4), 5, 100);
      return {
        headline: `Priority score ${score.toFixed(0)}/100`,
        confidence: clamp(0.72 + stableJitter(key, 0.1), 0.48, 0.91),
        riskLevel: riskOf(score),
        metrics: [
          { label: "Priority score", value: `${score.toFixed(0)}/100`, tone: score > 66 ? "red" : score > 33 ? "amber" : "green" },
          { label: "Blocked tasks", value: `${blocked}`, tone: blocked > 8 ? "red" : "amber" },
          { label: "Critical share", value: `${severity}%`, tone: severity > 30 ? "amber" : "neutral" },
          { label: "Avg effort", value: `${effort} h`, tone: "blue" },
        ],
        series: {
          labels: ["P1", "P2", "P3", "P4", "P5", "P6"],
          values: [1, 2, 3, 4, 5, 6].map((step) => Math.round(clamp(score - step * 4 + stableJitter(key + step, 6), 5, 100))),
        },
        explanation: `${String(inputs.workstream)} workstream with ${open} open tasks, ${blocked} blocked and ${severity}% critical-severity share at ${effort} h average effort.`,
        recommendation: score > 55
          ? "Clear the blocked tasks first; they gate the highest-value work in the workstream."
          : "Workstream load is manageable; sequence by dependency and keep the current cadence.",
      };
    }
    case "risk": {
      const schedule = Math.abs(num(inputs, "scheduleVariance", 0));
      const cost = Math.abs(num(inputs, "costVariance", 0));
      const risks = num(inputs, "openRisks", 6);
      const issues = num(inputs, "openIssues", 4);
      const hse = num(inputs, "hseIncidents", 1);
      const third = num(inputs, "thirdPartyCount", 5);
      const parts = {
        schedule: clamp(schedule * 0.9, 0, 26),
        cost: clamp(cost * 0.9, 0, 24),
        risks: clamp(risks * 1.4, 0, 20),
        issues: clamp(issues * 1.6, 0, 18),
        hse: clamp(hse * 4.0, 0, 16),
        thirdParty: clamp(third * 1.1, 0, 12),
      };
      const score = clamp(Object.values(parts).reduce((sum, value) => sum + value, 0) / 1.15 + stableJitter(key, 4), 0, 100);
      return {
        headline: `Composite risk score ${score.toFixed(0)}/100`,
        confidence: clamp(0.73 + stableJitter(key, 0.1), 0.5, 0.92),
        riskLevel: riskOf(score),
        metrics: [
          { label: "Risk score", value: `${score.toFixed(0)}/100`, tone: score > 66 ? "red" : score > 33 ? "amber" : "green" },
          { label: "Schedule contribution", value: `${parts.schedule.toFixed(0)} pts`, tone: parts.schedule > 13 ? "red" : "neutral" },
          { label: "Cost contribution", value: `${parts.cost.toFixed(0)} pts`, tone: parts.cost > 12 ? "amber" : "neutral" },
          { label: "Open risks/issues", value: `${risks} / ${issues}`, tone: risks + issues > 12 ? "amber" : "blue" },
        ],
        series: {
          labels: ["Schedule", "Cost", "Risks", "Issues", "HSE", "3rd party"],
          values: [parts.schedule, parts.cost, parts.risks, parts.issues, parts.hse, parts.thirdParty].map((value) => Math.round(value)),
        },
        explanation: `Weighted from ${schedule}% schedule variance, ${cost}% cost variance, ${risks} open risks, ${issues} open issues, ${hse} HSE incidents and ${third} third-party contractors.`,
        recommendation: score > 66
          ? "Escalate to the project risk review and agree owners for the top contributing categories."
          : "Continue routine monitoring and re-score after the next progress cycle.",
      };
    }
    case "health": {
      const schedule = num(inputs, "scheduleHealth", 95);
      const cost = num(inputs, "costHealth", 95);
      const scope = num(inputs, "scopeHealth", 85);
      const quality = num(inputs, "qualityHealth", 90);
      const stakeholder = num(inputs, "stakeholderHealth", 88);
      const health = clamp((schedule * 0.25 + cost * 0.25 + scope * 0.2 + quality * 0.15 + stakeholder * 0.15) + stableJitter(key, 3), 5, 130);
      const grade = health >= 95 ? "A" : health >= 85 ? "B" : health >= 70 ? "C" : health >= 55 ? "D" : "E";
      return {
        headline: `Health ${health.toFixed(0)}/100 (grade ${grade})`,
        confidence: clamp(0.8 + stableJitter(key, 0.08), 0.58, 0.95),
        riskLevel: health < 70 ? "High" : health < 85 ? "Medium" : "Low",
        metrics: [
          { label: "Overall health", value: `${health.toFixed(0)}/100`, tone: health >= 85 ? "green" : health >= 70 ? "amber" : "red" },
          { label: "Grade", value: grade, tone: health >= 85 ? "green" : health >= 70 ? "amber" : "red" },
          { label: "Schedule performance", value: `${schedule}%`, tone: schedule >= 95 ? "green" : "amber" },
          { label: "Cost performance", value: `${cost}%`, tone: cost >= 95 ? "green" : "amber" },
        ],
        series: {
          labels: ["Schedule", "Cost", "Scope", "Quality", "Stakeholder"],
          values: [schedule, cost, scope, quality, stakeholder].map((value) => Math.round(value)),
        },
        explanation: `Weighted health from schedule ${schedule}%, cost ${cost}%, scope stability ${scope}%, quality ${quality}% and stakeholder confidence ${stakeholder}%.`,
        recommendation: health < 85
          ? "Focus on the lowest dimension first and agree a corrective action with its owner this week."
          : "Delivery health is strong; maintain the current controls and re-score next cycle.",
      };
    }
    default:
      throw new Error(`Unsupported capability: ${capability.id}`);
  }
}

async function callEndpoint(
  endpoint: string,
  request: ProjectAIPredictionRequest
): Promise<{ ok: true; payload: unknown } | { ok: false; kind: "timeout" | "error"; message: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      signal: controller.signal,
    });
    if (!response.ok) {
      return { ok: false, kind: "error", message: `Prediction service returned ${response.status}.` };
    }
    const payload = await response.json();
    return { ok: true, payload };
  } catch (error) {
    const aborted = error instanceof DOMException && error.name === "AbortError";
    return aborted
      ? { ok: false, kind: "timeout", message: "Prediction request timed out." }
      : { ok: false, kind: "error", message: "Prediction service is unreachable." };
  } finally {
    clearTimeout(timer);
  }
}

function fromRemote(capability: ProjectAICapability, payload: unknown, startedAt: number): ProjectAIPredictionResult | null {
  if (!payload || typeof payload !== "object") return null;
  const data = payload as Partial<ProjectAIPredictionResult>;
  if (typeof data.headline !== "string" || typeof data.confidence !== "number") return null;
  return {
    capability: capability.id,
    headline: data.headline,
    confidence: clamp(data.confidence, 0, 1),
    riskLevel: data.riskLevel === "High" || data.riskLevel === "Medium" ? data.riskLevel : "Low",
    metrics: Array.isArray(data.metrics) ? data.metrics : [],
    series: data.series && Array.isArray(data.series.values) ? data.series : null,
    explanation: typeof data.explanation === "string" ? data.explanation : "",
    recommendation: typeof data.recommendation === "string" ? data.recommendation : "",
    provenance: "live",
    modelStatus: "connected",
    computedAt: new Date().toISOString(),
    processingTimeMs: Date.now() - startedAt,
  };
}

/**
 * Run a project prediction request.
 * Returns an explicit outcome for every state: invalid input, unreachable model,
 * timeout, or a labelled demo/live result.
 */
export async function runProjectPrediction(
  request: ProjectAIPredictionRequest
): Promise<ProjectAIPredictionOutcome> {
  const capability = getProjectCapability(request.capability);
  const errors = validateInputs(capability, request.inputs);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  const startedAt = Date.now();
  const endpoint = aiEndpoint();

  if (endpoint) {
    const outcome = await callEndpoint(endpoint, request);
    if (!outcome.ok) {
      return outcome.kind === "timeout"
        ? { status: "timeout", message: outcome.message }
        : { status: "error", message: outcome.message };
    }
    const mapped = fromRemote(capability, outcome.payload, startedAt);
    if (!mapped) {
      return { status: "error", message: "Prediction service returned an unexpected response shape." };
    }
    return { status: "success", result: mapped };
  }

  await new Promise((resolve) => setTimeout(resolve, 750));
  const demo = computeDemo(capability, request.inputs);
  return {
    status: "success",
    result: {
      capability: capability.id,
      headline: demo.headline,
      confidence: clamp(demo.confidence, 0, 1),
      riskLevel: demo.riskLevel,
      metrics: demo.metrics,
      series: demo.series,
      explanation: demo.explanation,
      recommendation: demo.recommendation,
      provenance: "demo",
      modelStatus: "not-connected",
      computedAt: new Date().toISOString(),
      processingTimeMs: Date.now() - startedAt,
    },
  };
}

export function isProjectAiEndpointConfigured(): boolean {
  return Boolean(aiEndpoint());
}
