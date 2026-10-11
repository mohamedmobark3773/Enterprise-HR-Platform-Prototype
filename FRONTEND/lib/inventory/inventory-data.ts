export const inventoryKpis = [
  { label: "Total", value: "$48.6M", detail: "Stock value", tone: "blue" },
  { label: "Available", value: "428,640", detail: "18,492 SKUs", tone: "green" },
  { label: "Review", value: "286", detail: "Low stock", tone: "amber" },
  { label: "Critical", value: "41", detail: "Out of stock", tone: "red" },
] as const;

export const inventoryTabs = ["Overview", "Activity", "Audit", "Related records"];

export const inventoryRecords = [
  { reference: "WH-DXB-01", name: "Dubai Central", context: "82% capacity", value: "$18.4M", status: "Healthy", tone: "green" },
  { reference: "WH-BSR-02", name: "Basra Field Stores", context: "Drilling", value: "$9.8M", status: "Monitor", tone: "amber" },
  { reference: "WH-ACC-01", name: "Takoradi Hub", context: "Fleet & equipment", value: "$6.2M", status: "Healthy", tone: "green" },
] as const;

export const inventoryRecordFooter = [
  "Finance", "Suppliers", "Fleet", "Equipment", "Maintenance", "Projects", "Drilling",
];

export const inventoryInsight = {
  model: "DemandCast v2.4 · UI preview",
  prediction: "74 SKUs below safety stock in 14 days",
  confidence: "91% · Risk: High",
  basedOn: "Based on approved demand, history and current stock.",
  recommended: "Create grouped reorder · 12 suppliers",
  status: "Review",
  action: "Human review required",
};

export const inventorySearchPlaceholder = "Search reference, item, warehouse or status…";

export const inventoryRecordPagination = "1–3 of 286 · ‹ 1 2 3 ›";
