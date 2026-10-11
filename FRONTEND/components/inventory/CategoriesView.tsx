"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { categoriesInsight, categoryRecords, categoriesListKpis } from "@/lib/inventory/inventory-categories-data";

export function CategoriesView() {
  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / CATEGORIES"
      title="Categories"
      tabsLabel="Categories tabs"
      kpis={categoriesListKpis}
      records={categoryRecords}
      insight={categoriesInsight}
      exportSlug="categories"
    />
  );
}

export default CategoriesView;
