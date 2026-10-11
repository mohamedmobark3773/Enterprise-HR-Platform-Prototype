"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Tabs } from "@/components/ui/Tabs";
import { useApp } from "@/lib/context/AppContext";

export function InvoiceOcrView() {
  const { tr } = useApp();
  const tabs = ["Upload", "Review Extraction", "Match Purchase Order", "Approval", "History"];
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      <div className="acct-banner panel">
        <span className="acct-file-chip">siemens_invoice_88341.pdf · 2 pages · OCR completed</span>
        <span className="acct-banner-spacer" />
        <Badge tone="green">{tr("94% confidence")}</Badge>
        <Badge tone="amber">{tr("Human review required")}</Badge>
      </div>

      <div className="ocr-grid">
        <section className="panel">
          <div className="panel-head">
            <div><h2>{tr("Source document")}</h2><p>{tr("Page 1 of 2 · Zoom 125%")}</p></div>
            <button className="text-button" type="button">{tr("Rotate")}</button>
          </div>
          <div className="ocr-doc">
            <div className="ocr-doc-head">
              <strong>SIEMENS ENERGY</strong>
              <span>INVOICE</span>
            </div>
            <p>Invoice No. SE-88341-CE<br />Date: 26 September 2026<br />PO-AE-2026-08318<br />Customer: Nexus Energy Middle East FZE</p>
            <table className="ocr-doc-table">
              <tbody>
                <tr><td>SOT-800 turbine spare kit × 2</td><td>€774,202</td></tr>
                <tr><td>Factory inspection service × 4</td><td>€32,049</td></tr>
              </tbody>
            </table>
            <p className="ocr-doc-totals">Subtotal €1,676,600<br />VAT 19% €318,554<br />TOTAL €1,995,154</p>
          </div>
        </section>

        <div className="ocr-side">
          <section className="panel">
            <div className="panel-head">
              <div><h2>{tr("Extracted fields")}</h2><p>{tr("Confirm highlighted values before saving")}</p></div>
              <button className="text-button" type="button">{tr("Re-run OCR")}</button>
            </div>
            <div className="account-detail-fields ocr-fields">
              <div><span>{tr("Invoice Number *")}</span><strong>SR-88341-CE</strong></div>
              <div><span>{tr("Supplier *")}</span><strong>Siemens Energy AG</strong></div>
              <div><span>{tr("Customer *")}</span><strong>Nexus Energy Middle East FZE</strong></div>
              <div><span>{tr("Date *")}</span><strong>26 Sep 2026</strong></div>
              <div><span>{tr("Currency *")}</span><strong>EUR</strong></div>
              <div><span>{tr("Purchase Order")}</span><strong>PO-AE-2026-08318</strong></div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head">
              <div><h2>{tr("Extracted items")}</h2><p>{tr("2 lines · quantities and prices verified")}</p></div>
              <button className="text-button" type="button">{tr("Add line")}</button>
            </div>
            <div className="finance-list-row"><span><strong>SOT-800 turbine spare kit</strong><small>2 × €774,202</small></span><b>€1,548,404</b></div>
            <div className="finance-list-row"><span><strong>Factory inspection service</strong><small>4 × €32,049</small></span><b>€128,196</b></div>
          </section>

          <section className="panel ocr-total-panel">
            <div className="account-detail-fields">
              <div><span>{tr("Subtotal *")}</span><strong>€1,676,600</strong></div>
              <div><span>{tr("Tax *")}</span><strong>€318,554</strong></div>
              <div><span>{tr("Total *")}</span><strong>€1,995,154</strong></div>
              <div className="ocr-error-field"><span>{tr("PO remaining")}</span><strong>€1,842,600</strong><small>{tr("Exceeds PO by €152,554")}</small></div>
            </div>
            <p className="ocr-warn">{tr("Verify tax and change-order approval. No transaction is created automatically.")}</p>
          </section>

          <div className="ocr-actions">
            <span className="acct-panel-note">{tr("Reviewer: Priya Nair · all changes audited")}</span>
            <button className="secondary-button" type="button">{tr("Cancel")}</button>
            <button className="secondary-button" type="button">{tr("Save draft")}</button>
            <button className="primary-button" type="button">{tr("Send for approval")}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvoiceOcrView;
