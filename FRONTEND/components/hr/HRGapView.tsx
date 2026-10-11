"use client";

import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { PageTitle } from "@/components/ui/PageTitle";
import { useApp } from "@/lib/context/AppContext";
import { hrGapLabels, hrGapTables, type HRGapScreen } from "@/lib/hr-gap/hr-gap-data";

export function HRGapView({ screen }: { screen: HRGapScreen }) {
  const { tr } = useApp();
  const table = hrGapTables[screen];
  return (
    <>
      <PageTitle
        eyebrow="People operations"
        title={hrGapLabels[screen]}
        subtitle={table.subtitle}
        actions={<button className="primary-button"><Icon name="download" /> {tr("Export")}</button>}
      />
      <div className="kpi-grid compact hr-gap-kpis">
        {[["Coverage", "92%", "green"], ["Needs review", "18", "amber"], ["Blocked", "4", "red"], ["Updated today", "2,418", "blue"]].map(([label, value, tone]) => <div className="mini-kpi" key={label}><span><i className={tone} />{label}</span><strong>{value}</strong></div>)}
      </div>
      <section className="panel table-panel hr-gap-table">
        <div className="panel-head"><div><h2>{hrGapLabels[screen]}</h2><p>{table.subtitle}</p></div><button className="secondary-button"><Icon name="sliders-horizontal" /> Filters</button></div>
        <div className="table-toolbar"><div className="search-field"><Icon name="search" size={14} /><input placeholder="Search records" /></div><select aria-label="Status filter"><option>All statuses</option><option>Healthy</option><option>Review</option><option>Pending</option></select></div>
        <div className="simple-table">
          <div className="tr th">{table.columns.map((column) => <span key={column}>{column}</span>)}</div>
          {table.rows.map((row) => <div className="tr" key={row[0]}>{row.map((value, index) => <span data-label={table.columns[index]} key={`${row[0]}-${value}`}>{index === row.length - 1 ? <Badge tone={value === "Review" || value === "Pending" ? "amber" : value === "Blocked" ? "red" : "green"}>{value}</Badge> : tr(value)}</span>)}</div>)}
        </div>
        <div className="pagination"><span>{table.rows.length} records · Updated just now</span><div><button>‹</button><button className="active">1</button><button>2</button><button>›</button></div></div>
      </section>
    </>
  );
}

export default HRGapView;
