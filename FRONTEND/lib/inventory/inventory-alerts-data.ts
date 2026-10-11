export const alertsKpis = [
  { label: "Total", value: "74", detail: "Critical · 12 OOS", tone: "blue" },
  { label: "Available", value: "286", detail: "Low stock · $2.8M", tone: "green" },
  { label: "Review", value: "184", detail: "Predicted in 14 days", tone: "amber" },
  { label: "Critical", value: "126", detail: "Resolved this week", tone: "red" },
] as const;

export const alertsRecords = [
  {
    id: "drl-bit-6210",
    reference: "DRL-BIT-6210",
    name: "PDC drill bit 12¼",
    context: "Basra",
    value: "2 days",
    status: "Critical",
    tone: "red" as const,
  },
  {
    id: "sp-pmp-1048",
    reference: "SP-PMP-1048",
    name: "Mechanical seal",
    context: "31 required · 18 available",
    value: "8 days",
    status: "Critical",
    tone: "red" as const,
  },
  {
    id: "flt-flt-3009",
    reference: "FLT-FLT-3009",
    name: "Hydraulic filter",
    context: "Takoradi fleet",
    value: "12 days",
    status: "Low",
    tone: "amber" as const,
  },
];

export const alertsInsight = {
  model: "DemandCast v2.4 · UI preview",
  prediction: "74 SKUs require $684k to restore service",
  confidence: "92% · Risk: Critical",
  basedOn: "Based on approved demand, history and current stock.",
  recommended: "Review prioritized reorder batch",
  status: "Action",
  action: "Human review required",
};
