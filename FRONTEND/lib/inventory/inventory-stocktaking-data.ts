export const stocktakingKpis = [
  { label: "Total", value: "24", detail: "Open counts", tone: "blue" },
  { label: "Available", value: "78.6%", detail: "6,618 bins", tone: "green" },
  { label: "Review", value: "184", detail: "Variances · $126k", tone: "amber" },
  { label: "Critical", value: "42", detail: "Recount required", tone: "red" },
] as const;

export const stocktakingRecords = [
  {
    id: "cnt-dxb-2609",
    reference: "CNT-DXB-2609",
    name: "Dubai Q3 wall-to-wall",
    context: "6,248 SKUs",
    value: "84%",
    status: "In progress",
    tone: "blue" as const,
  },
  {
    id: "cnt-bsr-w40",
    reference: "CNT-BSR-W40",
    name: "Basra critical spares",
    context: "412 bins",
    value: "96%",
    status: "Recount",
    tone: "amber" as const,
  },
  {
    id: "cnt-mrs-q3",
    reference: "CNT-MRS-Q3",
    name: "Marseille bonded",
    context: "Customs witness",
    value: "62%",
    status: "Blocked",
    tone: "red" as const,
  },
];

export const stocktakingInsight = {
  model: "DemandCast v2.4 · UI preview",
  prediction: "34 high-value bins likely need recount",
  confidence: "85% · Risk: Medium",
  basedOn: "Based on approved demand, history and current stock.",
  recommended: "Prioritize blind recount",
  status: "Recommended",
  action: "Human review required",
};
