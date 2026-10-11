"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Sparkline } from "@/components/ui/Sparkline";
import { PageTitle } from "@/components/ui/PageTitle";
import { initialPredictions } from "@/lib/ai/ai-contracts";
import { useApp } from "@/lib/context/AppContext";

export function DashboardView() {
  const { navigate, t, tr } = useApp();
  const dashboardPrediction = initialPredictions.find(
    (p) => p.sourceModule === "Attendance"
  )!;

  const kpis = [
    ["Total employees", "1,248", "+24 this month", "users", "indigo"],
    ["Present today", "1,103", "88.4% attendance", "check", "green"],
    ["Late today", "67", "12 above average", "clock", "amber"],
    ["On leave", "47", "3.8% of workforce", "calendar", "blue"],
    ["Pending requests", "18", "6 require action", "flow", "violet"],
    ["Payroll status", "Ready", "March · $4.82M", "wallet", "teal"],
  ];

  return (
    <>
      <PageTitle
        title={t.goodMorning}
        subtitle={t.subtitle}
        actions={
          <>
            <button className="secondary-button" onClick={() => window.print()}>
              <Icon name="download" /> {tr("Export report")}
            </button>
            <button className="primary-button" onClick={() => navigate("employees")}>
              <Icon name="plus" /> {tr("Add employee")}
            </button>
          </>
        }
      />

      <div className="status-bar">
        <span className="live-dot" /> {tr("All systems operational")} <span>•</span>{" "}
        {tr("Last synced 2 min ago")} <button>{tr("View status")}</button>
      </div>

      <div className="kpi-grid">
        {kpis.map(([label, value, detail, icon, tone]) => (
          <button
            className="kpi-card"
            key={label}
            onClick={() =>
              label.includes("Payroll")
                ? navigate("payroll")
                : label.includes("employee")
                ? navigate("employees")
                : navigate("attendance")
            }
          >
            <div className={`kpi-icon ${tone}`}>
              <Icon name={icon} />
            </div>
            <span>{tr(label)}</span>
            <strong>{value}</strong>
            <small>{tr(detail)}</small>
            <Sparkline values={[25, 20, 23, 16, 19, 12, 8]} tone={tone} />
          </button>
        ))}
      </div>

      <div className="dashboard-grid">
        <section className="panel attendance-overview">
          <div className="panel-head">
            <div>
              <h2>{tr("Attendance overview")}</h2>
              <p>{tr("Today across all locations")}</p>
            </div>
            <button className="text-button" onClick={() => navigate("attendance")}>
              {tr("View details")} <Icon name="arrow" />
            </button>
          </div>
          <div className="attendance-content">
            <div className="donut">
              <div>
                <strong>92.1%</strong>
                <span>{tr("On time")}</span>
              </div>
            </div>
            <div className="legend-list">
              {[
                ["Present", "1,103", "green"],
                ["Late", "67", "amber"],
                ["Absent", "31", "red"],
                ["On leave", "47", "blue"],
              ].map(([x, y, z]) => (
                <div key={x}>
                  <span>
                    <i className={z} />
                    {tr(x)}
                  </span>
                  <strong>{y}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="mini-stat-row">
            <div>
              <span>{tr("Early leave")}</span>
              <strong>14</strong>
            </div>
            <div>
              <span>{tr("Remote")}</span>
              <strong>126</strong>
            </div>
            <div>
              <span>{tr("Field work")}</span>
              <strong>38</strong>
            </div>
            <div>
              <span>{tr("Overtime")}</span>
              <strong>92h</strong>
            </div>
          </div>
        </section>

        <section className="panel alerts-panel">
          <div className="panel-head">
            <div>
              <h2>{tr("Requires attention")}</h2>
              <p>{tr("Prioritized HR alerts")}</p>
            </div>
            <Badge tone="red">8 critical</Badge>
          </div>
          <div className="alert-list">
            {[
              ["red", "12 employees exceeded overtime threshold", "Attendance · Today"],
              ["amber", "7 contracts expire within 30 days", "Documents · This month"],
              ["violet", "8 failed face verification attempts", "Biometrics · Last 24h"],
              ["blue", "6 pending leave approvals", "Workflows · SLA in 3h"],
            ].map(([tone, title, meta]) => (
              <button
                key={title}
                onClick={() =>
                  navigate(
                    tone === "violet" ? "face" : tone === "blue" ? "workflows" : "documents"
                  )
                }
              >
                <span className={`alert-icon ${tone}`}>!</span>
                <span>
                  <strong>{tr(title)}</strong>
                  <small>{tr(meta)}</small>
                </span>
                <Icon name="chevron" />
              </button>
            ))}
          </div>
        </section>

        <section className="panel chart-panel">
          <div className="panel-head">
            <div>
              <h2>{tr("Workforce trends")}</h2>
              <p>{tr("Attendance over the last 7 days")}</p>
            </div>
            <select aria-label="Trend duration">
              <option>{tr("Last 7 days")}</option>
              <option>{tr("Last 30 days")}</option>
            </select>
          </div>
          <div className="chart-area">
            <div className="y-labels">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
            </div>
            <svg viewBox="0 0 600 190" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity=".2" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 92 C60 88 75 52 130 62 S220 38 280 54 S360 95 420 60 S510 30 600 42 V190 H0Z"
                fill="url(#fill)"
              />
              <path
                d="M0 92 C60 88 75 52 130 62 S220 38 280 54 S360 95 420 60 S510 30 600 42"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <div className="x-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </section>

        <section className="panel ai-insight">
          <div className="panel-head">
            <div>
              <h2>{tr("AI insights")}</h2>
              <p>{tr("Human review required")}</p>
            </div>
            <span className="ai-mark">
              <Icon name="spark" />
            </span>
          </div>
          <Badge tone="amber">
            {dashboardPrediction.prediction} ·{" "}
            {Math.round(dashboardPrediction.confidence * 100)}% confidence
          </Badge>
          <h3>{dashboardPrediction.predictionType}</h3>
          <p>{dashboardPrediction.explanation}</p>
          <div className="insight-action">
            <span>{tr("Recommended action")}</span>
            <strong>{dashboardPrediction.recommendedAction}</strong>
          </div>
          <button className="secondary-button full" onClick={() => navigate("ai")}>
            {tr("Review insight")} <Icon name="arrow" />
          </button>
        </section>
      </div>
    </>
  );
}

export default DashboardView;
