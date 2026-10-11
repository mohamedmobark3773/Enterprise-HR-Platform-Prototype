"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Page } from "@/types";
import { useApp } from "@/lib/context/AppContext";

export interface GlobalResultsProps {
  query: string;
  close: () => void;
}

export function GlobalResults({ query, close }: GlobalResultsProps) {
  const { navigate, tr } = useApp();

  const allItems: [string, string, string, Page][] = [
    ["Employees", "Jordan Lee", "NX-1042 · Senior Product Designer", "employees"],
    ["Candidates", "Marcus Reed", "CAN-284 · QA Engineer", "recruitment"],
    ["Documents", "Omar Benali contract", "DOC-1007-CON · Expires soon", "documents"],
    ["Attendance", "Jordan Lee · 14 Mar", "09:01 · Face Recognition", "attendance"],
    ["Leave", "Sophie Laurent annual leave", "LV-2841 · Pending", "leave"],
    ["Payroll", "March payroll run", "PAY-2025-03 · In review", "payroll"],
    ["Loans", "Jordan Lee employee loan", "LN-1042 · Repayment", "loans"],
    ["Reports", "Monthly workforce report", "RPT-2025-03 · Ready", "analytics"],
    ["AI Predictions", "Attendance anomaly", "NX-1042 · 91% confidence", "ai"],
  ];
  const all = allItems.filter(
    (x) =>
      (x[1] + x[2] + x[0]).toLowerCase().includes(query.toLowerCase()) ||
      query.length < 3
  );

  const groups = [...new Set(all.map((x) => x[0]))];

  return (
    <div className="search-results">
      <div className="search-results-head">
        <span>
          {tr("Search results for")} <strong>“{query}”</strong>
        </span>
        <button onClick={close}>{tr("Close")}</button>
      </div>
      {all.length ? (
        groups.map((group) => (
          <div className="result-group" key={group}>
            <strong>{tr(group)}</strong>
            {all
              .filter((x) => x[0] === group)
              .map(([, a, b, p]) => (
                <button
                  key={a}
                  onClick={() => {
                    navigate(p);
                    close();
                  }}
                >
                  <span className="result-icon">
                    <Icon name="search" />
                  </span>
                  <span>
                    <strong>{a}</strong>
                    <small>{b}</small>
                  </span>
                  <Icon name="arrow" />
                </button>
              ))}
          </div>
        ))
      ) : (
        <div className="empty-state">
          <p>
            {tr(
              "No results across employees, candidates, documents, attendance, leave, payroll, loans, reports or AI predictions."
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default GlobalResults;
