"use client";

import React, { useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { inventoryTabs } from "@/lib/inventory/inventory-data";
import { downloadInventoryCsv, exportSlugDate } from "@/lib/inventory/inventory-store";
import {
  productionStateGovernance,
  productionStateKpis,
  productionStateMatrix,
} from "@/lib/inventory/inventory-production-states-data";

export function ProductionStateMatrixView() {
  const { tr, locale } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const kpiLabel = (label: string) => {
    if (label !== "Review" || locale === "en") return tr(label);
    return locale === "fr" ? "À revoir" : "للمراجعة";
  };

  const runExport = () => {
    downloadInventoryCsv(
      `inventory-production-states-${exportSlugDate()}.csv`,
      [tr("Status")],
      productionStateMatrix.map((state) => [state]),
    );
  };

  return (
    <>
      <PageTitle
        eyebrow="CORE / INVENTORY / INVENTORY PRODUCTION STATES"
        title="Inventory Production State Matrix"
        subtitle="Operational inventory records and controls"
        actions={
          <button className="secondary-button" type="button" onClick={runExport}>
            <Icon name="download" size={15} /> {tr("Export")}
          </button>
        }
      />

      <nav className="tabs inventory-desktop-tabs" aria-label="Production states tabs">
        {inventoryTabs.map((tab, i) => (
          <button key={tab} className={i === activeTab ? "active" : ""} onClick={() => setActiveTab(i)} type="button">
            {tr(tab)}
          </button>
        ))}
      </nav>

      <nav className="inventory-mobile-tabs" aria-label="Production states mobile tabs">
        {inventoryTabs.map((tab, i) => (
          <button key={tab} className={i === activeTab ? "active" : ""} onClick={() => setActiveTab(i)} type="button">
            {tr(tab)}
          </button>
        ))}
      </nav>

      <section className="panel inventory-kpi-panel">
        <div className="inventory-kpi-grid">
          {productionStateKpis.map((kpi) => (
            <div className="inventory-kpi" key={kpi.label}>
              <span>{kpiLabel(kpi.label)}</span>
              <strong>{kpi.value}</strong>
              <small>{tr(kpi.detail)}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="panel inventory-state-panel">
        <div className="inventory-state-matrix">
          {productionStateMatrix.map((state) => (
            <span key={state}>{tr(state)}</span>
          ))}
        </div>
        <p className="inventory-state-governance">{tr(productionStateGovernance)}</p>
      </section>
    </>
  );
}

export default ProductionStateMatrixView;
