export const purchaseKpis = [
  { label: "Total", value: "86", detail: "Open requests · $4.28M", tone: "blue" },
  { label: "Available", value: "28", detail: "Awaiting approval", tone: "green" },
  { label: "Review", value: "142", detail: "Open orders · $12.8M", tone: "amber" },
  { label: "Critical", value: "12", detail: "At risk", tone: "red" },
] as const;

export const purchaseRecords = [
  {
    id: "pr-ae-260842",
    reference: "PR-AE-260842",
    name: "Critical pump seals",
    context: "36 units",
    value: "$169,920",
    status: "Approval",
    tone: "amber" as const,
  },
  {
    id: "po-ae-260831",
    reference: "PO-AE-260831",
    name: "SGT-800 kits",
    context: "Siemens · 2 kits",
    value: "€1.55M",
    status: "Confirmed",
    tone: "green" as const,
  },
  {
    id: "pr-iq-260806",
    reference: "PR-IQ-260806",
    name: "PDC drill bits",
    context: "DRL-PRJ-029",
    value: "$372,000",
    status: "Sourcing",
    tone: "amber" as const,
  },
];

export const purchaseInsight = {
  model: "DemandCast v2.4 · UI preview",
  prediction: "Consolidating 7 requests saves 8.4%",
  confidence: "83% · Risk: Low",
  basedOn: "Based on approved demand, history and current stock.",
  recommended: "Create consolidated sourcing event",
  status: "Ready",
  action: "Human review required",
};
