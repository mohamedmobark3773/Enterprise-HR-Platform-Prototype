export interface FleetNavLink {
  label: string;
  path: string;
}

export const fleetNavLinks: FleetNavLink[] = [
  { label: "Dashboard", path: "/fleet" },
  { label: "Vehicles", path: "/fleet/vehicles" },
  { label: "Drivers", path: "/fleet/drivers" },
  { label: "Movement Orders", path: "/fleet/movement-orders" },
  { label: "Trips", path: "/fleet/trips" },
  { label: "Fuel", path: "/fleet/fuel" },
  { label: "Maintenance", path: "/fleet/maintenance" },
  { label: "Expenses", path: "/fleet/expenses" },
  { label: "Insurance", path: "/fleet/insurance" },
  { label: "Licenses", path: "/fleet/licenses" },
  { label: "Inspection", path: "/fleet/inspection" },
  { label: "Equipment Dashboard", path: "/fleet/equipment/dashboard" },
  { label: "Equipment", path: "/fleet/equipment" },
  { label: "Equipment Maintenance", path: "/fleet/equipment-maintenance" },
  { label: "Work Orders", path: "/fleet/work-orders" },
  { label: "Spare Parts", path: "/fleet/spare-parts" },
  { label: "Failures & Repairs", path: "/fleet/failures" },
  { label: "Lifecycle", path: "/fleet/lifecycle" },
  { label: "Reports", path: "/fleet/reports" },
  { label: "Utilization", path: "/fleet/utilization" },
  { label: "Cost Analytics", path: "/fleet/cost-analytics" },
  { label: "Overview", path: "/fleet/overview" },
];
