export const categoriesListKpis = [
  { label: "Total", value: "412", detail: "38 top-level", tone: "blue" },
  { label: "Available", value: "90.6%", detail: "Mapped SKUs", tone: "green" },
  { label: "Review", value: "86", detail: "Controlled categories", tone: "amber" },
  { label: "Critical", value: "12", detail: "Taxonomy issues", tone: "red" },
] as const;

export const categoryRecords = [
  {
    reference: "CAT-100",
    name: "Rotating Equipment",
    context: "Pumps · turbines",
    value: "3,248 SKUs",
    status: "Active",
    tone: "green" as const,
  },
  {
    reference: "CAT-220",
    name: "Drilling Consumables",
    context: "Bits · chemicals",
    value: "2,184",
    status: "Controlled",
    tone: "amber" as const,
  },
  {
    reference: "CAT-310",
    name: "Fleet Service Parts",
    context: "Filters · brakes",
    value: "4,003",
    status: "Active",
    tone: "green" as const,
  },
];

export const categoriesInsight = {
  model: "DemandCast v2.4 · UI preview",
  prediction: "A2 item records likely misclassified",
  confidence: "86% · Risk: Medium",
  basedOn: "Based on approved demand, history and current stock.",
  recommended: "Open recategorization review",
  status: "Review",
  action: "Human review required",
};
