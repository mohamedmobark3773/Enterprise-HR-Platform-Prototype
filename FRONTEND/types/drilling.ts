export type DrillingValue = string | number;

export type DrillingRow = Record<string, DrillingValue>;

export type WellStatus = "Planning" | "Drilling" | "Completing" | "Suspended" | "Producing" | "Plugged";
export type RigStatus = "Available" | "Operating" | "Maintenance" | "Standby" | "Retired";
export type RecordTone = "green" | "amber" | "red" | "blue" | "neutral" | "violet" | "teal";

export interface WellRecord extends DrillingRow {
  id: string;
  name: string;
  field: string;
  country: string;
  rig: string;
  type: "Exploration" | "Development" | "Appraisal" | "Workover";
  status: WellStatus;
  formation: string;
  targetDepth: number;
  currentDepth: number;
  rop: number;
  nptHours: number;
  budget: number;
  spent: number;
  risk: "Low" | "Medium" | "High";
  supervisor: string;
  startDate: string;
}

export interface ProgramRecord extends DrillingRow {
  id: string;
  name: string;
  well: string;
  phase: string;
  status: "Draft" | "Under review" | "Approved" | "Active" | "Closed";
  operator: string;
  plannedStart: string;
  plannedEnd: string;
  sections: number;
  estimate: number;
  revision: string;
  approver: string;
}

export interface DailyReportRecord extends DrillingRow {
  id: string;
  date: string;
  well: string;
  rig: string;
  crew: string;
  operation: string;
  depthFrom: number;
  depthTo: number;
  rop: number;
  nptHours: number;
  status: "Draft" | "Submitted" | "Approved" | "Rejected";
  remarks: string;
}

export interface RigRecord extends DrillingRow {
  id: string;
  name: string;
  type: "Land rig" | "Offshore rig" | "Workover rig" | "Snubbing unit";
  contractor: string;
  status: RigStatus;
  location: string;
  year: number;
  depthRating: number;
  utilization: number;
  dayRate: number;
  nextInspection: string;
  runHours: number;
}

export interface CrewRecord extends DrillingRow {
  id: string;
  name: string;
  supervisor: string;
  tour: "Day" | "Night";
  members: number;
  well: string;
  handover: string;
  certification: string;
  status: "On tour" | "Rest" | "Training" | "Standby";
  startDate: string;
}

export interface SurveyRecord extends DrillingRow {
  id: string;
  well: string;
  station: string;
  md: number;
  inclination: number;
  azimuth: number;
  tvd: number;
  dls: number;
  trend: "Building" | "Holding" | "Dropping" | "Landing";
  status: "Verified" | "Pending QC" | "Rejected";
}

export interface FluidRecord extends DrillingRow {
  id: string;
  well: string;
  unit: string;
  type: "Water-based" | "Oil-based" | "Synthetic" | "Polymer";
  density: number;
  funnelViscosity: number;
  ph: number;
  chloride: number;
  volume: number;
  status: "In spec" | "Adjusting" | "Out of spec";
  updated: string;
}

export interface CementRecord extends DrillingRow {
  id: string;
  well: string;
  stage: string;
  slurry: string;
  volume: number;
  density: number;
  waitTime: number;
  jobDate: string;
  operator: string;
  status: "Planned" | "In progress" | "Passed" | "Failed";
}

export interface BitRecord extends DrillingRow {
  id: string;
  well: string;
  bit: string;
  size: number;
  iadc: string;
  run: number;
  depthIn: number;
  depthOut: number;
  hours: number;
  status: "Running" | "Pulled" | "Junked" | "Reserved";
}

export interface NptRecord extends DrillingRow {
  id: string;
  well: string;
  date: string;
  category: "Weather" | "Equipment" | "Formation" | "Waiting" | "HSE" | "Material";
  cause: string;
  duration: number;
  costImpact: number;
  responsible: string;
  status: "Open" | "Mitigating" | "Closed";
}

export interface HseRecord extends DrillingRow {
  id: string;
  date: string;
  well: string;
  category: "Near miss" | "First aid" | "Environmental" | "Property damage" | "Lost time";
  severity: "Low" | "Medium" | "High";
  lostTime: number;
  reportedBy: string;
  action: string;
  status: "Reported" | "Investigating" | "Closed";
}

export interface CostRecord extends DrillingRow {
  id: string;
  well: string;
  afe: string;
  category: "Footage" | "Day rate" | "Casing" | "Cement" | "Mud" | "Directional" | "Support";
  approved: number;
  actual: number;
  committed: number;
  period: string;
  status: "On budget" | "Watch" | "Over budget";
}

export interface MaterialRecord extends DrillingRow {
  id: string;
  name: string;
  category: "Tubulars" | "Chemicals" | "Cement" | "Consumables" | "Safety";
  supplier: string;
  quantity: number;
  unit: string;
  reserved: number;
  location: string;
  unitCost: number;
  status: "In stock" | "Low stock" | "On order" | "Backordered";
}

export type DrillingCollectionKey =
  | "wells"
  | "programs"
  | "daily-reports"
  | "rigs"
  | "crews"
  | "surveys"
  | "fluids"
  | "cementing"
  | "bits"
  | "npt"
  | "hse"
  | "costs"
  | "materials";

export interface DrillingKpi {
  label: string;
  value: string;
  detail?: string;
}

export interface DrillingChartModel {
  title: string;
  labels: string[];
  values: number[];
}
