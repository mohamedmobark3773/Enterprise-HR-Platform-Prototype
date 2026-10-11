export interface PermissionPolicy {
  id: string;
  type: string;
  maxDuration: number;
  allowedTime: string;
  frequency: string;
  approval: boolean;
  approver: string;
  departments: string;
  employees: string;
  attachment: boolean;
  reason: boolean;
  autoRule: string;
  escalation: string;
  sla: number;
}

export const initialPermissionPolicies: PermissionPolicy[] = [
  { id: "POL-01", type: "Late Arrival", maxDuration: 60, allowedTime: "08:30–10:00", frequency: "2 per month", approval: true, approver: "Direct Manager", departments: "All", employees: "All", attachment: false, reason: true, autoRule: "≤ 15 min with no prior request", escalation: "HR Specialist", sla: 4 },
  { id: "POL-02", type: "Early Departure", maxDuration: 120, allowedTime: "15:00–17:30", frequency: "2 per month", approval: true, approver: "Direct Manager", departments: "All", employees: "All", attachment: false, reason: true, autoRule: "None", escalation: "HR Specialist", sla: 4 },
  { id: "POL-03", type: "Business Mission", maxDuration: 480, allowedTime: "Working hours", frequency: "Unlimited", approval: true, approver: "Department Head", departments: "Sales, Operations", employees: "All", attachment: true, reason: true, autoRule: "None", escalation: "HR Admin", sla: 8 },
];
