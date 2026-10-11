import type { DrillingSeedKey } from "@/lib/drilling/drilling-service";

export type DrillingScreenKind = "dashboard" | "list" | "analytics" | "reports" | "ai" | "detail";

export interface DrillingScreenDef {
  key: string;
  label: string;
  path: string;
  kind: DrillingScreenKind;
  group: "core" | "execution" | "resources" | "assurance" | "intelligence";
  collection?: DrillingSeedKey;
  aiCapability?: string;
}

/**
 * Authoritative Stage 6 inventory: 24 Drilling screen families.
 * 16 operational screens (overview + 13 CRUD registries + analytics + reports)
 * and the 8 AI-ready prediction capabilities required by the stage brief.
 */
export const drillingScreens: DrillingScreenDef[] = [
  { key: "overview", label: "Drilling overview", path: "/drilling", kind: "dashboard", group: "core" },
  { key: "wells", label: "Wells", path: "/drilling/wells", kind: "list", group: "core", collection: "wells" },
  { key: "programs", label: "Drilling programs", path: "/drilling/programs", kind: "list", group: "core", collection: "programs" },
  { key: "daily-reports", label: "Daily drilling reports", path: "/drilling/daily-reports", kind: "list", group: "execution", collection: "daily-reports" },
  { key: "rigs", label: "Rigs", path: "/drilling/rigs", kind: "list", group: "resources", collection: "rigs" },
  { key: "crews", label: "Crews and tours", path: "/drilling/crews", kind: "list", group: "resources", collection: "crews" },
  { key: "surveys", label: "Directional surveys", path: "/drilling/surveys", kind: "list", group: "execution", collection: "surveys" },
  { key: "fluids", label: "Drilling fluids", path: "/drilling/fluids", kind: "list", group: "execution", collection: "fluids" },
  { key: "cementing", label: "Cementing", path: "/drilling/cementing", kind: "list", group: "execution", collection: "cementing" },
  { key: "bits", label: "Bits and BHA", path: "/drilling/bits", kind: "list", group: "execution", collection: "bits" },
  { key: "npt", label: "NPT and events", path: "/drilling/npt", kind: "list", group: "assurance", collection: "npt" },
  { key: "hse", label: "HSE incidents", path: "/drilling/hse", kind: "list", group: "assurance", collection: "hse" },
  { key: "costs", label: "Costs and AFE", path: "/drilling/costs", kind: "list", group: "resources", collection: "costs" },
  { key: "materials", label: "Materials and consumables", path: "/drilling/materials", kind: "list", group: "resources", collection: "materials" },
  { key: "performance", label: "Performance", path: "/drilling/performance", kind: "analytics", group: "assurance" },
  { key: "reports", label: "Reports and exports", path: "/drilling/reports", kind: "reports", group: "assurance" },
  { key: "ai-performance", label: "Performance prediction", path: "/drilling/ai/performance", kind: "ai", group: "intelligence", aiCapability: "performance" },
  { key: "ai-cost", label: "Cost prediction", path: "/drilling/ai/cost", kind: "ai", group: "intelligence", aiCapability: "cost" },
  { key: "ai-delay", label: "Delay prediction", path: "/drilling/ai/delay", kind: "ai", group: "intelligence", aiCapability: "delay" },
  { key: "ai-productivity", label: "Productivity prediction", path: "/drilling/ai/productivity", kind: "ai", group: "intelligence", aiCapability: "productivity" },
  { key: "ai-equipment-failure", label: "Equipment failure prediction", path: "/drilling/ai/equipment-failure", kind: "ai", group: "intelligence", aiCapability: "equipment-failure" },
  { key: "ai-fuel", label: "Fuel consumption prediction", path: "/drilling/ai/fuel", kind: "ai", group: "intelligence", aiCapability: "fuel" },
  { key: "ai-completion", label: "Well completion prediction", path: "/drilling/ai/completion", kind: "ai", group: "intelligence", aiCapability: "completion" },
  { key: "ai-risk", label: "Drilling risk detection", path: "/drilling/ai/risk", kind: "ai", group: "intelligence", aiCapability: "risk" },
];

export const drillingScreenCount = drillingScreens.length;

export function drillingScreenByPath(pathname: string): DrillingScreenDef | undefined {
  return drillingScreens
    .filter(
      (screen) =>
        screen.path === pathname ||
        (screen.path !== "/drilling" && pathname.startsWith(`${screen.path}/`))
    )
    .sort((a, b) => b.path.length - a.path.length)[0];
}
