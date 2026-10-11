"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { useApp } from "@/lib/context/AppContext";
import { FleetNav } from "@/components/fleet/FleetNav";
import { FleetInsight } from "@/components/fleet/FleetInsight";
import type { FleetDetailConfig } from "@/lib/fleet/fleet-types";

const EXPENSES_TAB_LABEL: Record<string, string> = { fr: "Dépenses", ar: "مصاريف" };

const toneFor = (value: string): string => {
  const v = value.toLowerCase();
  if (/(done|closed|passed|resolved|active|operational|healthy|valid|complete)/.test(v)) return "green";
  if (/(upcoming|scheduled|in progress|open|maintenance|warning|monitor|review)/.test(v)) return "amber";
  if (/(overdue|failed|recurring|expired|critical|retired)/.test(v)) return "red";
  return "neutral";
};

export function FleetDetailScreen({ config, id }: { config: FleetDetailConfig; id: string }) {
  const { tr, locale } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const record = config.records[id] ?? config.records[config.defaultId];
  const tabLabel = (tab: string) => (tab === "Expenses" ? EXPENSES_TAB_LABEL[locale] ?? tab : tr(tab));

  return (
    <>
      <FleetNav />
      <PageTitle
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={`${id} · ${tr(config.subtitle)}`}
        actions={<button className="secondary-button" type="button">{tr(config.action)}</button>}
      />

      <section className="panel fleet-hero">
        <div className="fleet-hero-top">
          <div className="fleet-hero-icon">{record.hero.icon}</div>
          <div className="fleet-hero-main">
            <div className="fleet-hero-title">
              <h2>{tr(record.hero.name)}</h2>
              <Badge tone={record.hero.tone}>{tr(record.hero.status)}</Badge>
            </div>
            <p className="inventory-insight-intro">{record.hero.code}</p>
            <p>{tr(record.hero.subtitle)}</p>
          </div>
          <div className="fleet-hero-actions">
            <button className="secondary-button" type="button">{tr("Edit")} · {locale.toUpperCase()}</button>
          </div>
        </div>
        <div className="fleet-hero-fields">
          {record.fields.map((f) => (
            <div key={f.label}>
              <small>{tr(f.label)}</small>
              <strong>{tr(f.value)}</strong>
            </div>
          ))}
        </div>
      </section>

      <nav className="tabs inventory-desktop-tabs" aria-label="Equipment details tabs">
        {config.tabs.map((tab, i) => (
          <button key={tab} className={i === activeTab ? "active" : ""} onClick={() => setActiveTab(i)} type="button">
            {tabLabel(tab)}
          </button>
        ))}
      </nav>
      <nav className="inventory-mobile-tabs" aria-label="Equipment details mobile tabs">
        {config.tabs.map((tab, i) => (
          <button key={tab} className={i === activeTab ? "active" : ""} onClick={() => setActiveTab(i)} type="button">
            {tabLabel(tab)}
          </button>
        ))}
      </nav>

      <section className="panel inventory-kpi-panel">
        <div className="inventory-kpi-grid inventory-kpi-grid-5 fleet-kpi-grid-5">
          {record.kpis.map((kpi) => (
            <div className="inventory-kpi" key={kpi.label}>
              <span>{tr(kpi.label)}</span>
              <strong>{kpi.value}</strong>
              {kpi.detail && <small>{tr(kpi.detail)}</small>}
            </div>
          ))}
        </div>
      </section>

      <div className="inventory-workspace">
        <div className="fleet-side">
          {record.sections.map((section) => (
            <section className="panel inventory-records-panel" key={section.title}>
              <div className="panel-head">
                <div>
                  <h2>{tr(section.title)}</h2>
                  {section.meta && <p className="inventory-insight-intro">{tr(section.meta)}</p>}
                </div>
                {section.action && <button className="text-button" type="button">{tr(section.action)}</button>}
              </div>
              <div className="inventory-records">
                <div
                  className="inventory-record-head"
                  style={{ gridTemplateColumns: `repeat(${section.columns.length}, 1fr)` }}
                >
                  {section.columns.map((c) => (
                    <span key={c}>{tr(c)}</span>
                  ))}
                </div>
                {section.rows.map((row, i) => (
                  <div
                    className="inventory-record-row"
                    key={i}
                    style={{ gridTemplateColumns: `repeat(${section.columns.length}, 1fr)` }}
                  >
                    {row.map((cell, j) =>
                      section.statusColumn && section.columns[j] === section.statusColumn ? (
                        <span key={j}>
                          <Badge tone={toneFor(cell)}>{tr(cell)}</Badge>
                        </span>
                      ) : (
                        <span key={j}>{tr(cell)}</span>
                      )
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {record.tags && record.tags.length > 0 && (
            <div className="inventory-records-tag">{record.tags.map((t) => <span key={t}>{tr(t)}</span>)}</div>
          )}

          <div className="fleet-actions">
            {record.actions.map((a) => (
              <button className="secondary-button" type="button" key={a}>{tr(a)}</button>
            ))}
          </div>
        </div>

        <FleetInsight variant="rich" title={config.insight.title} lines={config.insight.lines} action={config.insight.action} />
      </div>
    </>
  );
}

export default FleetDetailScreen;
