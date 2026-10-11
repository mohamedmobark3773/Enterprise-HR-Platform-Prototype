export type PlatformRecordScreen = "profile" | "activity-logs";

export const platformRecordData: Record<PlatformRecordScreen, { title: string; subtitle: string; metric: string; detail: string; columns: string[]; rows: string[][] }> = {
  profile: {
    title: "Profile",
    subtitle: "Personal workspace identity and account preferences",
    metric: "98%",
    detail: "Profile completeness · Last updated today",
    columns: ["Field", "Value", "Status"],
    rows: [
      ["Name", "Amira Khalid", "Verified"],
      ["Role", "Operations Director", "Active"],
      ["Work email", "amira.khalid@nexus.energy", "Verified"],
      ["Workspace", "Global Operations", "Active"],
    ],
  },
  "activity-logs": {
    title: "Activity Logs",
    subtitle: "Recent actions taken across your workspace",
    metric: "2,418",
    detail: "Events today · 42 sensitive actions",
    columns: ["Action", "Module", "Timestamp", "Status"],
    rows: [
      ["Approved payroll run", "Payroll", "Today 10:42", "Approved"],
      ["Updated employee record", "Employees", "Today 10:31", "Completed"],
      ["Exported salary register", "Reports", "Yesterday 17:12", "Completed"],
      ["Changed access policy", "RBAC", "Yesterday 16:48", "Review"],
    ],
  },
};
