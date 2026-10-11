export const transfersKpis = [
  { label: "Total", value: "38", detail: "In transit · $2.84M", tone: "blue" },
  { label: "Available", value: "12", detail: "Due today", tone: "green" },
  { label: "Review", value: "4", detail: "Delayed", tone: "amber" },
  { label: "Critical", value: "3", detail: "Discrepancies", tone: "red" },
] as const;

export const transfersRecords = [
  {
    id: "trf-260418",
    reference: "TRF-260418",
    name: "Dubai → Basra",
    context: "180 pallets",
    value: "$1.18M",
    status: "In transit",
    tone: "blue" as const,
  },
  {
    id: "trf-260412",
    reference: "TRF-260412",
    name: "Tunis → Dubai",
    context: "4 seals",
    value: "$18,880",
    status: "Ready",
    tone: "green" as const,
  },
  {
    id: "trf-260407",
    reference: "TRF-260407",
    name: "Marseille → Takoradi",
    context: "Bonded",
    value: "$486,000",
    status: "Delayed",
    tone: "amber" as const,
  },
];

export const transfersInsight = {
  model: "DemandCast v2.4 · UI preview",
  prediction: "TRF-260407 delay probability 63%",
  confidence: "82% · Risk: Medium",
  basedOn: "Based on approved demand, history and current stock.",
  recommended: "Escalate customs packet",
  status: "Monitor",
  action: "Human review required",
};
