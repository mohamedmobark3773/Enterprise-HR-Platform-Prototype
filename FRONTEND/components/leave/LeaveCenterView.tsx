"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { initialPredictions } from "@/lib/ai/ai-contracts";
import { useApp } from "@/lib/context/AppContext";

export function LeaveCenterView() {
  const [tab, setTab] = useState("Dashboard");
  const leavePrediction = initialPredictions.find(
    (p) => p.sourceModule === "Leave"
  )!;
  const { tr } = useApp();

  const [requests, setRequests] = useState([
    ["Sophie Laurent", "Annual leave", "18–22 Mar", "5 days", "Pending"],
    ["Noah Williams", "Personal errand", "Today 14:00", "2 hours", "Pending"],
    ["Omar Benali", "Sick leave", "12–13 Mar", "2 days", "Approved"],
    ["Elena Rossi", "Business mission", "20 Mar", "1 day", "Pending"],
  ]);

  const act = (name: string, status: string) =>
    setRequests((r) =>
      r.map((x) => (x[0] === name ? [...x.slice(0, 4), status] : x))
    );

  const tabs = [
    "Dashboard",
    "Requests",
    "Calendar",
    "Leave types",
    "Policies",
    "Balances",
    "Employee leave",
  ];

  return (
    <>
      <PageTitle
        eyebrow="Time off"
        title="Leave & Permissions"
        subtitle="Balances, team coverage and configurable approval workflows"
        actions={
          <button className="primary-button">
            <Icon name="plus" /> {tr("New request")}
          </button>
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

      <div className="kpi-grid compact">
        {[
          ["Pending approval", "6", "amber"],
          ["On leave today", "47", "blue"],
          ["Team coverage", "91%", "green"],
          ["Policy exceptions", "3", "red"],
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
        <div className="panel table-panel">
          <div className="panel-head">
            <div>
              <h2>{tr("Requests")}</h2>
              <p>{tr("Leave and permissions awaiting action")}</p>
            </div>
          </div>
          <div className="request-list">
            {requests.map((r) => (
              <div key={r[0]}>
                <div className="avatar avatar-indigo">
                  {r[0]
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </div>
                <div>
                  <strong>{r[0]}</strong>
                  <span>
                    {tr(r[1])} · {r[2]} · {tr(r[3])}
                  </span>
                </div>
                <Badge
                  tone={
                    r[4] === "Pending"
                      ? "amber"
                      : r[4] === "Approved"
                      ? "green"
                      : "red"
                  }
                >
                  {r[4]}
                </Badge>
                {r[4] === "Pending" && (
                  <div className="row-actions">
                    <button onClick={() => act(r[0], "Rejected")}>
                      {tr("Reject")}
                    </button>
                    <button onClick={() => act(r[0], "Approved")}>
                      {tr("Approve")}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="panel ai-insight">
          <div className="panel-head">
            <div>
              <h2>{tr("Smart leave insight")}</h2>
              <p>{tr(leavePrediction.status)}</p>
            </div>
            <span className="ai-mark">
              <Icon name="spark" />
            </span>
          </div>
          <Badge tone="amber">
            {tr(leavePrediction.riskLevel)} {tr("Risk")} ·{" "}
            {Math.round(leavePrediction.confidence * 100)}%
          </Badge>
          <h3>{leavePrediction.prediction}</h3>
          <p>{leavePrediction.explanation}</p>
          <div className="insight-action">
            <span>{tr("Recommended action")}</span>
            <strong>{leavePrediction.recommendedAction}</strong>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeaveCenterView;
