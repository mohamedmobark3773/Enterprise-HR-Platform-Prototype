import type { FinanceScreen } from "@/lib/finance/finance-data";

export const financeRoutes: Array<[FinanceScreen, string]> = [
  ["dashboard", "/finance"],
  ["accounts", "/finance/accounts"],
  ["ledger", "/finance/ledger"],
  ["income-expenses", "/finance/income-expenses"],
  ["sales", "/finance/sales"],
  ["purchases", "/finance/purchases"],
  ["payments", "/finance/payments"],
  ["budgets", "/finance/budgets"],
  ["cash-flow", "/finance/cash-flow"],
  ["reports", "/finance/reports"],
  ["invoice-ocr", "/finance/invoice-ocr"],
  ["production-states", "/finance/production-states"],
];
