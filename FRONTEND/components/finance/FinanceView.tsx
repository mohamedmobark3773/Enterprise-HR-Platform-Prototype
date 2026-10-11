"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { PageTitle } from "@/components/ui/PageTitle";
import { Tabs } from "@/components/ui/Tabs";
import { AccountHierarchy } from "@/components/finance/AccountHierarchy";
import { AccountDetails } from "@/components/finance/AccountDetails";
import { Stage3TableScreen } from "@/components/finance/Stage3TableScreen";
import { InvoiceOcrView } from "@/components/finance/InvoiceOcrView";
import { ProductionStatesView } from "@/components/finance/ProductionStatesView";
import { useApp } from "@/lib/context/AppContext";
import { financeRoutes } from "@/lib/finance/finance-nav";
import {
  accountDetails,
  accountKpis,
  accountTree,
  chartSeries,
  dashboardMetrics,
  financeScreenLabels,
  financeTables,
  type AccountNode,
  type FinanceScreen,
} from "@/lib/finance/finance-data";

const chartLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];

function FinanceChart({ title, subtitle, values, tone = "primary" }: { title: string; subtitle: string; values: number[]; tone?: string }) {
  return (
    <section className="panel finance-chart">
      <div className="panel-head">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <button className="text-button">View report <Icon name="arrow" size={13} /></button>
      </div>
      <div className={`finance-bars ${tone}`} aria-label={title}>
        {values.map((value, index) => (
          <div className="finance-bar-group" key={chartLabels[index]}>
            <div className="finance-bar" style={{ height: `${value}%` }} />
            <span>{chartLabels[index]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinanceDashboard() {
  return (
    <>
      <div className="finance-filter-row">
        <span>Refreshed 01 Oct · 08:42 GST · Actual accounting data</span>
        <div>
          <button>01–30 Sep 2025</button>
          <button>All 27 branches</button>
          <button>All departments</button>
          <button>USD consolidated</button>
        </div>
      </div>
      <div className="finance-metric-grid">
        {dashboardMetrics.map(([label, value, detail, tone]) => (
          <article className="finance-metric" key={label}>
            <div className="finance-metric-label"><span>{label}</span><i className={tone} /></div>
            <strong>{value}</strong>
            <small>{detail}</small>
          </article>
        ))}
      </div>
      <div className="finance-chart-grid">
        <FinanceChart title="Revenue vs Expenses" subtitle="Monthly actuals" values={chartSeries.revenue} />
        <FinanceChart title="Cash Flow" subtitle="Operating and investing" values={chartSeries.cash} tone="teal" />
        <FinanceChart title="Profit Trend" subtitle="32.1% margin" values={chartSeries.profit} />
      </div>
      <div className="finance-bottom-grid">
        <section className="panel finance-list-panel">
          <div className="panel-head"><div><h2>Expense Breakdown</h2><p>$193.2M · September</p></div><button className="text-button">Open report</button></div>
          {["Materials & inventory", "Field operations", "Payroll & contractors"].map((item, index) => (
            <div className="finance-list-row" key={item}><span><strong>{item}</strong><small>{index === 0 ? "Supplies, cable and training" : index === 1 ? "Maintenance and logistics" : "People cost and services"}</small></span><b>{["$68.4M", "$51.7M", "$42.8M"][index]}</b><Badge tone={index === 1 ? "green" : "green"}>{index === 1 ? "+26.8%" : index === 0 ? "+35.4%" : "+22.2%"}</Badge></div>
          ))}
        </section>
        <section className="panel finance-list-panel">
          <div className="panel-head"><div><h2>Receivables vs Payables</h2><p>Aging buckets</p></div><button className="text-button">Open aging</button></div>
          {["Current", "31–60 days", "61+ days"].map((item, index) => (
            <div className="finance-list-row" key={item}><span><strong>{item}</strong><small>{["AR $42.6M · AP $36.9M", "AR $16.5M · AP $12.1M", "AR $8.7M · AP $5.6M"][index]}</small></span><Badge tone={index === 2 ? "red" : index === 1 ? "amber" : "green"}>{index === 2 ? "Action" : index === 1 ? "Monitor" : "Healthy"}</Badge></div>
          ))}
        </section>
        <section className="panel finance-list-panel">
          <div className="panel-head"><div><h2>AI Financial Insights</h2><p>Advisory only · human review</p></div><button className="text-button">Open assistant</button></div>
          {["Approved ledgers", "Expense acceleration", "Due-date exposure"].map((item, index) => (
            <div className="finance-list-row" key={item}><span><strong>{item}</strong><small>{["Inventory spend rose 18.7%.", "32 invoices · $4.8M at risk.", "Highest expenses: 5%."][index]}</small></span><Badge tone={index === 0 ? "green" : index === 1 ? "amber" : "red"}>{index === 0 ? "Approved" : index === 1 ? "Review" : "At risk"}</Badge></div>
          ))}
        </section>
      </div>
    </>
  );
}

function FinanceTable({ screen }: { screen: FinanceScreen }) {
  const table = financeTables[screen];
  if (!table) return null;
  return (
    <section className="panel finance-table-panel">
      <div className="panel-head"><div><h2>{table.title}</h2><p>{table.subtitle}</p></div><button className="secondary-button"><Icon name="download" /> Export</button></div>
      <div className="finance-toolbar"><div className="search-field"><Icon name="search" size={14} /><input placeholder="Search finance records" /></div><select aria-label="Status filter"><option>All statuses</option><option>Healthy</option><option>Review</option><option>Pending</option></select><button className="secondary-button"><Icon name="sliders-horizontal" /> Filters</button></div>
      <div className="simple-table finance-table">
        <div className="tr th">{table.columns.map((column) => <span key={column}>{column}</span>)}</div>
        {table.rows.map((row) => <div className="tr" key={row[0]}>{row.map((value, index) => <span data-label={table.columns[index]} key={`${row[0]}-${value}`}>{index === row.length - 1 ? <Badge tone={value === "Review" || value === "Pending" ? "amber" : value === "Action" ? "red" : "green"}>{value}</Badge> : value}</span>)}</div>)}
      </div>
      <div className="pagination"><span>Showing {table.rows.length} of 842 records</span><div><button>‹</button><button className="active">1</button><button>2</button><button>›</button></div></div>
    </section>
  );
}

function findAccount(code: string): AccountNode | undefined {
  const walk = (nodes: AccountNode[]): AccountNode | undefined => {
    for (const n of nodes) {
      if (n.code === code) return n;
      if (n.children) {
        const found = walk(n.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  return walk(accountTree);
}

function FinanceAccounts() {
  const { tr } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedCode, setSelectedCode] = useState("1000");
  const table = financeTables.accounts!;
  const selectedNode = findAccount(selectedCode) || accountTree[0] || (("" as unknown) as AccountNode);
  const rows = table.rows
    .filter((row) => {
      const haystack = `${row[0]} ${row[1]} ${row[2]} ${row[3]}`.toLowerCase();
      if (query && !haystack.includes(query.toLowerCase())) return false;
      if (statusFilter !== "All statuses" && row[5] !== statusFilter) return false;
      return true;
    })
    .sort((a, b) => (sortAsc ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0])));

  const tabs = ["Account List", "Account Categories", "Account Hierarchy", "Statements", "Import History"];

  return (
    <>
      <div className="finance-metric-grid">
        {accountKpis.map(([label, value, detail, tone]) => (
          <article className="finance-metric" key={label}>
            <div className="finance-metric-label"><span>{tr(label)}</span><i className={tone} /></div>
            <strong>{value}</strong>
            <small>{tr(detail)}</small>
          </article>
        ))}
      </div>

      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === 0 && (
        <>
          <div className="accounts-workarea">
            <AccountHierarchy selected={selectedCode} onSelect={(node) => setSelectedCode(node.code)} />
            <AccountDetails node={selectedNode} />
          </div>

          <section className="panel finance-table-panel accounts-table">
            <div className="finance-toolbar">
              <div className="search-field">
                <Icon name="search" size={14} />
                <input
                  placeholder={tr("Search account code, name, type or category…")}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <select aria-label="Status filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>All statuses</option>
                <option>Active</option>
                <option>Reconciled</option>
                <option>Review</option>
              </select>
              <button className="secondary-button" type="button"><Icon name="settings" /> {tr("Filters")}</button>
              <button className="secondary-button" type="button" onClick={() => setSortAsc((v) => !v)}><Icon name="arrow" /> {tr("Sort")}</button>
              <button className="secondary-button" type="button"><Icon name="dots" /> {tr("Columns")}</button>
              <button className="secondary-button" type="button"><Icon name="download" /> {tr("Export PDF / Excel")}</button>
              <button className="primary-button" type="button"><Icon name="plus" /> {tr("Add Account")}</button>
            </div>
            <div className="simple-table finance-table accounts-cols">
              <div className="tr th">{table.columns.map((column) => <span key={column}>{tr(column)}</span>)}</div>
              {rows.map((row) => (
                <div className="tr" key={row[0]}>
                  {row.slice(0, 6).map((value, index) => (
                    <span data-label={tr(table.columns[index])} key={`${row[0]}-${index}`}>
                      {index === 5 ? (
                        <Badge tone={value === "Review" ? "amber" : value === "Reconciled" ? "blue" : "green"}>{value}</Badge>
                      ) : (
                        tr(value)
                      )}
                    </span>
                  ))}
                  <span data-label={tr("Actions")}>
                    <button className="text-button" type="button">{tr("View")}</button>{" "}
                    <button className="text-button" type="button">{tr("Edit")}</button>
                  </span>
                </div>
              ))}
            </div>
            <div className="pagination"><span>Showing {rows.length} of 286 accounts</span><div><button>‹</button><button className="active">1</button><button>2</button><button>3</button><button>›</button></div></div>
          </section>
        </>
      )}

      {activeTab !== 0 && (
        <section className="panel accounts-empty-tab">
          <div className="panel-head">
            <div><h2>{tr(tabs[activeTab])}</h2><p>{tr("Accounts workspace supports the same structure inside this tab.")}</p></div>
          </div>
        </section>
      )}
    </>
  );
}

const screenMeta: Record<FinanceScreen, { eyebrow: string; subtitle: string; action: string; actionIcon: string }> = {
  dashboard: { eyebrow: "CORE / FINANCE / FINANCE DASHBOARD", subtitle: "Consolidated position · September 2025 close · USD", action: "Export dashboard", actionIcon: "download" },
  accounts: { eyebrow: "CORE / FINANCE / CHART OF ACCOUNTS", subtitle: "IFRS-aligned account hierarchy · 286 active accounts · Global group ledger", action: "Add Account", actionIcon: "plus" },
  ledger: { eyebrow: "CORE / FINANCE / GENERAL LEDGER", subtitle: "Journal entries and account movements · September 2026 · USD consolidated", action: "New journal entry", actionIcon: "plus" },
  "income-expenses": { eyebrow: "CORE / FINANCE / INCOME & EXPENSES", subtitle: "Operating income, spend controls and approvals · September 2026", action: "Add expense", actionIcon: "plus" },
  sales: { eyebrow: "CORE / FINANCE / SALES & INVOICES", subtitle: "Orders, invoices and payment tracking · 14 currencies", action: "Create invoice", actionIcon: "plus" },
  purchases: { eyebrow: "CORE / FINANCE / PURCHASES", subtitle: "Supplier sourcing, purchase approvals and invoice matching", action: "Create purchase order", actionIcon: "plus" },
  payments: { eyebrow: "CORE / FINANCE / PAYMENTS & COLLECTIONS", subtitle: "Cash settlement, receipts and customer collections", action: "Record payment", actionIcon: "plus" },
  budgets: { eyebrow: "CORE / FINANCE / BUDGETS", subtitle: "Annual, department and project planning · FY2026 baseline", action: "Create budget", actionIcon: "plus" },
  "cash-flow": { eyebrow: "CORE / FINANCE / CASH FLOW", subtitle: "Actual liquidity, safe positions and approved forecast assumptions", action: "Export forecast", actionIcon: "download" },
  reports: { eyebrow: "CORE / FINANCE / FINANCIAL REPORTS", subtitle: "P&L-finance, management and industry reporting", action: "Create report", actionIcon: "plus" },
  "invoice-ocr": { eyebrow: "CORE / FINANCE / INVOICE OCR REVIEW", subtitle: "Human review required before purchase order creation", action: "Upload invoice", actionIcon: "plus" },
  "production-states": { eyebrow: "CORE / FINANCE / FINANCE PRODUCTION STATE MATRIX", subtitle: "Shared behaviour across every Finance workflow", action: "View permissions", actionIcon: "shield" },
};

function renderScreen(screen: FinanceScreen) {
  switch (screen) {
    case "dashboard":
      return <FinanceDashboard />;
    case "accounts":
      return <FinanceAccounts />;
    case "ledger":
    case "income-expenses":
    case "sales":
    case "purchases":
    case "payments":
    case "budgets":
    case "cash-flow":
    case "reports":
      return <Stage3TableScreen screen={screen} />;
    case "invoice-ocr":
      return <InvoiceOcrView />;
    case "production-states":
      return <ProductionStatesView />;
    default:
      return <FinanceTable screen={screen} />;
  }
}

export function FinanceView({ screen = "dashboard" }: { screen?: FinanceScreen }) {
  const { tr } = useApp();
  const title = financeScreenLabels[screen];
  return (
    <>
      <PageTitle
        eyebrow={screenMeta[screen].eyebrow}
        title={title}
        subtitle={screenMeta[screen].subtitle}
        actions={
          screen === "accounts" ? (
            <>
              <button className="secondary-button" type="button"><Icon name="download" /> {tr("Export")}</button>
              <button className="secondary-button" type="button"><Icon name="plus" /> {tr("Import")}</button>
              <button className="primary-button" type="button"><Icon name="plus" /> {tr("Add Account")}</button>
            </>
          ) : (
            <button className="primary-button"><Icon name={screenMeta[screen].actionIcon} /> {tr(screenMeta[screen].action)}</button>
          )
        }
      />
      {screen !== "dashboard" && (
        <nav className="finance-nav" aria-label="Finance navigation">
          {financeRoutes.map(([key, path]) => <Link className={key === screen ? "active" : ""} href={path} key={key}>{financeScreenLabels[key]}</Link>)}
        </nav>
      )}
      {renderScreen(screen)}
    </>
  );
}

export default FinanceView;
