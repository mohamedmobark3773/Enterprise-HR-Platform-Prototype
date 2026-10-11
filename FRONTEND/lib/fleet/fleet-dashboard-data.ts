import type { FleetDashboardConfig } from "@/lib/fleet/fleet-types";

export const fleetDashboard: FleetDashboardConfig = {
  kind: "dashboard",
  eyebrow: "CORE / FLEET & EQUIPMENT / DASHBOARD",
  title: "Fleet & Equipment Dashboard",
  subtitle: "Operational overview of fleet, equipment and maintenance activity",
  action: "New record",
  banner: { label: "Fleet readiness", value: "92.4%", detail: "▲ 1.8% vs last month" },
  kpis: [
    { label: "TOTAL VEHICLES", value: "248", detail: "Live" },
    { label: "ACTIVE TRIPS", value: "37", detail: "Live" },
    { label: "IN MAINTENANCE", value: "18", detail: "3 overdue" },
    { label: "FUEL COST MTD", value: "$86,420", detail: "▲ 4.1%" },
    { label: "EQUIPMENT UNITS", value: "132", detail: "98 operational" },
  ],
  charts: [
    { title: "Fleet availability trend", labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"], values: [88, 90, 91, 89, 92, 93, 92, 94] },
    { title: "Fuel cost trend", labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"], values: [62, 68, 71, 66, 74, 79, 83, 86] },
    { title: "Maintenance workload", labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"], values: [22, 26, 31, 24, 28, 33, 29, 27] },
  ],
  panels: [
    {
      title: "Fleet activity",
      meta: "Live operational feed",
      action: "View all",
      rows: [
        { label: "TRK-AE-0482 · Dubai HQ → Jebel Ali", value: "42 km", status: "In transit", tone: "blue" },
        { label: "VAN-DZ-1102 · Oran depot loading", value: "Loading", status: "Active", tone: "green" },
        { label: "PUP-SA-2284 · Scheduled inspection", value: "14:30", status: "Inspection", tone: "amber" },
        { label: "TRK-SA-7712 · Hassi Messaoud run", value: "211 km", status: "Active", tone: "green" },
      ],
    },
    {
      title: "Upcoming maintenance",
      meta: "Next 14 days",
      action: "View schedule",
      rows: [
        { label: "NXS-3907 · Renault Master", value: "In 2 days", status: "Scheduled", tone: "blue" },
        { label: "NXS-7712 · MAN TGS 33", value: "In 5 days", status: "Scheduled", tone: "blue" },
        { label: "EQP-0451 · Genie S-45", value: "Overdue", status: "Overdue", tone: "red" },
        { label: "NXS-4821 · Toyota Hilux", value: "In 9 days", status: "Scheduled", tone: "blue" },
      ],
    },
  ],
  insight: {
    title: "✦ AI Fleet Overview Insight",
    lines: [
      "Model: NexusFleet v1.6 · UI preview",
      "Prediction: Availability will hold above 90% through October",
      "Confidence: 88% · Risk: Low",
      "Recommended: Rebalance 5 vehicles from Algiers to Oran depot",
    ],
    action: "Review recommendation",
  },
};

export const equipmentDashboard: FleetDashboardConfig = {
  kind: "dashboard",
  eyebrow: "CORE / FLEET & EQUIPMENT / EQUIPMENT DASHBOARD",
  title: "Equipment Dashboard",
  subtitle: "Utilization and health of heavy equipment and machinery",
  action: "New record",
  banner: { label: "Equipment utilization", value: "78.6%", detail: "▲ 2.4% vs last month" },
  kpis: [
    { label: "TOTAL EQUIPMENT", value: "132", detail: "Live" },
    { label: "OPERATIONAL", value: "98", detail: "74% of fleet" },
    { label: "UNDER MAINTENANCE", value: "22", detail: "4 critical" },
    { label: "IDLE", value: "12", detail: "Reassign" },
    { label: "DOWNTIME MTD", value: "146 h", detail: "▼ 8.2%" },
  ],
  charts: [
    { title: "Equipment utilization", labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"], values: [64, 68, 71, 69, 74, 76, 77, 79] },
    { title: "Downtime hours", labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"], values: [210, 195, 180, 172, 168, 159, 152, 146] },
    { title: "Maintenance cost", labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"], values: [38, 41, 44, 39, 42, 46, 43, 40] },
  ],
  panels: [
    {
      title: "Equipment by site",
      meta: "Active units",
      action: "View map",
      rows: [
        { label: "Hassi Messaoud", value: "38 units", status: "Active", tone: "green" },
        { label: "Ouargla yard", value: "24 units", status: "Active", tone: "green" },
        { label: "Algiers workshop", value: "11 units", status: "Maintenance", tone: "amber" },
        { label: "Oran depot", value: "19 units", status: "Idle", tone: "neutral" },
      ],
    },
    {
      title: "Critical alerts",
      meta: "Requires attention",
      action: "View all",
      rows: [
        { label: "EQP-0451 · Genie S-45 boom lift", value: "Hydraulic", status: "Critical", tone: "red" },
        { label: "EQP-0219 · CAT 320 excavator", value: "Engine", status: "Warning", tone: "amber" },
        { label: "EQP-0733 · Atlas Copco XAS", value: "Compressor", status: "Warning", tone: "amber" },
        { label: "EQP-0088 · Bomag BW roller", value: "Normal", status: "Healthy", tone: "green" },
      ],
    },
  ],
  insight: {
    title: "✦ AI Equipment Insight",
    lines: [
      "Model: NexusEquip v1.3 · UI preview",
      "Prediction: Genie S-45 hydraulic fault likely within 120 operating hours",
      "Confidence: 84% · Risk: Medium",
      "Recommended: Schedule hydraulic inspection at Ouargla yard",
    ],
    action: "Review recommendation",
  },
};

export default fleetDashboard;
