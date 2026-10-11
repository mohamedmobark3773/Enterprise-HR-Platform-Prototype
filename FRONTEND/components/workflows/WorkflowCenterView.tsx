"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { useApp } from "@/lib/context/AppContext";

export function WorkflowCenterView() {
  const [nodes, setNodes] = useState([
    "Employee submits",
    "Direct manager",
    "HR specialist",
  ]);
  const [status, setStatus] = useState("Draft");
  const [tab, setTab] = useState("Workflow Builder");
  const { tr } = useApp();

  const [approvals, setApprovals] = useState([
    ["Leave", "Sophie Laurent", "5 days", "Pending"],
    ["Permission", "Noah Williams", "2 hours", "Pending"],
    ["Overtime", "Theo James", "8.5 hours", "Pending"],
    ["Loan", "Sophie Laurent", "$8,000", "Pending"],
    ["Salary change", "Jordan Lee", "+3.2%", "Pending"],
    ["Document", "Omar Benali", "Contract v3", "Pending"],
  ]);

  const approvalAction = (name: string, state: string) =>
    setApprovals((all) =>
      all.map((x) => (x[1] === name ? [...x.slice(0, 3), state] : x))
    );

  return (
    <>
      <PageTitle
        eyebrow="Automation"
        title="Workflows & Approvals"
        subtitle="Configure conditional approval paths, SLAs, notifications and escalation rules"
        actions={
          <>
            <select
              className="status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Workflow status"
            >
              <option>{tr("Draft")}</option>
              <option>{tr("Published")}</option>
              <option>{tr("Paused")}</option>
              <option>{tr("Archived")}</option>
            </select>
            <button
              className="primary-button"
              onClick={() => setStatus("Published")}
            >
              <Icon name="check" />
              {tr("Publish workflow")}
            </button>
          </>
        }
      />

      <div className="tabs">
        <button
          className={tab === "Workflow Builder" ? "active" : ""}
          onClick={() => setTab("Workflow Builder")}
        >
          {tr("Workflow Builder")}
        </button>
        <button
          className={tab === "Approval Center" ? "active" : ""}
          onClick={() => setTab("Approval Center")}
        >
          {tr("Approval Center")}
        </button>
      </div>

      {tab === "Workflow Builder" ? (
        <div className="workflow-layout">
          <aside className="panel workflow-list">
            <h2>{tr("Workflows")}</h2>
            {[
              "Leave > 3 days",
              "Salary change",
              "Loan request",
              "Attendance correction",
              "New hire",
            ].map((x, i) => (
              <button className={i === 0 ? "active" : ""} key={x}>
                <span className="workflow-icon">
                  <Icon name="flow" />
                </span>
                <span>
                  <strong>{tr(x)}</strong>
                  <small>
                    {i === 0 ? tr(status) : tr("Published")} · {i + 2}{" "}
                    {tr("Steps")}
                  </small>
                </span>
              </button>
            ))}
          </aside>

          <section className="panel workflow-builder">
            <div className="panel-head">
              <div>
                <h2>{tr("Leave over 3 days")}</h2>
                <p>
                  {tr("Last edited 12 minutes ago")} · {tr("Notifications enabled")}
                </p>
              </div>
              <Badge
                tone={
                  status === "Published"
                    ? "green"
                    : status === "Paused"
                    ? "red"
                    : "amber"
                }
              >
                {status}
              </Badge>
            </div>

            <div className="condition-box">
              <span>IF</span>
              <select aria-label="Condition property">
                <option>{tr("Leave duration")}</option>
                <option>{tr("Department")}</option>
                <option>{tr("Employee type")}</option>
              </select>
              <select aria-label="Condition comparator">
                <option>{tr("is greater than")}</option>
                <option>{tr("equals")}</option>
              </select>
              <input value="3" readOnly aria-label="Condition value" />
              <strong>{tr("days")}</strong>
            </div>

            <div className="workflow-canvas">
              {nodes.map((x, i) => (
                <div key={x}>
                  <div className={`workflow-node ${i === 0 ? "start" : ""}`}>
                    <span>
                      {i === 0 ? <Icon name="user" /> : <Icon name="check" />}
                    </span>
                    <div>
                      <small>
                        STEP {i + 1} · ORDER {i + 1}
                      </small>
                      <strong>{tr(x)}</strong>
                      <em>
                        SLA: {i + 4} {tr("Hours")} · {tr("Escalate to HR")} ·{" "}
                        {tr("Notify by email and inbox")}
                      </em>
                    </div>
                    <button className="icon-button" aria-label="Step options">
                      <Icon name="dots" />
                    </button>
                  </div>
                  {i < nodes.length - 1 && <div className="connector" />}
                </div>
              ))}
              <button
                className="add-step"
                onClick={() => setNodes([...nodes, "Department head"])}
              >
                <Icon name="plus" /> {tr("Add approval step")}
              </button>
            </div>
          </section>
        </div>
      ) : (
        <div className="panel approval-center">
          <div className="panel-head">
            <div>
              <h2>{tr("Centralized approval queue")}</h2>
              <p>
                {tr(
                  "Leave, permissions, overtime, loans, salary and document approvals"
                )}
              </p>
            </div>
            <Badge tone="amber">
              {approvals.filter((x) => x[3] === "Pending").length} {tr("pending")}
            </Badge>
          </div>
          {approvals.map((a) => (
            <div className="approval-row" key={a[1]}>
              <span className="notification-icon">
                <Icon name="flow" />
              </span>
              <span>
                <strong>{a[1]}</strong>
                <small>
                  {tr(a[0])} · {tr(a[2])}
                </small>
              </span>
              <Badge
                tone={
                  a[3] === "Pending"
                    ? "amber"
                    : a[3] === "Approved"
                    ? "green"
                    : "red"
                }
              >
                {a[3]}
              </Badge>
              {a[3] === "Pending" && (
                <div className="row-actions">
                  <button>{tr("Request changes")}</button>
                  <button onClick={() => approvalAction(a[1], "Rejected")}>
                    {tr("Reject")}
                  </button>
                  <button onClick={() => approvalAction(a[1], "Approved")}>
                    {tr("Approve")}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default WorkflowCenterView;
