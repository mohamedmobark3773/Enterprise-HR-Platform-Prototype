export interface AttendanceRecord {
  name: string;
  initials: string;
  checkIn: string;
  checkOut: string;
  worked: string;
  method: string;
  verification: string;
  tone: string;
}

export const initialAttendanceRecords: AttendanceRecord[] = [
  { name: "Jordan Lee", initials: "JL", checkIn: "09:01", checkOut: "17:42", worked: "8h 41m", method: "Face Recognition", verification: "Verified", tone: "green" },
  { name: "Amira Hassan", initials: "AH", checkIn: "09:32", checkOut: "18:12", worked: "8h 40m", method: "Mobile Face", verification: "Late 32m", tone: "amber" },
  { name: "Omar Benali", initials: "OB", checkIn: "08:54", checkOut: "17:31", worked: "8h 37m", method: "Biometric", verification: "Verified", tone: "green" },
  { name: "Noah Williams", initials: "NW", checkIn: "09:18", checkOut: "—", worked: "6h 12m", method: "QR", verification: "Late 18m", tone: "amber" },
  { name: "Elena Rossi", initials: "ER", checkIn: "08:47", checkOut: "17:22", worked: "8h 35m", method: "GPS", verification: "Verified", tone: "green" },
];
