export type EmployeeStatus = "Active" | "On leave" | "Archived";
export type AttendanceStatus = "Present" | "Late" | "Remote" | "Absent";

export interface Employee {
  id: string;
  name: string;
  role: string;
  dept: string;
  branch: string;
  manager: string;
  status: EmployeeStatus;
  attendance: AttendanceStatus;
  initials: string;
  color: string;
}

export const initialEmployees: Employee[] = [
  { id: "NX-1042", name: "Jordan Lee", role: "Senior Product Designer", dept: "Product", branch: "London HQ", manager: "Sarah Kim", status: "Active", attendance: "Present", initials: "JL", color: "indigo" },
  { id: "NX-1038", name: "Amira Hassan", role: "Engineering Manager", dept: "Engineering", branch: "Cairo", manager: "Daniel Foster", status: "Active", attendance: "Late", initials: "AH", color: "teal" },
  { id: "NX-1021", name: "Liam O'Connor", role: "Payroll Specialist", dept: "Finance", branch: "London HQ", manager: "Priya Patel", status: "Active", attendance: "Remote", initials: "LO", color: "blue" },
  { id: "NX-1016", name: "Sophie Laurent", role: "Talent Partner", dept: "People", branch: "Paris", manager: "Maya Chen", status: "On leave", attendance: "Absent", initials: "SL", color: "amber" },
  { id: "NX-1007", name: "Omar Benali", role: "QA Automation Lead", dept: "Engineering", branch: "Paris", manager: "Amira Hassan", status: "Active", attendance: "Present", initials: "OB", color: "violet" },
  { id: "NX-0998", name: "Elena Rossi", role: "Sales Director", dept: "Sales", branch: "Milan", manager: "Daniel Foster", status: "Active", attendance: "Present", initials: "ER", color: "rose" },
  { id: "NX-0974", name: "Noah Williams", role: "Support Specialist", dept: "Customer Success", branch: "London HQ", manager: "Ava Brooks", status: "Active", attendance: "Late", initials: "NW", color: "cyan" },
];
