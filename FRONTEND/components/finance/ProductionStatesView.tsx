"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";

const states = [
  { title: "Loading", domain: "General Ledger", desc: "Synchronizing journals…", tone: "neutral" as const, chip: "General Ledger" },
  { title: "Empty", domain: "Budgets", desc: "No project budgets yet", tone: "neutral" as const, chip: "Budgets" },
  { title: "No Results", domain: "Invoices", desc: "No invoices match filters", tone: "neutral" as const, chip: "Invoices" },
  { title: "Error", domain: "Payments", desc: "Bank feed unavailable", tone: "red" as const, chip: "Payments" },
  { title: "Validation", domain: "Journal", desc: "Journal differs by $12,840", tone: "amber" as const, chip: "Journal" },
  { title: "Success", domain: "Expenses", desc: "Expense approved", tone: "green" as const, chip: "Expenses" },
  { title: "Confirmation", domain: "Invoices", desc: "Cancel invoice?", tone: "amber" as const, chip: "Invoices" },
  { title: "Restricted", domain: "Reports", desc: "Tax report access required", tone: "amber" as const, chip: "Reports" },
];

export function ProductionStatesView() {
  const { tr } = useApp();
  return (
    <>
      <div className="acct-banner panel">
        <span>{tr("All ten Finance domains inherit these accessible, localized states.")}</span>
        <span className="acct-banner-spacer" />
        <Badge tone="blue">{tr("8 states")}</Badge>
      </div>

      <div className="state-grid">
        {states.map((s) => (
          <section className={`panel state-card state-${s.tone}`} key={s.title}>
            <div className="state-card-head">
              <strong>{tr(s.title)}</strong>
              <Badge tone="blue">{tr(s.chip)}</Badge>
            </div>
            <h3>{tr(s.desc)}</h3>
            <p>{tr("Clear recovery guidance and contextual next action.")}</p>
            <button className="text-button" type="button">{tr("Review details")} →</button>
          </section>
        ))}
      </div>

      <div className="accounts-workarea">
        <section className="panel">
          <div className="panel-head">
            <div><h2>{tr("Create Journal Entry")}</h2><p>{tr("Required fields · inline financial validation")}</p></div>
            <button className="text-button" type="button">{tr("Save draft")}</button>
          </div>
          <div className="form-grid">
            <label>{tr("Journal date *")}<input defaultValue="30 Sep 2026" /></label>
            <label>{tr("Reference *")}<input defaultValue="JE-2026-09482" /></label>
            <label>{tr("Branch *")}<input defaultValue="Dubai HQ" /></label>
            <label>{tr("Debit *")}<input defaultValue="$418,900" /></label>
            <label className="field-error">{tr("Credit *")}<input defaultValue="$406,060" /><small>{tr("Out of balance by $12,840")}</small></label>
            <label className="field-error">{tr("Attachment *")}<input defaultValue={tr("Select…")} /><small>{tr("Attachment required")}</small></label>
          </div>
          <p className="acct-panel-note">{tr("Accountant + Finance Manager approval required.")}</p>
          <div className="state-form-actions">
            <button className="secondary-button" type="button">{tr("Cancel")}</button>
            <button className="primary-button" type="button">{tr("Save journal")}</button>
          </div>
        </section>

        <section className="panel state-confirm">
          <div className="panel-head">
            <div><h2>{tr("Post JE-2026-09479?")}</h2><p>{tr("Sensitive action confirmation")}</p></div>
          </div>
          <div className="acct-warn-box">
            <Icon name="bell" />
            <p>{tr("Creates immutable ledger entries totalling $418,900. Corrections require a reversal.")}</p>
          </div>
          <p className="acct-panel-note">{tr("Accountant · Manager approval · Auditor export · Viewer: read")}</p>
          <div className="state-form-actions">
            <button className="secondary-button" type="button">{tr("Cancel")}</button>
            <button className="danger-button" type="button">{tr("Post journal")}</button>
          </div>
        </section>
      </div>
    </>
  );
}

export default ProductionStatesView;
