"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { SimpleTable } from "@/components/ui/SimpleTable";
import { initialPredictions } from "@/lib/ai/ai-contracts";
import { useApp } from "@/lib/context/AppContext";

export function PayrollView() {
  const [approved, setApproved] = useState(false);
  const [tab, setTab] = useState("Dashboard");
  const payrollPrediction = initialPredictions.find(
    (p) => p.sourceModule === "Payroll"
  )!;
  const { tr } = useApp();

  const tabs = [
    "Dashboard",
    "Payroll runs",
    "Payroll details",
    "Salary structures",
    "Salary components",
    "Overtime",
    "Bonuses",
    "Deductions",
    "Payslips",
    "Salary history",
    "Reports",
  ];

  return (
    <>
      <PageTitle
        eyebrow="March 2025"
        title="Payroll"
        subtitle="Review, validate and process payroll with complete auditability"
        actions={
          <>
            <button className="secondary-button" onClick={() => window.print()}>
              <Icon name="download" /> {tr("Export register")}
            </button>
            <button
              className="primary-button"
              onClick={() => setApproved(true)}
              disabled={approved}
            >
              <Icon name="check" />
              {approved ? tr("Payroll approved") : tr("Approve payroll")}
            </button>
          </>
        }
      />

      <div className="tabs">
        {tabs.map((x) => (
          <button
            className={tab === x ? "active" : ""}
            onClick={() => setTab(x)}
            key={x}
          >
            {tr(x)}
          </button>
        ))}
      </div>

      <div className="payroll-banner">
        <div>
          <Badge tone={approved ? "green" : "amber"}>
            {approved ? "Approved" : "Review required"}
          </Badge>
          <h2>{tr("March payroll run")}</h2>
          <p>
            1,248 {tr("Employees")} · {tr("Scheduled payment 28 March")}
          </p>
        </div>
        <div className="run-progress">
          <span>
            <i style={{ width: approved ? "100%" : "76%" }} />
          </span>
          <strong>{approved ? "5 of 5" : "4 of 5"} steps complete</strong>
        </div>
        <strong>
          $4,821,640
          <small>{tr("Net payroll")}</small>
        </strong>
      </div>

      <div className="kpi-grid compact">
        {[
          ["Gross pay", "$6.14M", "blue"],
          ["Deductions", "$1.32M", "red"],
          ["Net payroll", "$4.82M", "green"],
          ["Overtime", "$186K", "amber"],
          ["Anomalies", "7", "violet"],
        ].map(([x, y, z]) => (
          <div className="mini-kpi" key={x}>
            <span>
              <i className={z} />
              {tr(x)}
            </span>
            <strong>{y}</strong>
          </div>
        ))}
      </div>

      <div className="two-col">
        <SimpleTable
          title="Payroll validation"
          columns={["Check", "Records", "Status"]}
          rows={[
            ["Salary changes", "24", "Passed"],
            ["Attendance sync", "1,248", "Passed"],
            ["Loan deductions", "38", "Passed"],
            ["Bank details", "3", "Review required"],
            [
              payrollPrediction.prediction,
              `${Math.round(payrollPrediction.confidence * 100)}%`,
              payrollPrediction.status,
            ],
          ]}
        />

        <div className="panel wallet-card">
          <div className="panel-head">
            <div>
              <h2>{tr("Employee financial wallet")}</h2>
              <p>Jordan Lee · March</p>
            </div>
            <Badge tone="green">Calculated</Badge>
          </div>
          {[
            ["Basic salary", "$6,200"],
            ["Allowances", "+$650"],
            ["Overtime", "+$540"],
            ["Bonus", "+$300"],
            ["Tax & insurance", "−$820"],
            ["Loan repayment", "−$120"],
          ].map(([x, y]) => (
            <div key={x}>
              <span>{tr(x)}</span>
              <strong>{y}</strong>
            </div>
          ))}
          <div className="wallet-total">
            <span>{tr("Net salary")}</span>
            <strong>$6,750</strong>
          </div>
        </div>
      </div>
    </>
  );
}

export default PayrollView;
