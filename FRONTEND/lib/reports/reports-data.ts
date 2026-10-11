import type {
  Stage8AiInsight,
  Stage8Chart,
  Stage8FooterNote,
  Stage8Kpi,
  Stage8Row,
  Stage8Stat,
} from "@/lib/stage8/types";
import type { Stage8Column } from "@/lib/stage8/types";

export interface ReportFamilyConfig {
  key: string;
  title: string;
  subtitle: string;
  kpis: Stage8Kpi[];
  stats?: Stage8Stat[];
  charts: Stage8Chart[];
  columns: Stage8Column[];
  rows: Stage8Row[];
  statusField?: string;
  statuses?: string[];
  createLabel: string;
  primaryAction: "share" | "create" | "save";
  footer: Stage8FooterNote;
  ai: Stage8AiInsight;
  insightTitle: string;
  insightLines: string[];
  exportName: string;
}

const MONTHS = ["01", "02", "03", "04", "05", "06"];
const ACTION_FOOTNOTE = "Index: Actual 68 / Planned 72 · Oct";

export const PT_SUBTITLE = "Algeria operations · Q4 2026 · Updated 09:42 UTC+1";

export const defaultReportKpis: Stage8Kpi[] = [
  { label: "Total reports", value: "126" },
  { label: "Scheduled reports", value: "18" },
  { label: "Saved reports", value: "42" },
  { label: "Categories", value: "9" },
];

export const defaultReportStats: Stage8Stat[] = [
  { label: "Recent activities", value: "28" },
  { label: "Popular reports", value: "12" },
  { label: "Categories", value: "9" },
  { label: "Approvals", value: "4" },
];

export const reportAiForecast: Stage8AiInsight = {
  contextLabel: "AI prediction · Medium risk · 90.6% confidence",
  headline: "Q4 operating cost forecast +4.2% above budget",
  summary: "Cost pressure concentrated in drilling logistics and fuel.",
  explanation:
    "Based on verified ERP records through 05 Oct. Review the source report and its assumptions before acting.",
  recommendedAction: "Review the source report and confirm the forecast assumptions before circulation.",
  confidence: 0.906,
  riskLevel: "Medium",
  modelId: "ERP-FORE-01",
  modelVersion: "2.3.1",
  statusLabel: "Not confirmed",
  createdAt: "2026-10-05T09:42:00Z",
};

export const reportAiDelay: Stage8AiInsight = {
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

export function barsChart(title: string, values: number[], footnote = ACTION_FOOTNOTE): Stage8Chart {
  return { title, kind: "bars", labels: MONTHS, series: [{ name: "Actual", values, tone: "blue" }], footnote };
}

export function plannedVsActual(title: string, planned: number[], actual: number[], footnote = ACTION_FOOTNOTE): Stage8Chart {
  return {
    title,
    kind: "lines",
    labels: MONTHS,
    series: [
      { name: "Planned", values: planned, tone: "neutral" },
      { name: "Actual", values: actual, tone: "blue" },
    ],
    footnote,
  };
}

export function incomeExpenses(title: string, income: number[], expenses: number[], footnote = ACTION_FOOTNOTE): Stage8Chart {
  return {
    title,
    kind: "lines",
    labels: MONTHS,
    series: [
      { name: "Income", values: income, tone: "green" },
      { name: "Expenses", values: expenses, tone: "red" },
    ],
    footnote,
  };
}

const opRows: Stage8Row[] = [
  { id: "OP-104", project: "Hassi Messaoud Expansion", region: "Ouargla", stock: 12480, vehicle: "Hilux / FL-41", equipment: "D65 / EQ-31", well: "HM-104", progress: 68, productivity: 92, downtime: 6.2, status: "Active" },
  { id: "OP-105", project: "In Salah Expansion", region: "In Salah", stock: 11830, vehicle: "Hilux / FL-42", equipment: "D65 / EQ-32", well: "HM-105", progress: 42, productivity: 81, downtime: 9.4, status: "At risk" },
  { id: "OP-106", project: "Hassi R'Mel Expansion", region: "Laghouat", stock: 10940, vehicle: "Hilux / FL-43", equipment: "D65 / EQ-33", well: "HM-106", progress: 74, productivity: 88, downtime: 4.1, status: "On track" },
  { id: "OP-107", project: "Adrar Expansion", region: "Adrar", stock: 9220, vehicle: "Hilux / FL-44", equipment: "D65 / EQ-34", well: "HM-107", progress: 55, productivity: 76, downtime: 7.8, status: "Delayed" },
  { id: "OP-108", project: "Ouargla Expansion", region: "Ouargla", stock: 8710, vehicle: "Hilux / FL-45", equipment: "D65 / EQ-35", well: "HM-108", progress: 61, productivity: 84, downtime: 5.3, status: "Active" },
  { id: "OP-109", project: "Illizi Expansion", region: "Illizi", stock: 7980, vehicle: "Hilux / FL-46", equipment: "D65 / EQ-36", well: "HM-109", progress: 33, productivity: 69, downtime: 11.6, status: "Completed" },
];

const operationalColumns: Stage8Column[] = [
  { key: "project", label: "Project" },
  { key: "region", label: "Region" },
  { key: "stock", label: "Stock", kind: "number" },
  { key: "vehicle", label: "Vehicle" },
  { key: "equipment", label: "Equipment" },
  { key: "well", label: "Well" },
  { key: "progress", label: "Progress", kind: "percent" },
  { key: "productivity", label: "Productivity", kind: "percent" },
  { key: "downtime", label: "Downtime" },
  { key: "status", label: "Status", kind: "status" },
];

export const reportsDashboard: ReportFamilyConfig = {
  key: "reports-dashboard",
  title: "Reports & Analytics Dashboard",
  subtitle: PT_SUBTITLE,
  kpis: defaultReportKpis,
  stats: defaultReportStats,
  charts: [
    barsChart("Report activity", [15, 24, 39, 36, 55, 60]),
    incomeExpenses("Income and expenses", [62, 68, 72, 70, 76, 80], [48, 52, 55, 58, 60, 63]),
    barsChart("Operational performance", [15, 24, 39, 36, 55, 60]),
    barsChart("Risk distribution", [12, 18, 22, 19, 26, 30]),
  ],
  columns: operationalColumns,
  rows: opRows,
  statusField: "status",
  statuses: ["Active", "At risk", "On track", "Completed", "Delayed", "Archived"],
  createLabel: "Create",
  primaryAction: "create",
  footer: { tone: "amber", text: "Warning: 2 overdue records need review." },
  ai: reportAiForecast,
  insightTitle: "Popular reports",
  insightLines: [
    "Weekly performance is opened most often this week.",
    "Cost variance and fleet availability are trending upward.",
    "Two report packs are awaiting human review.",
  ],
  exportName: "reports-analytics-dashboard",
};

function family(
  key: string,
  title: string,
  overrides: Partial<ReportFamilyConfig>
): ReportFamilyConfig {
  return {
    key,
    title,
    subtitle: PT_SUBTITLE,
    kpis: defaultReportKpis,
    charts: [barsChart("Operational performance", [15, 24, 39, 36, 55, 60]), plannedVsActual("Planned vs actual", [55, 60, 64, 68, 70, 72], [48, 55, 58, 63, 66, 68])],
    columns: operationalColumns,
    rows: opRows,
    statusField: "status",
    statuses: ["Active", "At risk", "On track", "Completed", "Delayed", "Archived"],
    createLabel: "Create",
    primaryAction: "share",
    footer: { tone: "amber", text: "Warning: 2 overdue records need review." },
    ai: reportAiForecast,
    insightTitle: "Report insight",
    insightLines: [
      "Aggregated from verified ERP and daily-log records.",
      "Filters apply across every column in the register.",
      "Export produces a real CSV of the visible rows.",
    ],
    exportName: key,
    ...overrides,
  };
}

export const reportsFamilyConfigs: Record<string, ReportFamilyConfig> = {
  executive: family("executive", "Executive Reports", {
    kpis: defaultReportKpis,
    createLabel: "Share",
    footer: { tone: "blue", text: "No results for archived + critical; active records shown." },
    charts: [
      plannedVsActual("Operational performance", [55, 60, 64, 68, 70, 72], [48, 55, 58, 63, 66, 68]),
      plannedVsActual("Planned vs actual", [58, 62, 66, 70, 72, 74], [52, 57, 61, 66, 69, 71]),
    ],
    columns: [
      { key: "metric", label: "Metric" },
      { key: "revenue", label: "Revenue" },
      { key: "cost", label: "Cost" },
      { key: "headcount", label: "Headcount" },
      { key: "projects", label: "Projects" },
      { key: "stock", label: "Stock" },
      { key: "equipment", label: "Equipment" },
      { key: "well", label: "Well" },
      { key: "risk", label: "Risk", kind: "status" },
      { key: "progress", label: "Progress", kind: "percent" },
    ],
    rows: [
      { id: "EX-01", metric: "Productivity", revenue: "18.40 M DZD", cost: "12.10 M DZD", headcount: 486, projects: 24, stock: "12,480", equipment: 642, well: 18, risk: "Medium", progress: 68 },
      { id: "EX-02", metric: "Cost", revenue: "20.40 M DZD", cost: "14.80 M DZD", headcount: 486, projects: 24, stock: "12,480", equipment: 642, well: 18, risk: "High", progress: 61 },
      { id: "EX-03", metric: "Fuel", revenue: "22.40 M DZD", cost: "9.40 M DZD", headcount: 486, projects: 24, stock: "11,830", equipment: 638, well: 17, risk: "Medium", progress: 72 },
      { id: "EX-04", metric: "Downtime", revenue: "24.40 M DZD", cost: "6.20 M DZD", headcount: 486, projects: 24, stock: "10,940", equipment: 631, well: 17, risk: "Low", progress: 74 },
      { id: "EX-05", metric: "Health score", revenue: "26.40 M DZD", cost: "7.10 M DZD", headcount: 486, projects: 24, stock: "9,220", equipment: 620, well: 16, risk: "Low", progress: 55 },
      { id: "EX-06", metric: "Progress", revenue: "28.40 M DZD", cost: "8.30 M DZD", headcount: 486, projects: 24, stock: "8,710", equipment: 612, well: 16, risk: "Medium", progress: 61 },
    ],
    exportName: "reports-executive",
  }),
  operational: family("operational", "Operational Reports", {}),
  financial: family("financial", "Financial Reports", {
    kpis: [
      { label: "Budget", value: "48.0 M DZD" },
      { label: "Actual", value: "46.8 M DZD" },
      { label: "Variance", value: "-1.2 M DZD" },
      { label: "Progress", value: "68.4%" },
    ],
    charts: [
      incomeExpenses("Income and expenses", [62, 68, 72, 70, 76, 80], [48, 52, 55, 58, 60, 63]),
      plannedVsActual("Planned vs actual", [55, 60, 64, 68, 70, 72], [48, 55, 58, 63, 66, 68]),
    ],
    columns: [
      { key: "revenue", label: "Revenue" },
      { key: "expenses", label: "Expenses" },
      { key: "cashflow", label: "Cash flow" },
      { key: "budget", label: "Budget" },
      { key: "actual", label: "Actual" },
      { key: "variance", label: "Variance" },
      { key: "progress", label: "Progress", kind: "percent" },
      { key: "status", label: "Status", kind: "status" },
    ],
    rows: [
      { id: "FN-01", revenue: "18.40 M DZD", expenses: "12.10 M DZD", cashflow: "+6.30 M DZD", budget: "20.00 M DZD", actual: "18.40 M DZD", variance: "-1.60 M DZD", progress: 68, status: "Active" },
      { id: "FN-02", revenue: "20.40 M DZD", expenses: "14.80 M DZD", cashflow: "+5.60 M DZD", budget: "22.00 M DZD", actual: "20.40 M DZD", variance: "-1.60 M DZD", progress: 61, status: "At risk" },
      { id: "FN-03", revenue: "22.40 M DZD", expenses: "9.40 M DZD", cashflow: "+13.00 M DZD", budget: "24.00 M DZD", actual: "22.40 M DZD", variance: "-1.60 M DZD", progress: 72, status: "On track" },
      { id: "FN-04", revenue: "24.40 M DZD", expenses: "6.20 M DZD", cashflow: "+18.20 M DZD", budget: "26.00 M DZD", actual: "24.40 M DZD", variance: "-1.60 M DZD", progress: 74, status: "Completed" },
      { id: "FN-05", revenue: "26.40 M DZD", expenses: "7.10 M DZD", cashflow: "+19.30 M DZD", budget: "28.00 M DZD", actual: "26.40 M DZD", variance: "-1.60 M DZD", progress: 55, status: "Delayed" },
      { id: "FN-06", revenue: "28.40 M DZD", expenses: "8.30 M DZD", cashflow: "+20.10 M DZD", budget: "30.00 M DZD", actual: "28.40 M DZD", variance: "-1.60 M DZD", progress: 61, status: "Active" },
    ],
    footer: { tone: "amber", text: "Validation: end date must follow start date." },
    exportName: "reports-financial",
  }),
  hr: family("hr", "HR Reports", {
    kpis: [
      { label: "Headcount", value: "486" },
      { label: "Attendance", value: "96.2%" },
      { label: "Leave", value: "18" },
      { label: "Payroll", value: "21.4 M DZD" },
    ],
    charts: [
      barsChart("Workload", [42, 55, 61, 58, 66, 70]),
      plannedVsActual("Planned vs actual", [55, 60, 64, 68, 70, 72], [48, 55, 58, 63, 66, 68]),
    ],
    columns: [
      { key: "region", label: "Region" },
      { key: "headcount", label: "Headcount", kind: "number" },
      { key: "attendance", label: "Attendance" },
      { key: "leave", label: "Leave" },
      { key: "recruitment", label: "Recruitment" },
      { key: "payroll", label: "Payroll" },
      { key: "capacity", label: "Capacity", kind: "percent" },
      { key: "status", label: "Status", kind: "status" },
    ],
    rows: [
      { id: "HR-01", region: "Ouargla", headcount: 128, attendance: "96.2%", leave: 5, recruitment: 6, payroll: "5.40 M DZD", capacity: 82, status: "Active" },
      { id: "HR-02", region: "In Salah", headcount: 96, attendance: "94.8%", leave: 4, recruitment: 3, payroll: "4.10 M DZD", capacity: 78, status: "On track" },
      { id: "HR-03", region: "Laghouat", headcount: 84, attendance: "97.1%", leave: 2, recruitment: 2, payroll: "3.60 M DZD", capacity: 85, status: "Active" },
      { id: "HR-04", region: "Adrar", headcount: 72, attendance: "93.4%", leave: 3, recruitment: 4, payroll: "3.10 M DZD", capacity: 70, status: "At risk" },
      { id: "HR-05", region: "Illizi", headcount: 58, attendance: "95.6%", leave: 2, recruitment: 1, payroll: "2.60 M DZD", capacity: 74, status: "Active" },
      { id: "HR-06", region: "Algiers HQ", headcount: 48, attendance: "98.0%", leave: 2, recruitment: 2, payroll: "2.60 M DZD", capacity: 88, status: "Completed" },
    ],
    footer: { tone: "amber", text: "Confirmation: approve this version? Review evidence first." },
    exportName: "reports-hr",
  }),
  inventory: family("inventory", "Inventory Reports", {
    kpis: [
      { label: "Stock", value: "12,480" },
      { label: "Value", value: "34.2 M DZD" },
      { label: "Alerts", value: "9" },
      { label: "Movement", value: "328" },
    ],
    columns: [
      { key: "material", label: "Material" },
      { key: "stock", label: "Stock", kind: "number" },
      { key: "movement", label: "Movement", kind: "number" },
      { key: "value", label: "Value" },
      { key: "alerts", label: "Alerts", kind: "number" },
      { key: "supplier", label: "Supplier" },
      { key: "warehouse", label: "Warehouse" },
      { key: "performance", label: "Performance", kind: "percent" },
    ],
    rows: [
      { id: "IN-01", material: "Drill bit ⌀165", stock: 124, movement: 42, value: "3.40 M DZD", alerts: 1, supplier: "Atlas Industrial DZ", warehouse: "Central", performance: 92 },
      { id: "IN-02", material: "Hydraulic seal", stock: 486, movement: 68, value: "2.10 M DZD", alerts: 0, supplier: "Atlas Industrial DZ", warehouse: "Ouargla", performance: 88 },
      { id: "IN-03", material: "Fuel filter", stock: 312, movement: 54, value: "1.30 M DZD", alerts: 2, supplier: "Central", warehouse: "Central", performance: 76 },
      { id: "IN-04", material: "Casing ⌀244", stock: 218, movement: 39, value: "5.60 M DZD", alerts: 1, supplier: "Atlas Industrial DZ", warehouse: "Ouargla", performance: 81 },
      { id: "IN-05", material: "Drive belt", stock: 164, movement: 45, value: "0.90 M DZD", alerts: 3, supplier: "Central", warehouse: "Adrar", performance: 69 },
      { id: "IN-06", material: "Mud pump", stock: 42, movement: 12, value: "6.20 M DZD", alerts: 2, supplier: "Atlas Industrial DZ", warehouse: "Illizi", performance: 74 },
    ],
    footer: { tone: "neutral", text: "Feed unavailable; verified 09:42 snapshot displayed." },
    exportName: "reports-inventory",
  }),
  fleet: family("fleet", "Fleet & Equipment Reports", {
    kpis: [
      { label: "Utilization", value: "82.5%" },
      { label: "Fuel", value: "18,420 L" },
      { label: "Maintenance", value: "6" },
      { label: "Downtime", value: "42 h" },
    ],
    columns: [
      { key: "vehicle", label: "Vehicle" },
      { key: "equipment", label: "Equipment" },
      { key: "utilization", label: "Utilization" },
      { key: "maintenance", label: "Maintenance" },
      { key: "fuel", label: "Fuel" },
      { key: "cost", label: "Cost" },
      { key: "downtime", label: "Downtime" },
      { key: "status", label: "Status", kind: "status" },
    ],
    rows: [
      { id: "FL-01", vehicle: "Hilux / FL-41", equipment: "D65 / EQ-31", utilization: "88%", maintenance: "Due", fuel: "1,420 L", cost: "0.84 M DZD", downtime: "4 h", status: "Active" },
      { id: "FL-02", vehicle: "Hilux / FL-42", equipment: "D65 / EQ-32", utilization: "81%", maintenance: "OK", fuel: "1,180 L", cost: "0.71 M DZD", downtime: "6 h", status: "On track" },
      { id: "FL-03", vehicle: "Hilux / FL-43", equipment: "D65 / EQ-33", utilization: "76%", maintenance: "Due", fuel: "1,090 L", cost: "0.66 M DZD", downtime: "9 h", status: "At risk" },
      { id: "FL-04", vehicle: "Hilux / FL-44", equipment: "D65 / EQ-34", utilization: "69%", maintenance: "Overdue", fuel: "0.98 L", cost: "0.59 M DZD", downtime: "12 h", status: "Delayed" },
      { id: "FL-05", vehicle: "Hilux / FL-45", equipment: "D65 / EQ-35", utilization: "84%", maintenance: "OK", fuel: "1,210 L", cost: "0.74 M DZD", downtime: "5 h", status: "Active" },
      { id: "FL-06", vehicle: "Hilux / FL-46", equipment: "D65 / EQ-36", utilization: "79%", maintenance: "OK", fuel: "1,140 L", cost: "0.68 M DZD", downtime: "6 h", status: "Completed" },
    ],
    footer: { tone: "neutral", text: "Completed records read-only · 6 archived records." },
    exportName: "reports-fleet",
  }),
  drilling: family("drilling", "Drilling Reports", {
    charts: [
      barsChart("Drilling progress", [18, 26, 34, 41, 52, 60]),
      plannedVsActual("Planned vs actual", [55, 60, 64, 68, 70, 72], [48, 55, 58, 63, 66, 68]),
    ],
    columns: [
      { key: "well", label: "Well" },
      { key: "progress", label: "Progress", kind: "percent" },
      { key: "productivity", label: "Productivity", kind: "percent" },
      { key: "cost", label: "Cost" },
      { key: "equipment", label: "Equipment" },
      { key: "fuel", label: "Fuel" },
      { key: "currentDepth", label: "Current depth" },
      { key: "targetDepth", label: "Target depth" },
    ],
    rows: [
      { id: "DR-104", well: "HM-104", progress: 68, productivity: 92, cost: "8.40 M DZD", equipment: "D65 / EQ-31", fuel: "1,420 L", currentDepth: "842 m", targetDepth: "1,240 m" },
      { id: "DR-105", well: "HM-105", progress: 42, productivity: 81, cost: "6.10 M DZD", equipment: "D65 / EQ-32", fuel: "1,180 L", currentDepth: "610 m", targetDepth: "1,180 m" },
      { id: "DR-106", well: "HM-106", progress: 74, productivity: 88, cost: "9.20 M DZD", equipment: "D65 / EQ-33", fuel: "1,260 L", currentDepth: "910 m", targetDepth: "1,220 m" },
      { id: "DR-107", well: "HM-107", progress: 55, productivity: 76, cost: "7.30 M DZD", equipment: "D65 / EQ-34", fuel: "1,090 L", currentDepth: "720 m", targetDepth: "1,300 m" },
      { id: "DR-108", well: "HM-108", progress: 61, productivity: 84, cost: "7.90 M DZD", equipment: "D65 / EQ-35", fuel: "1,150 L", currentDepth: "780 m", targetDepth: "1,260 m" },
      { id: "DR-109", well: "HM-109", progress: 33, productivity: 69, cost: "5.20 M DZD", equipment: "D65 / EQ-36", fuel: "0,980 L", currentDepth: "440 m", targetDepth: "1,150 m" },
    ],
    footer: { tone: "green", text: "Success: synchronized 09:42." },
    ai: reportAiDelay,
    exportName: "reports-drilling",
  }),
  projects: family("projects", "Project Management Reports", {
    columns: [
      { key: "project", label: "Project" },
      { key: "progress", label: "Progress", kind: "percent" },
      { key: "scheduleVariance", label: "Schedule variance" },
      { key: "budget", label: "Budget" },
      { key: "risks", label: "Risks", kind: "number" },
      { key: "issues", label: "Issues", kind: "number" },
      { key: "workload", label: "Workload", kind: "percent" },
      { key: "status", label: "Status", kind: "status" },
    ],
    rows: [
      { id: "PM-104", project: "Hassi Messaoud Expansion", progress: 68, scheduleVariance: "+3 d", budget: "11.9 M DZD", risks: 4, issues: 2, workload: 82, status: "Active" },
      { id: "PM-105", project: "In Salah Expansion", progress: 42, scheduleVariance: "+9 d", budget: "11.75 M DZD", risks: 6, issues: 5, workload: 91, status: "At risk" },
      { id: "PM-106", project: "Hassi R'Mel Expansion", progress: 74, scheduleVariance: "-1 d", budget: "11.2 M DZD", risks: 3, issues: 1, workload: 76, status: "On track" },
      { id: "PM-107", project: "Adrar Expansion", progress: 55, scheduleVariance: "+6 d", budget: "10.4 M DZD", risks: 5, issues: 3, workload: 84, status: "Delayed" },
      { id: "PM-108", project: "Ouargla Expansion", progress: 61, scheduleVariance: "+2 d", budget: "9.8 M DZD", risks: 2, issues: 1, workload: 79, status: "Active" },
      { id: "PM-109", project: "Illizi Expansion", progress: 33, scheduleVariance: "+11 d", budget: "9.1 M DZD", risks: 7, issues: 4, workload: 88, status: "Completed" },
    ],
    exportName: "reports-projects",
  }),
  preview: family("preview", "Report Preview", {
    statuses: ["Active", "At risk", "On track", "Completed", "Delayed", "Archived"],
    columns: [
      { key: "project", label: "Project" },
      { key: "budget", label: "Budget" },
      { key: "actual", label: "Actual" },
      { key: "variance", label: "Variance" },
      { key: "progress", label: "Progress", kind: "percent" },
      { key: "status", label: "Status", kind: "status" },
    ],
    rows: [
      { id: "PV-104", project: "Hassi Messaoud Expansion", budget: "11.90 M DZD", actual: "8.10 M DZD", variance: "-3.80 M DZD", progress: 68, status: "Active" },
      { id: "PV-105", project: "In Salah Expansion", budget: "11.75 M DZD", actual: "8.83 M DZD", variance: "-2.92 M DZD", progress: 42, status: "At risk" },
      { id: "PV-106", project: "Hassi R'Mel Expansion", budget: "11.20 M DZD", actual: "7.40 M DZD", variance: "-3.80 M DZD", progress: 74, status: "On track" },
      { id: "PV-107", project: "Adrar Expansion", budget: "10.40 M DZD", actual: "6.10 M DZD", variance: "-4.30 M DZD", progress: 55, status: "Delayed" },
      { id: "PV-108", project: "Ouargla Expansion", budget: "9.80 M DZD", actual: "5.90 M DZD", variance: "-3.90 M DZD", progress: 61, status: "Completed" },
      { id: "PV-109", project: "Illizi Expansion", budget: "9.10 M DZD", actual: "4.20 M DZD", variance: "-4.90 M DZD", progress: 33, status: "Archived" },
    ],
    footer: { tone: "amber", text: "Permission: budget edits require finance approval." },
    exportName: "reports-preview",
  }),
};

export interface BuilderStep {
  key: "source" | "fields" | "filters" | "grouping" | "sorting";
  label: string;
  options: string[];
}

export const reportBuilderSteps: BuilderStep[] = [
  { key: "source", label: "Data source", options: ["Drilling operations", "Financial ledger", "Fleet utilization", "Project portfolio", "Inventory stock"] },
  { key: "fields", label: "Fields", options: ["Project", "Progress", "Cost", "Well", "Region", "Fuel", "Downtime", "Vehicle"] },
  { key: "filters", label: "Filters", options: ["Algeria · Active · Oct 2026", "Algeria · All statuses · Q4 2026", "Ouargla · Active · Oct 2026"] },
  { key: "grouping", label: "Grouping", options: ["Project", "Region", "Well", "Vehicle", "Category"] },
  { key: "sorting", label: "Sorting", options: ["Cost ↓", "Progress ↓", "Fuel ↓", "Downtime ↓"] },
];

export const reportBuilderVisualizations = ["Bars + table", "Table only", "Lines + table"];

export const reportBuilderCatalogue: Stage8Row[] = [
  { id: "HB-104", project: "Hassi Messaoud Expansion", progress: 68, cost: 8.1, status: "Active" },
  { id: "HB-105", project: "In Salah Expansion", progress: 42, cost: 8.83, status: "At risk" },
  { id: "HB-106", project: "Hassi R'Mel Expansion", progress: 74, cost: 7.4, status: "On track" },
  { id: "HB-107", project: "Adrar Expansion", progress: 55, cost: 6.1, status: "Delayed" },
  { id: "HB-108", project: "Ouargla Expansion", progress: 61, cost: 5.9, status: "Active" },
];

const scheduledRowDefs: [string, string, string, string, string, string][] = [
  ["Weekly performance", "Weekly", "ops@atlas.dz", "PDF", "06 Oct 2026", "Active"],
  ["Cost variance", "Monthly", "finance@atlas.dz", "XLSX", "01 Nov 2026", "Active"],
  ["Equipment availability", "Weekly", "fleet@atlas.dz", "PDF", "07 Oct 2026", "Paused"],
  ["Fuel consumption", "Daily", "ops@atlas.dz", "CSV", "06 Oct 2026", "Active"],
  ["Risk register", "Monthly", "risk@atlas.dz", "PDF", "01 Nov 2026", "Active"],
  ["Well progress", "Weekly", "drilling@atlas.dz", "XLSX", "08 Oct 2026", "Draft"],
];

export const scheduledReportsColumns: Stage8Column[] = [
  { key: "name", label: "Report" },
  { key: "frequency", label: "Frequency" },
  { key: "recipients", label: "Recipients" },
  { key: "format", label: "Format" },
  { key: "nextRun", label: "Next run" },
  { key: "status", label: "Status", kind: "status" },
];

export function buildScheduledRows(): Stage8Row[] {
  return scheduledRowDefs.map(([name, frequency, recipients, format, nextRun, status], i) => ({
    id: `SCH-${String(i + 1).padStart(3, "0")}`,
    name,
    frequency,
    recipients,
    format,
    nextRun,
    status,
  }));
}

const savedRowDefs: [string, string, string, string, string][] = [
  ["Weekly performance", "A. Meziane", "04 Oct 2026", "Yes", "Reporting"],
  ["Cost variance", "S. Boudiaf", "03 Oct 2026", "Yes", "Financial"],
  ["Equipment availability", "Y. Khelifi", "02 Oct 2026", "No", "Fleet"],
  ["Fuel consumption", "M. Touati", "01 Oct 2026", "No", "Fleet"],
  ["Risk register", "R. Saidi", "30 Sep 2026", "Yes", "Assurance"],
  ["Well progress", "N. Benali", "29 Sep 2026", "No", "Drilling"],
];

export const savedReportsColumns: Stage8Column[] = [
  { key: "name", label: "Report" },
  { key: "owner", label: "Owner" },
  { key: "lastModified", label: "Last modified" },
  { key: "favorite", label: "Favorite" },
  { key: "category", label: "Category" },
];

export function buildSavedRows(): Stage8Row[] {
  return savedRowDefs.map(([name, owner, lastModified, favorite, category], i) => ({
    id: `SAV-${String(i + 1).padStart(3, "0")}`,
    name,
    owner,
    lastModified,
    favorite,
    category,
  }));
}

export const reportFamilyCount = 13;
