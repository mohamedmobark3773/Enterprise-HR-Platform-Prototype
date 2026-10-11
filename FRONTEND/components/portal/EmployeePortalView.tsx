"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { useApp } from "@/lib/context/AppContext";

export function EmployeePortalView() {
  const { navigate, tr } = useApp();

  const portalCards: [string, string, string, string][] = [
    ["My attendance", "96.8%", "clock", "attendance"],
    ["Leave balance", "18 days", "calendar", "leave"],
    ["Next payslip", "28 Mar", "wallet", "payroll"],
    ["My documents", "1 expiring", "file", "documents"],
    ["My requests", "2 pending", "flow", "workflows"],
    ["My loans", "$1,440 left", "coins", "loans"],
  ];

  return (
    <>
      <PageTitle
        eyebrow="Employee self service"
        title="My workspace"
        subtitle="Welcome back, Jordan. Your workday at a glance."
        actions={
          <button className="primary-button">
            <Icon name="clock" /> {tr("Check out")}
          </button>
        }
      />

      <div className="portal-hero">
        <div>
          <Badge tone="green">{tr("Checked in at 09:01")}</Badge>
          <h2>8h 41m</h2>
          <p>{tr("Today's worked time · Product flexible shift")}</p>
        </div>
        <div className="portal-clock">
          <strong>17:42</strong>
          <span>Friday, 14 March</span>
        </div>
      </div>

      <div className="portal-grid">
        {portalCards.map(([x, y, z, page]) => (
          <button
            className="panel portal-card"
            key={x}
            onClick={() => navigate(page as any)}
          >
            <span className="kpi-icon indigo">
              <Icon name={z} />
            </span>
            <span>{tr(x)}</span>
            <strong>{tr(y)}</strong>
            <Icon name="arrow" />
          </button>
        ))}
      </div>
    </>
  );
}

export default EmployeePortalView;
