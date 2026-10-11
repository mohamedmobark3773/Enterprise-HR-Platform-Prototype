import type {
  ActivityRecord,
  ApprovalRecord,
  AssignmentRecord,
  BudgetRecord,
  CostRecord,
  DependencyRecord,
  DocumentRecord,
  IssueRecord,
  MilestoneRecord,
  PhaseRecord,
  ProgressRecord,
  ProjectRecord,
  RiskRecord,
  SubtaskRecord,
  TaskRecord,
  WorkloadRecord,
} from "@/types/projects";

export interface ProjectSeedData {
  projects: ProjectRecord[];
  phases: PhaseRecord[];
  tasks: TaskRecord[];
  subtasks: SubtaskRecord[];
  assignments: AssignmentRecord[];
  workload: WorkloadRecord[];
  progress: ProgressRecord[];
  milestones: MilestoneRecord[];
  costs: CostRecord[];
  budget: BudgetRecord[];
  risks: RiskRecord[];
  issues: IssueRecord[];
  dependencies: DependencyRecord[];
  activity: ActivityRecord[];
  documents: DocumentRecord[];
  approvals: ApprovalRecord[];
}

export const projectSeeds: ProjectSeedData = {
  projects: [
    { id: "PM-2026-104", name: "Hassi Messaoud Expansion", status: "Active", priority: "High", progress: 68, start: "01 Oct 2026", end: "28 Oct 2026", manager: "N. Benali", risk: "Medium", budget: 11.9, actual: 8.1, region: "Ouargla" },
    { id: "PM-2026-105", name: "In Salah Expansion", status: "At risk", priority: "Critical", progress: 42, start: "02 Oct 2026", end: "18 Oct 2026", manager: "A. Meziane", risk: "High", budget: 11.75, actual: 8.83, region: "In Salah" },
    { id: "PM-2026-106", name: "Illizi Expansion", status: "Delayed", priority: "High", progress: 74, start: "03 Oct 2026", end: "04 Dec 2026", manager: "M. Touati", risk: "High", budget: 11.2, actual: 9.1, region: "Illizi" },
    { id: "PM-2026-107", name: "Adrar Expansion", status: "Active", priority: "Medium", progress: 56, start: "04 Oct 2026", end: "12 Nov 2026", manager: "R. Saidi", risk: "Medium", budget: 11.02, actual: 9.56, region: "Adrar" },
    { id: "PM-2026-108", name: "Hassi R'Mel Expansion", status: "Completed", priority: "Low", progress: 100, start: "05 Oct 2026", end: "21 Nov 2026", manager: "S. Boudiaf", risk: "Low", budget: 10.5, actual: 9.8, region: "Laghouat" },
    { id: "PM-2026-109", name: "Ouargla Expansion", status: "On track", priority: "Medium", progress: 91, start: "06 Oct 2026", end: "12 Nov 2026", manager: "Y. Khelifi", risk: "Low", budget: 10.29, actual: 9.56, region: "Ouargla" },
  ],
  phases: [
    { id: "PH-01", name: "Mobilization", project: "Hassi Messaoud Expansion", owner: "A. Meziane", progress: 42, start: "01 Oct 2026", end: "05 Oct 2026", status: "Active", dependency: "—" },
    { id: "PH-02", name: "Casing", project: "Hassi Messaoud Expansion", owner: "M. Touati", progress: 56, start: "05 Oct 2026", end: "19 Oct 2026", status: "Active", dependency: "Mobilization" },
    { id: "PH-03", name: "Pilot drilling", project: "Hassi Messaoud Expansion", owner: "N. Benali", progress: 68, start: "19 Oct 2026", end: "02 Nov 2026", status: "Active", dependency: "Casing" },
    { id: "PH-04", name: "Reaming", project: "Hassi Messaoud Expansion", owner: "R. Saidi", progress: 74, start: "02 Nov 2026", end: "16 Nov 2026", status: "Active", dependency: "Pilot drilling" },
    { id: "PH-05", name: "Well testing", project: "Hassi Messaoud Expansion", owner: "S. Boudiaf", progress: 91, start: "16 Nov 2026", end: "30 Nov 2026", status: "Active", dependency: "Reaming" },
    { id: "PH-06", name: "Handover", project: "Hassi Messaoud Expansion", owner: "Y. Khelifi", progress: 100, start: "30 Nov 2026", end: "14 Dec 2026", status: "On track", dependency: "Well testing" },
  ],
  tasks: [
    { id: "PM-104 / T-204", task: "Inspect casing", project: "Hassi Messaoud Expansion", assignee: "N. Benali", priority: "High", status: "In progress", due: "05 Oct 2026", progress: 68, dependencies: 1 },
    { id: "PM-104 / T-205", task: "Install wellhead", project: "Hassi Messaoud Expansion", assignee: "R. Saidi", priority: "High", status: "Not started", due: "06 Oct 2026", progress: 0, dependencies: 2 },
    { id: "PM-104 / T-206", task: "Pressure test", project: "Hassi Messaoud Expansion", assignee: "A. Meziane", priority: "Medium", status: "In progress", due: "07 Oct 2026", progress: 45, dependencies: 1 },
    { id: "PM-104 / T-207", task: "Calibrate sensors", project: "Hassi Messaoud Expansion", assignee: "M. Touati", priority: "Medium", status: "In progress", due: "08 Oct 2026", progress: 56, dependencies: 0 },
    { id: "PM-104 / T-208", task: "Validate handover", project: "Hassi Messaoud Expansion", assignee: "S. Boudiaf", priority: "Low", status: "Blocked", due: "28 Oct 2026", progress: 12, dependencies: 3 },
    { id: "PM-104 / T-209", task: "Approve survey", project: "Hassi Messaoud Expansion", assignee: "Y. Khelifi", priority: "Low", status: "Done", due: "04 Dec 2026", progress: 100, dependencies: 0 },
  ],
  subtasks: [
    { id: "ST-01", task: "Inspect casing", parent: "PM-104 / T-204", assignee: "N. Benali", status: "Done", hours: 8, due: "05 Oct 2026" },
    { id: "ST-02", task: "Pressure test", parent: "PM-104 / T-206", assignee: "A. Meziane", status: "In progress", hours: 10, due: "06 Oct 2026" },
    { id: "ST-03", task: "Calibrate sensors", parent: "PM-104 / T-207", assignee: "M. Touati", status: "In progress", hours: 12, due: "07 Oct 2026" },
    { id: "ST-04", task: "Install wellhead", parent: "PM-104 / T-205", assignee: "R. Saidi", status: "Not started", hours: 9, due: "08 Oct 2026" },
    { id: "ST-05", task: "Validate handover", parent: "PM-104 / T-208", assignee: "S. Boudiaf", status: "Blocked", hours: 13, due: "28 Oct 2026" },
    { id: "ST-06", task: "Approve survey", parent: "PM-104 / T-209", assignee: "Y. Khelifi", status: "Done", hours: 11, due: "04 Dec 2026" },
  ],
  assignments: [
    { id: "AS-01", employee: "A. Meziane", role: "Drilling engineer", task: "Inspect casing", project: "Hassi Messaoud Expansion", hours: 8, start: "01 Oct 2026", status: "Active" },
    { id: "AS-02", employee: "M. Touati", role: "Drilling engineer", task: "Calibrate sensors", project: "Hassi Messaoud Expansion", hours: 12, start: "02 Oct 2026", status: "Active" },
    { id: "AS-03", employee: "N. Benali", role: "Project manager", task: "Pressure test", project: "Hassi Messaoud Expansion", hours: 10, start: "03 Oct 2026", status: "Assigned" },
    { id: "AS-04", employee: "R. Saidi", role: "Completion engineer", task: "Install wellhead", project: "Hassi Messaoud Expansion", hours: 9, start: "04 Oct 2026", status: "Assigned" },
    { id: "AS-05", employee: "S. Boudiaf", role: "HSE officer", task: "Validate handover", project: "Hassi Messaoud Expansion", hours: 13, start: "05 Oct 2026", status: "On hold" },
    { id: "AS-06", employee: "Y. Khelifi", role: "Survey lead", task: "Approve survey", project: "Hassi Messaoud Expansion", hours: 11, start: "06 Oct 2026", status: "Completed" },
  ],
  workload: [
    { id: "WL-01", employee: "A. Meziane", role: "Drilling engineer", capacity: 40, utilization: 42, workload: 17, status: "Available" },
    { id: "WL-02", employee: "M. Touati", role: "Drilling engineer", capacity: 40, utilization: 56, workload: 22, status: "Balanced" },
    { id: "WL-03", employee: "N. Benali", role: "Project manager", capacity: 40, utilization: 68, workload: 27, status: "Balanced" },
    { id: "WL-04", employee: "R. Saidi", role: "Completion engineer", capacity: 40, utilization: 74, workload: 30, status: "Balanced" },
    { id: "WL-05", employee: "S. Boudiaf", role: "HSE officer", capacity: 40, utilization: 91, workload: 36, status: "Overload" },
    { id: "WL-06", employee: "Y. Khelifi", role: "Survey lead", capacity: 40, utilization: 100, workload: 40, status: "Overload" },
  ],
  progress: [
    { id: "PG-01", project: "Hassi Messaoud Expansion", planned: 72, actual: 68, variance: -4, trend: 3.1, forecast: 94, milestone: "Wellhead acceptance" },
    { id: "PG-02", project: "In Salah Expansion", planned: 60, actual: 46, variance: -14, trend: 2.4, forecast: 78, milestone: "Casing" },
    { id: "PG-03", project: "Illizi Expansion", planned: 78, actual: 74, variance: -4, trend: 3.9, forecast: 88, milestone: "Pilot drilling" },
    { id: "PG-04", project: "Adrar Expansion", planned: 60, actual: 56, variance: -4, trend: 2.7, forecast: 82, milestone: "Reaming" },
    { id: "PG-05", project: "Hassi R'Mel Expansion", planned: 100, actual: 100, variance: 0, trend: 3.3, forecast: 100, milestone: "Handover" },
    { id: "PG-06", project: "Ouargla Expansion", planned: 94, actual: 91, variance: -3, trend: 3.6, forecast: 100, milestone: "Well testing" },
  ],
  milestones: [
    { id: "MS-01", milestone: "Wellhead acceptance", project: "Hassi Messaoud Expansion", owner: "A. Meziane", due: "05 Oct 2026", progress: 42, status: "Active" },
    { id: "MS-02", milestone: "Casing complete", project: "Hassi Messaoud Expansion", owner: "M. Touati", due: "19 Oct 2026", progress: 56, status: "Active" },
    { id: "MS-03", milestone: "Pilot section complete", project: "Hassi Messaoud Expansion", owner: "N. Benali", due: "02 Nov 2026", progress: 68, status: "At risk" },
    { id: "MS-04", milestone: "Ream to TD", project: "Hassi Messaoud Expansion", owner: "R. Saidi", due: "16 Nov 2026", progress: 74, status: "On track" },
    { id: "MS-05", milestone: "Well test complete", project: "Hassi Messaoud Expansion", owner: "S. Boudiaf", due: "30 Nov 2026", progress: 91, status: "On track" },
    { id: "MS-06", milestone: "Handover", project: "Hassi Messaoud Expansion", owner: "Y. Khelifi", due: "14 Dec 2026", progress: 100, status: "Completed" },
  ],
  costs: [
    { id: "CS-01", project: "Hassi Messaoud Expansion", category: "Labor", planned: 2.4, actual: 2.0, variance: -0.4, reference: "D65 / EQ-31" },
    { id: "CS-02", project: "Hassi Messaoud Expansion", category: "Equipment", planned: 2.8, actual: 3.2, variance: 0.4, reference: "D65 / EQ-32" },
    { id: "CS-03", project: "Hassi Messaoud Expansion", category: "Fuel", planned: 1.2, actual: 1.6, variance: 0.4, reference: "D65 / EQ-33" },
    { id: "CS-04", project: "Hassi Messaoud Expansion", category: "Material", planned: 2.0, actual: 1.6, variance: -0.4, reference: "D65 / EQ-34" },
    { id: "CS-05", project: "Hassi Messaoud Expansion", category: "Productivity", planned: 2.0, actual: 1.6, variance: -0.4, reference: "D65 / EQ-35" },
    { id: "CS-06", project: "Hassi Messaoud Expansion", category: "Other", planned: 3.2, actual: 2.8, variance: -0.4, reference: "D65 / EQ-36" },
  ],
  budget: [
    { id: "BG-01", project: "Hassi Messaoud Expansion", category: "Labor", owner: "N. Benali", status: "On budget", planned: 8.4, actual: 8.1, variance: -0.3 },
    { id: "BG-02", project: "Hassi Messaoud Expansion", category: "Equipment", owner: "R. Saidi", status: "Watch", planned: 9.1, actual: 9.56, variance: 0.46 },
    { id: "BG-03", project: "Hassi Messaoud Expansion", category: "Fuel", owner: "M. Touati", status: "Over budget", planned: 8.83, actual: 9.8, variance: 0.97 },
    { id: "BG-04", project: "Hassi Messaoud Expansion", category: "Material", owner: "A. Meziane", status: "On budget", planned: 11.02, actual: 8.4, variance: -2.62 },
    { id: "BG-05", project: "Hassi Messaoud Expansion", category: "Productivity", owner: "S. Boudiaf", status: "Watch", planned: 11.2, actual: 11.75, variance: 0.55 },
    { id: "BG-06", project: "Hassi Messaoud Expansion", category: "Other", owner: "Y. Khelifi", status: "On budget", planned: 11.9, actual: 11.2, variance: -0.7 },
  ],
  risks: [
    { id: "RK-01", risk: "Late casing delivery", project: "Hassi Messaoud Expansion", probability: 24, impact: "Medium", severity: "Medium", owner: "N. Benali", mitigation: "Expedite supplier and hold safety stock", status: "Mitigating" },
    { id: "RK-02", risk: "Hydraulic pressure drop", project: "Hassi Messaoud Expansion", probability: 31, impact: "High", severity: "High", owner: "M. Touati", mitigation: "Inspect D65 and calibrate pumps", status: "Open" },
    { id: "RK-03", risk: "Pump vibration", project: "Hassi Messaoud Expansion", probability: 38, impact: "Medium", severity: "Medium", owner: "R. Saidi", mitigation: "Schedule bearing inspection", status: "Mitigating" },
    { id: "RK-04", risk: "Sensor drift", project: "Hassi Messaoud Expansion", probability: 45, impact: "Medium", severity: "High", owner: "A. Meziane", mitigation: "Recalibrate sensors weekly", status: "Open" },
    { id: "RK-05", risk: "Access road blocked", project: "Hassi Messaoud Expansion", probability: 52, impact: "High", severity: "High", owner: "S. Boudiaf", mitigation: "Coordinate with local authorities", status: "Mitigating" },
    { id: "RK-06", risk: "Permit delay", project: "Hassi Messaoud Expansion", probability: 59, impact: "High", severity: "High", owner: "Y. Khelifi", mitigation: "Escalate permit renewal", status: "Open" },
  ],
  issues: [
    { id: "IS-01", issue: "Late casing delivery", project: "Hassi Messaoud Expansion", priority: "Critical", owner: "N. Benali", due: "05 Oct 2026", resolution: "Air-freight casing from alternate supplier", status: "In progress" },
    { id: "IS-02", issue: "Hydraulic pressure drop", project: "Hassi Messaoud Expansion", priority: "High", owner: "M. Touati", due: "06 Oct 2026", resolution: "Replace hydraulic seal on D65", status: "Open" },
    { id: "IS-03", issue: "Pump vibration", project: "Hassi Messaoud Expansion", priority: "High", owner: "R. Saidi", due: "07 Oct 2026", resolution: "Balance pump and replace drive belt", status: "In progress" },
    { id: "IS-04", issue: "Sensor drift", project: "Hassi Messaoud Expansion", priority: "Medium", owner: "A. Meziane", due: "08 Oct 2026", resolution: "Recalibrate and revalidate sensors", status: "Open" },
    { id: "IS-05", issue: "Access road blocked", project: "Hassi Messaoud Expansion", priority: "High", owner: "S. Boudiaf", due: "28 Oct 2026", resolution: "Reroute via central corridor", status: "In progress" },
    { id: "IS-06", issue: "Permit closed", project: "Hassi Messaoud Expansion", priority: "Low", owner: "Y. Khelifi", due: "04 Dec 2026", resolution: "Reapply for access permit", status: "Resolved" },
  ],
  dependencies: [
    { id: "DP-01", source: "Inspect casing", target: "Pressure test", type: "FS", project: "Hassi Messaoud Expansion", status: "Satisfied" },
    { id: "DP-02", source: "Pressure test", target: "Install wellhead", type: "FS", project: "Hassi Messaoud Expansion", status: "At risk" },
    { id: "DP-03", source: "Calibrate sensors", target: "Pressure test", type: "SS", project: "Hassi Messaoud Expansion", status: "Satisfied" },
    { id: "DP-04", source: "Install wellhead", target: "Validate handover", type: "FS", project: "Hassi Messaoud Expansion", status: "Blocked" },
    { id: "DP-05", source: "Validate handover", target: "Approve survey", type: "FS", project: "Hassi Messaoud Expansion", status: "At risk" },
    { id: "DP-06", source: "Inspect casing", target: "Calibrate sensors", type: "FF", project: "Hassi Messaoud Expansion", status: "Satisfied" },
  ],
  activity: [
    { id: "AL-01", timestamp: "05 Oct 2026 · 14:42", entity: "PM-104 / T-204", action: "Updated due date", user: "N. Benali", previous: "03 Oct 2026", next: "05 Oct 2026" },
    { id: "AL-02", timestamp: "05 Oct 2026 · 13:42", entity: "PM-104 / T-205", action: "Changed status", user: "R. Saidi", previous: "Not started", next: "In progress" },
    { id: "AL-03", timestamp: "05 Oct 2026 · 12:42", entity: "PM-104 / T-206", action: "Updated progress", user: "A. Meziane", previous: "30%", next: "45%" },
    { id: "AL-04", timestamp: "05 Oct 2026 · 11:42", entity: "PM-104 / T-207", action: "Assigned owner", user: "M. Touati", previous: "Unassigned", next: "M. Touati" },
    { id: "AL-05", timestamp: "05 Oct 2026 · 10:42", entity: "PM-104 / T-208", action: "Flagged blocked", user: "S. Boudiaf", previous: "In progress", next: "Blocked" },
    { id: "AL-06", timestamp: "05 Oct 2026 · 9:42", entity: "PM-104 / T-209", action: "Closed task", user: "Y. Khelifi", previous: "In review", next: "Done" },
  ],
  documents: [
    { id: "DOC-01", document: "Well plan HM-104.pdf", project: "Hassi Messaoud Expansion", category: "Planning", version: "v2.3.1", owner: "N. Benali", updated: "05 Oct 2026", status: "Current" },
    { id: "DOC-02", document: "Inspection D65.pdf", project: "Hassi Messaoud Expansion", category: "Inspection", version: "v1.4.0", owner: "M. Touati", updated: "05 Oct 2026", status: "Current" },
    { id: "DOC-03", document: "Daily log 05-10.xlsx", project: "Hassi Messaoud Expansion", category: "Operations", version: "v1.0.2", owner: "R. Saidi", updated: "05 Oct 2026", status: "Under review" },
    { id: "DOC-04", document: "Survey coordinates.csv", project: "Hassi Messaoud Expansion", category: "Survey", version: "v3.0.0", owner: "Y. Khelifi", updated: "05 Oct 2026", status: "Current" },
    { id: "DOC-05", document: "Handover report.pdf", project: "Hassi Messaoud Expansion", category: "Handover", version: "v1.1.0", owner: "S. Boudiaf", updated: "05 Oct 2026", status: "Under review" },
    { id: "DOC-06", document: "Safety permit.pdf", project: "Hassi Messaoud Expansion", category: "HSE", version: "v2.0.0", owner: "A. Meziane", updated: "05 Oct 2026", status: "Superseded" },
  ],
  approvals: [
    { id: "AP-01", request: "Budget revision HM-104", project: "Hassi Messaoud Expansion", requester: "N. Benali", approver: "Finance", date: "01 Oct 2026", comments: "Casing cost increase", status: "Pending" },
    { id: "AP-02", request: "Schedule change request", project: "Hassi Messaoud Expansion", requester: "M. Touati", approver: "Program office", date: "02 Oct 2026", comments: "Shift reaming window", status: "Approved" },
    { id: "AP-03", request: "HSE permit renewal", project: "Hassi Messaoud Expansion", requester: "S. Boudiaf", approver: "HSE", date: "03 Oct 2026", comments: "Access road restriction", status: "Pending" },
    { id: "AP-04", request: "Vendor award inspection", project: "Hassi Messaoud Expansion", requester: "R. Saidi", approver: "Procurement", date: "04 Oct 2026", comments: "Two compliant bids", status: "Approved" },
    { id: "AP-05", request: "Overtime authorization", project: "Hassi Messaoud Expansion", requester: "A. Meziane", approver: "HR", date: "05 Oct 2026", comments: "Night tour coverage", status: "Rejected" },
    { id: "AP-06", request: "Document version release", project: "Hassi Messaoud Expansion", requester: "Y. Khelifi", approver: "Program office", date: "06 Oct 2026", comments: "Well plan v2.3.1", status: "Approved" },
  ],
};
