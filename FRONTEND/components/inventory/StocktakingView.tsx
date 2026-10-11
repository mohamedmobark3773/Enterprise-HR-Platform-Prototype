"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { stocktakingInsight, stocktakingKpis, stocktakingRecords } from "@/lib/inventory/inventory-stocktaking-data";

export function StocktakingView() {
  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / STOCKTAKING"
      title="Stocktaking"
      tabsLabel="Stocktaking tabs"
      kpis={stocktakingKpis}
      records={stocktakingRecords}
      insight={stocktakingInsight}
      exportSlug="stocktaking"
    />
  );
}

export default StocktakingView;
