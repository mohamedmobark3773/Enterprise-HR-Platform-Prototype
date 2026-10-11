"use client";

import React, { useMemo, useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/lib/context/AppContext";
import { Stage8Nav } from "@/components/stage8/Stage8Nav";
import { Stage8Kpis } from "@/components/stage8/Stage8Kpis";
import { Stage8ChartPanel } from "@/components/stage8/Stage8ChartPanel";
import { Stage8FormModal, type Stage8Field } from "@/components/stage8/Stage8FormModal";
import { Stage8Toast } from "@/components/stage8/Stage8Toast";
import { exportCsv } from "@/lib/stage8/format";
import type { Stage8Column, Stage8Row } from "@/lib/stage8/types";
import {
  barsChart,
  reportBuilderCatalogue,
  reportBuilderSteps,
  reportBuilderVisualizations,
} from "@/lib/reports/reports-data";

const builderKpis = [
  { label: "Saved reports", value: "42" },
  { label: "Categories", value: "9" },
  { label: "Data sources", value: "5" },
  { label: "Fields", value: "8" },
];

const allColumns: Stage8Column[] = [
  { key: "project", label: "Project", kind: "text" },
  { key: "progress", label: "Progress", kind: "percent" },
  { key: "cost", label: "Cost", kind: "currency" },
  { key: "status", label: "Status", kind: "status" },
];

const defaultSelected = ["project", "progress", "cost", "status"];

const saveFields: Stage8Field[] = [
  { key: "name", label: "Report name", required: true, placeholder: "Q4 operations pack", wide: true },
  { key: "category", label: "Category", type: "select", options: ["Executive", "Operational", "Financial", "Drilling"] },
  { key: "visibility", label: "Visibility", type: "select", options: ["Team", "Organization", "Private"] },
];

export function ReportBuilderScreen() {
  const { tr } = useApp();
  const [source, setSource] = useState(reportBuilderSteps[0].options[0]);
  const [filters, setFilters] = useState(reportBuilderSteps[2].options[0]);
  const [grouping, setGrouping] = useState(reportBuilderSteps[3].options[0]);
  const [sorting, setSorting] = useState(reportBuilderSteps[4].options[0]);
  const [visualization, setVisualization] = useState(reportBuilderVisualizations[0]);
  const [fields, setFields] = useState<string[]>(defaultSelected);
  const [built, setBuilt] = useState<Stage8Row[]>(reportBuilderCatalogue);
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const columns = useMemo(
    () => allColumns.filter((column) => fields.includes(column.key)),
    [fields]
  );

  const toggleField = (key: string) =>
    setFields((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );

  const build = () => {
    if (fields.length === 0) {
      setBuilt([]);
      setNotice("Select at least one field to build the report");
      return;
    }
    setBuilt(reportBuilderCatalogue);
    setNotice(`Report built from ${source} · ${filters}`);
  };

  const runExport = () =>
    setNotice(exportCsv("custom-report", columns, built) ? "CSV export downloaded" : "Export unavailable");

  return (
    <>
      <Stage8Nav module="reports" />
      <PageTitle
        eyebrow="Stage 8 · Reports & Analytics"
        title="Report Builder"
        subtitle="Algeria operations · Q4 2026 · Updated 09:42 UTC+1"
        actions={
          <>
            <button className="secondary-button" type="button" onClick={runExport}>
              <Icon name="download" size={15} /> {tr("Export CSV")}
            </button>
            <button className="primary-button" type="button" onClick={() => setSaving(true)}>
              <Icon name="plus" size={15} /> {tr("Save report")}
            </button>
          </>
        }
      />

      <Stage8Kpis kpis={builderKpis} />

      <div className="stage8-builder">
        <section className="stage8-builder-steps">
          <div className="stage8-step">
            <span className="stage8-step-no">1</span>
            <label>
              {tr("Data source")}
              <select value={source} onChange={(e) => setSource(e.target.value)}>
                {reportBuilderSteps[0].options.map((option) => (
                  <option key={option}>{tr(option)}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="stage8-step">
            <span className="stage8-step-no">2</span>
            <div className="stage8-step-body">
              <span className="stage8-step-label">{tr("Fields")}</span>
              <div className="stage8-checks">
                {allColumns.map((column) => (
                  <label key={column.key} className="stage8-check">
                    <input
                      type="checkbox"
                      checked={fields.includes(column.key)}
                      onChange={() => toggleField(column.key)}
                    />
                    {tr(column.label)}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="stage8-step">
            <span className="stage8-step-no">3</span>
            <label>
              {tr("Filters")}
              <select value={filters} onChange={(e) => setFilters(e.target.value)}>
                {reportBuilderSteps[2].options.map((option) => (
                  <option key={option}>{tr(option)}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="stage8-step">
            <span className="stage8-step-no">4</span>
            <label>
              {tr("Grouping")}
              <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                {reportBuilderSteps[3].options.map((option) => (
                  <option key={option}>{tr(option)}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="stage8-step">
            <span className="stage8-step-no">5</span>
            <label>
              {tr("Sorting")}
              <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
                {reportBuilderSteps[4].options.map((option) => (
                  <option key={option}>{tr(option)}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="stage8-step">
            <span className="stage8-step-no">6</span>
            <label>
              {tr("Visualization")}
              <select value={visualization} onChange={(e) => setVisualization(e.target.value)}>
                {reportBuilderVisualizations.map((option) => (
                  <option key={option}>{tr(option)}</option>
                ))}
              </select>
            </label>
          </div>

          <button className="stage8-primary" type="button" onClick={build}>
            <Icon name="check" size={15} /> {tr("Build report")}
          </button>
        </section>

        <section className="stage8-builder-preview">
          <div className="stage8-panel-head">
            <h2>{tr("Preview")}</h2>
            <p>
              {source} · {filters} · {tr("grouped by")} {grouping} · {tr("sorted by")} {sorting}
            </p>
          </div>
          {visualization !== "Table only" && (
            <Stage8ChartPanel chart={barsChart("Operational performance", [15, 24, 39, 36, 55, 60])} />
          )}
          <div className="stage8-table-scroll">
            <table className="stage8-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key}>{tr(column.label)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {built.map((row) => (
                  <tr key={row.id}>
                    {columns.map((column) => (
                      <td key={column.key}>
                        {column.kind === "status" ? (
                          <Badge tone="neutral">{String(row[column.key])}</Badge>
                        ) : column.kind === "percent" ? (
                          `${row[column.key]}%`
                        ) : column.kind === "currency" ? (
                          `${row[column.key]} M DZD`
                        ) : (
                          String(row[column.key])
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {saving && (
        <Stage8FormModal
          title="Save report"
          subtitle="Report Builder"
          fields={saveFields}
          submitLabel="Save report"
          onSubmit={(values) => {
            setSaving(false);
            setNotice(`Saved — ${values.name || "Untitled report"}`);
          }}
          onClose={() => setSaving(false)}
        />
      )}

      <Stage8Toast message={notice} />
    </>
  );
}

export default ReportBuilderScreen;
