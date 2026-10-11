export interface LoanRecord {
  id: string;
  employee: string;
  type: "Loan" | "Advance";
  amount: number;
  reason: string;
  installments: number;
  startDate: string;
  fee: number;
  status: string;
  paid: number;
}

export const initialLoans: LoanRecord[] = [
  { id: "LN-1042", employee: "Jordan Lee", type: "Loan", amount: 4800, reason: "Home equipment", installments: 24, startDate: "2024-04-28", fee: 0, status: "Repayment", paid: 3360 },
  { id: "AD-1007", employee: "Omar Benali", type: "Advance", amount: 1200, reason: "Emergency expense", installments: 2, startDate: "2025-02-28", fee: 0, status: "Disbursed", paid: 600 },
  { id: "LN-1016", employee: "Sophie Laurent", type: "Loan", amount: 8000, reason: "Education", installments: 36, startDate: "2025-04-28", fee: 120, status: "Manager Approval", paid: 0 },
];
