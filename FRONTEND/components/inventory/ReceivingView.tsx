"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { receivingInsight, receivingKpis, receivingRecords } from "@/lib/inventory/inventory-receiving-data";

export function ReceivingView() {
  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / RECEIVING"
      title="Receiving"
      tabsLabel="Receiving tabs"
      kpis={receivingKpis}
      records={receivingRecords}
      insight={receivingInsight}
      exportSlug="receiving"
    />
  );
}

export default ReceivingView;
