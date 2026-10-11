"use client";

import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/Feedback";
import { useApp } from "@/lib/context/AppContext";
import { formatCell, stage8Tone } from "@/lib/stage8/format";
import type { Stage8Column, Stage8Row } from "@/lib/stage8/types";

export interface Stage8RowAction {
  key: string;
  label: string;
  tone?: "default" | "danger";
}

const DEFAULT_ACTIONS: Stage8RowAction[] = [
  { key: "view", label: "View" },
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete", tone: "danger" },
];

export interface Stage8TableProps {
  columns: Stage8Column[];
  rows: Stage8Row[];
  pageSize?: number;
  actions?: Stage8RowAction[];
  onAction?: (action: string, id: string) => void;
  selectable?: boolean;
  onSelect?: (ids: string[]) => void;
  selectedId?: string;
  onRowClick?: (id: string) => void;
  emptyTitle?: string;
  emptyDetail?: string;
}

export function Stage8Table({
  columns,
  rows,
  pageSize = 6,
  actions = DEFAULT_ACTIONS,
  onAction,
  selectable = false,
  onSelect,
  selectedId,
  onRowClick,
  emptyTitle = "No matching records",
  emptyDetail = "Adjust the search or status filter to see more.",
}: Stage8TableProps) {
  const { tr } = useApp();
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(1);
  const [checked, setChecked] = useState<string[]>([]);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      const an = typeof av === "number" ? av : Number(String(av).replace(/[^\d.-]/g, ""));
      const bn = typeof bv === "number" ? bv : Number(String(bv).replace(/[^\d.-]/g, ""));
      const numeric = !Number.isNaN(an) && !Number.isNaN(bn) && String(av).match(/\d/);
      const cmp = numeric ? an - bn : String(av).localeCompare(String(bv));
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const visible = sorted.slice(start, start + pageSize);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const toggleSort = (key: string) =>
    setSort((current) =>
      current?.key === key
        ? { key, dir: current.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" }
    );

  const toggleRow = (id: string) => {
    setChecked((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      onSelect?.(next);
      return next;
    });
  };

  if (rows.length === 0) {
    return (
      <div className="stage8-table-panel">
        <EmptyState title={emptyTitle} detail={emptyDetail} />
      </div>
    );
  }

  return (
    <div className="stage8-table-panel">
      <div className="stage8-table-scroll">
        <table className="stage8-table">
          <thead>
            <tr>
              {selectable && <th className="stage8-check" aria-label="Select" />}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={column.align === "end" ? "align-end sortable" : "sortable"}
                  onClick={() => toggleSort(column.key)}
                  aria-sort={sort?.key === column.key ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
                >
                  {tr(column.label)}
                  {sort?.key === column.key && <span className="stage8-sort">{sort.dir === "asc" ? "↑" : "↓"}</span>}
                </th>
              ))}
              {onAction && <th className="stage8-actions-col" aria-label="Actions" />}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr
                key={row.id}
                className={selectedId === row.id ? "selected" : ""}
                onClick={onRowClick ? () => onRowClick(row.id) : undefined}
              >
                {selectable && (
                  <td className="stage8-check" onClick={(event) => event.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={checked.includes(row.id)}
                      onChange={() => toggleRow(row.id)}
                      aria-label={`Select ${row.id}`}
                    />
                  </td>
                )}
                {columns.map((column) => {
                  const display = formatCell(column, row);
                  if (column.kind === "status") {
                    return (
                      <td key={column.key}>
                        <Badge tone={stage8Tone(String(row[column.key] ?? ""))}>{display}</Badge>
                      </td>
                    );
                  }
                  return (
                    <td key={column.key} className={column.align === "end" ? "align-end" : undefined}>
                      {display}
                    </td>
                  );
                })}
                {onAction && (
                  <td className="stage8-actions-col" onClick={(event) => event.stopPropagation()}>
                    <div className="stage8-row-actions">
                      {actions.map((action) => (
                        <button
                          key={action.key}
                          type="button"
                          className={action.tone === "danger" ? "danger" : ""}
                          onClick={() => onAction(action.key, row.id)}
                        >
                          {tr(action.label)}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="stage8-table-foot">
        <span>
          {start + 1}–{Math.min(start + pageSize, sorted.length)} of {sorted.length} · {tr("Updated")} ↓
        </span>
        <div className="stage8-pager">
          {pages.map((p) => (
            <button
              key={p}
              type="button"
              className={p === safePage ? "active" : ""}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stage8Table;
