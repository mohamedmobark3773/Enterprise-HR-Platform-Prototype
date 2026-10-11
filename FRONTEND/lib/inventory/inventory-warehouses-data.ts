export interface WarehouseItem {
  id: string;
  reference: string;
  name: string;
  context: string;
  value: string;
  status: string;
  tone: "green" | "amber" | "blue" | "red" | "neutral";
  metrics: Array<{ label: string; value: string }>;
  kpis: Array<{ label: string; value: string; detail?: string }>;
  insight: {
    model: string;
    prediction: string;
    confidence: string;
    risk: string;
    recommendation: string;
    status: string;
    action: string;
  };
}

export const warehouseListKpis = [
  { label: "Total", value: "9", detail: "countries", tone: "blue" },
  { label: "Available", value: "78.4%", detail: "", tone: "green" },
  { label: "Capacity", value: "42,812", detail: "pallet positions", tone: "amber" },
  { label: "Review", value: "18", detail: "Quarantine zones", tone: "amber" },
  { label: "Critical", value: "3", detail: "Operational issues", tone: "red" },
] as const;

export const warehouseRecords = [
  { id: "wh-dxb-01", reference: "WH-DXB-01", name: "Dubai Central", context: "18 zones", value: "82%", status: "Operational", tone: "green", metrics: ["18 zones", "82%"], kpis: [], insight: undefined },
  { id: "wh-bsr-02", reference: "WH-BSR-02", name: "Basra Field Stores", context: "Drilling", value: "91%", status: "Near capacity", tone: "amber", metrics: ["Drilling", "91%"], kpis: [], insight: undefined },
  { id: "wh-mrs-01", reference: "WH-MRS-01", name: "Marseille LNG Stores", context: "Bonded", value: "74%", status: "Inspection", tone: "blue", metrics: ["Bonded", "74%"], kpis: [], insight: undefined },
];

export const warehouseInsight = {
  model: "DemandCast v2.4",
  prediction: "Basra reaches 96% capacity by 22 Oct",
  confidence: "85%",
  risk: "Medium",
  recommendation: "Move 180 pallets to Dubai overflow",
  status: "Proposed",
  action: "Human review required",
};

export const warehouseDetailsById: Record<string, {
  title: string;
  reference: string;
  name: string;
  kpis: Array<{ label: string; value: string; detail?: string }>;
  records: Array<{ reference: string; name: string; context: string; value: string; status: string; tone: string }>;
  insight: { model: string; prediction: string; confidence: string; risk: string; recommendation: string; status: string; action: string };
}> = {
  "wh-dxb-01": {
    title: "Warehouse Details",
    reference: "WH-DXB-01",
    name: "Dubai Central",
    kpis: [
      { label: "Total", value: "$18.4M", detail: "" },
      { label: "SKUs", value: "8,248", detail: "" },
      { label: "Available", value: "82%", detail: "Capacity used" },
      { label: "Review", value: "342", detail: "Movements today" },
      { label: "Critical", value: "18", detail: "Open tasks" },
    ],
    records: [
      { reference: "ZONE-4", name: "Fast-moving spares", context: "2,940 bins", value: "$6.8M", status: "Active", tone: "green" },
      { reference: "ZONE-Q", name: "Quality quarantine", context: "Inspection", value: "486 units", status: "Restricted", tone: "amber" },
      { reference: "DOCK-04", name: "Receiving dock", context: "6 receipts · 2 variances", value: "64 pallets", status: "Busy", tone: "amber" },
    ],
    insight: {
      model: "DemandCast v2.4",
      prediction: "Zone A pick travel can improve by 11%",
      confidence: "84%",
      risk: "Low",
      recommendation: "Consolidate top 24 SKUs",
      status: "Ready",
      action: "Human review required",
    },
  },
};

export const defaultWarehouseId = "wh-dxb-01";
