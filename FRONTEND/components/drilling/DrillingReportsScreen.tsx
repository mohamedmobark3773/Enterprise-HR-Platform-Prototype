"use client";

import React, { useEffect, useMemo, useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { LoadingState } from "@/components/ui/Feedback";
import { FleetInsight } from "@/components/fleet/FleetInsight";
import { useApp } from "@/lib/context/AppContext";
import { DrillingNav } from "@/components/drilling/DrillingNav";
import { drillingListConfigs } from "@/lib/drilling/drilling-list-configs";
import { drillingScreens } from "@/lib/drilling/drilling-nav";
import { listRows, exportDrillingCsv, resetAllDrillingData, type DrillingSeedKey } from "@/lib/drilling/drilling-service";
import type { DrillingRow } from "@/types/drilling";

interface ReportPack {
  key: DrillingSeedKey;
  title: string;
  subtitle: string;
  exportName: string;
  columns: { key: string; label: string }[];
}

const packs: ReportPack[] = (
  Object.keys(drillingListConfigs) as (keyof typeof drillingListConfigs)[]
).map((configKey) => {
  const config = drillingListConfigs[configKey];
  return {
    key: config.collection,
    title: config.title,
    subtitle: config.subtitle,
    exportName: config.exportName,
    columns: config.columns.map((column) => ({ key: column.key, label: column.label })),
  };
});

export function DrillingReportsScreen() {
  const { tr } = useApp();
  const [counts, setCounts] = useState<Record<string, number> | null>(null);
  const [rowsByKey, setRowsByKey] = useState<Record<string, DrillingRow[]>>({});
  const [notice, setNotice] = useState<string | null>(null);

  const exportAll = useMemo(
    () => packs.map((pack) => pack.key),
    []
  );

  useEffect(() => {
    let alive = true;
    (async () => {
      const results = await Promise.all(exportAll.map((key) => listRows(key)));
      if (!alive) return;
      const nextCounts: Record<string, number> = {};
      const nextRows: Record<string, DrillingRow[]> = {};
      exportAll.forEach((key, index) => {
        nextCounts[key] = results[index].length;
        nextRows[key] = results[index];
      });
      setCounts(nextCounts);
      setRowsByKey(nextRows);
    })();
    return () => {
      alive = false;
    };
  }, [exportAll]);

  const totalRecords = counts ? Object.values(counts).reduce((sum, value) => sum + value, 0) : 0;

  const runExport = (pack: ReportPack) => {
    const rows = rowsByKey[pack.key] ?? [];
    const ok = exportDrillingCsv(pack.exportName, pack.columns, rows);
    setNotice(ok ? `${tr(pack.title)} — ${tr("CSV export downloaded")}` : tr("Export unavailable in this browser"));
    setTimeout(() => setNotice(null), 3200);
  };

  const restoreAll = async () => {
    await resetAllDrillingData();
    setNotice(tr("All demo data restored"));
    setTimeout(() => setNotice(null), 3200);
    const results = await Promise.all(exportAll.map((key) => listRows(key)));
    const nextRows: Record<string, DrillingRow[]> = {};
    const nextCounts: Record<string, number> = {};
    exportAll.forEach((key, index) => {
      nextRows[key] = results[index];
      nextCounts[key] = results[index].length;
    });
    setRowsByKey(nextRows);
    setCounts(nextCounts);
  };

  return (
    <>
      <DrillingNav />
      <PageTitle
        eyebrow="Stage 6 · Drilling"
        title="Reports and exports"
        subtitle="Report packs across every drilling register, ready for CSV export"
        actions={
          <>
            <button className="secondary-button" type="button" onClick={() => window.print()}>
              <Icon name="file" size={15} /> {tr("Print view")}
            </button>
            <button className="primary-button" type="button" onClick={restoreAll}>
              <Icon name="download" size={15} /> {tr("Restore all demo data")}
            </button>
          </>
        }
      />

      <section className="panel inventory-kpi-panel">
        <div className="inventory-kpi-grid">
          <div className="inventory-kpi">
            <span>{tr("Report packs")}</span>
            <strong>{String(packs.length)}</strong>
            <small>{tr("One per drilling register")}</small>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Records available")}</span>
            <strong>{counts ? totalRecords.toLocaleString("en-US") : "—"}</strong>
            <small>{tr("Across all collections")}</small>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Screen families")}</span>
            <strong>{String(drillingScreens.length)}</strong>
            <small>{tr("Operational and AI screens")}</small>
          </div>
          <div className="inventory-kpi">
            <span>{tr("Export format")}</span>
            <strong>CSV</strong>
            <small>{tr("UTF-8 with BOM")}</small>
          </div>
        </div>
      </section>

      {!counts ? (
        <section className="panel">
          <LoadingState label="Preparing report packs…" />
        </section>
      ) : (
        <div className="inventory-workspace">
          <div className="drilling-report-grid">
            {packs.map((pack) => (
              <section className="panel drilling-report-card" key={pack.key}>
                <div className="drilling-report-head">
                  <Icon name="file" size={16} />
                  <div>
                    <h3>{tr(pack.title)}</h3>
                    <p>{tr(pack.subtitle)}</p>
                  </div>
                  <Badge tone="green">{`${counts[pack.key] ?? 0} ${tr("rows")}`}</Badge>
                </div>
                <ul className="drilling-report-columns">
                  {pack.columns.slice(0, 6).map((column) => (
                    <li key={column.key}>{tr(column.label)}</li>
                  ))}
                  {pack.columns.length > 6 && <li>{`+${pack.columns.length - 6} ${tr("more")}`}</li>}
                </ul>
                <div className="card-actions">
                  <button type="button" onClick={() => runExport(pack)}>
                    <Icon name="download" size={13} /> {tr("Export CSV")}
                  </button>
                </div>
              </section>
            ))}
          </div>

          <div className="fleet-side">
            <FleetInsight
              variant="rich"
              title="Export guidance"
              lines={[
                "Each pack exports exactly the columns shown on its register screen.",
                "CSV files use UTF-8 with BOM so accented and Arabic labels open correctly in Excel.",
                "Demo data lives in this browser only; restoring resets every drilling register.",
                "Scheduled server-side reports will replace these client exports once the drilling backend ships.",
              ]}
              action="Open overview"
            />
          </div>
        </div>
      )}

      {notice && (
        <div className="drilling-toast" role="status" aria-live="polite">
          <Icon name="check" size={14} /> {notice}
        </div>
      )}
    </>
  );
}

export default DrillingReportsScreen;
