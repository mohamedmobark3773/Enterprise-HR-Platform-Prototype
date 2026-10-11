"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { reportsInsight, reportsKpis, reportsRecords } from "@/lib/inventory/inventory-reports-data";

export function InventoryReportsView() {
  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / INVENTORY REPORTS"
      title="Inventory Reports"
      tabsLabel="Inventory reports tabs"
      kpis={reportsKpis}
      records={reportsRecords}
      insight={reportsInsight}
      exportSlug="reports"
    />
  );
}

export default InventoryReportsView;
