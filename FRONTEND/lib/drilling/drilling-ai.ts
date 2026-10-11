/**
 * Drilling AI-ready capability contracts (Stage 6, Phase D).
 *
 * Integrity rules implemented here:
 * - No model endpoint ships with this frontend, so the default path is an explicitly
 *   labelled DEMO result (`provenance: "demo"`, `modelStatus: "not-connected"`).
 * - When `NEXT_PUBLIC_DRILLING_AI_URL` is configured the service performs a real POST
 *   with a timeout and surfaces honest failure states instead of pretending success.
 * - Request/response shapes are typed so a real inference service can be connected
 *   later without touching presentation components.
 */

export type AICapabilityId =
  | "performance"
  | "cost"
  | "delay"
  | "productivity"
  | "equipment-failure"
  | "fuel"
  | "completion"
  | "risk";

export interface AIInputField {
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

export interface AICapability {
  id: AICapabilityId;
  title: string;
  subtitle: string;
  purpose: string;
  modelId: string;
  modelName: string;
  modelVersion: string;
  provider: string;
  chartTitle: string;
  inputs: AIInputField[];
}

export interface AIPredictionRequest {
  capability: AICapabilityId;
  inputs: Record<string, string | number>;
}

export interface AIPredictionMetric {
  label: string;
  value: string;
  tone: "green" | "amber" | "red" | "blue" | "neutral";
}

export interface AIPredictionSeries {
  labels: string[];
  values: number[];
}

export interface AIPredictionResult {
  capability: AICapabilityId;
  headline: string;
  confidence: number;
  riskLevel: "Low" | "Medium" | "High";
  metrics: AIPredictionMetric[];
  series: AIPredictionSeries | null;
  explanation: string;
  recommendation: string;
  provenance: "demo" | "live";
  modelStatus: "not-connected" | "connected";
  computedAt: string;
  processingTimeMs: number;
}

export type AIPredictionOutcome =
  | { status: "success"; result: AIPredictionResult }
  | { status: "invalid"; errors: Record<string, string> }
  | { status: "error"; message: string }
  | { status: "timeout"; message: string };

export const drillingCapabilities: AICapability[] = [
  {
    id: "performance",
    title: "Drilling performance prediction",
    subtitle: "Rate of penetration forecast for the next drilled section",
    purpose:
      "Estimates the rate of penetration for a planned section so drilling engineers can compare plan and forecast before committing rig time.",
    modelId: "mdl-drilling-rop",
    modelName: "Drilling ROP estimator",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Forecast ROP by section",
    inputs: [
      { key: "wellType", label: "Well type", type: "select", options: ["Exploration", "Development", "Appraisal", "Workover"], required: true },
      { key: "holeSection", label: "Hole section", type: "select", options: ["Surface", "Intermediate", "Production"], required: true },
      { key: "formation", label: "Formation type", type: "select", options: ["Sandstone", "Carbonate", "Shale", "Mixed"], required: true },
      { key: "bitType", label: "Bit type", type: "select", options: ["PDC", "Roller cone", "Lead mill"], required: true },
      { key: "mudWeight", label: "Mud weight", type: "number", unit: "SG", min: 0.9, max: 2.4, step: 0.01, required: true },
      { key: "depth", label: "Current depth", type: "number", unit: "m", min: 0, max: 6000, step: 10, required: true },
      { key: "rigPower", label: "Rig horsepower", type: "number", unit: "hp", min: 500, max: 3000, step: 50, required: true },
    ],
  },
  {
    id: "cost",
    title: "Project cost prediction",
    subtitle: "Forecast well cost against the approved AFE",
    purpose:
      "Projects total well cost from depth, rig day rate and duration to expose variance against the approved AFE before the overrun occurs.",
    modelId: "mdl-drilling-cost",
    modelName: "Well cost forecaster",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Forecast cumulative spend",
    inputs: [
      { key: "wellType", label: "Well type", type: "select", options: ["Exploration", "Development", "Appraisal", "Workover"], required: true },
      { key: "targetDepth", label: "Target depth", type: "number", unit: "m", min: 500, max: 7000, step: 10, required: true },
      { key: "dayRate", label: "Rig day rate", type: "number", unit: "USD/day", min: 5000, max: 120000, step: 100, required: true },
      { key: "duration", label: "Planned duration", type: "number", unit: "days", min: 10, max: 400, step: 1, required: true },
      { key: "afeBudget", label: "Approved AFE", type: "number", unit: "USD", min: 100000, max: 200000000, step: 100000, required: true },
      { key: "riskProfile", label: "Risk profile", type: "select", options: ["Low", "Medium", "High"], required: true },
    ],
  },
  {
    id: "delay",
    title: "Project delay prediction",
    subtitle: "Probability and magnitude of schedule slippage",
    purpose:
      "Estimates the likelihood and size of schedule slippage from weather, supply chain, crew and formation factors so mitigation can be scheduled early.",
    modelId: "mdl-drilling-delay",
    modelName: "Schedule slippage estimator",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Weekly delay risk outlook",
    inputs: [
      { key: "rigType", label: "Rig type", type: "select", options: ["Land rig", "Offshore rig", "Workover rig", "Snubbing unit"], required: true },
      { key: "weatherWindow", label: "Weather window", type: "select", options: ["Favorable", "Variable", "Poor"], required: true },
      { key: "crewExperience", label: "Crew experience", type: "select", options: ["High", "Medium", "Low"], required: true },
      { key: "supplyLeadTime", label: "Supply lead time", type: "number", unit: "days", min: 1, max: 90, step: 1, required: true },
      { key: "formationHazard", label: "Formation hazards", type: "select", options: ["None", "Moderate", "Severe"], required: true },
      { key: "plannedDays", label: "Planned days remaining", type: "number", unit: "days", min: 5, max: 300, step: 1, required: true },
    ],
  },
  {
    id: "productivity",
    title: "Drilling productivity prediction",
    subtitle: "Meters drilled per week and efficiency forecast",
    purpose:
      "Forecasts weekly footage and operational efficiency from NPT share, crew size and supply reliability to support planning of the next tour.",
    modelId: "mdl-drilling-productivity",
    modelName: "Footage productivity estimator",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Forecast meters per week",
    inputs: [
      { key: "metersPlanned", label: "Planned footage", type: "number", unit: "m/week", min: 20, max: 800, step: 5, required: true },
      { key: "nptShare", label: "NPT share", type: "number", unit: "%", min: 0, max: 60, step: 1, required: true },
      { key: "crewSize", label: "Crew size", type: "number", unit: "people", min: 6, max: 40, step: 1, required: true },
      { key: "supplyReliability", label: "Supply reliability", type: "number", unit: "%", min: 40, max: 100, step: 1, required: true },
      { key: "sectionComplexity", label: "Section complexity", type: "select", options: ["Simple", "Moderate", "Complex"], required: true },
    ],
  },
  {
    id: "equipment-failure",
    title: "Equipment failure prediction",
    subtitle: "Failure probability for critical drilling equipment",
    purpose:
      "Estimates failure probability and remaining useful running hours for critical rig equipment so maintenance can be planned instead of reacted to.",
    modelId: "mdl-drilling-equipment",
    modelName: "Rig equipment risk estimator",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Failure probability trend",
    inputs: [
      { key: "equipment", label: "Equipment", type: "select", options: ["Top drive", "Mud pump", "Drawworks", "Shale shaker", "BOP stack"], required: true },
      { key: "runHours", label: "Run hours since overhaul", type: "number", unit: "h", min: 0, max: 40000, step: 50, required: true },
      { key: "daysSinceMaintenance", label: "Since last maintenance", type: "number", unit: "days", min: 0, max: 720, step: 1, required: true },
      { key: "vibrationIndex", label: "Vibration index", type: "number", unit: "0-10", min: 0, max: 10, step: 0.5, required: true },
      { key: "loadFactor", label: "Load factor", type: "number", unit: "%", min: 20, max: 130, step: 1, required: true },
    ],
  },
  {
    id: "fuel",
    title: "Fuel consumption prediction",
    subtitle: "Daily diesel demand and efficiency forecast",
    purpose:
      "Forecasts daily diesel consumption and intensity per meter drilled to support bunkering, logistics and emissions reporting.",
    modelId: "mdl-drilling-fuel",
    modelName: "Rig fuel demand estimator",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Forecast daily fuel use",
    inputs: [
      { key: "rigType", label: "Rig type", type: "select", options: ["Land rig", "Offshore rig", "Workover rig", "Snubbing unit"], required: true },
      { key: "pumpingHours", label: "Pumping hours per day", type: "number", unit: "h", min: 1, max: 24, step: 0.5, required: true },
      { key: "depth", label: "Current depth", type: "number", unit: "m", min: 0, max: 6000, step: 10, required: true },
      { key: "mudVolume", label: "Mud circulating volume", type: "number", unit: "m3", min: 20, max: 600, step: 5, required: true },
      { key: "transportKm", label: "Supply transport per day", type: "number", unit: "km", min: 0, max: 1200, step: 10, required: true },
    ],
  },
  {
    id: "completion",
    title: "Well completion prediction",
    subtitle: "Readiness and duration outlook for completion operations",
    purpose:
      "Estimates completion readiness and duration from casing, cement, reservoir and equipment inputs so first-oil planning stays realistic.",
    modelId: "mdl-drilling-completion",
    modelName: "Completion readiness estimator",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Readiness outlook",
    inputs: [
      { key: "wellDepth", label: "Well depth", type: "number", unit: "m", min: 500, max: 7000, step: 10, required: true },
      { key: "reservoirPressure", label: "Reservoir pressure", type: "number", unit: "psi", min: 500, max: 12000, step: 50, required: true },
      { key: "casingQuality", label: "Casing condition", type: "select", options: ["Good", "Fair", "Poor"], required: true },
      { key: "cementBond", label: "Cement bond", type: "select", options: ["Good", "Fair", "Poor"], required: true },
      { key: "equipmentAvailability", label: "Equipment availability", type: "number", unit: "%", min: 20, max: 100, step: 1, required: true },
      { key: "crewAvailability", label: "Crew availability", type: "number", unit: "%", min: 20, max: 100, step: 1, required: true },
    ],
  },
  {
    id: "risk",
    title: "Drilling risk detection",
    subtitle: "Composite operational risk score for active wells",
    purpose:
      "Combines NPT, HSE, weather, crew and third-party signals into a composite risk score with the contributing categories exposed for human review.",
    modelId: "mdl-drilling-risk",
    modelName: "Drilling risk detector",
    modelVersion: "0.9.0-demo",
    provider: "NEXUS Model Gateway (not connected)",
    chartTitle: "Risk contribution by category",
    inputs: [
      { key: "depth", label: "Current depth", type: "number", unit: "m", min: 0, max: 6000, step: 10, required: true },
      { key: "nptHours", label: "NPT hours this week", type: "number", unit: "h", min: 0, max: 200, step: 1, required: true },
      { key: "hseIncidents", label: "HSE incidents this month", type: "number", unit: "count", min: 0, max: 30, step: 1, required: true },
      { key: "weather", label: "Weather conditions", type: "select", options: ["Stable", "Variable", "Severe"], required: true },
      { key: "crewExperience", label: "Crew experience", type: "select", options: ["High", "Medium", "Low"], required: true },
      { key: "thirdPartyCount", label: "Third-party contractors", type: "number", unit: "count", min: 0, max: 25, step: 1, required: true },
    ],
  },
];

export function getCapability(id: AICapabilityId): AICapability {
  const capability = drillingCapabilities.find((entry) => entry.id === id);
  if (!capability) throw new Error(`Unknown AI capability: ${id}`);
  return capability;
}

function aiEndpoint(): string | undefined {
  const value =
    typeof process !== "undefined" && process.env ? process.env.NEXT_PUBLIC_DRILLING_AI_URL : undefined;
  return value && value.trim() ? value.trim() : undefined;
}

function validateInputs(
  capability: AICapability,
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
  metrics: AIPredictionMetric[];
  series: AIPredictionSeries | null;
  explanation: string;
  recommendation: string;
}

/** Deterministic demonstration computation. Clearly surfaced as demo output. */
function computeDemo(
  capability: AICapability,
  inputs: Record<string, string | number>
): DemoOutput {
  const key = JSON.stringify(inputs);

  switch (capability.id) {
    case "performance": {
      const sectionFactor = { Surface: 1.5, Intermediate: 1.0, Production: 0.7 }[String(inputs.holeSection)] ?? 1;
      const formationFactor = { Sandstone: 1.25, Carbonate: 0.85, Shale: 0.95, Mixed: 1.0 }[String(inputs.formation)] ?? 1;
      const bitFactor = { PDC: 1.2, "Roller cone": 0.9, "Lead mill": 0.6 }[String(inputs.bitType)] ?? 1;
      const mud = num(inputs, "mudWeight", 1.1);
      const depth = num(inputs, "depth");
      const power = num(inputs, "rigPower", 1500);
      const rop = clamp(
        (14 * sectionFactor * formationFactor * bitFactor * (power / 1500)) *
          (1.15 - (mud - 1) * 0.35) *
          (1 - depth / 24000) +
          stableJitter(key, 1.6),
        2,
        48
      );
      const hours = clamp((420 / Math.max(rop, 1)) * 1.4, 8, 400);
      return {
        headline: `Forecast ROP ${rop.toFixed(1)} m/h`,
        confidence: clamp(0.78 + stableJitter(key, 0.1), 0.55, 0.95),
        riskLevel: rop < 8 ? "High" : rop < 14 ? "Medium" : "Low",
        metrics: [
          { label: "Predicted ROP", value: `${rop.toFixed(1)} m/h`, tone: rop >= 14 ? "green" : rop >= 8 ? "amber" : "red" },
          { label: "Section duration", value: `${hours.toFixed(0)} h`, tone: "blue" },
          { label: "NPT adjusted ROP", value: `${(rop * 0.86).toFixed(1)} m/h`, tone: "amber" },
          { label: "Confidence", value: `${Math.round(clamp(0.78 + stableJitter(key, 0.1), 0.55, 0.95) * 100)}%`, tone: "neutral" },
        ],
        series: {
          labels: ["S1", "S2", "S3", "S4", "S5", "S6"],
          values: [1, 2, 3, 4, 5, 6].map((step) =>
            clamp(rop * (1 - step * 0.06) + stableJitter(key + step, 2), 2, 48)
          ),
        },
        explanation: `${String(inputs.holeSection)} section through ${String(inputs.formation)} with a ${String(inputs.bitType)} bit at ${mud.toFixed(2)} SG mud weight; rig power and depth are included in the estimate.`,
        recommendation: "Compare the forecast against the well program before accepting the section time; review mud weight and bit selection if the forecast falls below plan.",
      };
    }
    case "cost": {
      const depth = num(inputs, "targetDepth");
      const dayRate = num(inputs, "dayRate");
      const duration = num(inputs, "duration");
      const afe = num(inputs, "afeBudget");
      const riskFactor = { Low: 1.04, Medium: 1.12, High: 1.24 }[String(inputs.riskProfile)] ?? 1.1;
      const footage = depth * 240;
      const total = (dayRate * duration * riskFactor) + footage + stableJitter(key, 250000);
      const variance = ((total - afe) / afe) * 100;
      return {
        headline: `Forecast well cost $${(total / 1_000_000).toFixed(2)}M`,
        confidence: clamp(0.74 + stableJitter(key, 0.1), 0.5, 0.93),
        riskLevel: variance > 15 ? "High" : variance > 5 ? "Medium" : "Low",
        metrics: [
          { label: "Predicted cost", value: `$${(total / 1_000_000).toFixed(2)}M`, tone: "blue" },
          { label: "Variance vs AFE", value: `${variance >= 0 ? "+" : ""}${variance.toFixed(1)}%`, tone: variance > 5 ? "red" : variance < -5 ? "green" : "amber" },
          { label: "Cost per metre", value: `$${Math.round(total / Math.max(depth, 1))}`, tone: "neutral" },
          { label: "Contingency reserve", value: `$${Math.round(((total * 0.08) / 1_000_000) * 100) / 100}M`, tone: "amber" },
        ],
        series: {
          labels: ["M1", "M2", "M3", "M4", "M5", "M6"],
          values: [1, 2, 3, 4, 5, 6].map((month) => Math.round((total * month) / 6 / 1000) / 1000),
        },
        explanation: `Day rate over ${duration} days with a ${String(inputs.riskProfile)} risk profile plus footage cost for ${depth} m target depth, compared with the approved AFE of $${(afe / 1_000_000).toFixed(1)}M.`,
        recommendation: variance > 5
          ? "Raise a change request or de-scope support services before the next AFE review."
          : "Hold the current contingency and re-forecast after the next section is drilled.",
      };
    }
    case "delay": {
      const weather = { Favorable: 0.4, Variable: 1.0, Poor: 1.8 }[String(inputs.weatherWindow)] ?? 1;
      const crew = { High: 0.7, Medium: 1.0, Low: 1.5 }[String(inputs.crewExperience)] ?? 1;
      const hazard = { None: 0.6, Moderate: 1.1, Severe: 1.9 }[String(inputs.formationHazard)] ?? 1;
      const lead = num(inputs, "supplyLeadTime", 7);
      const days = num(inputs, "plannedDays", 60);
      const probability = clamp((weather * crew * hazard * (1 + lead / 40) * 26) + stableJitter(key, 6), 3, 96);
      const delayDays = clamp((probability / 100) * days * 0.35, 0.5, 60);
      return {
        headline: `${probability.toFixed(0)}% delay probability`,
        confidence: clamp(0.71 + stableJitter(key, 0.12), 0.48, 0.92),
        riskLevel: probability > 60 ? "High" : probability > 30 ? "Medium" : "Low",
        metrics: [
          { label: "Delay probability", value: `${probability.toFixed(0)}%`, tone: probability > 60 ? "red" : probability > 30 ? "amber" : "green" },
          { label: "Expected slippage", value: `${delayDays.toFixed(1)} days`, tone: delayDays > 10 ? "red" : "amber" },
          { label: "Weather contribution", value: `${(weather * 18).toFixed(0)}%`, tone: "blue" },
          { label: "Supply contribution", value: `${(lead * 1.4).toFixed(0)}%`, tone: "neutral" },
        ],
        series: {
          labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
          values: [1, 2, 3, 4, 5, 6].map((week) =>
            clamp(probability * (0.85 + week * 0.05) + stableJitter(key + week, 8), 3, 96)
          ),
        },
        explanation: `Weather window (${String(inputs.weatherWindow)}), crew experience (${String(inputs.crewExperience)}) and formation hazards (${String(inputs.formationHazard)}) with a ${lead}-day supply lead time over ${days} remaining days.`,
        recommendation: probability > 45
          ? "Pre-position long-lead items and confirm the weather window with logistics before the next operation."
          : "Monitor weekly; no schedule re-baseline required at this time.",
      };
    }
    case "productivity": {
      const planned = num(inputs, "metersPlanned", 120);
      const npt = num(inputs, "nptShare", 12);
      const crew = num(inputs, "crewSize", 16);
      const supply = num(inputs, "supplyReliability", 85);
      const complexity = { Simple: 1.15, Moderate: 1.0, Complex: 0.82 }[String(inputs.sectionComplexity)] ?? 1;
      const meters = clamp(planned * (1 - npt / 100) * (supply / 100) * complexity * (0.9 + crew / 160) + stableJitter(key, 6), 5, 900);
      const efficiency = clamp((meters / Math.max(planned, 1)) * 100, 5, 130);
      const daysToTd = clamp((3200 / Math.max(meters, 1)) * 7, 5, 400);
      return {
        headline: `${meters.toFixed(0)} m/week forecast`,
        confidence: clamp(0.76 + stableJitter(key, 0.1), 0.52, 0.94),
        riskLevel: efficiency < 60 ? "High" : efficiency < 85 ? "Medium" : "Low",
        metrics: [
          { label: "Forecast footage", value: `${meters.toFixed(0)} m/week`, tone: efficiency >= 85 ? "green" : efficiency >= 60 ? "amber" : "red" },
          { label: "Efficiency vs plan", value: `${efficiency.toFixed(0)}%`, tone: efficiency >= 85 ? "green" : "amber" },
          { label: "Days to TD", value: `${daysToTd.toFixed(0)} d`, tone: "blue" },
          { label: "NPT impact", value: `-${npt.toFixed(0)}%`, tone: "amber" },
        ],
        series: {
          labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
          values: [1, 2, 3, 4, 5, 6].map((week) =>
            clamp(meters * (0.92 + week * 0.02) + stableJitter(key + week, 8), 5, 900)
          ),
        },
        explanation: `Planned ${planned} m/week reduced by ${npt}% NPT, ${supply}% supply reliability and ${String(inputs.sectionComplexity)} section complexity with a ${crew}-person crew.`,
        recommendation: efficiency < 85
          ? "Focus on the largest NPT categories this week and confirm critical material availability before the next section."
          : "Productivity is in line with plan; keep the current tour rotation and supply cadence.",
      };
    }
    case "equipment-failure": {
      const hours = num(inputs, "runHours");
      const since = num(inputs, "daysSinceMaintenance");
      const vibration = num(inputs, "vibrationIndex");
      const load = num(inputs, "loadFactor");
      const probability = clamp(
        (hours / 400) * 0.6 + since * 0.08 + vibration * 3.2 + (load - 60) * 0.25 + stableJitter(key, 4),
        1,
        97
      );
      const remaining = clamp(1200 - probability * 9 - hours * 0.02, 20, 4000);
      return {
        headline: `${probability.toFixed(0)}% failure probability`,
        confidence: clamp(0.69 + stableJitter(key, 0.12), 0.45, 0.9),
        riskLevel: probability > 60 ? "High" : probability > 30 ? "Medium" : "Low",
        metrics: [
          { label: "Failure probability", value: `${probability.toFixed(0)}%`, tone: probability > 60 ? "red" : probability > 30 ? "amber" : "green" },
          { label: "Remaining useful hours", value: `${remaining.toFixed(0)} h`, tone: "blue" },
          { label: "Vibration index", value: vibration.toFixed(1), tone: vibration > 6 ? "red" : "amber" },
          { label: "Load factor", value: `${load.toFixed(0)}%`, tone: load > 105 ? "red" : "neutral" },
        ],
        series: {
          labels: ["+0d", "+7d", "+14d", "+21d", "+28d", "+35d"],
          values: [1, 2, 3, 4, 5, 6].map((step) =>
            clamp(probability * (0.7 + step * 0.09) + stableJitter(key + step, 5), 1, 97)
          ),
        },
        explanation: `${String(inputs.equipment)} has ${hours.toLocaleString("en-US")} run hours, ${since} days since maintenance, vibration index ${vibration.toFixed(1)} at ${load}% load.`,
        recommendation: probability > 50
          ? "Schedule inspection during the next planned stop and stage critical spares at the rig site."
          : "Continue monitoring; include the unit in the next routine maintenance window.",
      };
    }
    case "fuel": {
      const pumping = num(inputs, "pumpingHours", 12);
      const depth = num(inputs, "depth");
      const mud = num(inputs, "mudVolume", 180);
      const transport = num(inputs, "transportKm", 120);
      const rigFactor = { "Land rig": 1.0, "Offshore rig": 1.45, "Workover rig": 0.55, "Snubbing unit": 0.35 }[String(inputs.rigType)] ?? 1;
      const liters = clamp((pumping * 165 + mud * 2.4 + depth * 0.55) * rigFactor + transport * 0.32 + stableJitter(key, 60), 120, 24000);
      const intensity = liters / Math.max(depth, 400);
      const co2 = liters * 0.00268;
      return {
        headline: `${Math.round(liters).toLocaleString("en-US")} L/day forecast`,
        confidence: clamp(0.8 + stableJitter(key, 0.08), 0.58, 0.95),
        riskLevel: intensity > 4 ? "High" : intensity > 2 ? "Medium" : "Low",
        metrics: [
          { label: "Daily diesel", value: `${Math.round(liters).toLocaleString("en-US")} L`, tone: "amber" },
          { label: "Intensity per meter", value: `${intensity.toFixed(2)} L/m`, tone: intensity > 4 ? "red" : "green" },
          { label: "CO2 per day", value: `${co2.toFixed(2)} t`, tone: "blue" },
          { label: "Weekly volume", value: `${Math.round(liters * 7).toLocaleString("en-US")} L`, tone: "neutral" },
        ],
        series: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          values: [1, 2, 3, 4, 5, 6].map((day) =>
            Math.round(liters * (0.95 + ((day % 3) * 0.04)) + stableJitter(key + day, 40))
          ),
        },
        explanation: `${String(inputs.rigType)} pumping ${pumping} h/day with ${Math.round(mud)} m3 circulating volume, ${Math.round(depth)} m depth and ${Math.round(transport)} km of supply transport.`,
        recommendation: "Consolidate supply runs and verify base-load generator loading; both typically reduce daily diesel use without affecting operations.",
      };
    }
    case "completion": {
      const depth = num(inputs, "wellDepth");
      const pressure = num(inputs, "reservoirPressure");
      const casing = { Good: 0.95, Fair: 0.8, Poor: 0.6 }[String(inputs.casingQuality)] ?? 0.85;
      const bond = { Good: 0.95, Fair: 0.78, Poor: 0.55 }[String(inputs.cementBond)] ?? 0.85;
      const equip = num(inputs, "equipmentAvailability", 80) / 100;
      const crew = num(inputs, "crewAvailability", 80) / 100;
      const readiness = clamp((casing * 0.25 + bond * 0.25 + equip * 0.25 + crew * 0.25) * 100 + stableJitter(key, 4), 5, 99);
      const duration = clamp(18 + depth / 260 + (100 - readiness) * 0.25 + pressure / 1800, 8, 160);
      return {
        headline: `${readiness.toFixed(0)}% completion readiness`,
        confidence: clamp(0.73 + stableJitter(key, 0.1), 0.5, 0.93),
        riskLevel: readiness < 55 ? "High" : readiness < 75 ? "Medium" : "Low",
        metrics: [
          { label: "Readiness", value: `${readiness.toFixed(0)}%`, tone: readiness >= 75 ? "green" : readiness >= 55 ? "amber" : "red" },
          { label: "Forecast duration", value: `${duration.toFixed(0)} days`, tone: "blue" },
          { label: "Reservoir pressure", value: `${pressure.toLocaleString("en-US")} psi`, tone: "neutral" },
          { label: "Equipment availability", value: `${Math.round(equip * 100)}%`, tone: equip > 0.8 ? "green" : "amber" },
        ],
        series: {
          labels: ["Now", "+2w", "+4w", "+6w", "+8w", "+10w"],
          values: [1, 2, 3, 4, 5, 6].map((step) =>
            clamp(readiness * (0.82 + step * 0.035), 5, 99)
          ),
        },
        explanation: `Casing condition ${String(inputs.casingQuality)}, cement bond ${String(inputs.cementBond)}, equipment availability ${Math.round(equip * 100)}% and crew availability ${Math.round(crew * 100)}% for a ${depth} m well at ${pressure} psi.`,
        recommendation: readiness < 75
          ? "Close equipment and cement-bond gaps before mobilising the completion spread; re-run this forecast after remediation."
          : "Readiness is acceptable; confirm the completion string and crew roster against the schedule.",
      };
    }
    case "risk": {
      const npt = num(inputs, "nptHours");
      const hse = num(inputs, "hseIncidents");
      const depth = num(inputs, "depth");
      const weather = { Stable: 6, Variable: 14, Severe: 26 }[String(inputs.weather)] ?? 10;
      const crew = { High: 6, Medium: 13, Low: 24 }[String(inputs.crewExperience)] ?? 12;
      const third = num(inputs, "thirdPartyCount");
      const parts = {
        npt: clamp(npt * 1.1, 0, 30),
        hse: clamp(hse * 4.2, 0, 28),
        weather,
        crew,
        thirdParty: clamp(third * 1.5, 0, 18),
        depth: clamp(depth / 320, 0, 14),
      };
      const score = clamp(
        Object.values(parts).reduce((sum, value) => sum + value, 0) / 1.25 + stableJitter(key, 4),
        0,
        100
      );
      return {
        headline: `Composite risk score ${score.toFixed(0)}/100`,
        confidence: clamp(0.72 + stableJitter(key, 0.1), 0.48, 0.92),
        riskLevel: riskOf(score),
        metrics: [
          { label: "Risk score", value: `${score.toFixed(0)}/100`, tone: score > 66 ? "red" : score > 33 ? "amber" : "green" },
          { label: "HSE contribution", value: `${parts.hse.toFixed(0)} pts`, tone: parts.hse > 15 ? "red" : "neutral" },
          { label: "NPT contribution", value: `${parts.npt.toFixed(0)} pts`, tone: parts.npt > 15 ? "amber" : "neutral" },
          { label: "Third-party load", value: `${third} sites`, tone: third > 12 ? "amber" : "blue" },
        ],
        series: {
          labels: ["NPT", "HSE", "Weather", "Crew", "3rd party", "Depth"],
          values: [parts.npt, parts.hse, parts.weather, parts.crew, parts.thirdParty, parts.depth].map((value) =>
            Math.round(value)
          ),
        },
        explanation: `Weighted from ${npt} NPT hours, ${hse} HSE incidents, ${String(inputs.weather)} weather, ${String(inputs.crewExperience)} crew experience, ${third} third-party contractors and ${depth} m depth.`,
        recommendation: score > 66
          ? "Escalate to the drilling risk review: agree mitigation owners for the top contributing categories before the next operation."
          : "Continue routine monitoring and re-score after the next tour handover.",
      };
    }
    default:
      throw new Error(`Unsupported capability: ${capability.id}`);
  }
}

async function callEndpoint(
  endpoint: string,
  request: AIPredictionRequest
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

function fromRemote(capability: AICapability, payload: unknown, startedAt: number): AIPredictionResult | null {
  if (!payload || typeof payload !== "object") return null;
  const data = payload as Partial<AIPredictionResult>;
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
 * Run a drilling prediction request.
 * Returns an explicit outcome for every state: invalid input, unreachable model,
 * timeout, or a labelled demo/live result.
 */
export async function runDrillingPrediction(
  request: AIPredictionRequest
): Promise<AIPredictionOutcome> {
  const capability = getCapability(request.capability);
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

export function isAiEndpointConfigured(): boolean {
  return Boolean(aiEndpoint());
}
