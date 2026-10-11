export const stockOutKpis = [
  { label: "Total", value: "64", detail: "Issue requests", tone: "blue" },
  { label: "Available", value: "28", detail: "Picking · 342 lines", tone: "green" },
  { label: "Review", value: "1,284", detail: "Issued today · $486k", tone: "amber" },
  { label: "Critical", value: "6", detail: "Blocked", tone: "red" },
] as const;

export const stockOutRecords = [
  {
    id: "sout-260742",
    reference: "SOUT-260742",
    name: "Pump overhaul",
    context: "Basra · 14 lines",
    value: "$68,420",
    status: "Picking",
    tone: "blue" as const,
  },
  {
    id: "sout-260739",
    reference: "SOUT-260739",
    name: "Fleet 500h service",
    context: "TRK-482",
    value: "$8,960",
    status: "Ready",
    tone: "green" as const,
  },
  {
    id: "sout-260731",
    reference: "SOUT-260731",
    name: "Well B-17",
    context: "PDC bits",
    value: "$186,000",
    status: "Approval",
    tone: "amber" as const,
  },
];

export const stockOutInsight = {
  model: "DemandCast v2.4 · UI preview",
  prediction: "Pump overhaul may delay by 2 days",
  confidence: "87% · Risk: High",
  basedOn: "Based on approved demand, history and current stock.",
  recommended: "Transfer 4 units from Tunis",
  status: "Review",
  action: "Human review required",
};
