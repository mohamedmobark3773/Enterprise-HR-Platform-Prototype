"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { warehouseDetailsById, defaultWarehouseId } from "@/lib/inventory/inventory-warehouses-data";

export function WarehouseDetailsView({ id }: { id: string }) {
  const details = warehouseDetailsById[id] || warehouseDetailsById[defaultWarehouseId];

  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / WAREHOUSE DETAILS"
      title="Warehouse Details"
      tabsLabel="Warehouse details tabs"
      kpis={details.kpis}
      records={details.records}
      insight={{
        ...details.insight,
        confidence: `${details.insight.confidence} · Risk: ${details.insight.risk}`,
        recommended: details.insight.recommendation,
      }}
      exportSlug="warehouse-details"
      kpiGridClassName="inventory-kpi-grid inventory-kpi-grid-5"
    />
  );
}

export default WarehouseDetailsView;
