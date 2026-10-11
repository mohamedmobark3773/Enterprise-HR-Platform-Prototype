export const reportsKpis = [
  { label: "Total", value: "$48.6M", detail: "Inventory value", tone: "blue" },
  { label: "Available", value: "$4.8M", detail: "Slow-moving", tone: "green" },
  { label: "Review", value: "$1.26M", detail: "Obsolete reserve", tone: "amber" },
  { label: "Critical", value: "4.8×", detail: "Turnover", tone: "red" },
] as const;

export const reportsRecords = [
  {
    id: "rpt-val-09",
    reference: "RPT-VAL-09",
    name: "Valuation by warehouse",
    context: "Weighted average",
    value: "$48.6M",
    status: "Current",
    tone: "green" as const,
  },
  {
    id: "rpt-age-09",
    reference: "RPT-AGE-09",
    name: "Aging and slow movement",
    context: "0–90 · 365+",
    value: "$4.8M",
    status: "Review",
    tone: "amber" as const,
  },
  {
    id: "rpt-aud-q3",
    reference: "RPT-AUD-Q3",
    name: "Q3 audit trail",
    context: "18,428 events",
    value: "2.8 GB",
    status: "Ready",
    tone: "blue" as const,
  },
];

export const reportsInsight = {
  model: "DemandCast v2.4 · UI preview",
  prediction: "Potential $620k working-capital release",
  confidence: "81% · Risk: Low",
  basedOn: "Based on approved demand, history and current stock.",
  recommended: "Open optimization scenario",
  status: "Ready",
  action: "Human review required",
};
