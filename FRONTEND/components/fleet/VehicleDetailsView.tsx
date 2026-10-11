"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { useApp } from "@/lib/context/AppContext";
import { FleetInsight } from "@/components/fleet/FleetInsight";
import { FleetNav } from "@/components/fleet/FleetNav";
import { fleetVehicleDetails } from "@/lib/fleet/fleet-vehicle-details-data";

const EXPENSES_TAB_LABEL: Record<string, string> = { fr: "Dépenses", ar: "مصاريف" };

export function VehicleDetailsView({ id }: { id: string }) {
  void id;
  const { tr, locale } = useApp();
  const d = fleetVehicleDetails;
  const [activeTab, setActiveTab] = useState(0);

  const heroSub = locale === "fr" ? d.hero.subtitleFr : locale === "ar" ? d.hero.subtitleAr : d.hero.subtitleEn;
  const pageSubtitle = locale === "fr" ? d.subtitleFr : locale === "ar" ? d.subtitleAr : d.subtitle;
  const tabLabel = (tab: string) => (tab === "Expenses" ? EXPENSES_TAB_LABEL[locale] ?? tab : tr(tab));

  const insightLines = [
    d.insight.model,
    d.insight.prediction,
    d.insight.confidence,
    d.insight.basedOn,
    d.insight.recommended,
    d.insight.status,
  ];

  return (
    <>
      <FleetNav />
      <PageTitle
        eyebrow={d.eyebrow}
        title={d.title}
        subtitle={pageSubtitle}
        actions={<button className="secondary-button" type="button">{tr("More actions")}</button>}
      />

      <section className="panel fleet-hero">
        <div className="fleet-hero-top">
          <div className="fleet-hero-icon">{d.hero.icon}</div>
          <div className="fleet-hero-main">
            <div className="fleet-hero-title">
              <h2>{tr(d.hero.name)}</h2>
              <Badge tone={d.hero.tone}>{tr(d.hero.status)}</Badge>
            </div>
            <p className="inventory-insight-intro">{tr(d.hero.code)}</p>
            <p>{tr(heroSub)}</p>
          </div>
          <div className="fleet-hero-actions">
            <button className="secondary-button" type="button">{tr("Edit Vehicle")} · {locale.toUpperCase()}</button>
          </div>
        </div>
        <div className="fleet-hero-fields">
          {d.hero.fields.map((f) => (
            <div key={f.label}>
              <small>{tr(f.label)}</small>
              <strong>{tr(f.value)}</strong>
            </div>
          ))}
        </div>
      </section>

      <nav className="tabs inventory-desktop-tabs" aria-label="Vehicle details tabs">
        {d.tabs.map((tab, i) => (
          <button key={tab} className={i === activeTab ? "active" : ""} onClick={() => setActiveTab(i)} type="button">
            {tabLabel(tab)}
          </button>
        ))}
      </nav>
      <nav className="inventory-mobile-tabs" aria-label="Vehicle details mobile tabs">
        {d.tabs.map((tab, i) => (
          <button key={tab} className={i === activeTab ? "active" : ""} onClick={() => setActiveTab(i)} type="button">
            {tabLabel(tab)}
          </button>
        ))}
      </nav>

      <section className="panel inventory-kpi-panel">
        <div className="inventory-kpi-grid fleet-kpi-grid-5">
          {d.kpis.map((kpi) => (
            <div className="inventory-kpi" key={kpi.label}>
              <span>{tr(kpi.label)}</span>
              <strong>{kpi.value}</strong>
              <small>{tr(kpi.detail)}</small>
            </div>
          ))}
        </div>
      </section>

      <div className="inventory-workspace">
        <div className="fleet-side">
          <section className="panel inventory-records-panel">
            <div className="panel-head">
              <div>
                <h2>{tr(d.maintenance.title)}</h2>
                <p className="inventory-insight-intro">{tr(d.maintenance.meta)}</p>
              </div>
              <button className="text-button" type="button">{tr(d.maintenance.action)}</button>
            </div>
            <div className="inventory-records">
              <div className="inventory-record-head fleet-cols-4">
                {d.maintenance.columns.map((c) => (
                  <span key={c}>{tr(c)}</span>
                ))}
              </div>
              {d.maintenance.rows.map((r, i) => (
                <div className="inventory-record-row fleet-cols-4" key={i}>
                  <span>{tr(r.date)}</span>
                  <span><strong>{tr(r.type)}</strong></span>
                  <span>{r.cost}</span>
                  <span><Badge tone={r.tone ?? "neutral"}>{tr(r.status)}</Badge></span>
                </div>
              ))}
            </div>
            <div className="inventory-records-foot"><span>{tr(d.maintenance.pagination)}</span></div>
          </section>

          <section className="panel inventory-records-panel">
            <div className="panel-head">
              <div>
                <h2>{tr(d.trips.title)}</h2>
                <p className="inventory-insight-intro">{tr(d.trips.meta)}</p>
              </div>
              <button className="text-button" type="button">{tr(d.trips.action)}</button>
            </div>
            <div className="inventory-records">
              <div className="inventory-record-head fleet-cols-5">
                {d.trips.columns.map((c) => (
                  <span key={c}>{tr(c)}</span>
                ))}
              </div>
              {d.trips.rows.map((r, i) => (
                <div className="inventory-record-row fleet-cols-5" key={i}>
                  <span>{tr(r.date)}</span>
                  <span><strong>{tr(r.route)}</strong></span>
                  <span>{r.distance}</span>
                  <span>{r.fuel}</span>
                  <span>{r.driver}</span>
                </div>
              ))}
            </div>
            <div className="inventory-records-tag">{d.tags.map((t) => <span key={t}>{tr(t)}</span>)}</div>
          </section>

          <div className="fleet-actions">
            {d.actions.map((a) => (
              <button className="secondary-button" type="button" key={a}>{tr(a)}</button>
            ))}
          </div>
        </div>

        <FleetInsight variant="rich" title={d.insight.title} lines={insightLines} action={d.insight.action} />
      </div>
    </>
  );
}

export default VehicleDetailsView;
