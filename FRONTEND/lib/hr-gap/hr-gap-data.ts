export type HRGapScreen = "training" | "performance" | "reports" | "state-matrix";

export const hrGapLabels: Record<HRGapScreen, string> = {
  training: "Training",
  performance: "Performance management",
  reports: "HR reports",
  "state-matrix": "HR state matrix",
};

export const hrGapTables: Record<HRGapScreen, { subtitle: string; columns: string[]; rows: string[][] }> = {
  training: {
    subtitle: "Learning completion, certification status, and upcoming sessions",
    columns: ["Course", "Audience", "Completion", "Due", "Owner", "Status"],
    rows: [
      ["Information security", "All employees", "94%", "30 Sep", "People Ops", "Healthy"],
      ["Manager essentials", "Managers", "78%", "15 Oct", "L&D", "Review"],
      ["Safety certification", "Field teams", "88%", "22 Oct", "Operations", "Healthy"],
      ["Performance conversations", "People leaders", "61%", "31 Oct", "HRBP", "Pending"],
    ],
  },
  performance: {
    subtitle: "Review cycles, goals, calibration, and manager follow-up",
    columns: ["Employee", "Cycle", "Score", "Manager", "Updated", "Status"],
    rows: [
      ["Jordan Lee", "2025 annual", "4.3 / 5", "Maya Chen", "30 Sep", "Approved"],
      ["Sophie Laurent", "2025 annual", "3.9 / 5", "Priya Nair", "29 Sep", "Review"],
      ["Omar Benali", "2025 mid-year", "4.1 / 5", "Maya Chen", "28 Sep", "Pending"],
      ["Marcus Reed", "2025 annual", "4.6 / 5", "Sarah Kim", "26 Sep", "Approved"],
    ],
  },
  reports: {
    subtitle: "Workforce reporting packs ready for review and export",
    columns: ["Report", "Scope", "Period", "Owner", "Updated", "Status"],
    rows: [
      ["Headcount overview", "All branches", "September", "People Analytics", "30 Sep", "Approved"],
      ["Attendance exceptions", "Operations", "September", "HR Operations", "29 Sep", "Review"],
      ["Leave coverage", "Customer Support", "October forecast", "HRBP", "28 Sep", "Pending"],
      ["Talent pipeline", "Recruitment", "Q3", "Talent Acquisition", "27 Sep", "Healthy"],
    ],
  },
  "state-matrix": {
    subtitle: "Cross-module state coverage for operational readiness",
    columns: ["Module", "Healthy", "Review", "Blocked", "Owner", "Status"],
    rows: [
      ["Attendance", "2,418", "42", "3", "HR Operations", "Healthy"],
      ["Payroll", "7", "12", "1", "Payroll", "Review"],
      ["Recruitment", "48", "6", "0", "Talent", "Healthy"],
      ["Documents", "318", "18", "4", "People Ops", "Review"],
    ],
  },
};
