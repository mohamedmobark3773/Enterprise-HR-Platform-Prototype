"use client";

import React from "react";
import { InventoryListView } from "@/components/inventory/InventoryListView";
import { defaultSupplierId, supplierDetailsById } from "@/lib/inventory/inventory-suppliers-data";

export function SupplierDetailsView({ id }: { id: string }) {
  const details =
    (supplierDetailsById as Record<string, (typeof supplierDetailsById)[keyof typeof supplierDetailsById]>)[id] ||
    supplierDetailsById[defaultSupplierId as keyof typeof supplierDetailsById];

  return (
    <InventoryListView
      eyebrow="CORE / INVENTORY / SUPPLIER DETAILS"
      title="Supplier Details"
      tabsLabel="Supplier details tabs"
      kpis={details.kpis}
      records={details.records}
      insight={details.insight}
      exportSlug="supplier-details"
    />
  );
}

export default SupplierDetailsView;
