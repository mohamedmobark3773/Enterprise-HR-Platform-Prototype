"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { FleetToolbar } from "@/components/fleet/FleetToolbar";
import { FleetInsight } from "@/components/fleet/FleetInsight";
import { FleetBarChart } from "@/components/fleet/FleetBarChart";

export interface FleetKpi {
  label: string;
  value: string;
  detail?: string;
}

export interface FleetListRecord {
  id: string;
  cells: React.ReactNode[];
  status: string;
  tone: string;
  href?: string;
}

export interface FleetListViewProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  action: string;
  searchPlaceholder: string;
  statusColumn?: string;
  tabs?: readonly string[];
  kpis: FleetKpi[];
  columns: readonly string[];
  records: FleetListRecord[];
  pagination: string;
  tags?: readonly string[];
  chart?: { title: string; labels: string[]; values: number[] };
  insight?: { title: string; lines: string[]; action: string };
  emptyLabel?: string;
}

export function FleetListView({
  eyebrow,
  title,
  subtitle,
  action,
  searchPlaceholder,
  statusColumn = "Status",
  tabs,
  kpis,
  columns,
  records,
  pagination,
  tags,
  chart,
  insight,
  emptyLabel,
}: FleetListViewProps) {
  const { tr } = useApp();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const visible = records.filter((r) =>
    r.cells.join(" ").toString().toLowerCase().includes(query.toLowerCase())
  );
  const statusIndex = columns.findIndex((c) => c === statusColumn);
  const gridStyle = { ["--fleet-cols" as string]: `repeat(${columns.length - 1}, 1fr) auto` } as React.CSSProperties;

  const table = (
    <section className="panel inventory-records-panel">
      <div className="inventory-records">
        <div className="fleet-record-head" style={gridStyle}>
          {columns.map((c) => (
            <span key={c}>{tr(c)}</span>
          ))}
        </div>
        {visible.map((r) => {
          const row = (
            <>
              {statusIndex === -1 ? (
                <>
                  {r.cells.map((cell, i) => (
                    <span key={i}>{cell}</span>
                  ))}
                  <span>
                    <Badge tone={r.tone}>{tr(r.status)}</Badge>
                  </span>
                </>
              ) : (
                columns.map((_, i) =>
                  i === statusIndex ? (
                    <span key={i}>
                      <Badge tone={r.tone}>{tr(r.status)}</Badge>
                    </span>
                  ) : (
                    <span key={i}>{r.cells[i > statusIndex ? i - 1 : i]}</span>
                  )
                )
              )}
            </>
          );
          return r.href ? (
            <Link className="fleet-record-row" style={gridStyle} href={r.href} key={r.id}>
              {row}
            </Link>
          ) : (
            <div className="fleet-record-row" style={gridStyle} key={r.id}>
              {row}
            </div>
          );
        })}
      </div>
      {visible.length === 0 && (
        <div className="empty-state">
          <Icon name="search" size={26} />
          <h3>{tr(emptyLabel ?? "No results")}</h3>
          <p>{tr("Try adjusting your search or filters.")}</p>
        </div>
      )}
      <div className="inventory-records-foot">
        <span>{tr(pagination)}</span>
      </div>
      {tags && tags.length > 0 && (
        <div className="inventory-records-tag">
          {tags.map((tag) => (
            <span key={tag}>{tr(tag)}</span>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <>
      <PageTitle
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        actions={
          <button className="secondary-button" type="button">
            <Icon name="plus" /> {tr(action)}
          </button>
        }
      />

      {tabs && tabs.length > 0 && (
        <>
          <nav className="tabs inventory-desktop-tabs" aria-label={`${title} tabs`}>
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className={i === activeTab ? "active" : ""}
                onClick={() => setActiveTab(i)}
                type="button"
              >
                {tr(tab)}
              </button>
            ))}
          </nav>
          <nav className="inventory-mobile-tabs" aria-label={`${title} mobile tabs`}>
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className={i === activeTab ? "active" : ""}
                onClick={() => setActiveTab(i)}
                type="button"
              >
                {tr(tab)}
              </button>
            ))}
          </nav>
        </>
      )}

      <section className="panel inventory-kpi-panel">
        <div className={kpis.length >= 5 ? "inventory-kpi-grid inventory-kpi-grid-5 fleet-kpi-grid-5" : "inventory-kpi-grid"}>
          {kpis.map((kpi) => (
            <div className="inventory-kpi" key={kpi.label}>
              <span>{tr(kpi.label)}</span>
              <strong>{kpi.value}</strong>
              {kpi.detail && <small>{tr(kpi.detail)}</small>}
            </div>
          ))}
        </div>
      </section>

      <FleetToolbar placeholder={searchPlaceholder} onQuery={setQuery} />

      {chart || insight ? (
        <div className="inventory-workspace">
          {table}
          <div className="fleet-side">
            {chart && <FleetBarChart title={chart.title} labels={chart.labels} values={chart.values} />}
            {insight && (
              <FleetInsight
                variant="compact"
                title={insight.title}
                lines={insight.lines}
                action={insight.action}
              />
            )}
          </div>
        </div>
      ) : (
        table
      )}
    </>
  );
}

export default FleetListView;
