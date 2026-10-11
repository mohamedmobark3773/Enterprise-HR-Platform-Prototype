"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { stockOutInsight, stockOutKpis, stockOutRecords } from "@/lib/inventory/inventory-stock-out-data";

export function StockOutView() {
  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / STOCK OUT"
      title="Stock Out"
      tabsLabel="Stock Out tabs"
      kpis={stockOutKpis}
      records={stockOutRecords}
      insight={stockOutInsight}
      exportSlug="stock-out"
    />
  );
}

export default StockOutView;
