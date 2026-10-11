"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Sparkline } from "@/components/ui/Sparkline";
import { PageTitle } from "@/components/ui/PageTitle";
import { useApp } from "@/lib/context/AppContext";

export function AnalyticsView() {
  const { tr } = useApp();

  const tabs = [
    "Overview",
    "Attendance",
    "Leave",
    "Recruitment",
    "Payroll",
    "Turnover",
    "Overtime",
  ];

  const metrics = [
    ["Headcount growth", "+8.4%", "1,248 employees"],
    ["Turnover rate", "7.2%", "−1.1% YoY"],
    ["Cost per employee", "$6,840", "Monthly average"],
    ["Internal mobility", "14.8%", "+2.3% YoY"],
  ];

  const departmentData: [string, number, number][] = [
    ["Engineering", 384, 100],
    ["Sales", 246, 64],
    ["Operations", 221, 58],
    ["Customer Success", 164, 43],
    ["Finance", 128, 33],
    ["People", 105, 27],
  ];

  const branches = [
    ["London HQ", "428", "34.3%"],
    ["Cairo", "276", "22.1%"],
    ["Paris", "221", "17.7%"],
    ["Milan", "183", "14.7%"],
    ["Dubai", "140", "11.2%"],
  ];

  return (
    <>
      <PageTitle
        eyebrow="Workforce intelligence"
        title="HR Analytics"
        subtitle="Trusted workforce trends across people, time, talent and cost"
        actions={
          <button className="secondary-button" onClick={() => window.print()}>
            <Icon name="download" /> {tr("Export report")}
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

      <div className="analytics-grid">
        {metrics.map(([x, y, z]) => (
          <div className="panel metric-chart" key={x}>
            <span>{tr(x)}</span>
            <strong>{y}</strong>
            <small>{tr(z)}</small>
            <Sparkline values={[28, 24, 26, 19, 22, 14, 10]} />
          </div>
        ))}

        <div className="panel wide-chart">
          <div className="panel-head">
            <div>
              <h2>{tr("Headcount by department")}</h2>
              <p>{tr("Current active workforce")}</p>
            </div>
          </div>
          <div className="bar-list">
            {departmentData.map(([x, y, w]) => (
              <div key={x}>
                <span>{tr(x)}</span>
                <div>
                  <i style={{ width: `${w}%` }} />
                </div>
                <strong>{y}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="panel geo-card">
          <div className="panel-head">
            <div>
              <h2>{tr("Branch distribution")}</h2>
              <p>{tr("Employees by location")}</p>
            </div>
          </div>
          {branches.map(([a, b, c]) => (
            <div key={a}>
              <span>{tr(a)}</span>
              <strong>{b}</strong>
              <small>{c}</small>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AnalyticsView;
