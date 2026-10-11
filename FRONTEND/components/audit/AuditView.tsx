"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { PageTitle } from "@/components/ui/PageTitle";
import { SimpleTable } from "@/components/ui/SimpleTable";
import { useApp } from "@/lib/context/AppContext";

export function AuditView() {
  const { tr } = useApp();

  const tabs = ["Activity", "Entity history", "Exports", "Security events"];

  const stats = [
    ["Events today", "2,418", "blue"],
    ["Sensitive actions", "42", "amber"],
    ["Failed access", "3", "red"],
    ["Exports", "18", "violet"],
  ];

  const columns = ["User", "Action", "Module", "Entity", "Timestamp"];

  const rows = [
    ["Maya Chen", "Approve", "Payroll", "March 2025 run", "Today 10:42"],
    ["Sarah Kim", "Update", "Employee", "NX-1042", "Today 10:31"],
    ["System", "Create", "Attendance", "AT-288191", "Today 09:01"],
    ["Priya Patel", "Export", "Payroll", "Salary register", "Yesterday 17:12"],
  ];

  return (
    <>
      <PageTitle
        eyebrow="Administration"
        title="Audit Log"
        subtitle="Immutable activity trail across every HR operation"
        actions={
          <button className="primary-button">
            <Icon name="plus" /> {tr("Create new")}
          </button>
        }
      />

      <div className="tabs">
        {tabs.map((x, i) => (
          <button className={i === 0 ? "active" : ""} key={x}>
            {tr(x)}
          </button>
        ))}
      </div>

      <div className="kpi-grid compact">
        {stats.map(([x, y, z]) => (
          <div className="mini-kpi" key={x}>
            <span>
              <i className={z} />
              {tr(x)}
            </span>
            <strong>{y}</strong>
          </div>
        ))}
      </div>

      <SimpleTable title="All audit log" columns={columns} rows={rows} />
    </>
  );
}

export default AuditView;
