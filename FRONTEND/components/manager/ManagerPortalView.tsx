"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { PageTitle } from "@/components/ui/PageTitle";
import { SimpleTable } from "@/components/ui/SimpleTable";
import { useApp } from "@/lib/context/AppContext";

export function ManagerPortalView() {
  const { navigate, tr } = useApp();

  return (
    <>
      <PageTitle
        eyebrow="Manager workspace"
        title="My team"
        subtitle="Product Design · 14 direct and indirect reports"
        actions={
          <button
            className="secondary-button"
            onClick={() => navigate("employees")}
          >
            {tr("View team directory")}
          </button>
        }
      />

      <div className="kpi-grid compact">
        {[
          ["Team size", "14", "blue"],
          ["Present", "11", "green"],
          ["Late", "1", "amber"],
          ["On leave", "2", "violet"],
          ["Pending", "4", "red"],
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
          title="Pending team approvals"
          columns={["Employee", "Request", "Date", "Status"]}
          rows={[
            ["Jordan Lee", "Annual leave", "18–22 Mar", "Pending"],
            ["Nina Park", "Attendance correction", "12 Mar", "Pending"],
            ["Theo James", "Overtime", "8.5 hours", "Pending"],
            ["Eva Martin", "Permission", "Today 15:00", "Pending"],
          ]}
        />

        <div className="panel alerts-panel">
          <div className="panel-head">
            <div>
              <h2>{tr("Team insights")}</h2>
              <p>{tr("Patterns requiring manager review")}</p>
            </div>
          </div>
          <div className="alert-list">
            {[
              ["amber", "Tuesday late arrivals increased 14%", "Attendance · This month"],
              ["blue", "2 overlapping leave requests", "Coverage · Next week"],
              ["violet", "Overtime approaching team threshold", "Workload · 42 of 50 hours"],
            ].map(([a, b, c]) => (
              <button key={b}>
                <span className={`alert-icon ${a}`}>!</span>
                <span>
                  <strong>{tr(b)}</strong>
                  <small>{tr(c)}</small>
                </span>
                <Icon name="chevron" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerPortalView;
