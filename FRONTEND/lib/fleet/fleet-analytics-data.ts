import type { FleetAnalyticsConfig } from "@/lib/fleet/fleet-types";

export const reportsScreen: FleetAnalyticsConfig = {
  kind: "analytics",
  eyebrow: "CORE / FLEET & EQUIPMENT / REPORTS",
  title: "Fleet & Equipment Reports",
  subtitle: "Consolidated operational and compliance reporting",
  action: "Generate report",
  kpis: [
    { label: "AVAILABLE REPORTS", value: "24", detail: "Live" },
    { label: "SCHEDULED", value: "8", detail: "Auto-delivery" },
    { label: "GENERATED MTD", value: "142", detail: "▲ 6.2%" },
    { label: "FAILED", value: "1", detail: "Needs review" },
    { label: "EXPORT FORMATS", value: "4", detail: "PDF, XLSX, CSV" },
  ],
  bars: [
    {
      title: "Reports by category",
      max: 60,
      items: [
        { label: "Operations", value: 48, display: "48" },
        { label: "Maintenance", value: 36, display: "36" },
        { label: "Compliance", value: 28, display: "28" },
        { label: "Cost", value: 22, display: "22" },
        { label: "Utilization", value: 18, display: "18" },
      ],
    },
    {
      title: "Delivery method",
      max: 80,
      items: [
        { label: "Portal", value: 74, display: "74" },
        { label: "Email", value: 52, display: "52" },
        { label: "Scheduled", value: 38, display: "38" },
        { label: "On demand", value: 26, display: "26" },
      ],
    },
  ],
  table: {
    title: "Recent reports",
    columns: ["Report", "Category", "Owner", "Generated", "Status"],
    rows: [
      ["Fleet availability — September", "Operations", "M. Chen", "02 Oct 2026", "Ready"],
      ["Maintenance cost summary", "Cost", "A. Haddad", "01 Oct 2026", "Ready"],
      ["Insurance compliance", "Compliance", "S. Nouri", "30 Sep 2026", "Ready"],
      ["Equipment utilization", "Utilization", "M. Chen", "28 Sep 2026", "Ready"],
      ["Fuel consumption audit", "Operations", "S. Nouri", "27 Sep 2026", "Failed"],
    ],
  },
  insight: {
    title: "✦ AI Reporting Insight",
    lines: [
      "Model: NexusReport v1.1 · UI preview",
      "Prediction: Weekly operations reports will grow 12% in demand",
      "Confidence: 80% · Risk: Low",
      "Recommended: Enable auto-delivery for maintenance reports",
    ],
    action: "Review recommendation",
  },
};

export const utilizationScreen: FleetAnalyticsConfig = {
  kind: "analytics",
  eyebrow: "CORE / FLEET & EQUIPMENT / UTILIZATION ANALYTICS",
  title: "Fleet Utilization Analytics",
  subtitle: "Fleet and equipment utilization across sites",
  action: "Export analytics",
  kpis: [
    { label: "FLEET UTILIZATION", value: "84.6%", detail: "▲ 3.2%" },
    { label: "EQUIPMENT UTILIZATION", value: "78.6%", detail: "▲ 2.4%" },
    { label: "IDLE HOURS MTD", value: "1,240 h", detail: "▼ 6.1%" },
    { label: "TOP SITE", value: "Hassi Messaoud", detail: "91%" },
    { label: "LOWEST SITE", value: "Oran depot", detail: "48%" },
  ],
  bars: [
    {
      title: "Utilization by site",
      max: 100,
      items: [
        { label: "Hassi Messaoud", value: 91, display: "91%" },
        { label: "Ouargla yard", value: 82, display: "82%" },
        { label: "Algiers workshop", value: 64, display: "64%" },
        { label: "Oran depot", value: 48, display: "48%" },
      ],
    },
    {
      title: "Utilization by category",
      max: 100,
      items: [
        { label: "Excavators", value: 89, display: "89%" },
        { label: "Trucks", value: 86, display: "86%" },
        { label: "Lifting", value: 72, display: "72%" },
        { label: "Compressors", value: 61, display: "61%" },
      ],
    },
  ],
  table: {
    title: "Low utilization assets",
    columns: ["Asset", "Site", "Utilization", "Idle Days", "Status"],
    rows: [
      ["EQP-0088 · Bomag BW", "Oran depot", "48%", "12", "Review"],
      ["EQP-0733 · Atlas Copco", "Algiers workshop", "64%", "8", "Monitor"],
      ["NXS-2284 · Ford Ranger", "Ouargla yard", "58%", "9", "Review"],
      ["EQP-0302 · JCB 3CX", "Ouargla yard", "77%", "4", "Monitor"],
    ],
  },
  insight: {
    title: "✦ AI Utilization Insight",
    lines: [
      "Model: NexusUtil v1.3 · UI preview",
      "Prediction: Reallocating 4 idle assets will raise utilization 7%",
      "Confidence: 83% · Risk: Low",
      "Recommended: Move 2 units from Oran to Hassi Messaoud",
    ],
    action: "Review recommendation",
  },
};

export const costAnalyticsScreen: FleetAnalyticsConfig = {
  kind: "analytics",
  eyebrow: "CORE / FLEET & EQUIPMENT / COST & MAINTENANCE ANALYTICS",
  title: "Cost & Maintenance Analytics",
  subtitle: "Cost drivers, maintenance efficiency and forecasting",
  action: "Export analytics",
  kpis: [
    { label: "TOTAL COST MTD", value: "$214,860", detail: "▲ 3.4%" },
    { label: "COST PER KM", value: "$0.41", detail: "▼ 1.8%" },
    { label: "MAINTENANCE COST", value: "$42,180", detail: "19.6% of total" },
    { label: "FUEL COST", value: "$86,420", detail: "40.2% of total" },
    { label: "COST PER UNIT", value: "$1,628", detail: "Fleet average" },
  ],
  bars: [
    {
      title: "Cost by category",
      max: 90,
      items: [
        { label: "Fuel", value: 86, display: "$86.4k" },
        { label: "Maintenance", value: 42, display: "$42.2k" },
        { label: "Insurance", value: 34, display: "$34.4k" },
        { label: "Licenses", value: 21, display: "$21.0k" },
        { label: "Other", value: 31, display: "$30.9k" },
      ],
    },
    {
      title: "Maintenance efficiency",
      max: 100,
      items: [
        { label: "Planned", value: 68, display: "68%" },
        { label: "Corrective", value: 32, display: "32%" },
        { label: "First-time fix", value: 81, display: "81%" },
        { label: "Parts on time", value: 76, display: "76%" },
      ],
    },
  ],
  table: {
    title: "Cost drivers",
    columns: ["Driver", "Amount", "Change", "Trend", "Status"],
    rows: [
      ["Fuel", "$86,420", "+4.1%", "Rising", "Watch"],
      ["Maintenance", "$42,180", "+3.2%", "Stable", "Normal"],
      ["Insurance", "$34,400", "+1.9%", "Stable", "Normal"],
      ["Licenses", "$21,040", "-0.6%", "Falling", "Normal"],
    ],
  },
  insight: {
    title: "✦ AI Cost Insight",
    lines: [
      "Model: NexusCost v1.2 · UI preview",
      "Prediction: Q4 cost will exceed budget by 4% driven by fuel",
      "Confidence: 82% · Risk: Medium",
      "Recommended: Tighten fuel card controls and route consolidation",
    ],
    action: "Review recommendation",
  },
};

export const overviewScreen: FleetAnalyticsConfig = {
  kind: "analytics",
  eyebrow: "CORE / FLEET & EQUIPMENT / OVERVIEW",
  title: "Fleet & Equipment Overview",
  subtitle: "Executive overview of fleet, equipment and operations",
  action: "Export overview",
  kpis: [
    { label: "FLEET READINESS", value: "92.4%", detail: "▲ 1.8%" },
    { label: "ACTIVE ASSETS", value: "380", detail: "Fleet + equipment" },
    { label: "TRIPS THIS MONTH", value: "1,240", detail: "▲ 5.6%" },
    { label: "OPEN WORK ORDERS", value: "65", detail: "Across modules" },
    { label: "OPERATING COST MTD", value: "$214,860", detail: "▲ 3.4%" },
  ],
  bars: [
    {
      title: "Portfolio by type",
      max: 260,
      items: [
        { label: "Vehicles", value: 248, display: "248" },
        { label: "Equipment", value: 132, display: "132" },
        { label: "Trailers", value: 74, display: "74" },
        { label: "Other assets", value: 26, display: "26" },
      ],
    },
    {
      title: "Performance index",
      max: 100,
      items: [
        { label: "Availability", value: 92, display: "92%" },
        { label: "Utilization", value: 84, display: "84%" },
        { label: "Compliance", value: 96, display: "96%" },
        { label: "Cost efficiency", value: 78, display: "78%" },
      ],
    },
  ],
  table: {
    title: "Operating summary",
    columns: ["Area", "This month", "Last month", "Change", "Status"],
    rows: [
      ["Fleet availability", "92.4%", "90.6%", "+1.8%", "Healthy"],
      ["Fuel cost", "$86,420", "$83,100", "+4.0%", "Watch"],
      ["Maintenance cost", "$42,180", "$40,870", "+3.2%", "Normal"],
      ["Compliance", "96.4%", "95.2%", "+1.2%", "Healthy"],
    ],
  },
  insight: {
    title: "✦ AI Overview Insight",
    lines: [
      "Model: NexusOverview v1.4 · UI preview",
      "Prediction: Overall readiness will remain above 90% next quarter",
      "Confidence: 88% · Risk: Low",
      "Recommended: Prioritize compliance renewals and fuel controls",
    ],
    action: "Review recommendation",
  },
};

export default overviewScreen;
