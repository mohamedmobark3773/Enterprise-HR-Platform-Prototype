export const receivingKpis = [
  { label: "Total", value: "18", detail: "Expected today", tone: "blue" },
  { label: "Available", value: "6", detail: "At dock", tone: "green" },
  { label: "Review", value: "12", detail: "Inspection hold", tone: "amber" },
  { label: "Critical", value: "4", detail: "Discrepancies · $42.8k", tone: "red" },
] as const;

export const receivingRecords = [
  {
    id: "rcv-260984",
    reference: "RCV-260984",
    name: "PO-AE-08318",
    context: "FlowServe · 24 seals",
    value: "24 / 24",
    status: "Inspect",
    tone: "amber" as const,
  },
  {
    id: "rcv-260981",
    reference: "RCV-260981",
    name: "PO-DE-08341",
    context: "Siemens · 2 crates",
    value: "2 / 2",
    status: "Matched",
    tone: "green" as const,
  },
  {
    id: "rcv-260976",
    reference: "RCV-260976",
    name: "PO-US-08260",
    context: "Baker Hughes",
    value: "18 / 20",
    status: "Short",
    tone: "red" as const,
  },
];

export const receivingInsight = {
  model: "DemandCast v2.4 · UI preview",
  prediction: "RCV-260976 likely supplier short-ship",
  confidence: "92% · Risk: High",
  basedOn: "Based on approved demand, history and current stock.",
  recommended: "Create claim and partial receipt",
  status: "Review",
  action: "Human review required",
};
