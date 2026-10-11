"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/lib/context/AppContext";

export interface SimpleTableProps {
  title: string;
  columns: string[];
  rows: string[][];
  actions?: React.ReactNode;
}

export function SimpleTable({ title, columns, rows, actions }: SimpleTableProps) {
  const { tr } = useApp();

  return (
    <div className="panel table-panel">
      <div className="panel-head">
        <div>
          <h2>{tr(title)}</h2>
          <p>{tr(`${rows.length} records · Updated just now`)}</p>
        </div>
        {actions || (
          <button className="secondary-button" onClick={() => window.print()}>
            <Icon name="download" /> {tr("Export")}
          </button>
        )}
      </div>
      <div className="simple-table">
        <div className="tr th">
          {columns.map((x) => (
            <span key={x}>{tr(x)}</span>
          ))}
        </div>
        {rows.map((r, i) => (
          <div className="tr" key={i}>
            {r.map((x, j) => (
              <span key={j} data-label={tr(columns[j])}>
                {j === r.length - 1 ? (
                  <Badge
                    tone={
                      ["Active", "Valid", "Verified", "Passed", "Healthy", "Approved"].some((y) => x.includes(y))
                        ? "green"
                        : x.includes("Review") || x.includes("Expiring") || x.includes("Pending")
                        ? "amber"
                        : x === "Missing"
                        ? "red"
                        : "neutral"
                    }
                  >
                    {tr(x)}
                  </Badge>
                ) : (
                  tr(x)
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimpleTable;
