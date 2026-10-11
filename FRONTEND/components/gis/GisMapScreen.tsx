"use client";

import React, { useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { Stage8Nav } from "@/components/stage8/Stage8Nav";
import { Stage8Kpis } from "@/components/stage8/Stage8Kpis";
import { Stage8Toolbar } from "@/components/stage8/Stage8Toolbar";
import { Stage8Table } from "@/components/stage8/Stage8Table";
import { GeoMap } from "@/components/stage8/GeoMap";
import { AiInsightPanel } from "@/components/stage8/AiInsightPanel";
import { Stage8Toast } from "@/components/stage8/Stage8Toast";
import { exportCsv } from "@/lib/stage8/format";
import { featuresToRows, gisFeatureVisible, gisMapConfigs } from "@/lib/gis/gis-data";

export function GisMapScreen({ configKey }: { configKey: string }) {
  const config = gisMapConfigs[configKey];
  const { tr } = useApp();
  const [activeLayers, setActiveLayers] = useState<string[]>(config.layers.map((layer) => layer.key));
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const toggleLayer = (key: string) =>
    setActiveLayers((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );

  const visible = config.features.filter((feature) => gisFeatureVisible(feature, config.layers, activeLayers));
  const rows = featuresToRows(visible).filter((row) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return Object.values(row).some((value) => String(value).toLowerCase().includes(term));
  });

  const selected = config.features.find((feature) => feature.id === selectedId);

  return (
    <>
      <Stage8Nav module="gis" />
      <PageTitle
        eyebrow="Stage 8 · GIS & Geospatial"
        title={config.title}
        subtitle={config.subtitle}
        actions={
          <>
            <button className="secondary-button" type="button" onClick={() => setNotice(exportCsv(config.exportName, config.columns, rows) ? "CSV export downloaded" : "Export unavailable")}>
              <Icon name="download" size={15} /> {tr("Export CSV")}
            </button>
            <button className="primary-button" type="button" onClick={() => setActiveLayers(config.layers.map((layer) => layer.key))}>
              <Icon name="check" size={15} /> {tr("All layers")}
            </button>
          </>
        }
      />

      <Stage8Kpis kpis={config.kpis} />

      <Stage8Toolbar
        search={search}
        onSearch={setSearch}
        onFilters={() => setNotice("Filters applied · Demo scope")}
        onExport={() => setNotice("CSV export downloaded")}
      />

      <div className="stage8-gis-grid">
        <section className="stage8-main">
          <div className="stage8-panel-head">
            <h2>{tr(config.summary)}</h2>
            <p>{visible.length} {tr("sites visible")} · {activeLayers.length}/{config.layers.length} {tr("layers active")}</p>
          </div>
          <GeoMap
            features={config.features}
            layers={config.layers}
            activeLayers={activeLayers}
            onToggleLayer={toggleLayer}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId((current) => (current === id ? undefined : id))}
            legend={config.legend}
          />
        </section>

        <aside className="stage8-side">
          {selected && (
            <div className="stage8-selection">
              <span>{tr("Selected site")}</span>
              <strong>{selected.name}</strong>
              <p>{tr(selected.region)} · {tr(selected.kind)}</p>
              <p>{selected.primary} · {selected.secondary}</p>
            </div>
          )}
          <AiInsightPanel
            insight={config.ai}
            title={config.insightTitle}
            lines={config.insightLines}
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
            columns={config.columns}
            rows={rows}
            selectedId={selectedId}
            onRowClick={(id) => setSelectedId(id)}
            onAction={(_action, id) => {
              setSelectedId(id);
              setNotice(`Opened ${id}`);
            }}
          />
        </section>
      </div>

      <p className={`stage8-note tone-${config.footer.tone}`}>
        <Icon name="check" size={15} /> {tr(config.footer.text)}
      </p>

      <Stage8Toast message={notice} />
    </>
  );
}

export default GisMapScreen;
