export const itemsListKpis = [
  { label: "Total", value: "18,492", detail: "Active SKUs", tone: "blue" },
  { label: "Available", value: "1,284", detail: "Critical spares", tone: "green" },
  { label: "Review", value: "3,806", detail: "Serialized 99.2%", tone: "amber" },
  { label: "Critical", value: "76", detail: "Data issues", tone: "red" },
] as const;

export const itemRecords = [
  {
    id: "sp-trb-8821",
    reference: "SP-TRB-8821",
    name: "SOT-800 turbine kit",
    context: "Siemens",
    value: "24 available",
    status: "Healthy",
    tone: "green" as const,
  },
  {
    id: "sp-pmp-1048",
    reference: "SP-PMP-1048",
    name: "Mechanical seal 4-inch",
    context: "Maintenance",
    value: "18 available",
    status: "Low",
    tone: "amber" as const,
  },
  {
    id: "drl-bit-6210",
    reference: "DRL-BIT-6210",
    name: "PDC drill bit 12¼",
    context: "Drilling",
    value: "6 available",
    status: "Critical",
    tone: "red" as const,
  },
];

export const itemInsight = {
  model: "DemandCast v2.4 · UI preview",
  prediction: "Mechanical seal demand +27% next 30 days",
  confidence: "89% · Risk: High",
  basedOn: "Based on approved demand, history and current stock.",
  recommended: "Reorder 36 from FlowServe Gulf",
  status: "Review",
  action: "Human review required",
};

export const itemDetailsById = {
  "sp-trb-8821": {
    title: "Item Details",
    reference: "SP-TRB-8821",
    name: "SOT-800 turbine kit",
    kpis: [
      { label: "Total", value: "18", detail: "Available · 11 required" },
      { label: "Available", value: "9", detail: "Reserved" },
      { label: "Review", value: "24", detail: "On-order · ETA 18 Oct" },
      { label: "Critical", value: "$84,900", detail: "Inventory value" },
    ],
    records: [
      { reference: "WH-DXB-01", name: "Dubai Central", context: "Bin A-03-118", value: "12 available", status: "Low", tone: "amber" },
      { reference: "WH-BSR-02", name: "Basra Field", context: "Safety B", value: "4 available", status: "Critical", tone: "red" },
      { reference: "PO-AE-08318", name: "FlowServe Gulf", context: "24 units · ETA 18 Oct", value: "24 units", status: "In transit", tone: "blue" },
    ],
    insight: {
      model: "DemandCast v2.4 · UI preview",
      prediction: "Stockout expected 12 Oct",
      confidence: "93% · Risk: Critical",
      basedOn: "Based on approved demand, history and current stock.",
      recommended: "Expedite PO and transfer 4 from Tunis",
      status: "Action",
      action: "Human review required",
    },
  },
};

export const defaultItemId = "sp-trb-8821";
