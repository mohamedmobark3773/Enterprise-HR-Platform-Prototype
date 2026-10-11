"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { PageTitle } from "@/components/ui/PageTitle";
import { SimpleTable } from "@/components/ui/SimpleTable";
import { useApp } from "@/lib/context/AppContext";

export function OrganizationView() {
  const { tr } = useApp();

  const tabs = [
    "Org chart",
    "Departments",
    "Branches",
    "Positions",
    "Employment types",
  ];

  const stats = [
    ["Departments", "18", "blue"],
    ["Branches", "6", "green"],
    ["Positions", "142", "violet"],
    ["Open positions", "12", "amber"],
  ];

  const columns = ["Unit", "Type", "Head", "Employees", "Status"];

  const rows = [
    ["Engineering", "Department", "Amira Hassan", "384", "Active"],
    ["London HQ", "Branch", "Daniel Foster", "428", "Active"],
    ["Product", "Department", "Sarah Kim", "96", "Active"],
    ["Cairo", "Branch", "Layla Mostafa", "276", "Active"],
  ];

  return (
    <>
      <PageTitle
        eyebrow="Administration"
        title="Organization"
        subtitle="Company structure, branches, departments and positions"
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

      <SimpleTable
        title="All organization"
        columns={columns}
        rows={rows}
      />
    </>
  );
}

export default OrganizationView;
