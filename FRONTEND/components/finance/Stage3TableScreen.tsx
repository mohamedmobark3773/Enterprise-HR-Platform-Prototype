"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Tabs } from "@/components/ui/Tabs";
import { useApp } from "@/lib/context/AppContext";
import {
  financeTables,
  financeScenarios,
  type FinanceScreen,
} from "@/lib/finance/finance-data";

const barLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];

function ScenarioBars({ bars, labels }: { bars: number[]; labels?: string[] }) {
  const { tr } = useApp();
  return (
    <div className="finance-bars" aria-label="chart">
      {bars.map((value, i) => {
        const label = labels?.[i] ?? barLabels[i];
        const isForecast = /F$/.test(label);
        return (
          <div className={`finance-bar-group ${isForecast ? "forecast" : ""}`} key={label}>
            <div className="finance-bar" style={{ height: `${value}%` }} />
            <span>{tr(label)}</span>
          </div>
        );
      })}
    </div>
  );
}

function statusTone(status: string): string {
  if (/Posted|Reconciled|Approved|Paid|Complete|Ready|Verified|Active|Success/.test(status)) return "green";
  if (/Pending|Draft|Watch|Partial|Step|Review|Restricted/.test(status)) return "amber";
  if (/Overdue|Error|Anomaly|Rejected|At risk|High risk/.test(status)) return "red";
  if (/Sent|Suggestion|Blocked|Expected|confidence$/i.test(status)) return "blue";
  return "neutral";
}

export function Stage3TableScreen({ screen }: { screen: FinanceScreen }) {
  const { tr } = useApp();
  const scenario = financeScenarios[screen]!;
  const table = financeTables[screen]!;
  const [activeTab, setActiveTab] = useState(scenario.activeTab);
  const [query, setQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const addLabels: Record<string, string> = {
    ledger: "New journal entry",
    "income-expenses": "Add expense",
    sales: "Create invoice",
    purchases: "Create purchase order",
    payments: "Record payment",
    budgets: "Create budget",
    "cash-flow": "Export forecast",
    reports: "Create report",
  };
  const addLabel = addLabels[screen] || "Create record";
  const rows = table.rows
    .filter((row) => `${row.join(" ")}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (sortAsc ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0])));

  const scenarios = scenario;

  return (
    <>
      <div className="finance-metric-grid">
        {scenarios.kpis.map(([label, value, detail, tone]) => (
          <article className="finance-metric" key={label}>
            <div className="finance-metric-label"><span>{tr(label)}</span><i className={tone} /></div>
            <strong>{value}</strong>
            <small>{tr(detail)}</small>
          </article>
        ))}
      </div>

      <Tabs tabs={scenarios.tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === scenarios.activeTab ? (
        <>
          <div className={`accounts-workarea ${scenarios.insight2 ? "stage3-cols" : ""}`}>
            {/* detail panel */}
            <section className="panel accounts-details-panel">
              <div className="panel-head accounts-details-head">
                <div>
                  <h2>{tr(scenarios.detail.title)}</h2>
                  <p>{scenarios.detail.subtitle ? tr(scenarios.detail.subtitle) : ""}</p>
                </div>
                {scenarios.detail.openLabel && <button className="text-button" type="button">{tr(scenarios.detail.openLabel)}</button>}
              </div>
              {scenarios.detail.kind === "approval" && (
                <>
                  {scenarios.detail.fields && !scenarios.detail.tableRows && (
                    <div className="account-detail-fields">
                      {scenarios.detail.fields.map((f, i) => (
                        <div key={i}><span>{tr(f.label)}</span><strong>{tr(f.value)}</strong></div>
                      ))}
                    </div>
                  )}
                  {scenarios.detail.tableRows && scenarios.detail.columns && (
                    <div className="detail-mini-table-wrap">
                      <table className="detail-mini-table">
                        <thead>
                          <tr>{scenarios.detail.columns.map((c) => <th key={c}>{tr(c)}</th>)}</tr>
                        </thead>
                        <tbody>
                          {scenarios.detail.tableRows.map((row, i) => (
                            <tr key={i}>{row.map((cell, j) => <td key={j}>{tr(cell)}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {scenarios.detail.statusRows && (
                    <div className="acct-status-rows">
                      {scenarios.detail.statusRows.map((r, i) => (
                        <div className="finance-list-row" key={i}>
                          <span><strong>{tr(r.label)}</strong><small>{r.detail ? tr(r.detail) : ""}</small></span>
                          <Badge tone={r.tone}>{tr(r.status)}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                  {scenarios.detail.note && <p className="acct-panel-note">{tr(scenarios.detail.note)}</p>}
                </>
              )}
              {scenarios.detail.kind === "chart" && scenarios.detail.chart && (
                <ScenarioBars bars={scenarios.detail.chart.bars} labels={scenarios.detail.chart.labels} />
              )}
              {scenarios.detail.kind === "aging" && (
                <>
                  {scenarios.detail.aging && (
                    <div className="account-detail-fields">
                      {scenarios.detail.aging.map((a, i) => (
                        <div key={i}><span>{tr(a.label)}</span><strong>{a.value}</strong></div>
                      ))}
                    </div>
                  )}
                  {scenarios.detail.statusRows && (
                    <div className="acct-status-rows">
                      {scenarios.detail.statusRows.map((r, i) => (
                        <div className="finance-list-row" key={i}>
                          <span><strong>{tr(r.label)}</strong><small>{tr(r.detail)}</small></span>
                          <Badge tone={r.tone}>{tr(r.status)}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              {scenarios.detail.kind === "reportLibrary" && scenarios.detail.reportCards && (
                <div className="report-grid">
                  {scenarios.detail.reportCards.map((card, i) => (
                    <div className="report-card" key={i}>
                      <div className="report-card-top"><Icon name="file" size={14} /><Badge tone="blue">Ready</Badge></div>
                      <strong>{tr(card)}</strong>
                      <small>{tr("Date · Branch · Department")}</small>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* insight panel */}
            <section className="panel">
              <div className="panel-head">
                <div><h2>{tr(scenarios.insight.title)}</h2><p>{tr(scenarios.insight.subtitle)}</p></div>
              </div>
              {scenarios.insight.rows.map((r, i) => (
                <div className="finance-list-row" key={i}>
                  <span><strong>{tr(r.label)}</strong><small>{r.detail ? tr(r.detail) : ""}</small></span>
                  <Badge tone={r.tone}>{tr(r.status)}</Badge>
                </div>
              ))}
              <p className="acct-panel-note">{tr(scenarios.insight.footnote)}</p>
            </section>

            {scenarios.insight2 && (
              <section className="panel">
                <div className="panel-head">
                  <div><h2>{tr(scenarios.insight2.title)}</h2><p>{tr(scenarios.insight2.subtitle)}</p></div>
                </div>
                {scenarios.insight2.rows.map((r, i) => (
                  <div className="finance-list-row" key={i}>
                    <span><strong>{tr(r.label)}</strong><small>{r.detail ? tr(r.detail) : ""}</small></span>
                    <Badge tone={r.tone}>{tr(r.status)}</Badge>
                  </div>
                ))}
                <p className="acct-panel-note">{tr(scenarios.insight2.footnote)}</p>
              </section>
            )}
          </div>

          <section className="panel finance-table-panel accounts-table">
            <div className="finance-toolbar">
              <div className="search-field">
                <Icon name="search" size={14} />
                <input placeholder={tr(scenarios.searchPlaceholder)} value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <button className="secondary-button" type="button"><Icon name="settings" /> {tr("Filters")}</button>
              <button className="secondary-button" type="button" onClick={() => setSortAsc((v) => !v)}><Icon name="arrow" /> {tr("Sort")}</button>
              <button className="secondary-button" type="button"><Icon name="dots" /> {tr("Columns")}</button>
              <button className="secondary-button" type="button"><Icon name="download" /> {tr("Export")}</button>
              <button className="primary-button" type="button"><Icon name="plus" /> {tr(addLabel)}</button>
            </div>
              <div className="simple-table finance-table accounts-cols" style={{ ["--finance-cols" as string]: String(table.columns.length + 1) } as React.CSSProperties}>
              <div className="tr th">
                <span><input type="checkbox" aria-label="select all" /></span>
                {table.columns.map((c) => <span key={c}>{tr(c)}</span>)}
              </div>
              {rows.map((row) => (
                <div className="tr" key={row[0]}>
                  <span><input type="checkbox" aria-label={`select ${row[0]}`} /></span>
                  {row.map((cell, i) => (
                    <span data-label={tr(table.columns[i])} key={i}>
                      {i === scenarios.statusIndex ? <Badge tone={statusTone(cell)}>{tr(cell)}</Badge> : tr(cell)}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className="pagination"><span>{tr(`1–${rows.length} of 1,284 records · Bulk actions`)}</span><div><button>‹</button><button className="active">1</button><button>2</button><button>3</button><button>›</button></div></div>
          </section>
        </>
      ) : (
        <section className="panel accounts-empty-tab">
          <div className="panel-head">
            <div><h2>{tr(scenarios.tabs[activeTab])}</h2><p>{tr("Accounts workspace supports the same structure inside this tab.")}</p></div>
          </div>
        </section>
      )}
    </>
  );
}

export default Stage3TableScreen;
