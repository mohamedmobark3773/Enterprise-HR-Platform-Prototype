import type {
  FleetDetailConfig,
  FleetDetailRecord,
  FleetListConfig,
} from "@/lib/fleet/fleet-types";

const chart = (title: string, values: number[]) => ({
  title,
  labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"],
  values,
});

export const equipmentScreen: FleetListConfig = {
  kind: "list",
  eyebrow: "CORE / FLEET & EQUIPMENT / EQUIPMENT",
  title: "Equipment",
  subtitle: "Heavy equipment inventory, utilization and service status",
  action: "New equipment",
  searchPlaceholder: "Search equipment, categories, sites…",
  tabs: ["All equipment", "Operational", "Maintenance", "Idle"],
  kpis: [
    { label: "TOTAL EQUIPMENT", value: "132", detail: "Live" },
    { label: "OPERATIONAL", value: "98", detail: "74%" },
    { label: "UNDER MAINTENANCE", value: "22", detail: "4 critical" },
    { label: "IDLE", value: "12", detail: "Reassign" },
  ],
  columns: ["Equipment", "Category", "Site", "Utilization", "Next Service", "Status"],
  rows: [
    { id: "EQP-0451", cells: ["EQP-0451 · Genie S-45", "Boom lift", "Ouargla yard", "82%", "12 Oct 2026"], status: "Maintenance", tone: "amber", href: "/fleet/equipment/EQP-0451" },
    { id: "EQP-0219", cells: ["EQP-0219 · CAT 320", "Excavator", "Hassi Messaoud", "91%", "18 Oct 2026"], status: "Operational", tone: "green", href: "/fleet/equipment/EQP-0219" },
    { id: "EQP-0733", cells: ["EQP-0733 · Atlas Copco XAS", "Compressor", "Algiers workshop", "64%", "09 Oct 2026"], status: "Operational", tone: "green", href: "/fleet/equipment/EQP-0733" },
    { id: "EQP-0088", cells: ["EQP-0088 · Bomag BW", "Roller", "Oran depot", "48%", "22 Oct 2026"], status: "Idle", tone: "neutral", href: "/fleet/equipment/EQP-0088" },
    { id: "EQP-0302", cells: ["EQP-0302 · JCB 3CX", "Backhoe", "Ouargla yard", "77%", "15 Oct 2026"], status: "Operational", tone: "green", href: "/fleet/equipment/EQP-0302" },
  ],
  pagination: "1–5 of 132 · ‹ 1 2 3 ›",
  tags: ["Heavy", "Lifting", "Power", "Earthmoving"],
  chart: chart("Equipment utilization %", [64, 68, 71, 69, 74, 76, 77, 79]),
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
  emptyLabel: "No equipment matches the current search.",
};

export const equipmentMaintenanceScreen: FleetListConfig = {
  kind: "list",
  eyebrow: "CORE / FLEET & EQUIPMENT / EQUIPMENT MAINTENANCE",
  title: "Equipment Maintenance",
  subtitle: "Preventive and corrective maintenance for equipment",
  action: "New work order",
  searchPlaceholder: "Search work orders, equipment, technicians…",
  tabs: ["Scheduled", "In progress", "Overdue", "Completed"],
  kpis: [
    { label: "OPEN ORDERS", value: "27", detail: "Live" },
    { label: "IN PROGRESS", value: "9", detail: "Live" },
    { label: "OVERDUE", value: "5", detail: "Needs action" },
    { label: "COST MTD", value: "$31,640", detail: "▲ 2.2%" },
  ],
  columns: ["Work Order", "Equipment", "Type", "Technician", "Due", "Status"],
  rows: [
    { id: "em-6601", cells: ["EM-6601", "EQP-0451", "Hydraulic", "T. Bouzid", "04 Oct 2026"], status: "Scheduled", tone: "blue" },
    { id: "em-6602", cells: ["EM-6602", "EQP-0219", "Engine service", "A. Meziane", "07 Oct 2026"], status: "Scheduled", tone: "blue" },
    { id: "em-6603", cells: ["EM-6603", "EQP-0733", "Compressor", "T. Bouzid", "In progress"], status: "In progress", tone: "amber" },
    { id: "em-6604", cells: ["EM-6604", "EQP-0302", "500h service", "R. Kaci", "26 Sep 2026"], status: "Overdue", tone: "red" },
    { id: "em-6605", cells: ["EM-6605", "EQP-0088", "Roller drum", "A. Meziane", "23 Sep 2026"], status: "Completed", tone: "green" },
  ],
  pagination: "1–5 of 96 · ‹ 1 2 3 ›",
  chart: chart("Equipment maintenance spend (k USD)", [21, 24, 27, 23, 26, 30, 28, 32]),
  insight: {
    title: "✦ AI Equipment Maintenance Insight",
    lines: [
      "Model: NexusMaint-EQ v1.2 · UI preview",
      "Prediction: EQP-0302 will need hydraulic service within 6 weeks",
      "Confidence: 81% · Risk: Medium",
      "Recommended: Bundle with next scheduled service",
    ],
    action: "Review recommendation",
  },
  emptyLabel: "No equipment maintenance records match the current search.",
};

export const workOrdersScreen: FleetListConfig = {
  kind: "list",
  eyebrow: "CORE / FLEET & EQUIPMENT / WORK ORDERS",
  title: "Work Orders",
  subtitle: "Consolidated work orders across fleet and equipment",
  action: "New work order",
  searchPlaceholder: "Search work orders, assets, assignees…",
  tabs: ["Open", "In progress", "On hold", "Closed"],
  kpis: [
    { label: "OPEN", value: "38", detail: "Live" },
    { label: "IN PROGRESS", value: "21", detail: "Live" },
    { label: "ON HOLD", value: "6", detail: "Waiting parts" },
    { label: "CLOSED MTD", value: "142", detail: "▲ 7.4%" },
  ],
  columns: ["Work Order", "Asset", "Priority", "Assigned", "Opened", "Status"],
  rows: [
    { id: "wo-8801", cells: ["WO-8801", "EQP-0451", "High", "T. Bouzid", "01 Oct 2026"], status: "Open", tone: "amber" },
    { id: "wo-8802", cells: ["WO-8802", "NXS-7712", "Medium", "A. Meziane", "30 Sep 2026"], status: "In progress", tone: "blue" },
    { id: "wo-8803", cells: ["WO-8803", "EQP-0219", "High", "R. Kaci", "29 Sep 2026"], status: "In progress", tone: "blue" },
    { id: "wo-8804", cells: ["WO-8804", "NXS-2284", "Low", "M. Saadi", "27 Sep 2026"], status: "On hold", tone: "neutral" },
    { id: "wo-8805", cells: ["WO-8805", "NXS-3907", "Medium", "M. Saadi", "24 Sep 2026"], status: "Closed", tone: "green" },
  ],
  pagination: "1–5 of 207 · ‹ 1 2 3 ›",
  chart: chart("Work orders closed", [110, 118, 126, 121, 130, 136, 139, 142]),
  insight: {
    title: "✦ AI Work Order Insight",
    lines: [
      "Model: NexusWork v1.1 · UI preview",
      "Prediction: Average cycle time will drop 6% with parts pre-staging",
      "Confidence: 78% · Risk: Low",
      "Recommended: Pre-stage spare parts for 6 on-hold orders",
    ],
    action: "Review recommendation",
  },
  emptyLabel: "No work orders match the current search.",
};

export const sparePartsScreen: FleetListConfig = {
  kind: "list",
  eyebrow: "CORE / FLEET & EQUIPMENT / SPARE PARTS USAGE",
  title: "Spare Parts Usage",
  subtitle: "Parts consumption linked to maintenance activity",
  action: "Record usage",
  searchPlaceholder: "Search parts, equipment, warehouses…",
  tabs: ["All usage", "Low stock", "Reorder", "Consumed"],
  kpis: [
    { label: "PARTS CONSUMED MTD", value: "1,284", detail: "Live" },
    { label: "COST MTD", value: "$68,420", detail: "▲ 3.8%" },
    { label: "LOW STOCK", value: "23", detail: "Reorder" },
    { label: "WAREHOUSES", value: "6", detail: "Coverage" },
  ],
  columns: ["Part", "Equipment", "Quantity", "Warehouse", "Unit Cost", "Status"],
  rows: [
    { id: "sp-2201", cells: ["SP-2201 · Hydraulic filter", "EQP-0451", "4", "Ouargla yard", "$86"], status: "Consumed", tone: "green" },
    { id: "sp-2202", cells: ["SP-2202 · Brake pads", "NXS-7712", "2", "Algiers central", "$210"], status: "Consumed", tone: "green" },
    { id: "sp-2203", cells: ["SP-2203 · Engine oil 15L", "EQP-0219", "6", "Hassi Messaoud", "$64"], status: "Reserved", tone: "blue" },
    { id: "sp-2204", cells: ["SP-2204 · Air filter", "EQP-0733", "1", "Algiers workshop", "$42"], status: "Low stock", tone: "amber" },
    { id: "sp-2205", cells: ["SP-2205 · Compressor valve", "EQP-0733", "1", "Algiers workshop", "$340"], status: "Reorder", tone: "red" },
  ],
  pagination: "1–5 of 1,284 · ‹ 1 2 3 ›",
  chart: chart("Parts cost per month (k USD)", [52, 56, 60, 58, 63, 66, 64, 68]),
  insight: {
    title: "✦ AI Spare Parts Insight",
    lines: [
      "Model: NexusParts v1.0 · UI preview",
      "Prediction: 23 parts will fall below safety stock within 3 weeks",
      "Confidence: 88% · Risk: Medium",
      "Recommended: Generate grouped purchase order for Algiers workshop",
    ],
    action: "Review recommendation",
  },
  emptyLabel: "No spare parts usage matches the current search.",
};

export const failuresScreen: FleetListConfig = {
  kind: "list",
  eyebrow: "CORE / FLEET & EQUIPMENT / FAILURES & REPAIRS",
  title: "Failures & Repairs",
  subtitle: "Failure reports, root cause and repair outcomes",
  action: "Report failure",
  searchPlaceholder: "Search failures, equipment, categories…",
  tabs: ["Open", "Under repair", "Resolved", "Recurring"],
  kpis: [
    { label: "OPEN FAILURES", value: "17", detail: "Live" },
    { label: "UNDER REPAIR", value: "8", detail: "Live" },
    { label: "RESOLVED MTD", value: "54", detail: "▲ 5.1%" },
    { label: "AVG DOWNTIME", value: "9.4 h", detail: "▼ 1.2 h" },
  ],
  columns: ["Failure", "Equipment", "Category", "Downtime", "Reported", "Status"],
  rows: [
    { id: "fl-5501", cells: ["FL-5501", "EQP-0451", "Hydraulic", "14 h", "01 Oct 2026"], status: "Under repair", tone: "amber" },
    { id: "fl-5502", cells: ["FL-5502", "EQP-0219", "Engine", "22 h", "30 Sep 2026"], status: "Under repair", tone: "amber" },
    { id: "fl-5503", cells: ["FL-5503", "EQP-0733", "Compressor", "6 h", "29 Sep 2026"], status: "Resolved", tone: "green" },
    { id: "fl-5504", cells: ["FL-5504", "NXS-3907", "Electrical", "4 h", "28 Sep 2026"], status: "Resolved", tone: "green" },
    { id: "fl-5505", cells: ["FL-5505", "EQP-0302", "Hydraulic", "—", "27 Sep 2026"], status: "Recurring", tone: "red" },
  ],
  pagination: "1–5 of 148 · ‹ 1 2 3 ›",
  chart: chart("Resolved failures", [38, 42, 46, 44, 49, 52, 51, 54]),
  insight: {
    title: "✦ AI Failure Insight",
    lines: [
      "Model: NexusGuard v1.8 · UI preview",
      "Prediction: EQP-0302 hydraulic failures show a recurring pattern",
      "Confidence: 87% · Risk: Medium",
      "Recommended: Root-cause analysis before next deployment",
    ],
    action: "Review recommendation",
  },
  emptyLabel: "No failures match the current search.",
};

export const lifecycleScreen: FleetListConfig = {
  kind: "list",
  eyebrow: "CORE / FLEET & EQUIPMENT / LIFECYCLE",
  title: "Equipment Lifecycle",
  subtitle: "Asset age, health and replacement planning",
  action: "Plan replacement",
  searchPlaceholder: "Search assets, ages, health…",
  tabs: ["Active", "Approaching end", "Replacement due", "Retired"],
  kpis: [
    { label: "TRACKED ASSETS", value: "380", detail: "Live" },
    { label: "APPROACHING END", value: "24", detail: "Next 12 months" },
    { label: "REPLACEMENT DUE", value: "9", detail: "This quarter" },
    { label: "AVG AGE", value: "5.2 yrs", detail: "▼ 0.1" },
  ],
  columns: ["Asset", "Age", "Health", "Replace By", "Residual", "Status"],
  rows: [
    { id: "life-3301", cells: ["EQP-0088 · Bomag BW", "9.4 yrs", "62%", "Q1 2027", "$18,400"], status: "Approaching end", tone: "amber" },
    { id: "life-3302", cells: ["EQP-0302 · JCB 3CX", "8.1 yrs", "58%", "Q4 2026", "$22,100"], status: "Replacement due", tone: "red" },
    { id: "life-3303", cells: ["EQP-0219 · CAT 320", "4.2 yrs", "88%", "Q3 2029", "$96,500"], status: "Active", tone: "green" },
    { id: "life-3304", cells: ["NXS-2284 · Ford Ranger", "6.7 yrs", "71%", "Q2 2028", "$14,200"], status: "Active", tone: "green" },
    { id: "life-3305", cells: ["EQP-0451 · Genie S-45", "7.9 yrs", "54%", "Q4 2026", "$16,800"], status: "Replacement due", tone: "red" },
  ],
  pagination: "1–5 of 380 · ‹ 1 2 3 ›",
  chart: chart("Assets by age band", [42, 58, 66, 71, 64, 48, 22, 9]),
  insight: {
    title: "✦ AI Lifecycle Insight",
    lines: [
      "Model: NexusLife v1.0 · UI preview",
      "Prediction: 9 assets reach end-of-useful-life this quarter",
      "Confidence: 86% · Risk: Medium",
      "Recommended: Budget replacement for EQP-0302 and EQP-0451",
    ],
    action: "Review recommendation",
  },
  emptyLabel: "No assets match the current search.",
};

const equipmentRecord = (overrides: Partial<FleetDetailRecord> & { name: string; code: string; status: string; tone: string; icon: string }): FleetDetailRecord => ({
  hero: {
    icon: overrides.icon,
    name: overrides.name,
    status: overrides.status,
    tone: overrides.tone,
    code: overrides.code,
    subtitle: overrides.hero?.subtitle ?? "Ouargla yard · Fleet & Equipment",
  },
  fields: overrides.fields ?? [
    { label: "Category", value: "Boom lift" },
    { label: "Site", value: "Ouargla yard" },
    { label: "Year", value: "2017" },
    { label: "Operating Hours", value: "8,420 h" },
    { label: "Operator", value: "T. Bouzid" },
  ],
  kpis: overrides.kpis ?? [
    { label: "Utilization", value: "82%", detail: "+4.2% this month" },
    { label: "Operating Hours", value: "8,420 h", detail: "Since acquisition" },
    { label: "Next Service", value: "12 Oct 2026", detail: "In 10 days" },
    { label: "Open Work Orders", value: "2", detail: "1 high priority" },
    { label: "Downtime MTD", value: "14 h", detail: "▼ 2.1 h" },
  ],
  sections:
    overrides.sections ?? [
      {
        title: "Maintenance History",
        meta: "Last 4 service events",
        action: "View all",
        columns: ["Date", "Type", "Technician", "Status"],
        statusColumn: "Status",
        rows: [
          ["18 Aug 2026", "Hydraulic service", "T. Bouzid", "Done"],
          ["02 Jun 2026", "Engine service", "A. Meziane", "Done"],
          ["14 Mar 2026", "500h full service", "R. Kaci", "Done"],
          ["12 Oct 2026", "Scheduled inspection", "—", "Upcoming"],
        ],
      },
      {
        title: "Recent Work Orders",
        meta: "Latest activity",
        action: "View all",
        columns: ["Work Order", "Type", "Opened", "Status"],
        statusColumn: "Status",
        rows: [
          ["EM-6601", "Hydraulic", "01 Oct 2026", "Open"],
          ["WO-8801", "Inspection", "28 Sep 2026", "In progress"],
          ["WO-8790", "Tyre set", "12 Sep 2026", "Closed"],
          ["WO-8765", "500h service", "14 Mar 2026", "Closed"],
        ],
      },
    ],
  tags: overrides.tags ?? ["Insured · 20 Mar 2027", "Inspection valid"],
  actions: overrides.actions ?? ["Log Usage", "Report Issue"],
});

export const equipmentDetails: FleetDetailConfig = {
  kind: "detail",
  eyebrow: "CORE / FLEET & EQUIPMENT / EQUIPMENT / EQUIPMENT DETAILS",
  title: "Equipment Details",
  subtitle: "Equipment profile, maintenance and work order history",
  action: "More actions",
  tabs: ["Overview", "Maintenance", "Work Orders", "Spare Parts", "Failures", "Timeline"],
  defaultId: "EQP-0451",
  records: {
    "EQP-0451": equipmentRecord({ name: "Genie S-45 Boom Lift", code: "EQP-0451", status: "Maintenance", tone: "amber", icon: "🏗️" }),
    "EQP-0219": equipmentRecord({
      name: "CAT 320 Excavator",
      code: "EQP-0219",
      status: "Operational",
      tone: "green",
      icon: "🚜",
      fields: [
        { label: "Category", value: "Excavator" },
        { label: "Site", value: "Hassi Messaoud" },
        { label: "Year", value: "2019" },
        { label: "Operating Hours", value: "12,180 h" },
        { label: "Operator", value: "A. Meziane" },
      ],
      kpis: [
        { label: "Utilization", value: "91%", detail: "+2.8% this month" },
        { label: "Operating Hours", value: "12,180 h", detail: "Since acquisition" },
        { label: "Next Service", value: "18 Oct 2026", detail: "In 16 days" },
        { label: "Open Work Orders", value: "1", detail: "Medium priority" },
        { label: "Downtime MTD", value: "22 h", detail: "▲ 3.4 h" },
      ],
    }),
    "EQP-0733": equipmentRecord({ name: "Atlas Copco XAS Compressor", code: "EQP-0733", status: "Operational", tone: "green", icon: "⚙️" }),
    "EQP-0088": equipmentRecord({ name: "Bomag BW Roller", code: "EQP-0088", status: "Idle", tone: "neutral", icon: "🛞" }),
    "EQP-0302": equipmentRecord({ name: "JCB 3CX Backhoe", code: "EQP-0302", status: "Operational", tone: "green", icon: "🚧" }),
  },
  insight: {
    title: "✦ AI Equipment Failure-Risk Insight",
    lines: [
      "Model: NexusGuard v1.8 · UI preview",
      "Prediction: Hydraulic fault likely within 120 operating hours",
      "Confidence: 84% · Risk: Medium",
      "Recommended: Inspect hydraulic system at next service window",
    ],
    action: "Human review required",
  },
};

export default equipmentScreen;
