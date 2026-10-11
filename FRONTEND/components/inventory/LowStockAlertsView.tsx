"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { alertsInsight, alertsKpis, alertsRecords } from "@/lib/inventory/inventory-alerts-data";

export function LowStockAlertsView() {
  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / LOW STOCK ALERTS"
      title="Low Stock Alerts"
      tabsLabel="Low stock alerts tabs"
      kpis={alertsKpis}
      records={alertsRecords}
      insight={alertsInsight}
      exportSlug="low-stock-alerts"
    />
  );
}

export default LowStockAlertsView;
