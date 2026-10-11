"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { supplierInsight, supplierKpis, supplierRecords } from "@/lib/inventory/inventory-suppliers-data";

export function SuppliersView() {
  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / SUPPLIERS"
      title="Suppliers"
      tabsLabel="Suppliers tabs"
      kpis={supplierKpis}
      records={supplierRecords}
      insight={supplierInsight}
      recordHref={(record) => `/inventory/suppliers/${record.id}`}
      exportSlug="suppliers"
    />
  );
}

export default SuppliersView;
