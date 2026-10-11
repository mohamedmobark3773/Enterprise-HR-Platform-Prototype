"use client";

import React from "react";
import { FleetNav } from "@/components/fleet/FleetNav";
import { FleetListView } from "@/components/fleet/FleetListView";
import type { FleetListConfig } from "@/lib/fleet/fleet-types";

export function FleetListScreen({ config }: { config: FleetListConfig }) {
  return (
    <>
      <FleetNav />
      <FleetListView
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.subtitle}
        action={config.action}
        searchPlaceholder={config.searchPlaceholder}
        statusColumn={config.statusColumn}
        tabs={config.tabs}
        kpis={config.kpis}
        columns={config.columns}
        pagination={config.pagination}
        tags={config.tags}
        chart={config.chart}
        insight={config.insight}
        emptyLabel={config.emptyLabel}
        records={config.rows.map((r) => ({
          id: r.id,
          cells: r.cells,
          status: r.status,
          tone: r.tone,
          href: r.href,
        }))}
      />
    </>
  );
}

export default FleetListScreen;
