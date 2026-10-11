import type {
  Stage8AiInsight,
  Stage8Chart,
  Stage8Column,
  Stage8FooterNote,
  Stage8Kpi,
  Stage8Row,
} from "@/lib/stage8/types";
import { barsChart } from "@/lib/reports/reports-data";

export const GIS_SUBTITLE = "Algeria operations · Q4 2026 · Updated 09:42 UTC+1";

/** Stylized Algeria silhouette on a 0–100 plane (demo geography, not survey-accurate). */
export const algeriaOutline =
  "M 30 20 L 46 12 L 61 15 L 73 23 L 81 33 L 87 45 L 93 60 L 89 74 L 79 84 L 65 91 L 50 89 L 37 81 L 25 68 L 17 54 L 18 40 L 24 28 Z";

export interface GisFeature {
  id: string;
  name: string;
  region: string;
  x: number;
  y: number;
  kind: string;
  status: string;
  primary: string;
  secondary: string;
  progress?: number;
}

export interface GisLayer {
  key: string;
  label: string;
}

export interface GisMapConfig {
  key: string;
  title: string;
  subtitle: string;
  kpis: Stage8Kpi[];
  layers: GisLayer[];
  features: GisFeature[];
  columns: Stage8Column[];
  summary: string;
  legend: string[];
  footer: Stage8FooterNote;
  ai: Stage8AiInsight;
  insightTitle: string;
  insightLines: string[];
  exportName: string;
}

export const gisAi: Stage8AiInsight = {
  contextLabel: "NEXUS AI · Geospatial · Needs review",
  headline: "HM-105 risk cluster · Confidence 88.7%",
  summary: "Two assets inside a 12 km radius show correlated downtime.",
  explanation:
    "Derived from verified asset telemetry and daily logs through 05 Oct. Confirm on-site before relocating assets.",
  recommendedAction: "Confirm on-site conditions before relocating the D65 crew.",
  confidence: 0.887,
  riskLevel: "Medium",
  modelId: "GEO-RISK-01",
  modelVersion: "1.8.4",
  statusLabel: "Needs review",
  createdAt: "2026-10-05T09:42:00Z",
};

export const gisDashboardKpis: Stage8Kpi[] = [
  { label: "Assets tracked", value: "642" },
  { label: "Active sites", value: "18" },
  { label: "Wellheads", value: "126" },
  { label: "Vehicles live", value: "84" },
];

export const gisAnalyticsKpis: Stage8Kpi[] = [
  { label: "Regions analysed", value: "6" },
  { label: "Assets in scope", value: "642" },
  { label: "Hotspots", value: "4" },
  { label: "Coverage", value: "72%" },
];

export const gisAnalyticsCharts: Stage8Chart[] = [
  barsChart("Regional output", [32, 48, 41, 56, 62, 58]),
  barsChart("Asset density", [18, 26, 34, 30, 44, 40]),
  barsChart("Downtime by region", [12, 9, 16, 11, 7, 5]),
  barsChart("Coverage", [55, 60, 64, 68, 70, 72]),
];

const assetFeatures: GisFeature[] = [
  { id: "AST-01", name: "Central pump station", region: "Ouargla", x: 62, y: 44, kind: "Pump", status: "Active", primary: "124 units", secondary: "Central", progress: 92 },
  { id: "AST-02", name: "Ouargla manifold", region: "Ouargla", x: 58, y: 50, kind: "Manifold", status: "On track", primary: "86 units", secondary: "Ouargla", progress: 88 },
  { id: "AST-03", name: "In Salah compressor", region: "In Salah", x: 44, y: 34, kind: "Compressor", status: "At risk", primary: "42 units", secondary: "In Salah", progress: 68 },
  { id: "AST-04", name: "Laghouat tank farm", region: "Laghouat", x: 52, y: 30, kind: "Storage", status: "Active", primary: "210 units", secondary: "Laghouat", progress: 81 },
  { id: "AST-05", name: "Adrar drill pad", region: "Adrar", x: 34, y: 56, kind: "Drill pad", status: "Delayed", primary: "18 units", secondary: "Adrar", progress: 55 },
  { id: "AST-06", name: "Illizi pump", region: "Illizi", x: 70, y: 66, kind: "Pump", status: "Active", primary: "64 units", secondary: "Illizi", progress: 76 },
  { id: "AST-07", name: "Hassi R'Mel hub", region: "Laghouat", x: 50, y: 36, kind: "Hub", status: "On track", primary: "132 units", secondary: "Laghouat", progress: 90 },
  { id: "AST-08", name: "Algiers HQ depot", region: "Algiers", x: 46, y: 12, kind: "Depot", status: "Active", primary: "88 units", secondary: "Algiers", progress: 94 },
];

const projectFeatures: GisFeature[] = [
  { id: "PRJ-104", name: "Hassi Messaoud Expansion", region: "Ouargla", x: 62, y: 46, kind: "Project", status: "Active", primary: "68%", secondary: "11.90 M DZD", progress: 68 },
  { id: "PRJ-105", name: "In Salah Expansion", region: "In Salah", x: 44, y: 34, kind: "Project", status: "At risk", primary: "42%", secondary: "11.75 M DZD", progress: 42 },
  { id: "PRJ-106", name: "Hassi R'Mel Expansion", region: "Laghouat", x: 51, y: 33, kind: "Project", status: "On track", primary: "74%", secondary: "11.20 M DZD", progress: 74 },
  { id: "PRJ-107", name: "Adrar Expansion", region: "Adrar", x: 34, y: 58, kind: "Project", status: "Delayed", primary: "55%", secondary: "10.40 M DZD", progress: 55 },
  { id: "PRJ-108", name: "Ouargla Expansion", region: "Ouargla", x: 57, y: 52, kind: "Project", status: "Active", primary: "61%", secondary: "9.80 M DZD", progress: 61 },
  { id: "PRJ-109", name: "Illizi Expansion", region: "Illizi", x: 72, y: 64, kind: "Project", status: "Completed", primary: "33%", secondary: "9.10 M DZD", progress: 33 },
];

const fleetFeatures: GisFeature[] = [
  { id: "FL-41", name: "Hilux / FL-41", region: "Ouargla", x: 60, y: 48, kind: "Vehicle", status: "Active", primary: "88%", secondary: "D65 / EQ-31", progress: 88 },
  { id: "FL-42", name: "Hilux / FL-42", region: "In Salah", x: 45, y: 36, kind: "Vehicle", status: "On track", primary: "81%", secondary: "D65 / EQ-32", progress: 81 },
  { id: "FL-43", name: "Hilux / FL-43", region: "Laghouat", x: 52, y: 32, kind: "Vehicle", status: "At risk", primary: "76%", secondary: "D65 / EQ-33", progress: 76 },
  { id: "FL-44", name: "Hilux / FL-44", region: "Adrar", x: 35, y: 57, kind: "Vehicle", status: "Delayed", primary: "69%", secondary: "D65 / EQ-34", progress: 69 },
  { id: "FL-45", name: "Hilux / FL-45", region: "Ouargla", x: 64, y: 44, kind: "Vehicle", status: "Active", primary: "84%", secondary: "D65 / EQ-35", progress: 84 },
  { id: "FL-46", name: "Hilux / FL-46", region: "Illizi", x: 72, y: 62, kind: "Vehicle", status: "Completed", primary: "79%", secondary: "D65 / EQ-36", progress: 79 },
  { id: "FL-47", name: "Hilux / FL-47", region: "Algiers", x: 47, y: 14, kind: "Vehicle", status: "Active", primary: "90%", secondary: "D65 / EQ-37", progress: 90 },
  { id: "FL-48", name: "Hilux / FL-48", region: "Laghouat", x: 49, y: 29, kind: "Vehicle", status: "On track", primary: "83%", secondary: "D65 / EQ-38", progress: 83 },
];

const wellFeatures: GisFeature[] = [
  { id: "HM-104", name: "HM-104", region: "Ouargla", x: 61, y: 47, kind: "Well", status: "Active", primary: "842 m", secondary: "68%", progress: 68 },
  { id: "HM-105", name: "HM-105", region: "In Salah", x: 44, y: 35, kind: "Well", status: "At risk", primary: "610 m", secondary: "42%", progress: 42 },
  { id: "HM-106", name: "HM-106", region: "Laghouat", x: 51, y: 32, kind: "Well", status: "On track", primary: "910 m", secondary: "74%", progress: 74 },
  { id: "HM-107", name: "HM-107", region: "Adrar", x: 35, y: 58, kind: "Well", status: "Delayed", primary: "720 m", secondary: "55%", progress: 55 },
  { id: "HM-108", name: "HM-108", region: "Ouargla", x: 58, y: 51, kind: "Well", status: "Active", primary: "780 m", secondary: "61%", progress: 61 },
  { id: "HM-109", name: "HM-109", region: "Illizi", x: 71, y: 63, kind: "Well", status: "Completed", primary: "440 m", secondary: "33%", progress: 33 },
  { id: "HM-110", name: "HM-110", region: "Illizi", x: 74, y: 60, kind: "Well", status: "Active", primary: "520 m", secondary: "47%", progress: 47 },
  { id: "HM-111", name: "HM-111", region: "Adrar", x: 32, y: 53, kind: "Well", status: "On track", primary: "300 m", secondary: "28%", progress: 28 },
];

function mapColumns(primaryLabel: string, secondaryLabel: string): Stage8Column[] {
  return [
    { key: "name", label: "Site" },
    { key: "region", label: "Region" },
    { key: "kind", label: "Kind" },
    { key: "primary", label: primaryLabel },
    { key: "secondary", label: secondaryLabel },
    { key: "status", label: "Status", kind: "status" },
  ];
}

const GIS_GROUP_KEYS = ["assets", "projects", "fleet", "wells"];

export function gisFeatureGroup(feature: GisFeature): string {
  const id = feature.id.toUpperCase();
  if (id.startsWith("AST")) return "assets";
  if (id.startsWith("PRJ")) return "projects";
  if (id.startsWith("FL")) return "fleet";
  if (id.startsWith("HM")) return "wells";
  return "other";
}

export function gisStatusSlug(feature: GisFeature): string {
  return feature.status.toLowerCase().replace(/\s+/g, "-");
}

export function gisFeatureVisible(feature: GisFeature, layers: GisLayer[], activeLayers: string[]): boolean {
  if (activeLayers.length === 0) return true;
  if (layers.some((layer) => GIS_GROUP_KEYS.includes(layer.key))) {
    return activeLayers.includes(gisFeatureGroup(feature));
  }
  return activeLayers.includes(gisStatusSlug(feature));
}

export function featuresToRows(features: GisFeature[]): Stage8Row[] {
  return features.map((feature) => ({
    id: feature.id,
    name: feature.name,
    region: feature.region,
    kind: feature.kind,
    primary: feature.primary,
    secondary: feature.secondary,
    status: feature.status,
    progress: feature.progress ?? 0,
  }));
}

export const gisMapConfigs: Record<string, GisMapConfig> = {
  map: {
    key: "gis-map",
    title: "GIS Map",
    subtitle: GIS_SUBTITLE,
    kpis: gisDashboardKpis,
    layers: [
      { key: "assets", label: "Assets" },
      { key: "projects", label: "Projects" },
      { key: "fleet", label: "Fleet" },
      { key: "wells", label: "Wellheads" },
    ],
    features: [...assetFeatures, ...projectFeatures, ...fleetFeatures, ...wellFeatures],
    columns: mapColumns("Value", "Detail"),
    summary: "All operational layers · Hassi Messaoud cluster",
    legend: ["Active", "At risk", "Delayed", "Completed"],
    footer: { tone: "amber", text: "Feed unavailable; verified 09:42 snapshot displayed." },
    ai: gisAi,
    insightTitle: "Geospatial insight",
    insightLines: [
      "Four operational layers are visible on one canvas.",
      "Toggle a layer to filter both the map and the register.",
      "Selecting a marker highlights the matching row.",
    ],
    exportName: "gis-map",
  },
  assets: {
    key: "gis-assets",
    title: "Assets Map",
    subtitle: GIS_SUBTITLE,
    kpis: [
      { label: "Assets tracked", value: "642" },
      { label: "At risk", value: "12" },
      { label: "Regions", value: "6" },
      { label: "Kinds", value: "8" },
    ],
    layers: [
      { key: "active", label: "Active" },
      { key: "at-risk", label: "At risk" },
      { key: "delayed", label: "Delayed" },
    ],
    features: assetFeatures,
    columns: mapColumns("Units", "Location"),
    summary: "Mechanical & surface assets · 6 regions",
    legend: ["Active", "At risk", "Delayed", "Completed"],
    footer: { tone: "neutral", text: "Completed records read-only · 6 archived records." },
    ai: gisAi,
    insightTitle: "Asset insight",
    insightLines: [
      "Asset density is highest around the central hub.",
      "Two assets fall inside the HM-105 risk radius.",
      "Maintenance-due assets are flagged amber.",
    ],
    exportName: "gis-assets",
  },
  projects: {
    key: "gis-projects",
    title: "Projects Map",
    subtitle: GIS_SUBTITLE,
    kpis: [
      { label: "Projects", value: "24" },
      { label: "On track", value: "14" },
      { label: "At risk", value: "6" },
      { label: "Delayed", value: "4" },
    ],
    layers: [
      { key: "active", label: "Active" },
      { key: "at-risk", label: "At risk" },
      { key: "completed", label: "Completed" },
    ],
    features: projectFeatures,
    columns: [
      { key: "name", label: "Project" },
      { key: "region", label: "Region" },
      { key: "progress", label: "Progress", kind: "percent" },
      { key: "secondary", label: "Budget" },
      { key: "status", label: "Status", kind: "status" },
    ] as Stage8Column[],
    summary: "Project footprint · Algeria operations",
    legend: ["Active", "At risk", "Delayed", "Completed"],
    footer: { tone: "amber", text: "Validation: end date must follow start date." },
    ai: gisAi,
    insightTitle: "Portfolio insight",
    insightLines: [
      "Two projects share the same supply corridor.",
      "Delay risk rises where two projects overlap.",
      "Budget burn tracks progress within 4%.",
    ],
    exportName: "gis-projects",
  },
  fleet: {
    key: "gis-fleet",
    title: "Fleet & Equipment Map",
    subtitle: GIS_SUBTITLE,
    kpis: [
      { label: "Vehicles live", value: "84" },
      { label: "Utilization", value: "82.5%" },
      { label: "Maintenance", value: "6" },
      { label: "Downtime", value: "42 h" },
    ],
    layers: [
      { key: "vehicles", label: "Vehicles" },
      { key: "equipment", label: "Equipment" },
    ],
    features: fleetFeatures,
    columns: [
      { key: "name", label: "Vehicle" },
      { key: "region", label: "Region" },
      { key: "secondary", label: "Equipment" },
      { key: "primary", label: "Utilization" },
      { key: "status", label: "Status", kind: "status" },
    ] as Stage8Column[],
    summary: "Live vehicle & equipment positions · region 84 tracked",
    legend: ["Active", "At risk", "Delayed", "Completed"],
    footer: { tone: "amber", text: "Warning: 2 overdue records need review." },
    ai: gisAi,
    insightTitle: "Fleet insight",
    insightLines: [
      "Utilization is above target in every region.",
      "One vehicle is maintenance-overdue on the Adrar route.",
      "Idle time clusters near the central depot.",
    ],
    exportName: "gis-fleet",
  },
  wells: {
    key: "gis-wells",
    title: "Drilling Wells Map",
    subtitle: GIS_SUBTITLE,
    kpis: [
      { label: "Wellheads", value: "126" },
      { label: "Drilling", value: "8" },
      { label: "Completed", value: "96" },
      { label: "At risk", value: "4" },
    ],
    layers: [
      { key: "drilling", label: "Drilling" },
      { key: "completed", label: "Completed" },
      { key: "at-risk", label: "At risk" },
    ],
    features: wellFeatures,
    columns: [
      { key: "name", label: "Well" },
      { key: "region", label: "Region" },
      { key: "primary", label: "Current depth" },
      { key: "progress", label: "Progress", kind: "percent" },
      { key: "status", label: "Status", kind: "status" },
    ] as Stage8Column[],
    summary: "Well trajectory overview · 8 active wells",
    legend: ["Active", "At risk", "Delayed", "Completed"],
    footer: { tone: "green", text: "Success: synchronized 09:42." },
    ai: gisAi,
    insightTitle: "Drilling insight",
    insightLines: [
      "HM-104 is closest to its target depth.",
      "HM-105 penetration is below the regional average.",
      "Two wellheads sit inside the risk radius.",
    ],
    exportName: "gis-wells",
  },
};
