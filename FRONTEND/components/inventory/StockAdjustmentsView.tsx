"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { adjustmentsInsight, adjustmentsKpis, adjustmentsRecords } from "@/lib/inventory/inventory-adjustments-data";

export function StockAdjustmentsView() {
  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / STOCK ADJUSTMENTS"
      title="Stock Adjustments"
      tabsLabel="Stock Adjustments tabs"
      kpis={adjustmentsKpis}
      records={adjustmentsRecords}
      insight={adjustmentsInsight}
      exportSlug="adjustments"
    />
  );
}

export default StockAdjustmentsView;
