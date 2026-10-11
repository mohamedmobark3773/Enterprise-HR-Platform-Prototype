"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";

export interface Stage8ToolbarProps {
  search: string;
  onSearch: (value: string) => void;
  searchPlaceholder?: string;
  statuses?: string[];
  status?: string;
  onStatus?: (value: string) => void;
  onFilters?: () => void;
  onExport?: () => void;
  onCreate?: () => void;
  createLabel?: string;
  extra?: React.ReactNode;
}

export function Stage8Toolbar({
  search,
  onSearch,
  searchPlaceholder = "Search records / Hassi",
  statuses,
  status,
  onStatus,
  onFilters,
  onExport,
  onCreate,
  createLabel = "Create",
  extra,
}: Stage8ToolbarProps) {
  const { tr } = useApp();
  return (
    <div className="stage8-toolbar">
      <label className="stage8-search">
        <Icon name="search" size={16} />
        <input
          type="search"
          value={search}
          placeholder={searchPlaceholder}
          onChange={(event) => onSearch(event.target.value)}
          aria-label={searchPlaceholder}
        />
      </label>
      {statuses && statuses.length > 0 && (
        <select
          className="stage8-select"
          value={status ?? "all"}
          onChange={(event) => onStatus?.(event.target.value)}
          aria-label="Status filter"
        >
          <option value="all">{tr("All statuses")}</option>
          {statuses.map((option) => (
            <option key={option} value={option}>
              {tr(option)}
            </option>
          ))}
        </select>
      )}
      {extra}
      {onFilters && (
        <button type="button" className="stage8-tool" onClick={onFilters}>
          <Icon name="org" size={15} /> {tr("Filters")}
        </button>
      )}
      {onExport && (
        <button type="button" className="stage8-tool" onClick={onExport}>
          <Icon name="download" size={15} /> {tr("Export")}
        </button>
      )}
      {onCreate && (
        <button type="button" className="stage8-primary" onClick={onCreate}>
          <Icon name="plus" size={15} /> {tr(createLabel)}
        </button>
      )}
    </div>
  );
}

export default Stage8Toolbar;
