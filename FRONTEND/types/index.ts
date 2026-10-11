export * from "./ai";
export * from "./employee";
export * from "./attendance";
export * from "./recruitment";
export * from "./payroll";
export * from "./loans";
export * from "./documents";
export * from "./permissions";
export * from "./notifications";
export * from "./rbac";
export * from "./localization";

export type Page =
  | "dashboard"
  | "employees"
  | "organization"
  | "attendance"
  | "face"
  | "leave"
  | "permissions"
  | "recruitment"
  | "payroll"
  | "loans"
  | "documents"
  | "workflows"
  | "analytics"
  | "notifications"
  | "ai"
  | "audit"
  | "rbac"
  | "settings"
  | "portal"
  | "manager"
  | "finance"
  | "training"
  | "performance"
  | "hr-reports"
  | "hr-state-matrix"
  | "profile"
  | "activity-logs"
  | "users"
  | "branches"
  | "inventory"
  | "fleet"
  | "drilling"
  | "projects"
  | "reports"
  | "gis"
  | "ai-center";
