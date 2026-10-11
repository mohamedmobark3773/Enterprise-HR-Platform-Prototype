"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { purchaseInsight, purchaseKpis, purchaseRecords } from "@/lib/inventory/inventory-purchase-data";

export function PurchaseOrdersView() {
  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / PURCHASE REQUESTS / ORDERS"
      title="Purchase Requests / Orders"
      tabsLabel="Purchase requests tabs"
      kpis={purchaseKpis}
      records={purchaseRecords}
      insight={purchaseInsight}
      exportSlug="purchase-orders"
    />
  );
}

export default PurchaseOrdersView;
