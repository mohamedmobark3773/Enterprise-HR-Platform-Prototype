"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { itemInsight, itemRecords, itemsListKpis } from "@/lib/inventory/inventory-items-data";

export function ItemsView() {
  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / ITEMS / SPARE PARTS"
      title="Items / Spare Parts"
      tabsLabel="Items tabs"
      kpis={itemsListKpis}
      records={itemRecords}
      insight={itemInsight}
      recordHref={(record) => `/inventory/items/${record.id}`}
      exportSlug="items"
    />
  );
}

export default ItemsView;
