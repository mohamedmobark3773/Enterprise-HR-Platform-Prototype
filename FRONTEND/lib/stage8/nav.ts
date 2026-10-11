import type { Stage8Module, Stage8ScreenDef } from "@/lib/stage8/types";

/**
 * Authoritative Stage 8 inventory: the 24 screen families from the brief
 * (13 Reports & Analytics, 7 GIS & Geospatial, 4 AI Center).
 *
 * The AI Center families live under `/ai-center/*` (the `/ai/*` routes are owned
 * by the earlier Human-guided AI HR Center and are intentionally left untouched).
 */
export const stage8Screens: Stage8ScreenDef[] = [
  // Reports & Analytics — 13 families
  { key: "reports-dashboard", label: "Reports & Analytics Dashboard", path: "/reports", module: "reports", kind: "dashboard" },
  { key: "reports-executive", label: "Executive Reports", path: "/reports/executive", module: "reports", kind: "family" },
  { key: "reports-operational", label: "Operational Reports", path: "/reports/operational", module: "reports", kind: "family" },
  { key: "reports-financial", label: "Financial Reports", path: "/reports/financial", module: "reports", kind: "family" },
  { key: "reports-hr", label: "HR Reports", path: "/reports/hr", module: "reports", kind: "family" },
  { key: "reports-inventory", label: "Inventory Reports", path: "/reports/inventory", module: "reports", kind: "family" },
  { key: "reports-fleet", label: "Fleet & Equipment Reports", path: "/reports/fleet", module: "reports", kind: "family" },
  { key: "reports-drilling", label: "Drilling Reports", path: "/reports/drilling", module: "reports", kind: "family" },
  { key: "reports-projects", label: "Project Management Reports", path: "/reports/projects", module: "reports", kind: "family" },
  { key: "reports-builder", label: "Report Builder", path: "/reports/builder", module: "reports", kind: "builder" },
  { key: "reports-preview", label: "Report Preview", path: "/reports/preview", module: "reports", kind: "preview" },
  { key: "reports-scheduled", label: "Scheduled Reports", path: "/reports/scheduled", module: "reports", kind: "scheduled" },
  { key: "reports-saved", label: "Saved Reports", path: "/reports/saved", module: "reports", kind: "saved" },

  // GIS & Geospatial Analytics — 7 families
  { key: "gis-dashboard", label: "GIS Dashboard", path: "/gis", module: "gis", kind: "dashboard" },
  { key: "gis-map", label: "GIS Map", path: "/gis/map", module: "gis", kind: "map" },
  { key: "gis-assets", label: "Assets Map", path: "/gis/assets", module: "gis", kind: "map" },
  { key: "gis-projects", label: "Projects Map", path: "/gis/projects", module: "gis", kind: "map" },
  { key: "gis-fleet", label: "Fleet & Equipment Map", path: "/gis/fleet", module: "gis", kind: "map" },
  { key: "gis-wells", label: "Drilling Wells Map", path: "/gis/wells", module: "gis", kind: "map" },
  { key: "gis-analytics", label: "Geospatial Analytics", path: "/gis/analytics", module: "gis", kind: "analytics" },

  // AI Center — 4 families
  { key: "ai-dashboard", label: "AI Center Dashboard", path: "/ai-center", module: "ai-center", kind: "dashboard" },
  { key: "ai-models", label: "AI Models", path: "/ai-center/models", module: "ai-center", kind: "models" },
  { key: "ai-predictions", label: "AI Predictions & Insights", path: "/ai-center/predictions", module: "ai-center", kind: "predictions" },
  { key: "ai-assistant", label: "AI Assistant / AI Query Center", path: "/ai-center/assistant", module: "ai-center", kind: "assistant" },
];

export const stage8ModuleLabels: Record<Stage8Module, string> = {
  reports: "Reports & Analytics",
  gis: "GIS & Geospatial",
  "ai-center": "AI Center",
};

export const stage8ModuleOrder: Stage8Module[] = ["reports", "gis", "ai-center"];

export const stage8ModuleEntry: Record<Stage8Module, string> = {
  reports: "/reports",
  gis: "/gis",
  "ai-center": "/ai-center",
};

export const stage8FamilyCount = 24;

export function stage8ScreensFor(module: Stage8Module): Stage8ScreenDef[] {
  return stage8Screens.filter((screen) => screen.module === module);
}

export function stage8ModuleForPath(pathname: string): Stage8Module | undefined {
  if (pathname === "/reports" || pathname.startsWith("/reports/")) return "reports";
  if (pathname === "/gis" || pathname.startsWith("/gis/")) return "gis";
  if (pathname === "/ai-center" || pathname.startsWith("/ai-center/")) return "ai-center";
  return undefined;
}
