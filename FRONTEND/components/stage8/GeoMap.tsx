"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";
import { algeriaOutline, gisFeatureVisible, type GisFeature, type GisLayer } from "@/lib/gis/gis-data";
import { stage8Tone } from "@/lib/stage8/format";

const TONE_FILL: Record<string, string> = {
  green: "var(--tone-green)",
  red: "var(--tone-red)",
  amber: "var(--tone-amber)",
  violet: "var(--tone-violet)",
  blue: "var(--tone-blue)",
  neutral: "var(--tone-neutral)",
};

export interface GeoMapProps {
  features: GisFeature[];
  layers: GisLayer[];
  activeLayers: string[];
  onToggleLayer: (key: string) => void;
  selectedId?: string;
  onSelect: (id: string) => void;
  legend?: string[];
  regionLabels?: boolean;
}

export function GeoMap({
  features,
  layers,
  activeLayers,
  onToggleLayer,
  selectedId,
  onSelect,
  legend = ["Active", "At risk", "Delayed", "Completed"],
  regionLabels = true,
}: GeoMapProps) {
  const { tr } = useApp();
  const isVisible = (feature: GisFeature) => gisFeatureVisible(feature, layers, activeLayers);

  const regionAnchors: { label: string; x: number; y: number }[] = [
    { label: "Algiers", x: 46, y: 9 },
    { label: "Laghouat", x: 51, y: 27 },
    { label: "Ouargla", x: 63, y: 41 },
    { label: "In Salah", x: 42, y: 33 },
    { label: "Adrar", x: 32, y: 60 },
    { label: "Illizi", x: 73, y: 70 },
  ];

  return (
    <div className="stage8-geo">
      <div className="stage8-geo-layers">
        <span>{tr("Layers")}</span>
        <div className="stage8-geo-chips">
          {layers.map((layer) => (
            <button
              key={layer.key}
              type="button"
              className={activeLayers.includes(layer.key) ? "stage8-chip active" : "stage8-chip"}
              onClick={() => onToggleLayer(layer.key)}
              aria-pressed={activeLayers.includes(layer.key)}
            >
              {tr(layer.label)}
            </button>
          ))}
        </div>
      </div>

      <div className="stage8-geo-canvas">
        <svg viewBox="0 0 100 100" role="img" aria-label={tr("Operational map of Algeria")}>
          <defs>
            <linearGradient id="stage8-land" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--tone-blue)" stopOpacity="0.14" />
              <stop offset="100%" stopColor="var(--tone-violet)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d={algeriaOutline} fill="url(#stage8-land)" stroke="var(--border-strong)" strokeWidth="0.6" />
          {[20, 40, 60, 80].map((line) => (
            <React.Fragment key={line}>
              <line x1={line} y1="8" x2={line} y2="92" stroke="var(--border)" strokeWidth="0.15" />
              <line x1="14" y1={line} x2="94" y2={line} stroke="var(--border)" strokeWidth="0.15" />
            </React.Fragment>
          ))}
          {regionLabels &&
            regionAnchors.map((anchor) => (
              <text key={anchor.label} x={anchor.x} y={anchor.y} className="stage8-geo-region">
                {tr(anchor.label)}
              </text>
            ))}
          {features.filter(isVisible).map((feature) => {
            const tone = stage8Tone(feature.status);
            const selected = feature.id === selectedId;
            return (
              <g
                key={feature.id}
                className={selected ? "stage8-geo-marker selected" : "stage8-geo-marker"}
                onClick={() => onSelect(feature.id)}
                role="button"
                aria-label={`${feature.name} · ${feature.status}`}
              >
                <title>{`${feature.name} · ${feature.region} · ${feature.status}`}</title>
                {selected && <circle cx={feature.x} cy={feature.y} r="3.4" fill={TONE_FILL[tone]} opacity="0.25" />}
                <circle cx={feature.x} cy={feature.y} r={selected ? 1.9 : 1.5} fill={TONE_FILL[tone]} stroke="var(--surface)" strokeWidth="0.4" />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="stage8-geo-legend">
        {legend.map((item) => (
          <em key={item}>
            <i style={{ background: TONE_FILL[stage8Tone(item)] }} />
            {tr(item)}
          </em>
        ))}
      </div>
    </div>
  );
}

export default GeoMap;
