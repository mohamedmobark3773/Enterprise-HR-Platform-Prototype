export type FinanceScreen =
  | "dashboard"
  | "accounts"
  | "ledger"
  | "income-expenses"
  | "sales"
  | "purchases"
  | "payments"
  | "budgets"
  | "cash-flow"
  | "reports"
  | "invoice-ocr"
  | "production-states";

export interface FinanceTableConfig {
  title: string;
  subtitle: string;
  columns: string[];
  rows: string[][];
}

export const financeScreenLabels: Record<FinanceScreen, string> = {
  dashboard: "Finance Dashboard",
  accounts: "Chart of Accounts",
  ledger: "General ledger",
  "income-expenses": "Income and expenses",
  sales: "Sales and invoices",
  purchases: "Purchases",
  payments: "Payments and collections",
  budgets: "Budgets",
  "cash-flow": "Cash flow",
  reports: "Financial reports",
  "invoice-ocr": "Invoice OCR review",
  "production-states": "Finance production states",
};

export const financeTables: Partial<Record<FinanceScreen, FinanceTableConfig>> = {
  accounts: {
    title: "Accounts",
    subtitle: "Controlled account structure for consolidated reporting",
    columns: ["Account Code", "Account Name", "Type", "Parent", "Balance", "Status", "Actions"],
    rows: [
      ["1000", "Assets", "Balance Sheet", "—", "$428,640,000", "Active", "View"],
      ["1100", "Current Assets", "Asset", "1000 · Assets", "$176,420,000", "Active", "View"],
      ["1120", "Banks", "Current Assets", "1100 · Current Assets", "$123,580,000", "Reconciled", "View"],
      ["1130", "Accounts Receivable", "Current Assets", "1100 · Current Assets", "$67,810,000", "Active", "View"],
      ["2000", "Liabilities", "Balance Sheet", "—", "$186,400,000", "Active", "View"],
      ["2110", "Accounts Payable", "Liability", "2000 · Liabilities", "$54,620,000", "Active", "View"],
      ["4000", "Revenue", "Income", "—", "$284,700,000", "Active", "View"],
      ["5000", "Expenses", "Expense", "—", "$193,200,000", "Review", "View"],
      ["3000", "Equity", "Equity", "—", "$242,200,000", "Active", "View"],
    ],
  },
  ledger: {
    title: "General ledger",
    subtitle: "Posted journal entries across the current reporting period",
    columns: ["Journal", "Date", "Reference", "Description", "Debit", "Credit", "Status", "Actions"],
    rows: [
      ["JE-2026-09481", "30 Sep 2026", "INV-2026-10428", "Solar EPC revenue", "$2,480,000", "$2,480,000", "Posted", "···"],
      ["JE-2026-09480", "30 Sep 2026", "PNY-AE-8831", "Turbine spare parts", "$884,200", "$884,200", "Posted", "···"],
      ["JE-2026-09479", "30 Sep 2026", "PAY-BH-22091", "Supplier payment", "$418,900", "$418,900", "Pending", "···"],
      ["JE-2026-09478", "29 Sep 2026", "FX-REVAL-09", "Month-end FX revaluation", "$92,410", "$92,410", "Draft", "···"],
    ],
  },
  "income-expenses": {
    title: "Income and expenses",
    subtitle: "Monthly actuals with category-level variance",
    columns: ["Reference", "Description", "Counterparty", "Category", "Amount", "Date", "Status", "Actions"],
    rows: [
      ["EXP-2026-11842", "Gearbox inspection", "Siemens Energy", "Maintenance", "€184,600", "29 Sep", "Pending", "···"],
      ["EXP-2026-11839", "Marine charter", "Gulf Offshore", "Operations", "$96,420", "28 Sep", "Approved", "···"],
      ["INC-2026-08421", "Grid incentive", "EDF", "Other income", "€420,000", "28 Sep", "Paid", "···"],
    ],
  },
  sales: {
    title: "Sales and invoices",
    subtitle: "Receivables, invoice status, and customer collections",
    columns: ["Invoice", "Customer", "Order", "Total", "Due", "Balance", "Status", "Actions"],
    rows: [
      ["INV-2026-10428", "Électricité de France", "SO-FR-0381", "€2.76M", "15 Oct", "€1.24M", "Partially Paid", "···"],
      ["INV-2026-10421", "ADNOC", "SO-AE-1187", "AED 7.84M", "09 Oct", "AED 7.84M", "Sent", "···"],
      ["INV-2026-10398", "Basra Gas Company", "SO-IQ-0442", "$918.4K", "28 Sep", "$918.4K", "Overdue", "···"],
    ],
  },
  purchases: {
    title: "Purchases",
    subtitle: "Purchase orders and supplier commitments",
    columns: ["Document", "Supplier", "Source", "Description", "Total", "Delivery", "Status", "Actions"],
    rows: [
      ["PO-AE-2026-08318", "Siemens Energy", "PR-AE-0441", "Turbine spares", "€1.84M", "18 Oct", "Approved", "···"],
      ["PO-IQ-2026-04192", "Al-Raifdain", "PR-IQ-2287", "Valve assemblies", "$884.9K", "12 Oct", "Pending", "···"],
      ["PNV-GH-2026-02281", "Voita Electrical", "PO-GH-01642", "HV switchgear", "$418.2K", "04 Oct", "Partially Paid", "···"],
    ],
  },
  payments: {
    title: "Payments and collections",
    subtitle: "Cash movement, settlement status, and exceptions",
    columns: ["Reference", "Type", "Counterparty", "Source", "Bank", "Amount", "Date", "Status", "Actions"],
    rows: [
      ["PAY-2026-08144", "Outbound", "Siemens Energy", "PNV-AE-8831", "DB EUR", "€684.2K", "30 Sep", "Reconciled", "···"],
      ["COL-2026-08428", "Collection", "EDF", "INV-2026-10428", "BNP EUR", "€1.52M", "30 Sep", "Reconciled", "···"],
      ["COL-2026-08391", "Collection", "Basra Gas", "INV-2026-10398", "Citi USD", "$918.4K", "28 Sep", "Overdue", "···"],
    ],
  },
  budgets: {
    title: "Budgets",
    subtitle: "Planning envelopes and current consumption",
    columns: ["Budget", "Owner", "Type", "Currency", "Budget", "Actual", "Utilization", "Status", "Actions"],
    rows: [
      ["BUD-OPS-2026", "Operations", "Annual", "USD", "$186.4M", "$142.8M", "76.6%", "Approved", "···"],
      ["BUD-REN-2026", "Renewables", "Department", "USD", "$128.8M", "$104.9M", "81.6%", "Approved", "···"],
      ["BUD-BASRA-EXP", "Basra Expansion", "Project", "USD", "$84.2M", "$71.8M", "85.3%", "Watch", "···"],
    ],
  },
  "cash-flow": {
    title: "Cash flow",
    subtitle: "Operating and investing movement by month",
    columns: ["Date", "Movement", "Data Type", "Inflows", "Outflows", "Closing", "Status", "Actions"],
    rows: [
      ["01 Oct", "Opening balance", "Actual", "$128.4M", "—", "$128.4M", "Reconciled", "···"],
      ["02 Oct", "Collections", "Forecast", "$11.8M", "—", "$140.2M", "82% confidence", "···"],
      ["03 Oct", "Payroll & taxes", "Forecast", "—", "$36.9M", "$103.3M", "95% confidence", "···"],
    ],
  },
  reports: {
    title: "Financial reports",
    subtitle: "Scheduled, reviewed, and export-ready reporting packs",
    columns: ["Report", "Category", "Owner", "Generated", "Format", "Status", "Actions"],
    rows: [
      ["September Income Statement", "Statement", "Group Controller", "30 Sep", "PDF · XLSX", "Ready", "···"],
      ["Q3 Balance Sheet", "Statement", "Priya Nair", "30 Sep", "PDF · XLSX", "Ready", "···"],
      ["UAE VAT Working Paper", "Tax", "Sofia Martinez", "29 Sep", "XLSX", "Restricted", "···"],
    ],
  },
  "invoice-ocr": {
    title: "Invoice OCR review",
    subtitle: "Human review queue for extracted invoice fields",
    columns: ["Invoice", "Supplier", "Confidence", "Total", "Assigned to", "Status"],
    rows: [
      ["SCAN-8841", "Vector Supply", "98.4%", "$3.4M", "Omar Benali", "Approved"],
      ["SCAN-8838", "Orbit Services", "91.2%", "$1.1M", "Priya Nair", "Review"],
      ["SCAN-8832", "Fieldline", "87.6%", "$2.2M", "Maya Chen", "Review"],
      ["SCAN-8829", "Kite Systems", "99.1%", "$740K", "System", "Healthy"],
    ],
  },
  "production-states": {
    title: "Finance production states",
    subtitle: "Operational readiness across finance workflows",
    columns: ["Workflow", "Last run", "Records", "Exceptions", "Owner", "Status"],
    rows: [
      ["Invoice ingestion", "10:42", "1,284", "12", "Finance Ops", "Healthy"],
      ["Payment reconciliation", "10:31", "842", "4", "Treasury", "Review"],
      ["Month-end close", "09:55", "318", "7", "Controller", "Pending"],
      ["OCR extraction", "09:40", "2,418", "18", "AP team", "Healthy"],
    ],
  },
};

export const dashboardMetrics = [
  ["Total Revenue", "$284.7M", "+3.2% vs Aug", "green"],
  ["Total Expenses", "$193.2M", "+5.9% vs Aug", "amber"],
  ["Net Profit", "$91.5M", "32.1% margin", "green"],
  ["Cash Balance", "$128.4M", "14 accounts", "blue"],
  ["Accounts Receivable", "$67.8M", "BDS 41 days", "amber"],
  ["Accounts Payable", "$54.6M", "DPO 37 days", "blue"],
  ["Outstanding Invoices", "842", "$39.4M open", "blue"],
  ["Overdue Payments", "$8.7M", "126 invoices", "red"],
  ["Monthly Revenue", "$96.8M", "September", "green"],
  ["Monthly Expenses", "$65.9M", "September", "amber"],
] as const;

export const chartSeries = {
  revenue: [46, 65, 54, 84, 71, 91],
  cash: [34, 49, 42, 65, 53, 75],
  profit: [28, 37, 33, 52, 44, 62],
};

/* ---------- Stage 3 scenario data ---------- */

export interface StatusRow {
  label: string;
  detail: string;
  status: string;
  tone: "green" | "amber" | "blue" | "red" | "neutral" | "violet";
}

export interface DetailPanelConfig {
  kind: "approval" | "chart" | "reportLibrary" | "aging";
  title: string;
  subtitle?: string;
  openLabel?: string;
  fields?: Array<{ label: string; value: string }>;
  columns?: string[];
  tableRows?: string[][];
  statusRows?: StatusRow[];
  note?: string;
  chart?: { title: string; subtitle: string; bars: number[]; labels?: string[] };
  reportCards?: string[];
  aging?: Array<{ label: string; value: string }>;
}

export interface InsightPanelConfig {
  title: string;
  subtitle: string;
  rows: StatusRow[];
  footnote: string;
}

export interface FinanceScenario {
  tabs: string[];
  activeTab: number;
  kpis: ReadonlyArray<readonly [string, string, string, string]>;
  detail: DetailPanelConfig;
  insight: InsightPanelConfig;
  insight2?: InsightPanelConfig;
  statusIndex: number;
  searchPlaceholder: string;
  extraColumns?: number;
}

export const financeScenarios: Partial<Record<FinanceScreen, FinanceScenario>> = {
  ledger: {
    tabs: ["Journal Entries", "Account Ledger", "Transaction History", "Recurring Journals", "Posting Rules"],
    activeTab: 0,
    kpis: [
      ["Posted journals", "1,842", "September period", "blue"],
      ["Debits", "$312.48M", "Balanced total", "green"],
      ["Credits", "$312.48M", "Balanced total", "blue"],
      ["Pending review", "17", "$8.41M exposure", "amber"],
      ["Posting errors", "2", "Requires correction", "red"],
    ],
    detail: {
      kind: "approval",
      title: "Journal Entry · JE-2026-09479",
      subtitle: "Supplier payment · Dibai HQ · 30 Sep 2026",
      openLabel: "Open details",
      statusRows: [
        { label: "bank_advice_22091.pdf", detail: "Attachment", status: "Attached", tone: "blue" },
      ],
      fields: [
        { label: "Account / Description", value: "2110 · Accounts Payable PRV-BH-4482" },
        { label: "Debit", value: "$418,900.00" },
        { label: "Account / Description", value: "1120-04 · Gulf International Bank · Wire transfer" },
        { label: "Credit", value: "$418,900.00" },
      ],
      columns: ["Account / Description", "Debit", "Credit"],
      tableRows: [
        ["2110 · Accounts Payable PRV-BH-4482", "$418,900.00", "—"],
        ["1120-04 · Gulf International Bank · Wire transfer", "—", "$418,900.00"],
      ],
      note: "BALANCED · Debit $418,900.00 · Credit $418,900.00 · Difference $0.00",
    },
    insight: {
      title: "Approval & audit",
      subtitle: "Sequential posting controls",
      rows: [
        { label: "Accountant review", detail: "Priya Nair · 30 Sep 15:18", status: "Complete", tone: "green" },
        { label: "Finance Manager", detail: "Sofia Martinez · due 01 Oct", status: "Pending", tone: "amber" },
        { label: "Posting", detail: "", status: "Blocked", tone: "blue" },
      ],
      footnote: "AI may flag anomalies but cannot approve or post this journal.",
    },
    statusIndex: 6,
    searchPlaceholder: "Search journal, reference, account or description…",
  },
  "income-expenses": {
    tabs: ["Income List", "Expense List", "Expense Categories", "Approval Workflow", "Expense History"],
    activeTab: 1,
    kpis: [
      ["Income", "$96.8M", "+9.2% vs Aug", "green"],
      ["Expenses", "$65.9M", "+8.8% vs Aug", "amber"],
      ["Pending", "$2.84M", "18 submissions", "amber"],
      ["Rejected", "$118K", "6 submissions", "red"],
      ["Paid", "$58.4M", "July settled", "green"],
    ],
    detail: {
      kind: "approval",
      title: "Expense approval · EXP-2026-11842",
      subtitle: "Turbine gearbox inspection · North Sea Wind OEM",
      openLabel: "Open details",
      fields: [
        { label: "Supplier *", value: "Siemens Energy AG" },
        { label: "Category *", value: "Maintenance services" },
        { label: "Amount *", value: "€184,600" },
        { label: "Tax *", value: "DE VAT 19%" },
      ],
      statusRows: [
        { label: "Documents", detail: "Invoice_88341.pdf · scope.pdf", status: "Complete", tone: "green" },
        { label: "Approval chain", detail: "Owner → Manager → Controller", status: "Step 2 of 3", tone: "amber" },
        { label: "Historical range", detail: "2 comparable invoices · FY26-FY24M", status: "Review", tone: "amber" },
      ],
      note: "Attachments, approvals and changes are retained in Audit Logs.",
    },
    insight: {
      title: "AI expense review",
      subtitle: "Advisory and control context",
      rows: [
        { label: "Classification", detail: "Maintenance services · 96% confidence", status: "Suggestion", tone: "blue" },
        { label: "Expense anomaly", detail: "47% above 12-month median", status: "Anomaly", tone: "red" },
        { label: "Approval status", detail: "Finance Finance Manager required", status: "Pending", tone: "blue" },
      ],
      footnote: "AI suggestions never execute financial transactions.",
    },
    statusIndex: 6,
    searchPlaceholder: "Search expense, supplier, project or reference…",
  },
  sales: {
    tabs: ["Sales Dashboard", "Customers", "Sales Orders", "Invoices", "Payment Tracking", "History"],
    activeTab: 3,
    kpis: [
      ["September sales", "$96.8M", "1,284 orders", "green"],
      ["Outstanding", "$39.4M", "842 invoices", "amber"],
      ["Partially paid", "$11.8M", "96 invoices", "amber"],
      ["Overdue", "$8.7M", "126 invoices", "red"],
      ["Collection rate", "91.2%", "+2.4% vs Aug", "green"],
    ],
    detail: {
      kind: "approval",
      title: "Invoice preview · INV-2026-10428",
      subtitle: "Solar EPC Milestone 3 · Lyon Grid Modernization",
      openLabel: "Open details",
      fields: [
        { label: "Customer *", value: "Électricité de France" },
        { label: "Invoice total", value: "€2,760,000" },
        { label: "Paid", value: "€1,520,000" },
        { label: "Balance due", value: "€1,240,000" },
      ],
      statusRows: [
        { label: "Engineering milestone", detail: "€22,500,000 + VAT", status: "Verified", tone: "green" },
        { label: "Attachments", detail: "Contract · acceptance · 1ci", status: "Complete", tone: "green" },
        { label: "Payment status", detail: "Due 15 Oct 2026", status: "Partially Paid", tone: "blue" },
      ],
      note: "Attachments, approvals and changes are retained in Audit Logs.",
    },
    insight: {
      title: "Payment prediction",
      subtitle: "Advisory and control context",
      rows: [
        { label: "Expected settlement", detail: "28 October · 13 days late", status: "At risk", tone: "red" },
        { label: "Confidence", detail: "68%", status: "68%", tone: "blue" },
        { label: "Invoice actions", detail: "PDF · P... · Record payment", status: "Review", tone: "blue" },
      ],
      footnote: "AI suggestions never execute financial transactions.",
    },
    statusIndex: 6,
    searchPlaceholder: "Search invoice, customer, order or project…",
  },
  purchases: {
    tabs: ["Suppliers", "Purchase Requests", "Purchase Orders", "Purchase Invoices", "Approvals", "History"],
    activeTab: 2,
    kpis: [
      ["Open requests", "64", "18 AED requested", "blue"],
      ["Pending approval", "18", "9 high-value", "amber"],
      ["Open POs", "286", "$42.6M committed", "blue"],
      ["To match", "37", "3-way match", "amber"],
      ["Paid", "$28.6M", "402 payments", "green"],
    ],
    detail: {
      kind: "approval",
      title: "Purchase approval · PO-IQ-2026-04192",
      subtitle: "Pipeline valve assemblies · Basra Expansion",
      openLabel: "Open details",
      fields: [
        { label: "Supplier *", value: "Al-Raifdain Industrial" },
        { label: "Project *", value: "BASRA-PIPE-26" },
        { label: "Total *", value: "$884,900" },
        { label: "Tax", value: "3.3% WHT" },
      ],
      statusRows: [
        { label: "Commercial review", detail: "4.2% · below budget", status: "Complete", tone: "green" },
        { label: "Technical review", detail: "API 6D specification", status: "Complete", tone: "green" },
        { label: "Regional Controller", detail: "$300K threshold", status: "Pending", tone: "amber" },
      ],
      note: "Attachments, approvals and changes are retained in Audit Logs.",
    },
    insight: {
      title: "Supplier & payment",
      subtitle: "Advisory and control context",
      rows: [
        { label: "Supplier status", detail: "Approved Iraqi-origin vendor", status: "Verified", tone: "blue" },
        { label: "Payment terms", detail: "50% advance · 15% inspection", status: "Net 45", tone: "blue" },
        { label: "Budget availability", detail: "Project materials budget", status: "$1.08M left", tone: "blue" },
      ],
      footnote: "AI suggestions never execute financial transactions.",
    },
    statusIndex: 6,
    searchPlaceholder: "Search supplier, request, order or project…",
  },
  payments: {
    tabs: ["Payments", "Collections", "Payment Methods", "Receipts", "Outstanding", "Overdue", "History"],
    activeTab: 0,
    kpis: [
      ["Payments today", "$8.42M", "16 transactions", "blue"],
      ["Collections", "$11.86M", "120 receipts", "green"],
      ["Outstanding", "$39.4M", "842 invoices", "amber"],
      ["Overdue", "$8.7M", "126 invoices", "red"],
      ["Reconciled", "96.8%", "Bank feeds current", "green"],
    ],
    detail: {
      kind: "aging",
      title: "Receivables aging",
      subtitle: "Outstanding customer balances",
      openLabel: "Open details",
      aging: [
        { label: "Current", value: "$42.8M" },
        { label: "1-30 days", value: "$16.5M" },
        { label: "31-60 days", value: "$8.7M" },
        { label: "61+ days", value: "$5.6M" },
      ],
      statusRows: [
        { label: "Bank transfer", detail: "SWIFT, SEPA and local rails", status: "90.2%", tone: "green" },
        { label: "Direct debit", detail: "Utility service contracts", status: "7.7%", tone: "green" },
        { label: "Corporate card", detail: "Controlled expenses", status: "2.1%", tone: "green" },
      ],
    },
    insight: {
      title: "Collection priorities",
      subtitle: "Advisory and control context",
      rows: [
        { label: "Basra Gas Company", detail: "$918.4K · 3 days late", status: "High risk", tone: "red" },
        { label: "Ghana Grid Company", detail: "$1.26M · due in 5 days", status: "At risk", tone: "red" },
        { label: "EDF Renewables", detail: "€1.24M · partial payment", status: "Review", tone: "blue" },
      ],
      footnote: "AI suggestions never execute financial transactions.",
    },
    statusIndex: 7,
    searchPlaceholder: "Search payment, receipt or counterparty…",
  },
  budgets: {
    tabs: ["Budget Dashboard", "Annual Budgets", "Department Budgets", "Project Budgets", "Variance Analysis", "Approvals"],
    activeTab: 0,
    kpis: [
      ["Approved budget", "$684.2M", "FY2026", "blue"],
      ["Actual spend", "$512.8M", "+9.6%", "green"],
      ["Committed", "$86.4M", "Open POs", "amber"],
      ["Available", "$85.0M", "12.4%", "green"],
      ["Adverse variance", "$11.8M", "3 centres", "red"],
    ],
    detail: {
      kind: "chart",
      title: "Budget vs Actual",
      subtitle: "Monthly operating spend · USD millions",
      openLabel: "Open report",
      chart: { title: "", subtitle: "", bars: [56, 48, 68, 60, 80, 72], labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"] },
    },
    insight: {
      title: "Variance analysis",
      subtitle: "Current reporting period",
      rows: [
        { label: "Field Maintenance", detail: "Gearbox and marine costs", status: "-$6.8M Adverse", tone: "amber" },
        { label: "Renewable Projects", detail: "Solar procurement savings", status: "-$4.2M Favorable", tone: "green" },
        { label: "Grid Modernization", detail: "EGR FX movement", status: "+$2.6M Watch", tone: "amber" },
      ],
      footnote: "Predictions are separated from actual accounting data and require review.",
    },
    insight2: {
      title: "Budget approval · France Grid 2027",
      subtitle: "Advisory and approval context",
      rows: [
        { label: "Department owner", detail: "Claire Dubois · 29 Sep", status: "Approved", tone: "blue" },
        { label: "Regional Finance", detail: "Marc Lefevre · 30 Sep", status: "Approved", tone: "blue" },
        { label: "CFO approval", detail: "€36M threshold", status: "Pending", tone: "amber" },
      ],
      footnote: "Predictions are separated from actual accounting data and require review.",
    },
    statusIndex: 7,
    searchPlaceholder: "Search budgets records…",
  },
  "cash-flow": {
    tabs: ["Cash Flow Dashboard", "Cash Inflows", "Cash Outflows", "Bank Accounts", "Cash Accounts", "Cash Forecast", "History"],
    activeTab: 0,
    kpis: [
      ["Cash balance", "$128.4M", "Actual · reconciled", "green"],
      ["30-day inflows", "$96.8M", "Approved AR", "blue"],
      ["30-day outflows", "$84.6M", "Committed", "amber"],
      ["Forecast closing", "$140.6M", "81% confidence", "blue"],
      ["Headroom", "$42.8M", "Above floor", "green"],
    ],
    detail: {
      kind: "chart",
      title: "Historical vs Forecast",
      subtitle: "Actual through Sep · forecast separated",
      openLabel: "Open report",
      chart: { title: "", subtitle: "", bars: [42, 58, 64, 78, 66, 60], labels: ["Jun A", "Jul A", "Aug A", "Sep A", "Oct F", "Nov F"] },
    },
    insight: {
      title: "Bank accounts",
      subtitle: "Current reporting period",
      rows: [
        { label: "Citibank USD · 8821", detail: "Dubal treasury · $48.8M", status: "Reconciled", tone: "green" },
        { label: "BNP Paribas EUR · 4418", detail: "France operations · $26.4M", status: "Reconciled", tone: "green" },
        { label: "GIB USD · 2091", detail: "Bahrain settlement · $18.7M", status: "Watch", tone: "amber" },
      ],
      footnote: "AI cash flow forecast appears separately with review labels.",
    },
    insight2: {
      title: "AI cash flow forecast",
      subtitle: "Advisory and approval context",
      rows: [
        { label: "Expected balance", detail: "$140.6M · range $132.2M-$148.8M", status: "81%", tone: "blue" },
        { label: "Collections factor", detail: "$31.6M", status: "Expected", tone: "blue" },
        { label: "Supplier factor", detail: "-$0.12x · $18.6M", status: "At risk", tone: "red" },
      ],
      footnote: "Predictions are separated from actual accounting data and require review.",
    },
    statusIndex: 6,
    searchPlaceholder: "Search cash flow records…",
  },
  reports: {
    tabs: ["Report Library", "Financial Statements", "Subledger Reports", "Tax Reports", "Scheduled", "Exports"],
    activeTab: 0,
    kpis: [
      ["Saved reports", "148", "11 families", "blue"],
      ["Scheduled", "26", "28 on time", "green"],
      ["Exports", "1,284", "PDF · Excel · Print", "blue"],
      ["Restricted", "18", "RBAC protected", "amber"],
    ],
    detail: {
      kind: "reportLibrary",
      title: "Report library",
      subtitle: "Financial statements and operational reports",
      openLabel: "View all",
      reportCards: [
        "Income Statement", "Balance Sheet", "Cash Flow Statement", "Trial Balance",
        "General Ledger", "Accounts Receivable", "Accounts Payable", "Expense Report",
        "Revenue Report",
      ],
    },
    insight: {
      title: "Income Statement Preview",
      subtitle: "September 2026 · All branches",
      rows: [
        { label: "Revenue", detail: "", status: "$96.8M", tone: "green" },
        { label: "Cost of revenue", detail: "", status: "$38.4M", tone: "green" },
        { label: "Operating expenses", detail: "", status: "$27.5M", tone: "green" },
        { label: "Net profit", detail: "", status: "$30.9M", tone: "green" },
      ],
      footnote: "PDF · Excel · Print",
    },
    statusIndex: 5,
    searchPlaceholder: "Search financial reports…",
  },
};

export const accountKpis = [
  ["Total Accounts", "286", "14 added YTD", "blue"],
  ["Total Assets", "$428.6M", "Live balance", "green"],
  ["Total Liabilities", "$186.4M", "+5.8% vs Aug", "amber"],
  ["Total Revenue", "$284.7M", "+8.4% vs Aug", "green"],
  ["Total Expenses", "$193.2M", "+3.8% vs Aug", "red"],
] as const;

export interface AccountNode {
  code: string;
  name: string;
  type?: string;
  balance?: string;
  normalBalance?: "Debit" | "Credit";
  children?: AccountNode[];
}

export const accountTree: AccountNode[] = [
  {
    code: "1000", name: "Assets", type: "Balance Sheet", balance: "$428.6M", normalBalance: "Debit",
    children: [
      {
        code: "1100", name: "Current Assets", type: "Asset", balance: "$176.4M", normalBalance: "Debit",
        children: [
          { code: "1110", name: "Cash on Hand", type: "Current Assets", balance: "$18.2M", normalBalance: "Debit" },
          { code: "1120", name: "Banks", type: "Current Assets", balance: "$123,580,000", normalBalance: "Debit" },
          { code: "1130", name: "Accounts Receivable", type: "Current Assets", balance: "$67,810,000", normalBalance: "Debit" },
        ],
      },
      {
        code: "2000", name: "Liabilities", type: "Balance Sheet", balance: "$186.4M", normalBalance: "Credit",
        children: [
          { code: "2110", name: "Accounts Payable", type: "Liability", balance: "$54,620,000", normalBalance: "Credit" },
          { code: "2120", name: "Bank Loans", type: "Liability", balance: "$118,400,000", normalBalance: "Credit" },
        ],
      },
      { code: "3000", name: "Equity", type: "Equity", balance: "$242,200,000", normalBalance: "Credit" },
      { code: "4000", name: "Revenue", type: "Income", balance: "$284,700,000", normalBalance: "Credit" },
      { code: "5000", name: "Expenses", type: "Expense", balance: "$193,200,000", normalBalance: "Debit" },
    ],
  },
];

export const accountDetails = {
  subtitle: "Parent account · IFRS compliant · Q3 reported · Global ledger",
  transactions: [
    ["30 Sep 2026", "Solar EPC revenue", "$2,480,000", "—", "$428,640,000"],
    ["29 Sep 2026", "Month-end FX revaluation", "$92,410", "—", "$428,180,000"],
  ] as string[][],
};
