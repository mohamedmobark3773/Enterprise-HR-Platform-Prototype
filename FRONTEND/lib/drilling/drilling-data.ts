import type {
  BitRecord,
  CementRecord,
  CostRecord,
  CrewRecord,
  DailyReportRecord,
  FluidRecord,
  HseRecord,
  MaterialRecord,
  NptRecord,
  ProgramRecord,
  RigRecord,
  SurveyRecord,
  WellRecord,
} from "@/types/drilling";

export interface DrillingSeedData {
  wells: WellRecord[];
  programs: ProgramRecord[];
  "daily-reports": DailyReportRecord[];
  rigs: RigRecord[];
  crews: CrewRecord[];
  surveys: SurveyRecord[];
  fluids: FluidRecord[];
  cementing: CementRecord[];
  bits: BitRecord[];
  npt: NptRecord[];
  hse: HseRecord[];
  costs: CostRecord[];
  materials: MaterialRecord[];
}

export const drillingSeeds: DrillingSeedData = {
  wells: [
    { id: "W-101", name: "Ratawi-12", field: "Ratawi", country: "Iraq", rig: "RG-07", type: "Development", status: "Drilling", formation: "Yamama", targetDepth: 3450, currentDepth: 2180, rop: 17.4, nptHours: 46, budget: 14200000, spent: 8100000, risk: "Medium", supervisor: "Hassan Kareem", startDate: "2025-01-18" },
    { id: "W-102", name: "Zubair-04", field: "Zubair", country: "Iraq", rig: "RG-03", type: "Appraisal", status: "Drilling", formation: "Zubair", targetDepth: 2980, currentDepth: 2640, rop: 12.8, nptHours: 71, budget: 9600000, spent: 7400000, risk: "High", supervisor: "Dana Al-Rubaie", startDate: "2024-12-02" },
    { id: "W-103", name: "Kirkuk-21", field: "Kirkuk", country: "Iraq", rig: "RG-07", type: "Development", status: "Completing", formation: "Kirkuk", targetDepth: 2600, currentDepth: 2600, rop: 21.2, nptHours: 28, budget: 7800000, spent: 7100000, risk: "Low", supervisor: "Hassan Kareem", startDate: "2024-11-14" },
    { id: "W-104", name: "Halfaya-09", field: "Halfaya", country: "Iraq", rig: "RG-11", type: "Exploration", status: "Planning", formation: "Nahr Umr", targetDepth: 4120, currentDepth: 0, rop: 0, nptHours: 0, budget: 21500000, spent: 320000, risk: "Medium", supervisor: "Yasir Osman", startDate: "2025-04-07" },
    { id: "W-105", name: "West Qurna-17", field: "West Qurna", country: "Iraq", rig: "RG-03", type: "Development", status: "Drilling", formation: "Mishrif", targetDepth: 3140, currentDepth: 980, rop: 15.1, nptHours: 33, budget: 12400000, spent: 4200000, risk: "Low", supervisor: "Dana Al-Rubaie", startDate: "2025-02-21" },
    { id: "W-106", name: "Majnoon-06", field: "Majnoon", country: "Iraq", rig: "RG-11", type: "Appraisal", status: "Suspended", formation: "Sargelu", targetDepth: 3880, currentDepth: 1520, rop: 9.7, nptHours: 118, budget: 16800000, spent: 9700000, risk: "High", supervisor: "Yasir Osman", startDate: "2024-09-30" },
    { id: "W-107", name: "Bai Hassan-31", field: "Bai Hassan", country: "Iraq", rig: "RG-07", type: "Workover", status: "Producing", formation: "Kirkuk", targetDepth: 2410, currentDepth: 2410, rop: 24.5, nptHours: 12, budget: 2600000, spent: 2100000, risk: "Low", supervisor: "Hassan Kareem", startDate: "2024-10-11" },
    { id: "W-108", name: "Nahr Umr-03", field: "Nahr Umr", country: "Iraq", rig: "RG-03", type: "Exploration", status: "Planning", formation: "Ahmadi", targetDepth: 4300, currentDepth: 0, rop: 0, nptHours: 0, budget: 23800000, spent: 0, risk: "Medium", supervisor: "Dana Al-Rubaie", startDate: "2025-05-19" },
    { id: "W-109", name: "Gharraf-14", field: "Gharraf", country: "Iraq", rig: "RG-11", type: "Development", status: "Drilling", formation: "Yamama", targetDepth: 3260, currentDepth: 1870, rop: 16.3, nptHours: 54, budget: 11900000, spent: 6300000, risk: "Medium", supervisor: "Yasir Osman", startDate: "2025-01-05" },
    { id: "W-110", name: "Avana-02", field: "Avana", country: "Iraq", rig: "RG-07", type: "Development", status: "Plugged", formation: "Asmari", targetDepth: 2180, currentDepth: 2180, rop: 19.8, nptHours: 41, budget: 5400000, spent: 5300000, risk: "Low", supervisor: "Hassan Kareem", startDate: "2024-08-22" },
  ],
  programs: [
    { id: "PRG-041", name: "Ratawi-12 drilling program", well: "W-101", phase: "Surface + intermediate", status: "Active", operator: "NEXUS Drilling", plannedStart: "2025-01-18", plannedEnd: "2025-04-30", sections: 5, estimate: 14200000, revision: "r3", approver: "A. Mansour" },
    { id: "PRG-042", name: "Zubair-04 completion program", well: "W-102", phase: "Production section", status: "Under review", operator: "NEXUS Drilling", plannedStart: "2025-03-02", plannedEnd: "2025-04-18", sections: 3, estimate: 9600000, revision: "r1", approver: "Pending" },
    { id: "PRG-043", name: "Kirkuk-21 testing program", well: "W-103", phase: "Well test", status: "Approved", operator: "NEXUS Drilling", plannedStart: "2025-02-24", plannedEnd: "2025-03-14", sections: 2, estimate: 7800000, revision: "r2", approver: "A. Mansour" },
    { id: "PRG-044", name: "Halfaya-09 exploration program", well: "W-104", phase: "Spud planning", status: "Draft", operator: "NEXUS Drilling", plannedStart: "2025-04-07", plannedEnd: "2025-09-30", sections: 7, estimate: 21500000, revision: "r0", approver: "Pending" },
    { id: "PRG-045", name: "West Qurna-17 drilling program", well: "W-105", phase: "Surface", status: "Active", operator: "NEXUS Drilling", plannedStart: "2025-02-21", plannedEnd: "2025-06-12", sections: 4, estimate: 12400000, revision: "r2", approver: "S. Haddad" },
    { id: "PRG-046", name: "Majnoon-06 suspension program", well: "W-106", phase: "Suspension", status: "Closed", operator: "NEXUS Drilling", plannedStart: "2024-12-15", plannedEnd: "2025-01-30", sections: 2, estimate: 16800000, revision: "r4", approver: "S. Haddad" },
    { id: "PRG-047", name: "Gharraf-14 drilling program", well: "W-109", phase: "Intermediate", status: "Active", operator: "NEXUS Drilling", plannedStart: "2025-01-05", plannedEnd: "2025-05-20", sections: 5, estimate: 11900000, revision: "r1", approver: "A. Mansour" },
    { id: "PRG-048", name: "Nahr Umr-03 exploration program", well: "W-108", phase: "Survey design", status: "Draft", operator: "NEXUS Drilling", plannedStart: "2025-05-19", plannedEnd: "2025-11-08", sections: 6, estimate: 23800000, revision: "r0", approver: "Pending" },
  ],
  "daily-reports": [
    { id: "DR-2025-0311", date: "2025-03-11", well: "W-101", rig: "RG-07", crew: "Alpha", operation: "Drilling 12-1/4 section", depthFrom: 2110, depthTo: 2180, rop: 18.2, nptHours: 0, status: "Approved", remarks: "Section on plan, mud weight stable." },
    { id: "DR-2025-0312", date: "2025-03-12", well: "W-101", rig: "RG-07", crew: "Alpha", operation: "Circulating and conditioning", depthFrom: 2180, depthTo: 2180, rop: 0, nptHours: 6, status: "Submitted", remarks: "hole cleaning before tagging." },
    { id: "DR-2025-0311-B", date: "2025-03-11", well: "W-102", rig: "RG-03", crew: "Bravo", operation: "Reaming to TD", depthFrom: 2590, depthTo: 2640, rop: 9.4, nptHours: 4, status: "Approved", remarks: "Tight spots at 2610 m, increased visc." },
    { id: "DR-2025-0312-B", date: "2025-03-12", well: "W-102", rig: "RG-03", crew: "Bravo", operation: "Tripping out BHA", depthFrom: 2640, depthTo: 2640, rop: 0, nptHours: 8, status: "Draft", remarks: "Bit pulled with partial gauge wear." },
    { id: "DR-2025-0312-C", date: "2025-03-12", well: "W-105", rig: "RG-03", crew: "Charlie", operation: "Drilling 17-1/2 section", depthFrom: 900, depthTo: 980, rop: 15.1, nptHours: 2, status: "Submitted", remarks: "Fast drilling in top hole." },
    { id: "DR-2025-0312-D", date: "2025-03-12", well: "W-109", rig: "RG-11", crew: "Delta", operation: "Running casing", depthFrom: 1870, depthTo: 1870, rop: 0, nptHours: 5, status: "Submitted", remarks: "9-5/8 casing to 1865 m." },
    { id: "DR-2025-0310", date: "2025-03-10", well: "W-103", rig: "RG-07", crew: "Alpha", operation: "Well test preparation", depthFrom: 2600, depthTo: 2600, rop: 0, nptHours: 3, status: "Approved", remarks: "Test stack inspected and pressure tested." },
    { id: "DR-2025-0309", date: "2025-03-09", well: "W-107", rig: "RG-07", crew: "Bravo", operation: "Workover kick-off", depthFrom: 2410, depthTo: 2410, rop: 0, nptHours: 1, status: "Approved", remarks: "Well killed and rods pulled." },
    { id: "DR-2025-0312-E", date: "2025-03-12", well: "W-106", rig: "RG-11", crew: "Delta", operation: "Suspension monitoring", depthFrom: 1520, depthTo: 1520, rop: 0, nptHours: 12, status: "Rejected", remarks: "Awaiting suspension approval." },
  ],
  rigs: [
    { id: "RG-03", name: "Al-Zubair 3", type: "Land rig", contractor: "Basra Drilling Co.", status: "Operating", location: "Zubair field", year: 2016, depthRating: 5000, utilization: 92, dayRate: 28500, nextInspection: "2025-06-14", runHours: 41250 },
    { id: "RG-07", name: "Tigris 7", type: "Land rig", contractor: "NEXUS Energy Services", status: "Operating", location: "Ratawi field", year: 2019, depthRating: 7000, utilization: 88, dayRate: 34200, nextInspection: "2025-05-02", runHours: 26890 },
    { id: "RG-11", name: "Euphrates 11", type: "Land rig", contractor: "Gulf Rig Group", status: "Maintenance", location: "Halfaya field", year: 2013, depthRating: 4500, utilization: 61, dayRate: 24800, nextInspection: "2025-03-28", runHours: 58410 },
    { id: "RG-14", name: "Dijla 14", type: "Workover rig", contractor: "NEXUS Energy Services", status: "Available", location: "Kirkuk field", year: 2021, depthRating: 3200, utilization: 44, dayRate: 12600, nextInspection: "2025-07-19", runHours: 11980 },
    { id: "RG-18", name: "Shatt 18", type: "Land rig", contractor: "Basra Drilling Co.", status: "Standby", location: "West Qurna field", year: 2011, depthRating: 5500, utilization: 35, dayRate: 22400, nextInspection: "2025-04-11", runHours: 63020 },
    { id: "RG-21", name: "Majnoon 21", type: "Offshore rig", contractor: "Gulf Rig Group", status: "Retired", location: "Majnoon field", year: 2008, depthRating: 6000, utilization: 0, dayRate: 0, nextInspection: "2024-11-30", runHours: 79440 },
    { id: "RG-24", name: "Basra 24", type: "Snubbing unit", contractor: "NEXUS Energy Services", status: "Available", location: "Bai Hassan field", year: 2022, depthRating: 2500, utilization: 52, dayRate: 9800, nextInspection: "2025-08-05", runHours: 6420 },
  ],
  crews: [
    { id: "CR-01", name: "Alpha tour", supervisor: "Omar Nasser", tour: "Day", members: 18, well: "W-101", handover: "2025-03-12 06:00", certification: "IADC WellSharp", status: "On tour", startDate: "2025-01-18" },
    { id: "CR-02", name: "Bravo tour", supervisor: "Layla Hassan", tour: "Night", members: 17, well: "W-102", handover: "2025-03-12 18:00", certification: "IADC WellSharp", status: "On tour", startDate: "2024-12-02" },
    { id: "CR-03", name: "Charlie tour", supervisor: "Karim Adel", tour: "Day", members: 16, well: "W-105", handover: "2025-03-12 06:00", certification: "IWCF Level 4", status: "On tour", startDate: "2025-02-21" },
    { id: "CR-04", name: "Delta tour", supervisor: "Sara Qasim", tour: "Night", members: 18, well: "W-109", handover: "2025-03-12 18:00", certification: "IADC WellSharp", status: "Rest", startDate: "2025-01-05" },
    { id: "CR-05", name: "Relief crew", supervisor: "Tariq Jalil", tour: "Day", members: 15, well: "W-104", handover: "2025-03-12 06:00", certification: "IWCF Level 3", status: "Training", startDate: "2025-02-10" },
    { id: "CR-06", name: "Workover crew", supervisor: "Nadia Faris", tour: "Day", members: 11, well: "W-107", handover: "2025-03-12 06:00", certification: "IADC Workover", status: "Standby", startDate: "2024-10-11" },
  ],
  surveys: [
    { id: "SV-0117", well: "W-101", station: "S-12", md: 1980, inclination: 8.4, azimuth: 214.5, tvd: 1971, dls: 1.2, trend: "Building", status: "Verified" },
    { id: "SV-0118", well: "W-101", station: "S-13", md: 2060, inclination: 11.9, azimuth: 216.1, tvd: 2046, dls: 1.6, trend: "Building", status: "Verified" },
    { id: "SV-0119", well: "W-101", station: "S-14", md: 2140, inclination: 14.2, azimuth: 217.8, tvd: 2119, dls: 1.1, trend: "Holding", status: "Pending QC" },
    { id: "SV-0120", well: "W-102", station: "S-08", md: 2480, inclination: 3.1, azimuth: 96.4, tvd: 2479, dls: 0.4, trend: "Holding", status: "Verified" },
    { id: "SV-0121", well: "W-102", station: "S-09", md: 2560, inclination: 5.8, azimuth: 99.2, tvd: 2557, dls: 1.3, trend: "Building", status: "Verified" },
    { id: "SV-0122", well: "W-105", station: "S-04", md: 860, inclination: 2.2, azimuth: 301.5, tvd: 860, dls: 0.6, trend: "Dropping", status: "Pending QC" },
    { id: "SV-0123", well: "W-109", station: "S-10", md: 1760, inclination: 6.7, azimuth: 148.9, tvd: 1754, dls: 0.9, trend: "Building", status: "Verified" },
    { id: "SV-0124", well: "W-106", station: "S-06", md: 1440, inclination: 18.3, azimuth: 260.2, tvd: 1418, dls: 2.8, trend: "Dropping", status: "Rejected" },
  ],
  fluids: [
    { id: "FL-021", well: "W-101", unit: "Surface", type: "Water-based", density: 1.12, funnelViscosity: 42, ph: 8.4, chloride: 18500, volume: 180, status: "In spec", updated: "2025-03-12" },
    { id: "FL-022", well: "W-102", unit: "Surface", type: "Oil-based", density: 1.24, funnelViscosity: 58, ph: 7.1, chloride: 24000, volume: 220, status: "Adjusting", updated: "2025-03-12" },
    { id: "FL-023", well: "W-105", unit: "Surface", type: "Polymer", density: 1.06, funnelViscosity: 34, ph: 8.9, chloride: 12400, volume: 140, status: "In spec", updated: "2025-03-12" },
    { id: "FL-024", well: "W-109", unit: "Shaker", type: "Water-based", density: 1.18, funnelViscosity: 47, ph: 8.1, chloride: 19700, volume: 96, status: "In spec", updated: "2025-03-11" },
    { id: "FL-025", well: "W-106", unit: "Pit", type: "Synthetic", density: 0.94, funnelViscosity: 66, ph: 6.8, chloride: 9800, volume: 62, status: "Out of spec", updated: "2025-03-09" },
    { id: "FL-026", well: "W-103", unit: "Test separator", type: "Water-based", density: 1.05, funnelViscosity: 30, ph: 7.6, chloride: 14200, volume: 45, status: "In spec", updated: "2025-03-10" },
  ],
  cementing: [
    { id: "CE-044", well: "W-109", stage: "9-5/8 casing", slurry: "Class G + silica", volume: 128, density: 1.92, waitTime: 14, jobDate: "2025-03-12", operator: "CemTech Iraq", status: "In progress" },
    { id: "CE-043", well: "W-101", stage: "13-3/4 surface", slurry: "Class G", volume: 96, density: 1.86, waitTime: 12, jobDate: "2025-02-04", operator: "CemTech Iraq", status: "Passed" },
    { id: "CE-042", well: "W-102", stage: "7 casing shoe", slurry: "Class G + latex", volume: 74, density: 1.9, waitTime: 18, jobDate: "2025-01-27", operator: "Basra Cementing", status: "Passed" },
    { id: "CE-041", well: "W-105", stage: "13-3/4 surface", slurry: "Class G", volume: 102, density: 1.88, waitTime: 12, jobDate: "2025-03-18", operator: "CemTech Iraq", status: "Planned" },
    { id: "CE-040", well: "W-106", stage: "9-5/8 liner", slurry: "Class G + barite", volume: 88, density: 2.04, waitTime: 20, jobDate: "2025-01-08", operator: "Basra Cementing", status: "Failed" },
    { id: "CE-039", well: "W-103", stage: "Production packer", slurry: "Low-temperature", volume: 36, density: 1.78, waitTime: 10, jobDate: "2025-02-28", operator: "CemTech Iraq", status: "Passed" },
  ],
  bits: [
    { id: "BT-118", well: "W-101", bit: "PDC 8-blade", size: 12.25, iadc: "S223", run: 3, depthIn: 1640, depthOut: 2180, hours: 96, status: "Pulled" },
    { id: "BT-119", well: "W-102", bit: "Roller cone tricone", size: 8.5, iadc: "517", run: 5, depthIn: 2450, depthOut: 2640, hours: 78, status: "Junked" },
    { id: "BT-120", well: "W-105", bit: "PDC 6-blade", size: 17.5, iadc: "M323", run: 1, depthIn: 620, depthOut: 980, hours: 54, status: "Running" },
    { id: "BT-121", well: "W-109", bit: "PDC 8-blade", size: 12.25, iadc: "S223", run: 2, depthIn: 1310, depthOut: 1870, hours: 88, status: "Pulled" },
    { id: "BT-122", well: "W-106", bit: "Roller cone tricone", size: 12.25, iadc: "417", run: 4, depthIn: 1180, depthOut: 1520, hours: 112, status: "Reserved" },
    { id: "BT-123", well: "W-101", bit: "PDC 6-blade", size: 12.25, iadc: "S123", run: 4, depthIn: 2180, depthOut: 2180, hours: 0, status: "Running" },
    { id: "BT-124", well: "W-103", bit: "Lead mill", size: 8.5, iadc: "D211", run: 2, depthIn: 2560, depthOut: 2600, hours: 22, status: "Pulled" },
  ],
  npt: [
    { id: "NPT-091", well: "W-102", date: "2025-03-11", category: "Equipment", cause: "Top drive overheating, bearing replacement", duration: 9, costImpact: 41000, responsible: "Contractor", status: "Mitigating" },
    { id: "NPT-092", well: "W-106", date: "2025-03-09", category: "Waiting", cause: "Awaiting suspension approval from operations", duration: 24, costImpact: 30000, responsible: "Operations", status: "Open" },
    { id: "NPT-093", well: "W-101", date: "2025-03-08", category: "Weather", cause: "Sand storm, visibility below limit", duration: 6, costImpact: 18000, responsible: "Weather", status: "Closed" },
    { id: "NPT-094", well: "W-109", date: "2025-03-07", category: "Formation", cause: "Lost circulation in Mishrif formation", duration: 14, costImpact: 96000, responsible: "Drilling", status: "Closed" },
    { id: "NPT-095", well: "W-102", date: "2025-03-05", category: "Material", cause: "Casing centralizers delayed at base yard", duration: 11, costImpact: 22000, responsible: "Supply chain", status: "Closed" },
    { id: "NPT-096", well: "W-105", date: "2025-03-12", category: "Equipment", cause: "Mud pump valve failure, pump 2", duration: 4, costImpact: 9500, responsible: "Contractor", status: "Mitigating" },
    { id: "NPT-097", well: "W-106", date: "2025-03-02", category: "HSE", cause: "Gas detect alarm calibration", duration: 3, costImpact: 4200, responsible: "HSE", status: "Closed" },
  ],
  hse: [
    { id: "HSE-330", date: "2025-03-10", well: "W-102", category: "Near miss", severity: "Medium", lostTime: 0, reportedBy: "Layla Hassan", action: "Tool tether policy re-briefed to night tour.", status: "Closed" },
    { id: "HSE-331", date: "2025-03-08", well: "W-109", category: "First aid", severity: "Low", lostTime: 0, reportedBy: "Sara Qasim", action: "Hand injury treated on site, gloves upgraded.", status: "Closed" },
    { id: "HSE-332", date: "2025-03-06", well: "W-101", category: "Environmental", severity: "Medium", lostTime: 0, reportedBy: "Omar Nasser", action: "Small mud spill contained, bund repaired.", status: "Investigating" },
    { id: "HSE-333", date: "2025-03-03", well: "W-106", category: "Lost time", severity: "High", lostTime: 24, reportedBy: "Yasir Osman", action: "Rig floor slip, medical review in progress.", status: "Investigating" },
    { id: "HSE-334", date: "2025-02-27", well: "W-105", category: "Property damage", severity: "Low", lostTime: 0, reportedBy: "Karim Adel", action: "Forklift mirror replaced, operators briefed.", status: "Reported" },
    { id: "HSE-335", date: "2025-02-21", well: "W-103", category: "Near miss", severity: "High", lostTime: 0, reportedBy: "Hassan Kareem", action: "Dropped object near shark cage, barricade added.", status: "Closed" },
  ],
  costs: [
    { id: "AFE-1101", well: "W-101", afe: "AFE-2025-011", category: "Day rate", approved: 6420000, actual: 3980000, committed: 5400000, period: "2025-Q1", status: "On budget" },
    { id: "AFE-1102", well: "W-101", afe: "AFE-2025-011", category: "Footage", approved: 2100000, actual: 1460000, committed: 1900000, period: "2025-Q1", status: "On budget" },
    { id: "AFE-1103", well: "W-102", afe: "AFE-2024-087", category: "Day rate", approved: 5100000, actual: 4720000, committed: 5050000, period: "2025-Q1", status: "Watch" },
    { id: "AFE-1104", well: "W-102", afe: "AFE-2024-087", category: "Directional", approved: 840000, actual: 910000, committed: 910000, period: "2025-Q1", status: "Over budget" },
    { id: "AFE-1105", well: "W-105", afe: "AFE-2025-014", category: "Mud", approved: 640000, actual: 310000, committed: 520000, period: "2025-Q1", status: "On budget" },
    { id: "AFE-1106", well: "W-109", afe: "AFE-2025-003", category: "Casing", approved: 1750000, actual: 1610000, committed: 1700000, period: "2025-Q1", status: "Watch" },
    { id: "AFE-1107", well: "W-106", afe: "AFE-2024-062", category: "Support", approved: 960000, actual: 1140000, committed: 1140000, period: "2025-Q1", status: "Over budget" },
    { id: "AFE-1108", well: "W-103", afe: "AFE-2024-071", category: "Cement", approved: 430000, actual: 398000, committed: 430000, period: "2025-Q1", status: "On budget" },
  ],
  materials: [
    { id: "MAT-201", name: "9-5/8 casing P-110", category: "Tubulars", supplier: "Basra Steel Works", quantity: 420, unit: "joints", reserved: 380, location: "Yard C / Rack 4", unitCost: 640, status: "In stock" },
    { id: "MAT-202", name: "Class G cement", category: "Cement", supplier: "CemTech Iraq", quantity: 960, unit: "sacks", reserved: 640, location: "Yard A / Silo 2", unitCost: 11, status: "In stock" },
    { id: "MAT-203", name: "Barite API 4.10", category: "Chemicals", supplier: "Gulf Minerals", quantity: 180, unit: "tons", reserved: 150, location: "Yard A / Shed 1", unitCost: 210, status: "Low stock" },
    { id: "MAT-204", name: "PDC bit 12-1/4\"", category: "Consumables", supplier: "DrillCore", quantity: 6, unit: "units", reserved: 5, location: "Tool pusher store", unitCost: 38500, status: "In stock" },
    { id: "MAT-205", name: "Drilling fluid thinner", category: "Chemicals", supplier: "Gulf Minerals", quantity: 40, unit: "bags", reserved: 36, location: "Yard A / Shed 3", unitCost: 95, status: "On order" },
    { id: "MAT-206", name: "Wellhead gasket 13-5/8\"", category: "Consumables", supplier: "Iraqi Oil Tools", quantity: 12, unit: "units", reserved: 12, location: "Warehouse 2", unitCost: 1450, status: "Backordered" },
    { id: "MAT-207", name: "Fall arrest harness", category: "Safety", supplier: "SafeLand ME", quantity: 64, unit: "units", reserved: 58, location: "HSE store", unitCost: 320, status: "In stock" },
    { id: "MAT-208", name: "Drill pipe 5\" S-135", category: "Tubulars", supplier: "Basra Steel Works", quantity: 310, unit: "joints", reserved: 310, location: "Yard C / Rack 1", unitCost: 910, status: "In stock" },
  ],
};

export const drillingSeedKeys = Object.keys(drillingSeeds) as (keyof DrillingSeedData)[];
