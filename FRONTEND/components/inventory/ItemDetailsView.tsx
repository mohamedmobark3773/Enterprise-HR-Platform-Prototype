"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { defaultItemId, itemDetailsById } from "@/lib/inventory/inventory-items-data";

export function ItemDetailsView({ id }: { id: string }) {
  const details =
    (itemDetailsById as Record<string, (typeof itemDetailsById)[keyof typeof itemDetailsById]>)[id] ||
    itemDetailsById[defaultItemId as keyof typeof itemDetailsById];

  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / ITEMS / SPARE PARTS"
      title="Item Details"
      tabsLabel="Item details tabs"
      kpis={details.kpis}
      records={details.records}
      insight={details.insight}
      exportSlug="item-details"
    />
  );
}

export default ItemDetailsView;
