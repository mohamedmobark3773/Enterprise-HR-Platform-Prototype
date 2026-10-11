import type { ProjectSeedKey } from "@/lib/projects/projects-service";

export type ProjectScreenKind = "dashboard" | "overview" | "list" | "analytics" | "reports" | "timeline" | "detail" | "ai";

export type ProjectScreenGroup = "core" | "planning" | "execution" | "financials" | "assurance" | "intelligence";

export interface ProjectScreenDef {
  key: string;
  label: string;
  path: string;
  kind: ProjectScreenKind;
  group: ProjectScreenGroup;
  collection?: ProjectSeedKey;
  aiCapability?: string;
  /** Detail screens are reachable from a record row, not the sidebar. */
  hidden?: boolean;
}

/**
 * Authoritative Stage 7 inventory: the 24 Project Management screen families called
 * out by the stage brief, plus the 8 AI-ready prediction capabilities.
 *
 * The 24 families are: 01 Dashboard, 02 Projects, 03 Project Details, 04 Project
 * Overview, 05 Phases, 06 Tasks, 07 Task Details, 08 Subtasks, 09 Assignments,
 * 10 Team Workload, 11 Progress Tracking, 12 Milestones, 13 Costs, 14 Budget,
 * 15 Risks, 16 Issues, 17 Dependencies, 18 Activity, 19 Documents, 20 Approvals,
 * 21 Timeline, 22 Reports, 23 Analytics, 24 Command Center.
 */
export const projectScreens: ProjectScreenDef[] = [
  { key: "dashboard", label: "Project dashboard", path: "/projects", kind: "dashboard", group: "core" },
  { key: "projects", label: "Projects", path: "/projects/list", kind: "list", group: "core", collection: "projects" },
  { key: "overview", label: "Project overview", path: "/projects/overview", kind: "overview", group: "core" },
  { key: "project-details", label: "Project details", path: "/projects/:id", kind: "detail", group: "core", collection: "projects", hidden: true },
  { key: "command-center", label: "Command center", path: "/projects/command-center", kind: "dashboard", group: "core" },
  { key: "phases", label: "Phases", path: "/projects/phases", kind: "list", group: "planning", collection: "phases" },
  { key: "tasks", label: "Tasks", path: "/projects/tasks", kind: "list", group: "planning", collection: "tasks" },
  { key: "task-details", label: "Task details", path: "/projects/tasks/:id", kind: "detail", group: "planning", collection: "tasks", hidden: true },
  { key: "subtasks", label: "Subtasks", path: "/projects/subtasks", kind: "list", group: "planning", collection: "subtasks" },
  { key: "milestones", label: "Deadlines & milestones", path: "/projects/milestones", kind: "list", group: "planning", collection: "milestones" },
  { key: "dependencies", label: "Dependencies", path: "/projects/dependencies", kind: "list", group: "planning", collection: "dependencies" },
  { key: "timeline", label: "Timeline", path: "/projects/timeline", kind: "timeline", group: "planning" },
  { key: "assignments", label: "Assignments", path: "/projects/assignments", kind: "list", group: "execution", collection: "assignments" },
  { key: "workload", label: "Team workload", path: "/projects/workload", kind: "list", group: "execution", collection: "workload" },
  { key: "progress", label: "Progress tracking", path: "/projects/progress", kind: "list", group: "execution", collection: "progress" },
  { key: "activity", label: "Activity / change log", path: "/projects/activity", kind: "list", group: "execution", collection: "activity" },
  { key: "costs", label: "Project costs", path: "/projects/costs", kind: "list", group: "financials", collection: "costs" },
  { key: "budget", label: "Project budget", path: "/projects/budget", kind: "list", group: "financials", collection: "budget" },
  { key: "risks", label: "Risks", path: "/projects/risks", kind: "list", group: "assurance", collection: "risks" },
  { key: "issues", label: "Issues", path: "/projects/issues", kind: "list", group: "assurance", collection: "issues" },
  { key: "documents", label: "Project documents", path: "/projects/documents", kind: "list", group: "assurance", collection: "documents" },
  { key: "approvals", label: "Approvals", path: "/projects/approvals", kind: "list", group: "assurance", collection: "approvals" },
  { key: "reports", label: "Reports and exports", path: "/projects/reports", kind: "reports", group: "assurance" },
  { key: "analytics", label: "Project analytics", path: "/projects/analytics", kind: "analytics", group: "assurance" },
  { key: "ai-delay", label: "Delay prediction", path: "/projects/ai/delay", kind: "ai", group: "intelligence", aiCapability: "delay" },
  { key: "ai-cost-overrun", label: "Cost overrun prediction", path: "/projects/ai/cost-overrun", kind: "ai", group: "intelligence", aiCapability: "cost-overrun" },
  { key: "ai-resource-allocation", label: "Resource allocation", path: "/projects/ai/resource-allocation", kind: "ai", group: "intelligence", aiCapability: "resource-allocation" },
  { key: "ai-workload", label: "Workload forecast", path: "/projects/ai/workload", kind: "ai", group: "intelligence", aiCapability: "workload" },
  { key: "ai-milestone", label: "Milestone risk", path: "/projects/ai/milestone", kind: "ai", group: "intelligence", aiCapability: "milestone" },
  { key: "ai-prioritization", label: "Task prioritization", path: "/projects/ai/prioritization", kind: "ai", group: "intelligence", aiCapability: "prioritization" },
  { key: "ai-risk", label: "Risk detection", path: "/projects/ai/risk", kind: "ai", group: "intelligence", aiCapability: "risk" },
  { key: "ai-health", label: "Project health scoring", path: "/projects/ai/health", kind: "ai", group: "intelligence", aiCapability: "health" },
];

/** The 24 screen families defined by the Stage 7 brief. */
export const projectFamilyCount = 24;

/** Every navigable screen, including the 8 AI capabilities. */
export const projectScreenCount = projectScreens.length;

export const projectNavGroups: ProjectScreenGroup[] = [
  "core",
  "planning",
  "execution",
  "financials",
  "assurance",
  "intelligence",
];

export function projectScreenByPath(pathname: string): ProjectScreenDef | undefined {
  return projectScreens
    .filter(
      (screen) =>
        !screen.hidden &&
        (screen.path === pathname ||
          (screen.path !== "/projects" && pathname.startsWith(`${screen.path}/`)))
    )
    .sort((a, b) => b.path.length - a.path.length)[0];
}
