"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { accountDetails, type AccountNode } from "@/lib/finance/finance-data";

export function AccountDetails({ node }: { node: AccountNode }) {
  const { tr } = useApp();
  return (
    <section className="panel accounts-details-panel">
      <div className="panel-head accounts-details-head">
        <div>
          <h2>{tr("Account Details")} · {node.code} {tr(node.name)}</h2>
          <p>{tr(accountDetails.subtitle)}</p>
        </div>
        <div className="page-actions">
          <button className="secondary-button" type="button">{tr("Transactions")}</button>
          <button className="secondary-button" type="button">{tr("Statement")}</button>
          <button className="primary-button" type="button"><Icon name="arrow" /> {tr("Edit Account")}</button>
        </div>
      </div>
      <div className="account-detail-fields">
        <div>
          <span>{tr("Account Code")}</span>
          <strong>{node.code}</strong>
        </div>
        <div>
          <span>{tr("Account Name")}</span>
          <strong>{tr(node.name)}</strong>
        </div>
        <div>
          <span>{tr("Account Type")}</span>
          <strong>{tr(node.type || "Balance Sheet")}</strong>
        </div>
        <div>
          <span>{tr("Normal Balance")}</span>
          <strong>{tr(node.normalBalance || "Debit")}</strong>
        </div>
      </div>
      <div className="acct-txn-wrap">
        <div className="simple-table acct-txn">
          <div className="tr th">
            {["Date", "Description", "Debit", "Credit", "Balance"].map((c) => <span key={c}>{tr(c)}</span>)}
          </div>
          {accountDetails.transactions.map((row) => (
            <div className="tr" key={row[0]}>
              {row.map((cell, i) => <span data-label={tr(["Date", "Description", "Debit", "Credit", "Balance"][i])} key={i}>{cell}</span>)}
            </div>
          ))}
        </div>
      </div>
      <div className="acct-status-row">
        <Badge tone="green">Active</Badge>
        <Badge tone="blue">Reconciled · 30 Sep</Badge>
        <button className="secondary-button" type="button">{tr("Add Child")}</button>
        <button className="text-button danger" type="button">{tr("Deactivate")}</button>
      </div>
    </section>
  );
}

export default AccountDetails;
