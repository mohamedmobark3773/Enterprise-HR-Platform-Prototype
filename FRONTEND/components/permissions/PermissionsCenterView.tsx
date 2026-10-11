"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { PermissionPolicy, initialPermissionPolicies } from "@/types/permissions";
import { useApp } from "@/lib/context/AppContext";

export function PermissionsCenterView() {
  const [tab, setTab] = useState("Dashboard");
  const { tr } = useApp();
  const [policies, setPolicies] = useState<PermissionPolicy[]>(initialPermissionPolicies);
  const blank: PermissionPolicy = {
    id: "",
    type: "Personal Errand",
    maxDuration: 60,
    allowedTime: "Working hours",
    frequency: "2 per month",
    approval: true,
    approver: "Direct Manager",
    departments: "All",
    employees: "All",
    attachment: false,
    reason: true,
    autoRule: "None",
    escalation: "HR Specialist",
    sla: 4,
  };
  const [editing, setEditing] = useState<PermissionPolicy | null>(null);
  const [request, setRequest] = useState({
    employee: "Jordan Lee",
    type: "Late Arrival",
    duration: 30,
    reason: "Medical appointment",
    status: "Draft",
  });

  const activePolicy = policies.find((p) => p.type === request.type);
  const validation = !request.reason.trim()
    ? "Reason is required"
    : activePolicy && request.duration > activePolicy.maxDuration
    ? `Maximum duration is ${activePolicy.maxDuration} minutes`
    : "";

  const save = () => {
    if (!editing?.type || editing.maxDuration < 1) return;
    setPolicies((all) =>
      editing.id
        ? all.map((p) => (p.id === editing.id ? editing : p))
        : [...all, { ...editing, id: `POL-0${all.length + 1}` }]
    );
    setEditing(null);
  };

  const submit = () => {
    if (!validation)
      setRequest({
        ...request,
        status: activePolicy?.approval ? "Manager Approval" : "Approved",
      });
  };

  return (
    <>
      <PageTitle
        eyebrow="Time permissions"
        title="Permissions"
        subtitle="Policy-driven requests with validation, approval and SLA controls"
        actions={
          <button className="primary-button" onClick={() => setEditing(blank)}>
            <Icon name="plus" /> {tr("New policy")}
          </button>
        }
      />

      <div className="tabs">
        {["Dashboard", "Requests", "Policy editor", "Types", "Permission History"].map(
          (x) => (
            <button
              key={x}
              className={tab === x ? "active" : ""}
              onClick={() => setTab(x)}
            >
              {tr(x)}
            </button>
          )
        )}
      </div>

      <div className="kpi-grid compact">
        {[
          ["Pending requests", "4", "amber"],
          ["Approved this month", "38", "green"],
          ["Policy exceptions", "2", "red"],
          ["Average approval", "2.1h", "blue"],
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

      {tab === "Policy editor" ? (
        <div className="panel table-panel">
          <div className="panel-head">
            <div>
              <h2>{tr("Permission policies")}</h2>
              <p>{tr("Policy validation affects request submission below")}</p>
            </div>
          </div>
          <div className="policy-grid">
            {policies.map((p) => (
              <div className="policy-card" key={p.id}>
                <div>
                  <Badge tone="blue">{p.id}</Badge>
                  <button
                    className="icon-button"
                    onClick={() => setEditing(p)}
                    aria-label="Edit policy"
                  >
                    <Icon name="dots" />
                  </button>
                </div>
                <h3>{tr(p.type)}</h3>
                <dl>
                  <div>
                    <dt>{tr("Maximum duration")}</dt>
                    <dd>
                      {p.maxDuration} {tr("Minutes")}
                    </dd>
                  </div>
                  <div>
                    <dt>{tr("Frequency")}</dt>
                    <dd>{p.frequency}</dd>
                  </div>
                  <div>
                    <dt>{tr("Approver")}</dt>
                    <dd>{tr(p.approver)}</dd>
                  </div>
                  <div>
                    <dt>{tr("SLA / escalation")}</dt>
                    <dd>
                      {p.sla}h · {tr(p.escalation)}
                    </dd>
                  </div>
                  <div>
                    <dt>{tr("Restrictions")}</dt>
                    <dd>{p.departments}</dd>
                  </div>
                </dl>
                <div className="card-actions">
                  <button onClick={() => setEditing(p)}>{tr("Edit")}</button>
                  <button
                    onClick={() =>
                      window.confirm(
                        tr("Delete this permission policy permanently?")
                      ) && setPolicies((all) => all.filter((x) => x.id !== p.id))
                    }
                  >
                    {tr("Delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="two-col">
          <section className="panel request-form">
            <div className="panel-head">
              <div>
                <h2>{tr("Permission request")}</h2>
                <p>
                  {tr(
                    "Employee → policy validation → manager → HR if required"
                  )}
                </p>
              </div>
              <Badge
                tone={
                  request.status === "Draft"
                    ? "neutral"
                    : request.status === "Approved"
                    ? "green"
                    : "amber"
                }
              >
                {request.status}
              </Badge>
            </div>
            <div className="form-grid">
              <label>
                {tr("Employee")}
                <select
                  value={request.employee}
                  onChange={(e) =>
                    setRequest({ ...request, employee: e.target.value })
                  }
                >
                  <option>Jordan Lee</option>
                  <option>Amira Hassan</option>
                </select>
              </label>
              <label>
                {tr("Permission type")}
                <select
                  value={request.type}
                  onChange={(e) =>
                    setRequest({ ...request, type: e.target.value, status: "Draft" })
                  }
                >
                  {policies.map((p) => (
                    <option key={p.id}>{p.type}</option>
                  ))}
                </select>
              </label>
              <label>
                {tr("Requested duration (minutes)")}
                <input
                  type="number"
                  value={request.duration}
                  onChange={(e) =>
                    setRequest({
                      ...request,
                      duration: Number(e.target.value),
                      status: "Draft",
                    })
                  }
                />
              </label>
              <label>
                {tr("Reason")}
                <input
                  value={request.reason}
                  onChange={(e) =>
                    setRequest({
                      ...request,
                      reason: e.target.value,
                      status: "Draft",
                    })
                  }
                />
              </label>
            </div>
            {validation && <div className="form-error">{tr(validation)}</div>}
            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setRequest({ ...request, status: "Draft" })}
              >
                {tr("Save draft")}
              </button>
              <button
                className="primary-button"
                disabled={!!validation || request.status !== "Draft"}
                onClick={submit}
              >
                {tr("Submit request")}
              </button>
            </div>
          </section>

          <section className="panel policy-validation">
            <div className="panel-head">
              <div>
                <h2>{tr("Policy validation")}</h2>
                <p>
                  {activePolicy?.id} · {tr("Live result")}
                </p>
              </div>
              <Badge tone={validation ? "red" : "green"}>
                {validation ? "Blocked" : "Valid"}
              </Badge>
            </div>
            {activePolicy &&
              [
                ["Allowed time", activePolicy.allowedTime],
                ["Maximum duration", `${activePolicy.maxDuration} minutes`],
                ["Frequency", activePolicy.frequency],
                [
                  "Approval path",
                  activePolicy.approval
                    ? `${activePolicy.approver} → HR when escalated`
                    : "Auto approved",
                ],
                ["Attachment", activePolicy.attachment ? "Required" : "Optional"],
                ["Reason", activePolicy.reason ? "Required" : "Optional"],
                ["SLA", `${activePolicy.sla} hours`],
              ].map(([a, b]) => (
                <div className="validation-row" key={a}>
                  <span>{tr(a)}</span>
                  <strong>{tr(b)}</strong>
                </div>
              ))}
          </section>
        </div>
      )}

      {editing && (
        <div className="modal-backdrop" onMouseDown={() => setEditing(null)}>
          <div className="modal policy-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>
                  {editing.id ? tr("Edit") : tr("Create")}{" "}
                  {tr("permission policy")}
                </h2>
                <p>{tr("Configure validation and approval behavior.")}</p>
              </div>
              <button className="icon-button" onClick={() => setEditing(null)}>
                ×
              </button>
            </div>
            <div className="form-grid">
              {(
                [
                  ["Permission type", "type", "text"],
                  ["Maximum duration", "maxDuration", "number"],
                  ["Allowed time", "allowedTime", "text"],
                  ["Allowed frequency", "frequency", "text"],
                  ["Approver", "approver", "text"],
                  ["Department restrictions", "departments", "text"],
                  ["Employee restrictions", "employees", "text"],
                  ["Auto approval rule", "autoRule", "text"],
                  ["Escalation", "escalation", "text"],
                  ["SLA hours", "sla", "number"],
                ] as const
              ).map(([label, key, type]) => (
                <label key={key}>
                  {tr(label)}
                  <input
                    type={type}
                    value={editing[key]}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        [key]:
                          type === "number"
                            ? Number(e.target.value)
                            : e.target.value,
                      })
                    }
                  />
                </label>
              ))}
            </div>
            <div className="toggle-row">
              <label>
                <input
                  type="checkbox"
                  checked={editing.approval}
                  onChange={(e) =>
                    setEditing({ ...editing, approval: e.target.checked })
                  }
                />{" "}
                {tr("Approval required")}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={editing.attachment}
                  onChange={(e) =>
                    setEditing({ ...editing, attachment: e.target.checked })
                  }
                />{" "}
                {tr("Attachment required")}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={editing.reason}
                  onChange={(e) =>
                    setEditing({ ...editing, reason: e.target.checked })
                  }
                />{" "}
                {tr("Reason required")}
              </label>
            </div>
            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setEditing(null)}
              >
                {tr("Cancel")}
              </button>
              <button className="primary-button" onClick={save}>
                {tr("Save policy")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PermissionsCenterView;
