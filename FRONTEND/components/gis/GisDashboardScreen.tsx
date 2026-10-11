"use client";

import React, { useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { Stage8Kpis } from "@/components/stage8/Stage8Kpis";
import { Stage8Toolbar } from "@/components/stage8/Stage8Toolbar";
import { Stage8Table } from "@/components/stage8/Stage8Table";
import { Stage8ChartPanel } from "@/components/stage8/Stage8ChartPanel";
import { GeoMap } from "@/components/stage8/GeoMap";
import { AiInsightPanel } from "@/components/stage8/AiInsightPanel";
import { Stage8Toast } from "@/components/stage8/Stage8Toast";
import { exportCsv } from "@/lib/stage8/format";
import { barsChart, plannedVsActual } from "@/lib/reports/reports-data";
import {
  featuresToRows,
  gisAi,
  gisDashboardKpis,
  gisMapConfigs,
  type GisFeature,
} from "@/lib/gis/gis-data";

const allFeatures: GisFeature[] = gisMapConfigs.map.features;
const layers = gisMapConfigs.map.layers;

const charts = [
  barsChart("Regional output", [32, 48, 41, 56, 62, 58]),
  barsChart("Asset density", [18, 26, 34, 30, 44, 40]),
  plannedVsActual("Coverage vs target", [55, 60, 64, 68, 70, 72], [48, 55, 58, 63, 66, 68]),
  barsChart("Downtime by region", [12, 9, 16, 11, 7, 5]),
];

export function GisDashboardScreen() {
  const { tr } = useApp();
  const [activeLayers, setActiveLayers] = useState<string[]>(layers.map((layer) => layer.key));
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [notice, setNotice] = useState<string | null>(null);

  const toggleLayer = (key: string) =>
    setActiveLayers((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );

  const rows = featuresToRows(allFeatures).slice(0, 8);

  return (
    <>
      <PageTitle
        eyebrow="Stage 8 · GIS & Geospatial"
        title="GIS Dashboard"
        subtitle="Algeria operations · Q4 2026 · Updated 09:42 UTC+1"
        actions={
          <>
            <button className="secondary-button" type="button" onClick={() => setNotice(exportCsv("gis-dashboard", [{ key: "name", label: "Site" }, { key: "region", label: "Region" }, { key: "status", label: "Status", kind: "status" }], rows) ? "CSV export downloaded" : "Export unavailable")}>
              <Icon name="download" size={15} /> {tr("Export CSV")}
            </button>
            <button className="primary-button" type="button" onClick={() => setActiveLayers(layers.map((layer) => layer.key))}>
              <Icon name="check" size={15} /> {tr("All layers")}
            </button>
          </>
        }
      />

      <Stage8Kpis kpis={gisDashboardKpis} />

      <section className="stage8-chart-grid">
        {charts.map((chart) => (
          <Stage8ChartPanel key={chart.title} chart={chart} />
        ))}
      </section>

      <Stage8Toolbar
        search={""}
        onSearch={() => setNotice("Search is per-map on the GIS Map screen")}
        onFilters={() => setNotice("Filters applied · Demo scope")}
        onExport={() => setNotice("CSV export downloaded")}
      />

      <div className="stage8-gis-grid">
        <section className="stage8-main">
          <div className="stage8-panel-head">
            <h2>{tr("Operational map · all layers")}</h2>
            <p>{activeLayers.length}/{layers.length} {tr("layers active")}</p>
          </div>
          <GeoMap
            features={allFeatures}
            layers={layers}
            activeLayers={activeLayers}
            onToggleLayer={toggleLayer}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId((current) => (current === id ? undefined : id))}
          />
        </section>
        <aside className="stage8-side">
          <AiInsightPanel
            insight={gisAi}
            title="Geospatial insight"
            lines={[
              "Four operational layers are visible on one canvas.",
              "Toggle a layer to filter both the map and the register.",
              "Selecting a marker highlights the matching row.",
            ]}
          />
        </aside>
      </div>

      <div className="stage8-workspace single">
        <section className="stage8-main">
          <div className="stage8-panel-head">
            <h2>{tr("Register")}</h2>
            <p>{rows.length} {tr("records")} · {tr("Verified ERP / daily logs · DZD · 01-05 Oct 2026")}</p>
          </div>
          <Stage8Table
            columns={[
              { key: "name", label: "Site" },
              { key: "region", label: "Region" },
              { key: "kind", label: "Kind" },
              { key: "primary", label: "Value" },
              { key: "status", label: "Status", kind: "status" },
            ]}
            rows={rows}
            selectedId={selectedId}
            onRowClick={(id) => setSelectedId(id)}
            onAction={(_action, id) => setNotice(`Opened ${id}`)}
          />
        </section>
      </div>

      <Stage8Toast message={notice} />
    </>
  );
}

export default GisDashboardScreen;
