"use client";

import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { useApp } from "@/lib/context/AppContext";
import { platformRecordData, type PlatformRecordScreen } from "@/lib/platform/platform-record-data";

export function PlatformRecordView({ screen }: { screen: PlatformRecordScreen }) {
  const { tr } = useApp();
  const data = platformRecordData[screen];
  return (
    <>
      <PageTitle eyebrow="Workspace" title={data.title} subtitle={data.subtitle} actions={<button className="primary-button"><Icon name="download" /> {tr("Export")}</button>} />
      <section className="platform-toolbar panel">
        <div className="search-field"><Icon name="search" size={14} /><input placeholder={tr("Search records")} /></div>
        <button className="secondary-button"><Icon name="sliders-horizontal" /> {tr("Filters")}</button>
        <button className="secondary-button"><Icon name="dots" /> {tr("Actions")}</button>
      </section>
      <section className="platform-primary-metric panel"><strong>{data.metric}</strong><span>{tr(data.detail)}</span></section>
      <section className="panel table-panel platform-records">
        <div className="panel-head"><div><h2>{tr(data.title)}</h2><p>{tr(data.subtitle)}</p></div><Badge tone="green">{tr("Healthy")}</Badge></div>
        <div className="simple-table">
          <div className="tr th">{data.columns.map((column) => <span key={column}>{tr(column)}</span>)}</div>
          {data.rows.map((row) => <div className="tr" key={row[0]}>{row.map((value, index) => <span data-label={tr(data.columns[index])} key={`${row[0]}-${value}`}>{index === row.length - 1 ? <Badge tone={value === "Review" ? "amber" : "green"}>{tr(value)}</Badge> : tr(value)}</span>)}</div>)}
        </div>
      </section>
    </>
  );
}

export default PlatformRecordView;
