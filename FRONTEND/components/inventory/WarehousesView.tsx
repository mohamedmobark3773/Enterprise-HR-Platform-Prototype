"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { warehouseInsight, warehouseListKpis, warehouseRecords } from "@/lib/inventory/inventory-warehouses-data";

export function WarehousesView() {
  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / WAREHOUSES"
      title="Warehouses"
      tabsLabel="Warehouses tabs"
      kpis={warehouseListKpis}
      records={warehouseRecords}
      insight={{
        ...warehouseInsight,
        confidence: `${warehouseInsight.confidence} · Risk: ${warehouseInsight.risk}`,
        recommended: warehouseInsight.recommendation,
      }}
      recordHref={(record) => `/inventory/warehouses/${record.id}`}
      exportSlug="warehouses"
      kpiGridClassName="inventory-kpi-grid inventory-kpi-grid-5"
    />
  );
}

export default WarehousesView;
