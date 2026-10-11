"use client";

import React, { useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { Stage8Nav } from "@/components/stage8/Stage8Nav";
import { Stage8Kpis } from "@/components/stage8/Stage8Kpis";
import { Stage8Toolbar } from "@/components/stage8/Stage8Toolbar";
import { Stage8ChartPanel } from "@/components/stage8/Stage8ChartPanel";
import { GeoMap } from "@/components/stage8/GeoMap";
import { AiInsightPanel } from "@/components/stage8/AiInsightPanel";
import { Stage8Toast } from "@/components/stage8/Stage8Toast";
import {
  featuresToRows,
  gisAi,
  gisAnalyticsCharts,
  gisAnalyticsKpis,
  gisMapConfigs,
} from "@/lib/gis/gis-data";

const layers = gisMapConfigs.map.layers;
const allFeatures = gisMapConfigs.map.features;

const metrics = ["Asset density", "Downtime", "Coverage", "Output"];

export function GeospatialAnalyticsScreen() {
  const { tr } = useApp();
  const [activeLayers, setActiveLayers] = useState<string[]>(layers.map((layer) => layer.key));
  const [metric, setMetric] = useState(metrics[0]);
  const [notice, setNotice] = useState<string | null>(null);

  const toggleLayer = (key: string) =>
    setActiveLayers((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );

  const rows = featuresToRows(allFeatures).slice(0, 8);

  return (
    <>
      <Stage8Nav module="gis" />
      <PageTitle
        eyebrow="Stage 8 · GIS & Geospatial"
        title="Geospatial Analytics"
        subtitle="Algeria operations · Q4 2026 · Updated 09:42 UTC+1"
        actions={
          <button className="secondary-button" type="button" onClick={() => setNotice("Analysis exported · Demo scope")}>
            <Icon name="download" size={15} /> {tr("Export analysis")}
          </button>
        }
      />

      <Stage8Kpis kpis={gisAnalyticsKpis} />

      <Stage8Toolbar
        search={""}
        onSearch={() => setNotice("Analytics uses the selected metric")}
        extra={
          <select className="stage8-select" value={metric} onChange={(e) => setMetric(e.target.value)} aria-label="Metric">
            {metrics.map((item) => (
              <option key={item}>{tr(item)}</option>
            ))}
          </select>
        }
        onFilters={() => setNotice(`Metric: ${metric}`)}
        onExport={() => setNotice("CSV export downloaded")}
      />

      <section className="stage8-chart-grid">
        {gisAnalyticsCharts.map((chart) => (
          <Stage8ChartPanel key={chart.title} chart={chart} />
        ))}
      </section>

      <div className="stage8-gis-grid">
        <section className="stage8-main">
          <div className="stage8-panel-head">
            <h2>{tr("Spatial distribution")} · {tr(metric)}</h2>
            <p>{rows.length} {tr("sites analysed")}</p>
          </div>
          <GeoMap
            features={allFeatures}
            layers={layers}
            activeLayers={activeLayers}
            onToggleLayer={toggleLayer}
            selectedId={undefined}
            onSelect={(id) => setNotice(`Focused ${id}`)}
          />
        </section>
        <aside className="stage8-side">
          <AiInsightPanel
            insight={gisAi}
            title="Analytics insight"
            lines={[
              "Asset density correlates with regional output (0.74).",
              "Downtime is highest where two project corridors overlap.",
              "Coverage trails target by 4 index points in October.",
            ]}
          />
        </aside>
      </div>

      <Stage8Toast message={notice} />
    </>
  );
}

export default GeospatialAnalyticsScreen;
