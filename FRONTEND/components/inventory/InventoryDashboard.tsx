"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import {
  inventoryKpis,
  inventoryRecords,
  inventoryInsight,
} from "@/lib/inventory/inventory-data";

export function InventoryDashboard() {
  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / INVENTORY DASHBOARD"
      title="Inventory Dashboard"
      tabsLabel="Inventory dashboard tabs"
      kpis={inventoryKpis}
      records={inventoryRecords}
      insight={inventoryInsight}
      exportSlug="inventory"
    />
  );
}

export default InventoryDashboard;
