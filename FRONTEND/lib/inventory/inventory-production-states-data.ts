export const productionStateKpis = [
  { label: "Total", value: "8", detail: "Production states", tone: "blue" },
  { label: "Available", value: "3", detail: "EN · FR · العربية", tone: "green" },
  { label: "Review", value: "5", detail: "Permission roles", tone: "amber" },
  { label: "Critical", value: "6", detail: "Critical confirmations", tone: "red" },
] as const;

export const productionStateMatrix = [
  "LOADING · Synchronizing balances",
  "EMPTY · No stocktake plans yet",
  "ERROR · Inventory service unavailable",
  "VALIDATION ERROR · Quantity exceeds available stock",
  "SUCCESS · Transfer received and posted",
  "PERMISSION DENIED · Controller role required",
  "NO RESULTS · No items match filters",
  "DESTRUCTIVE CONFIRMATION · Delete adjustment draft?",
];

export const productionStateGovernance =
  "Quantity required · Select warehouse · Reason required · Admin: full · Controller: post · Manager: approve · Auditor: export · Viewer: read";
