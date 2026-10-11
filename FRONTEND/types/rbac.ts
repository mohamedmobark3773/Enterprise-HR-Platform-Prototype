export const roleNames = [
  "Super Admin",
  "HR Admin",
  "HR Specialist",
  "Payroll Officer",
  "Recruiter",
  "Manager",
  "Employee",
  "Auditor",
] as const;

export type RoleName = (typeof roleNames)[number];

export const permissionActions = [
  "View",
  "Create",
  "Edit",
  "Delete",
  "Approve",
  "Reject",
  "Export",
  "Print",
] as const;

export type PermissionAction = (typeof permissionActions)[number];

export const rbacModules = [
  "Employees",
  "Attendance",
  "Leave",
  "Permissions",
  "Recruitment",
  "Payroll",
  "Loans",
  "Documents",
  "Workflows",
  "Analytics",
  "AI Models",
  "Audit Log",
] as const;

export type RBACModule = (typeof rbacModules)[number];
