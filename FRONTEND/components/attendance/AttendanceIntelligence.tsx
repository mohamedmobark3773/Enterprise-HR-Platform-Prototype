"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { SimpleTable } from "@/components/ui/SimpleTable";
import { initialPredictions } from "@/lib/ai/ai-contracts";
import { useApp } from "@/lib/context/AppContext";

export function AttendanceIntelligence() {
  const prediction = initialPredictions[0];
  const [view, setView] = useState("Attendance trends");
  const { tr } = useApp();

  const comparisons = [
    ["Engineering", "94.2%", "8.4%", "312h"],
    ["Product", "96.8%", "3.1%", "84h"],
    ["Sales", "92.4%", "6.8%", "146h"],
    ["Customer Success", "90.7%", "7.2%", "218h"],
  ];

  return (
    <div className="intelligence">
      <div className="filter-strip">
        <input type="date" defaultValue="2025-03-01" aria-label="Start date" />
        <input type="date" defaultValue="2025-03-14" aria-label="End date" />
        {[
          "All branches",
          "All departments",
          "All employees",
          "All shifts",
          "All methods",
          "All statuses",
        ].map((x) => (
          <select key={x} aria-label={x}>
            <option>{tr(x)}</option>
            <option>London HQ</option>
            <option>Engineering</option>
          </select>
        ))}
      </div>

      <div className="kpi-grid compact">
        {[
          ["Attendance trend", "+1.8%", "green"],
          ["Late pattern", "6.4%", "amber"],
          ["Absence rate", "2.5%", "red"],
          ["Overtime", "1,284h", "violet"],
          ["Verification failures", "0.7%", "blue"],
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

      <div className="tabs intelligence-tabs">
        {[
          "Attendance trends",
          "Late patterns",
          "Absence patterns",
          "Overtime patterns",
          "Department",
          "Branch",
          "Employee",
          "Method",
          "Verification failures",
        ].map((x) => (
          <button
            className={view === x ? "active" : ""}
            onClick={() => setView(x)}
            key={x}
          >
            {tr(x)}
          </button>
        ))}
      </div>

      <div className="two-col">
        <section className="panel wide-chart">
          <div className="panel-head">
            <div>
              <h2>{tr(view)}</h2>
              <p>{tr("Comparison against the previous 14-day period")}</p>
            </div>
            <Badge tone="green">+1.8% trend</Badge>
          </div>
          <div className="chart-area intelligence-chart">
            <div className="y-labels">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
            </div>
            <svg viewBox="0 0 600 190" preserveAspectRatio="none">
              <path
                d="M0 105 C70 90 98 110 150 74 S240 42 300 65 S390 102 445 61 S520 36 600 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <div className="x-labels">
              <span>Mar 1</span>
              <span>Mar 3</span>
              <span>Mar 5</span>
              <span>Mar 7</span>
              <span>Mar 9</span>
              <span>Mar 11</span>
              <span>Mar 14</span>
            </div>
          </div>
        </section>

        <section className="panel ai-insight anomaly-card">
          <div className="panel-head">
            <div>
              <h2>{tr("Potential attendance anomaly")}</h2>
              <p>
                {prediction.entityId} · {tr("Requires human review")}
              </p>
            </div>
            <span className="ai-mark">
              <Icon name="spark" />
            </span>
          </div>
          <Badge tone="amber">
            {Math.round(prediction.confidence * 100)}% {tr("Confidence")} ·{" "}
            {tr(prediction.riskLevel)} {tr("Risk")}
          </Badge>
          <div className="pattern-comparison">
            <div>
              <span>{tr("Normal arrival")}</span>
              <strong>{String(prediction.metadata?.normalArrival)}</strong>
            </div>
            <div>
              <span>{tr("Recent arrivals")}</span>
              <strong>{String(prediction.metadata?.recentArrivals)}</strong>
            </div>
          </div>
          <p>{prediction.explanation}</p>
          <div className="insight-action">
            <span>{tr("Recommended action")}</span>
            <strong>{prediction.recommendedAction}</strong>
          </div>
          <button className="secondary-button full">
            {tr("Open review case")}
          </button>
        </section>
      </div>

      <SimpleTable
        title="Department comparison"
        columns={["Department", "Attendance", "Late rate", "Overtime"]}
        rows={comparisons}
      />
    </div>
  );
}

export default AttendanceIntelligence;
