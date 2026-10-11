"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { LoanRecord, initialLoans } from "@/types/loans";
import { useApp } from "@/lib/context/AppContext";

export function LoansCenterView() {
  const [tab, setTab] = useState("All records");
  const [loans, setLoans] = useState<LoanRecord[]>(initialLoans);
  const { tr } = useApp();

  const empty: LoanRecord = {
    id: "",
    employee: "Jordan Lee",
    type: "Loan",
    amount: 0,
    reason: "",
    installments: 1,
    startDate: "2025-04-28",
    fee: 0,
    status: "Draft",
    paid: 0,
  };

  const [editing, setEditing] = useState<LoanRecord | null>(null);
  const [selected, setSelected] = useState<LoanRecord | null>(null);

  const save = () => {
    if (!editing || editing.amount <= 0 || !editing.reason.trim()) return;
    const item: LoanRecord = {
      ...editing,
      id:
        editing.id ||
        `${editing.type === "Loan" ? "LN" : "AD"}-${1050 + loans.length}`,
    };
    setLoans((all) =>
      editing.id ? all.map((x) => (x.id === editing.id ? item : x)) : [item, ...all]
    );
    setEditing(null);
  };

  const transition = (id: string, status: string) => {
    setLoans((all) => all.map((x) => (x.id === id ? { ...x, status } : x)));
    setSelected((s) => (s?.id === id ? { ...s, status } : s));
  };

  const payment = (id: string) => {
    const loan = loans.find((x) => x.id === id);
    if (!loan) return;
    const installment = Math.min(
      (loan.amount + loan.fee) / loan.installments,
      loan.amount + loan.fee - loan.paid
    );
    setLoans((all) =>
      all.map((x) =>
        x.id === id
          ? {
              ...x,
              paid: x.paid + installment,
              status:
                x.paid + installment >= x.amount + x.fee
                  ? "Completed"
                  : "Repayment",
            }
          : x
      )
    );
    setSelected(null);
  };

  const tabs = [
    "All records",
    "Loan requests",
    "Advance requests",
    "Repayment schedule",
    "Financial history",
  ];

  const loanStages = [
    "Draft",
    "Submitted",
    "Manager Approval",
    "Finance Approval",
    "Approved",
    "Disbursed",
    "Repayment",
    "Completed",
  ];

  return (
    <>
      <PageTitle
        eyebrow="Employee finance"
        title="Loans & Advances"
        subtitle="Request, approve, disburse and settle employee financing"
        actions={
          <>
            <button
              className="secondary-button"
              onClick={() => setEditing({ ...empty, type: "Advance" })}
            >
              {tr("Request advance")}
            </button>
            <button
              className="primary-button"
              onClick={() => setEditing(empty)}
            >
              <Icon name="plus" /> {tr("Request loan")}
            </button>
          </>
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
          ["Active loans", "38", "blue"],
          ["Outstanding", "$186K", "amber"],
          ["Due this month", "$24K", "violet"],
          ["Approval queue", "6", "red"],
          ["On schedule", "97%", "green"],
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

      <div className="panel table-panel">
        <div className="table-toolbar">
          <div className="search-field">
            <Icon name="search" />
            <input placeholder={tr("Search employee or reference")} />
          </div>
          <select aria-label="Filter loans by status">
            <option>{tr("All statuses")}</option>
            <option>{tr("Draft")}</option>
            <option>{tr("Approval")}</option>
            <option>{tr("Repayment")}</option>
          </select>
        </div>

        <div className="loan-table">
          <div className="loan-row loan-head">
            <span>{tr("Employee")}</span>
            <span>{tr("Reference")}</span>
            <span>{tr("Type")}</span>
            <span>{tr("Amount")}</span>
            <span>{tr("Outstanding")}</span>
            <span>{tr("Status")}</span>
            <span>{tr("Actions")}</span>
          </div>
          {loans.map((l) => (
            <div className="loan-row" key={l.id}>
              <span>
                <strong>{l.employee}</strong>
                <small>{tr(l.reason)}</small>
              </span>
              <span>{l.id}</span>
              <span>{tr(l.type)}</span>
              <span>${l.amount.toLocaleString()}</span>
              <span>
                ${Math.max(0, l.amount + l.fee - l.paid).toLocaleString()}
              </span>
              <span>
                <Badge
                  tone={
                    l.status === "Completed"
                      ? "green"
                      : l.status.includes("Approval")
                      ? "amber"
                      : l.status === "Draft"
                      ? "neutral"
                      : "blue"
                  }
                >
                  {l.status}
                </Badge>
              </span>
              <span className="row-actions">
                <button onClick={() => setSelected(l)}>{tr("View")}</button>
                <button onClick={() => setEditing(l)}>{tr("Edit")}</button>
              </span>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <div className="modal-backdrop" onMouseDown={() => setEditing(null)}>
          <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>
                  {editing.id ? tr("Edit") : tr("New")}{" "}
                  {tr(editing.type.toLowerCase())} {tr("request")}
                </h2>
                <p>{tr("Draft requests can be validated before submission.")}</p>
              </div>
              <button className="icon-button" onClick={() => setEditing(null)}>
                ×
              </button>
            </div>
            <div className="form-grid">
              <label>
                {tr("Employee")}
                <select
                  value={editing.employee}
                  onChange={(e) =>
                    setEditing({ ...editing, employee: e.target.value })
                  }
                >
                  <option>Jordan Lee</option>
                  <option>Omar Benali</option>
                  <option>Sophie Laurent</option>
                </select>
              </label>
              <label>
                {tr("Type")}
                <select
                  value={editing.type}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      type: e.target.value as "Loan" | "Advance",
                    })
                  }
                >
                  <option>Loan</option>
                  <option>Advance</option>
                </select>
              </label>
              <label>
                {tr("Amount")}
                <input
                  type="number"
                  value={editing.amount || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, amount: Number(e.target.value) })
                  }
                />
              </label>
              <label>
                {tr("Installments")}
                <input
                  type="number"
                  min="1"
                  value={editing.installments}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      installments: Number(e.target.value),
                    })
                  }
                />
              </label>
              <label>
                {tr("Start date")}
                <input
                  type="date"
                  value={editing.startDate}
                  onChange={(e) =>
                    setEditing({ ...editing, startDate: e.target.value })
                  }
                />
              </label>
              <label>
                {tr("Interest / fees")}
                <input
                  type="number"
                  value={editing.fee}
                  onChange={(e) =>
                    setEditing({ ...editing, fee: Number(e.target.value) })
                  }
                />
              </label>
              <label className="span-two">
                {tr("Reason")}
                <input
                  value={editing.reason}
                  onChange={(e) =>
                    setEditing({ ...editing, reason: e.target.value })
                  }
                />
              </label>
              <label className="span-two">
                {tr("Attachment")}
                <input type="file" accept=".pdf,.png,.jpg" />
              </label>
            </div>
            {(!editing.reason || editing.amount <= 0) && (
              <div className="form-error">
                {tr("A positive amount and reason are required.")}
              </div>
            )}
            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setEditing(null)}
              >
                {tr("Cancel")}
              </button>
              <button
                className="primary-button"
                disabled={!editing.reason || editing.amount <= 0}
                onClick={save}
              >
                {tr("Save draft")}
              </button>
            </div>
          </div>
        </div>
      )}

      {selected && (
        <div className="drawer-backdrop" onMouseDown={() => setSelected(null)}>
          <div
            className="profile-drawer loan-detail"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <div>
                <div className="eyebrow">{tr(selected.type)} details</div>
                <h2>{selected.id}</h2>
                <p>
                  {selected.employee} · ${selected.amount.toLocaleString()}
                </p>
              </div>
              <button className="icon-button" onClick={() => setSelected(null)}>
                ×
              </button>
            </div>
            <div className="profile-body">
              <div className="loan-progress">
                {loanStages.map((x, i) => (
                  <div
                    className={
                      i <= loanStages.indexOf(selected.status) ? "done" : ""
                    }
                    key={x}
                  >
                    <span>{i + 1}</span>
                    <small>{tr(x)}</small>
                  </div>
                ))}
              </div>
              <div className="detail-grid">
                <div>
                  <span>{tr("Reason")}</span>
                  <strong>{tr(selected.reason)}</strong>
                </div>
                <div>
                  <span>{tr("Installments")}</span>
                  <strong>{selected.installments}</strong>
                </div>
                <div>
                  <span>{tr("Paid")}</span>
                  <strong>${selected.paid.toLocaleString()}</strong>
                </div>
                <div>
                  <span>{tr("Outstanding")}</span>
                  <strong>
                    $
                    {(
                      selected.amount +
                      selected.fee -
                      selected.paid
                    ).toLocaleString()}
                  </strong>
                </div>
              </div>
              <h3>{tr("Available actions")}</h3>
              <div className="action-grid">
                {selected.status === "Draft" && (
                  <button onClick={() => transition(selected.id, "Submitted")}>
                    {tr("Submit")}
                  </button>
                )}
                {selected.status === "Submitted" && (
                  <>
                    <button
                      onClick={() =>
                        transition(selected.id, "Manager Approval")
                      }
                    >
                      {tr("Send to manager")}
                    </button>
                    <button
                      onClick={() => transition(selected.id, "Cancelled")}
                    >
                      {tr("Cancel")}
                    </button>
                  </>
                )}
                {selected.status === "Manager Approval" && (
                  <>
                    <button
                      onClick={() =>
                        transition(selected.id, "Finance Approval")
                      }
                    >
                      {tr("Manager approve")}
                    </button>
                    <button
                      onClick={() => transition(selected.id, "Rejected")}
                    >
                      {tr("Reject")}
                    </button>
                  </>
                )}
                {selected.status === "Finance Approval" && (
                  <button onClick={() => transition(selected.id, "Approved")}>
                    {tr("Finance approve")}
                  </button>
                )}
                {selected.status === "Approved" && (
                  <button onClick={() => transition(selected.id, "Disbursed")}>
                    {tr("Confirm disbursement")}
                  </button>
                )}
                {["Disbursed", "Repayment"].includes(selected.status) && (
                  <button onClick={() => payment(selected.id)}>
                    {tr("Record payment")}
                  </button>
                )}
                {selected.status === "Completed" && (
                  <button onClick={() => transition(selected.id, "Closed")}>
                    {tr("Close record")}
                  </button>
                )}
                <button
                  onClick={() =>
                    window.confirm(
                      tr("Delete this loan or advance record permanently?")
                    ) &&
                    (setLoans((all) => all.filter((x) => x.id !== selected.id)),
                    setSelected(null))
                  }
                >
                  {tr("Delete")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoansCenterView;
