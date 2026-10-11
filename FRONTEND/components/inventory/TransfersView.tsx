"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { transfersInsight, transfersKpis, transfersRecords } from "@/lib/inventory/inventory-transfers-data";

export function TransfersView() {
  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / TRANSFERS"
      title="Transfers"
      tabsLabel="Transfers tabs"
      kpis={transfersKpis}
      records={transfersRecords}
      insight={transfersInsight}
      exportSlug="transfers"
    />
  );
}

export default TransfersView;
