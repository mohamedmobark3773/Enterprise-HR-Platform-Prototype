export const adjustmentsKpis = [
  { label: "Total", value: "18", detail: "Pending · $184k", tone: "blue" },
  { label: "Available", value: "286", detail: "Posted this month", tone: "green" },
  { label: "Review", value: "-$92,480", detail: "Damage & shrinkage", tone: "amber" },
  { label: "Critical", value: "+$41,260", detail: "Count corrections", tone: "red" },
] as const;

export const adjustmentsRecords = [
  {
    id: "adj-260188",
    reference: "ADJ-260188",
    name: "Cycle count correction",
    context: "+18 units",
    value: "+$21,480",
    status: "Approval",
    tone: "amber" as const,
  },
  {
    id: "adj-260184",
    reference: "ADJ-260184",
    name: "Transit damage",
    context: "4 sensors",
    value: "-$36,800",
    status: "Finance review",
    tone: "amber" as const,
  },
  {
    id: "adj-260179",
    reference: "ADJ-260179",
    name: "UOM correction",
    context: "Drilling chemicals",
    value: "$0",
    status: "Ready",
    tone: "green" as const,
  },
];

export const adjustmentsInsight = {
  model: "DemandCast v2.4 · UI preview",
  prediction: "Adjustment frequency abnormal for BIN-A-03",
  confidence: "90% · Risk: High",
  basedOn: "Based on approved demand, history and current stock.",
  recommended: "Freeze bin and recount",
  status: "Action",
  action: "Human review required",
};
