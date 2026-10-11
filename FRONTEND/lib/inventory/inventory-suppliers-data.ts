export const supplierKpis = [
  { label: "Total", value: "286", detail: "Approved · 42 countries", tone: "blue" },
  { label: "Available", value: "92.4%", detail: "On-time delivery", tone: "green" },
  { label: "Review", value: "18", detail: "At risk", tone: "amber" },
  { label: "Critical", value: "34", detail: "Reviews due", tone: "red" },
] as const;

export const supplierRecords = [
  {
    id: "sup-00148",
    reference: "SUP-00148",
    name: "Siemens Energy",
    context: "Turbines · 96.8% OTD",
    value: "$18.6M",
    status: "Strategic",
    tone: "blue" as const,
  },
  {
    id: "sup-00384",
    reference: "SUP-00384",
    name: "FlowServe Gulf",
    context: "Pumps · 91.2% OTD",
    value: "$4.2M",
    status: "Approved",
    tone: "green" as const,
  },
  {
    id: "sup-01228",
    reference: "SUP-01228",
    name: "Atlas Industrial",
    context: "Fleet · 71.6% OTD",
    value: "$1.8M",
    status: "At risk",
    tone: "amber" as const,
  },
];

export const supplierInsight = {
  model: "DemandCast v2.4 · UI preview",
  prediction: "Atlas Industrial delivery risk rising",
  confidence: "88% · Risk: High",
  basedOn: "Based on approved demand, history and current stock.",
  recommended: "Qualify alternate supplier",
  status: "Monitor",
  action: "Human review required",
};

export const supplierDetailsById = {
  "sup-00148": {
    kpis: [
      { label: "Total", value: "$4.2M", detail: "YTD spend · 48 orders", tone: "blue" },
      { label: "Available", value: "91.2%", detail: "On-time delivery", tone: "green" },
      { label: "Review", value: "98.6%", detail: "Quality acceptance", tone: "amber" },
      { label: "Critical", value: "24 days", detail: "Lead time", tone: "red" },
    ],
    records: [
      { id: "po-ae-260831", reference: "PO-AE-260831", name: "Mechanical seals", context: "24 units", value: "$113,280", status: "In transit", tone: "blue" as const },
      { id: "clm-260044", reference: "CLM-260044", name: "Seal damage claim", context: "4 units", value: "$18,880", status: "Open claim", tone: "amber" as const },
      { id: "aud-260019", reference: "AUD-260019", name: "Annual review", context: "Compliance", value: "94 / 100", status: "Approved", tone: "green" as const },
    ],
    insight: {
      model: "DemandCast v2.4 · UI preview",
      prediction: "Recommended reorder: 36 pump seals",
      confidence: "89% · Risk: Medium",
      basedOn: "Based on approved demand, history and current stock.",
      recommended: "Add 36 units to sourcing draft",
      status: "Ready",
      action: "Human review required",
    },
  },
};

export const defaultSupplierId = "sup-00148";
