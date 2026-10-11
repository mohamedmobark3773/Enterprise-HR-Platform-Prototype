"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Employee } from "@/types/employee";
import { useApp } from "@/lib/context/AppContext";

export interface EmployeeProfileDrawerProps {
  employee: Employee;
  close: () => void;
}

export function EmployeeProfileDrawer({ employee, close }: EmployeeProfileDrawerProps) {
  const [tab, setTab] = useState("Overview");
  const { tr } = useApp();

  const tabs = [
    "Overview",
    "Personal",
    "Employment",
    "Organization",
    "Attendance",
    "Leave",
    "Permissions",
    "Payroll",
    "Loans",
    "Documents",
    "Performance",
    "Training",
    "Assets",
    "Activity",
  ];

  const sectionData: Record<string, [string, string][]> = {
    Personal: [
      ["Work email", `${employee.name.toLowerCase().replace(" ", ".")}@nexus.io`],
      ["Phone", "+44 20 7946 0184"],
      ["Nationality", "British"],
      ["Emergency contact", "Alex Lee · +44 7700 900124"],
    ],
    Employment: [
      ["Employment type", "Permanent"],
      ["Hire date", "14 Mar 2021"],
      ["Contract status", "Active · Renews 14 Mar 2026"],
      ["Work arrangement", "Hybrid"],
    ],
    Organization: [
      ["Department", employee.dept],
      ["Position", employee.role],
      ["Manager", employee.manager],
      ["Branch", employee.branch],
    ],
    Attendance: [
      ["Attendance rate", "96.8%"],
      ["Normal shift", "09:00–17:30"],
      ["Overtime this month", "6.5 hours"],
      ["Last check-in", "Today · 09:01 · Face Recognition"],
    ],
    Leave: [
      ["Annual balance", "18 days"],
      ["Sick balance", "8 days"],
      ["Used this year", "6 days"],
      ["Pending", "1 request"],
    ],
    Permissions: [
      ["Approved this month", "1"],
      ["Used time", "1h 30m"],
      ["Current policy", "Flexible personal permission"],
      ["Violations", "None"],
    ],
    Payroll: [
      ["Basic salary", "$6,200"],
      ["Allowances", "$650"],
      ["Latest net salary", "$6,750"],
      ["Next payroll", "28 March 2025"],
    ],
    Loans: [
      ["Active loan", "$1,440 outstanding"],
      ["Monthly repayment", "$120"],
      ["Next payment", "28 March 2025"],
      ["Financial standing", "On schedule"],
    ],
    Documents: [
      ["National ID", "Valid · 12 Jun 2028"],
      ["Contract", "Valid · 14 Mar 2026"],
      ["Insurance", "Valid · 31 Dec 2025"],
      ["Missing documents", "None"],
    ],
    Performance: [
      ["Current rating", "Exceeds expectations"],
      ["Goals completed", "7 of 9"],
      ["Last review", "15 Dec 2024"],
      ["Next review", "15 Jun 2025"],
    ],
    Training: [
      ["Completed", "Accessibility Leadership"],
      ["In progress", "People Management Essentials"],
      ["Required", "Data Privacy 2025"],
      ["Learning hours", "24 hours"],
    ],
    Assets: [
      ["Laptop", "MacBook Pro · AST-1842"],
      ["Access card", "CARD-9941"],
      ["Monitor", "LG 27-inch · AST-2208"],
      ["Asset status", "All acknowledged"],
    ],
  };

  return (
    <div className="drawer-backdrop" onMouseDown={close}>
      <div className="profile-drawer" onMouseDown={(e) => e.stopPropagation()}>
        <div className="profile-cover">
          <button className="icon-button close-drawer" onClick={close}>
            ×
          </button>
          <div className={`avatar profile-avatar avatar-${employee.color}`}>
            {employee.initials}
          </div>
        </div>
        <div className="profile-heading">
          <Badge tone="green">{employee.status}</Badge>
          <h2>{employee.name}</h2>
          <p>
            {employee.role} · {tr(employee.dept)}
          </p>
          <small>
            {employee.id} · {tr(employee.branch)}
          </small>
        </div>
        <div className="profile-tabs">
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
        {tab === "Overview" ? (
          <div className="profile-body">
            <div className="profile-metrics">
              {[
                ["Attendance rate", "96.8%"],
                ["Leave balance", "18 days"],
                ["Overtime", "6.5h"],
                ["Current salary", "$7,250"],
              ].map(([x, y]) => (
                <div key={x}>
                  <span>{tr(x)}</span>
                  <strong>{y}</strong>
                </div>
              ))}
            </div>
            <section>
              <h3>{tr("Employment details")}</h3>
              <div className="detail-grid">
                <div>
                  <span>{tr("Manager")}</span>
                  <strong>{employee.manager}</strong>
                </div>
                <div>
                  <span>{tr("Hire date")}</span>
                  <strong>14 Mar 2021</strong>
                </div>
                <div>
                  <span>{tr("Contract")}</span>
                  <strong>{tr("Permanent")}</strong>
                </div>
                <div>
                  <span>{tr("Work email")}</span>
                  <strong>
                    {employee.name.toLowerCase().replace(" ", ".")}@nexus.io
                  </strong>
                </div>
              </div>
            </section>
            <section>
              <h3>{tr("Recent activity")}</h3>
              <div className="timeline">
                {[
                  ["Today, 09:01", "Checked in via Face Recognition", "London Terminal 03"],
                  ["Mar 12, 14:24", "Leave request approved", "Approved by Sarah Kim"],
                  ["Feb 28, 17:40", "Payroll processed", "February payslip issued"],
                ].map(([d, e, u]) => (
                  <div key={d}>
                    <i />
                    <span>
                      <strong>{tr(e)}</strong>
                      <small>
                        {d} · {u}
                      </small>
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : tab === "Activity" ? (
          <div className="profile-body">
            <section>
              <h3>{tr("Complete employee timeline")}</h3>
              <div className="timeline">
                {[
                  ["Today, 09:01", "Checked in via Face Recognition", "London Terminal 03"],
                  ["Mar 12, 14:24", "Leave approved", "Sarah Kim"],
                  ["Feb 28, 17:40", "Payroll processed", "$6,750 net"],
                  ["Jan 15, 10:12", "Salary updated", "$6,000 → $6,200"],
                  ["Dec 15, 15:30", "Performance review completed", "Exceeds expectations"],
                  ["Oct 04, 11:00", "Training completed", "Accessibility Leadership"],
                ].map(([d, e, u]) => (
                  <div key={d}>
                    <i />
                    <span>
                      <strong>{tr(e)}</strong>
                      <small>
                        {d} · {u}
                      </small>
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="profile-body">
            <section>
              <div className="panel-head profile-section-head">
                <div>
                  <h3>{tr(tab)}</h3>
                  <p>{tr("Employee-specific record")} · {tr("Updated just now")}</p>
                </div>
                <button className="secondary-button">{tr("Edit")}</button>
              </div>
              <div className="detail-grid">
                {(sectionData[tab] || []).map(([label, value]) => (
                  <div key={label}>
                    <span>{tr(label)}</span>
                    <strong>{tr(value)}</strong>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeProfileDrawer;
