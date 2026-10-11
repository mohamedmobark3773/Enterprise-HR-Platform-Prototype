export const stockInKpis = [
  { label: "Total", value: "28", detail: "Open entries", tone: "blue" },
  { label: "Available", value: "12", detail: "Awaiting QC", tone: "green" },
  { label: "Review", value: "74", detail: "Posted today · $1.28M", tone: "amber" },
  { label: "Critical", value: "4", detail: "Serial exceptions", tone: "red" },
] as const;

export const stockInRecords = [
  {
    id: "sin-260984",
    reference: "SIN-260984",
    name: "PO-AE-08318 receipt",
    context: "24 seals",
    value: "$113,280",
    status: "QC pending",
    tone: "amber" as const,
  },
  {
    id: "sin-260981",
    reference: "SIN-260981",
    name: "Maintenance return",
    context: "8 valve kits",
    value: "$42,600",
    status: "Ready",
    tone: "green" as const,
  },
  {
    id: "sin-260970",
    reference: "SIN-260970",
    name: "Supplier replacement",
    context: "2 sensors",
    value: "$18,400",
    status: "Exception",
    tone: "red" as const,
  },
];

export const stockInInsight = {
  model: "DemandCast v2.4 · UI preview",
  prediction: "Serial duplication risk on SIN-260970",
  confidence: "96% · Risk: High",
  basedOn: "Based on approved demand, history and current stock.",
  recommended: "Hold posting and verify note",
  status: "Blocked",
  action: "Human review required",
};
