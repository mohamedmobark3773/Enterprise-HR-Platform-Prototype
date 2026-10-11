export interface NotificationItem {
  id: number;
  title: string;
  body: string;
  category: string;
  time: string;
  read: boolean;
  record: string;
}

export const initialNotifications: NotificationItem[] = [
  { id: 1, title: "Leave request awaiting approval", body: "Sophie Laurent requested 5 days annual leave.", category: "Leave", time: "8m", read: false, record: "LV-2841" },
  { id: 2, title: "Face verification requires review", body: "Unknown identity at London Terminal 01.", category: "Attendance", time: "24m", read: false, record: "VF-8821" },
  { id: 3, title: "March payroll is ready", body: "Validation completed with 7 items to review.", category: "Payroll", time: "1h", read: false, record: "PAY-2025-03" },
  { id: 4, title: "Contract expiry", body: "Omar Benali's contract expires in 28 days.", category: "Documents", time: "2h", read: true, record: "DOC-1007-CON" },
  { id: 5, title: "Candidate evaluation submitted", body: "Marcus Reed scored 4.3 / 5.", category: "Recruitment", time: "4h", read: true, record: "CAN-284" },
  { id: 6, title: "Permission SLA approaching", body: "A late-arrival request needs manager action.", category: "Permissions", time: "5h", read: false, record: "PRM-941" },
  { id: 7, title: "Workflow escalated", body: "Loan approval moved to Finance after SLA.", category: "Workflow", time: "7h", read: true, record: "LN-1016" },
  { id: 8, title: "Prediction requires review", body: "Attendance anomaly confidence is 91%.", category: "AI", time: "8h", read: false, record: "NX-1042" },
  { id: 9, title: "Scheduled maintenance", body: "Audit export service maintenance Sunday.", category: "System", time: "1d", read: true, record: "SYS-118" },
];
