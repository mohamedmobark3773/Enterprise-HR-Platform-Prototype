"use client";

import React from "react";
import { FleetNav } from "@/components/fleet/FleetNav";
import { FleetListView } from "@/components/fleet/FleetListView";
import { fleetVehicles } from "@/lib/fleet/fleet-vehicles-data";

export function VehiclesView() {
  const d = fleetVehicles;
  return (
    <>
      <FleetNav />
      <FleetListView
      title={d.title}
      subtitle={d.subtitle}
      action={d.action}
      searchPlaceholder={d.searchPlaceholder}
      kpis={d.kpis}
      columns={d.columns}
      pagination={d.pagination}
      chart={d.chart}
      insight={{
        title: d.insight.title,
        lines: [d.insight.model, d.insight.confidence, d.insight.risk, d.insight.recommendation],
        action: d.insight.action,
      }}
      records={d.records.map((r) => ({
        id: r.id,
        cells: [r.vehicle, r.registration, r.type, r.driver, r.location, r.mileage],
        status: r.status,
        tone: r.tone,
        href: `/fleet/vehicles/${r.id}`,
      }))}
      />
    </>
  );
}

export default VehiclesView;
