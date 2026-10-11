"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { PageTitle } from "@/components/ui/PageTitle";
import { SimpleTable } from "@/components/ui/SimpleTable";
import { SettingsPanel } from "@/components/ui/SettingsPanel";
import { useApp } from "@/lib/context/AppContext";

export function SettingsView() {
  const { tr } = useApp();

  const tabs = [
    "Company",
    "People",
    "Attendance",
    "Leave",
    "Payroll",
    "Recruitment",
    "Security",
    "Face recognition",
    "AI",
  ];

  const stats = [
    ["Active users", "1,184", "green"],
    ["Roles", "8", "blue"],
    ["Integrations", "12", "violet"],
    ["Policy changes", "3", "amber"],
  ];

  const columns = ["Configuration", "Category", "Updated by", "Last updated", "Status"];

  const rows = [
    ["Default work week", "Attendance", "Maya Chen", "Today", "Active"],
    ["Annual leave policy", "Leave", "Sarah Kim", "12 Mar", "Active"],
    ["Face verification threshold", "Biometrics", "System Admin", "10 Mar", "Restricted"],
    ["Payroll tax rules", "Payroll", "Priya Patel", "01 Mar", "Active"],
  ];

  return (
    <>
      <PageTitle
        eyebrow="Administration"
        title="Settings"
        subtitle="Configure company, security, policies and platform behavior"
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

      <SimpleTable title="All settings" columns={columns} rows={rows} />
      <SettingsPanel />
    </>
  );
}

export default SettingsView;
