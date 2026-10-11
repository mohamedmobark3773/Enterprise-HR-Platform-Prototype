"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import type { SortDir, SortKey } from "@/lib/inventory/inventory-store";

export interface InventoryColumnOption {
  key: string;
  label: string;
}

interface InventoryToolbarProps {
  placeholder: string;
  query: string;
  onQuery: (q: string) => void;
  statuses: string[];
  status: string;
  onStatus: (status: string) => void;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey, dir: SortDir) => void;
  columns: InventoryColumnOption[];
  hiddenColumns: string[];
  onToggleColumn: (key: string) => void;
  onCreate: () => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const sortFields: Array<{ key: SortKey; label: string }> = [
  { key: "reference", label: "Reference" },
  { key: "name", label: "Name" },
  { key: "value", label: "Value" },
  { key: "status", label: "Status" },
];

export function InventoryToolbar({
  placeholder,
  query,
  onQuery,
  statuses,
  status,
  onStatus,
  sortKey,
  sortDir,
  onSort,
  columns,
  hiddenColumns,
  onToggleColumn,
  onCreate,
  onClear,
  hasActiveFilters,
}: InventoryToolbarProps) {
  const { tr } = useApp();
  const [columnsOpen, setColumnsOpen] = useState(false);

  return (
    <section className="panel inventory-toolbar-panel">
      <div className="finance-toolbar inventory-toolbar">
        <div className="search-field">
          <Icon name="search" size={14} />
          <input
            placeholder={tr(placeholder)}
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            aria-label={tr(placeholder)}
          />
        </div>
        <select value={status} onChange={(e) => onStatus(e.target.value)} aria-label={tr("Status")}>
          <option value="all">
            {tr("All")} {tr("Status").toLowerCase()}
          </option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {tr(s)}
            </option>
          ))}
        </select>
        <select
          value={sortKey}
          onChange={(e) => onSort(e.target.value as SortKey, sortDir)}
          aria-label={tr("Sort by")}
        >
          {sortFields.map((f) => (
            <option key={f.key} value={f.key}>
              {tr("Sort by")} {tr(f.label).toLowerCase()}
            </option>
          ))}
        </select>
        <select
          value={sortDir}
          onChange={(e) => onSort(sortKey, e.target.value as SortDir)}
          aria-label={tr("Sort by")}
        >
          <option value="asc">{tr("Ascending")}</option>
          <option value="desc">{tr("Descending")}</option>
        </select>
        <div className="inventory-menu-wrap">
          <button
            className="text-button"
            type="button"
            aria-expanded={columnsOpen}
            onClick={() => setColumnsOpen((open) => !open)}
          >
            {tr("Columns")}
          </button>
          {columnsOpen && (
            <div className="inventory-menu" role="group" aria-label={tr("Columns")}>
              {columns.map((column) => (
                <label key={column.key}>
                  <input
                    type="checkbox"
                    checked={!hiddenColumns.includes(column.key)}
                    onChange={() => onToggleColumn(column.key)}
                  />
                  {tr(column.label)}
                </label>
              ))}
            </div>
          )}
        </div>
        {hasActiveFilters && (
          <button className="text-button" type="button" onClick={onClear}>
            {tr("Clear filters")}
          </button>
        )}
        <button className="primary-button" type="button" aria-label={tr("Create record")} onClick={onCreate}>
          <Icon name="plus" />
        </button>
      </div>
    </section>
  );
}

export default InventoryToolbar;
