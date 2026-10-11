"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { stockInInsight, stockInKpis, stockInRecords } from "@/lib/inventory/inventory-stock-in-data";

export function StockInView() {
  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / STOCK IN"
      title="Stock In"
      tabsLabel="Stock In tabs"
      kpis={stockInKpis}
      records={stockInRecords}
      insight={stockInInsight}
      exportSlug="stock-in"
    />
  );
}

export default StockInView;
