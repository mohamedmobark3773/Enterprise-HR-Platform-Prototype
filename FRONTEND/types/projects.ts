export type ProjectValue = string | number;

export type ProjectRow = Record<string, ProjectValue>;

export type ProjectStatus = "Active" | "At risk" | "Delayed" | "Completed" | "Archived" | "On track";
export type ProjectPriority = "Critical" | "High" | "Medium" | "Low";
export type RiskLevel = "Low" | "Medium" | "High";
export type RecordTone = "green" | "amber" | "red" | "blue" | "neutral" | "violet" | "teal";

export interface ProjectRecord extends ProjectRow {
  id: string;
  name: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  start: string;
  end: string;
  manager: string;
  risk: RiskLevel;
  budget: number;
  actual: number;
  region: string;
}

export interface PhaseRecord extends ProjectRow {
  id: string;
  name: string;
  project: string;
  owner: string;
  progress: number;
  start: string;
  end: string;
  status: ProjectStatus;
  dependency: string;
}

export interface TaskRecord extends ProjectRow {
  id: string;
  task: string;
  project: string;
  assignee: string;
  priority: ProjectPriority;
  status: "Not started" | "In progress" | "Blocked" | "In review" | "Done";
  due: string;
  progress: number;
  dependencies: number;
}

export interface SubtaskRecord extends ProjectRow {
  id: string;
  task: string;
  parent: string;
  assignee: string;
  status: "Not started" | "In progress" | "Blocked" | "In review" | "Done";
  hours: number;
  due: string;
}

export interface AssignmentRecord extends ProjectRow {
  id: string;
  employee: string;
  role: string;
  task: string;
  project: string;
  hours: number;
  start: string;
  status: "Assigned" | "Active" | "Completed" | "On hold";
}

export interface WorkloadRecord extends ProjectRow {
  id: string;
  employee: string;
  role: string;
  capacity: number;
  utilization: number;
  workload: number;
  status: "Balanced" | "Overload" | "Available";
}

export interface ProgressRecord extends ProjectRow {
  id: string;
  project: string;
  planned: number;
  actual: number;
  variance: number;
  trend: number;
  forecast: number;
  milestone: string;
}

export interface MilestoneRecord extends ProjectRow {
  id: string;
  milestone: string;
  project: string;
  owner: string;
  due: string;
  progress: number;
  status: ProjectStatus;
}

export interface CostRecord extends ProjectRow {
  id: string;
  project: string;
  category: "Labor" | "Equipment" | "Fuel" | "Material" | "Productivity" | "Other";
  planned: number;
  actual: number;
  variance: number;
  reference: string;
}

export interface BudgetRecord extends ProjectRow {
  id: string;
  project: string;
  category: "Labor" | "Equipment" | "Fuel" | "Material" | "Productivity" | "Other";
  owner: string;
  status: "On budget" | "Watch" | "Over budget";
  planned: number;
  actual: number;
  variance: number;
}

export interface RiskRecord extends ProjectRow {
  id: string;
  risk: string;
  project: string;
  probability: number;
  impact: RiskLevel;
  severity: RiskLevel;
  owner: string;
  mitigation: string;
  status: "Open" | "Mitigating" | "Closed";
}

export interface IssueRecord extends ProjectRow {
  id: string;
  issue: string;
  project: string;
  priority: ProjectPriority;
  owner: string;
  due: string;
  resolution: string;
  status: "Open" | "In progress" | "Resolved" | "Closed";
}

export interface DependencyRecord extends ProjectRow {
  id: string;
  source: string;
  target: string;
  type: "FS" | "SS" | "FF";
  project: string;
  status: "Satisfied" | "At risk" | "Blocked";
}

export interface ActivityRecord extends ProjectRow {
  id: string;
  timestamp: string;
  entity: string;
  action: string;
  user: string;
  previous: string;
  next: string;
}

export interface DocumentRecord extends ProjectRow {
  id: string;
  document: string;
  project: string;
  category: string;
  version: string;
  owner: string;
  updated: string;
  status: "Current" | "Under review" | "Superseded";
}

export interface ApprovalRecord extends ProjectRow {
  id: string;
  request: string;
  project: string;
  requester: string;
  approver: string;
  date: string;
  comments: string;
  status: "Pending" | "Approved" | "Rejected";
}

export type ProjectCollectionKey =
  | "projects"
  | "phases"
  | "tasks"
  | "subtasks"
  | "assignments"
  | "workload"
  | "progress"
  | "milestones"
  | "costs"
  | "budget"
  | "risks"
  | "issues"
  | "dependencies"
  | "activity"
  | "documents"
  | "approvals";

export interface ProjectKpi {
  label: string;
  value: string;
  detail?: string;
}

export interface ProjectChartModel {
  title: string;
  labels: string[];
  values: number[];
}
