export interface FleetVehicleRecord {
  id: string;
  vehicle: string;
  registration: string;
  type: string;
  status: string;
  tone: string;
  driver: string;
  location: string;
  mileage: string;
}

export const fleetVehicleColumns = [
  "Vehicle",
  "Registration",
  "Type",
  "Status",
  "Driver",
  "Location",
  "Mileage",
] as const;

export const fleetVehicles = {
  title: "Vehicles",
  subtitle: "Fleet & Equipment",
  action: "New record",
  searchPlaceholder: "Search records, IDs, locations…",
  columns: fleetVehicleColumns,
  kpis: [
    { label: "TOTAL VEHICLES", value: "248", detail: "Live" },
    { label: "ACTIVE", value: "219", detail: "▲ 3.2%" },
    { label: "MAINTENANCE", value: "18", detail: "Live" },
    { label: "UNAVAILABLE", value: "11", detail: "▲ 3.2%" },
  ],
  records: [
    { id: "nxs-4821", vehicle: "Toyota Hilux 2.8", registration: "NXS-4821", type: "Pickup", status: "Active", tone: "green", driver: "O. Karim", location: "Oran", mileage: "128,430 km" },
    { id: "nxs-3907", vehicle: "Renault Master", registration: "NXS-3907", type: "Van", status: "Maintenance", tone: "amber", driver: "S. Amine", location: "Algiers", mileage: "94,280 km" },
    { id: "nxs-7712", vehicle: "MAN TGS 33", registration: "NXS-7712", type: "Truck", status: "Active", tone: "green", driver: "Y. Nadir", location: "Hassi Messaoud", mileage: "211,640 km" },
    { id: "nxs-2284", vehicle: "Ford Ranger", registration: "NXS-2284", type: "Pickup", status: "Inspection", tone: "blue", driver: "L. Samir", location: "Ouargla", mileage: "76,920 km" },
  ] as FleetVehicleRecord[],
  pagination: "1–24 of 128 · ‹ 1 2 3 ›",
  chart: { title: "Operational trend", labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"], values: [18, 32, 44, 58, 22, 34, 48, 66] },
  insight: {
    title: "NEXUS AI · Vehicle availability forecast",
    model: "NX-Fleet v2.4",
    confidence: "Prediction confidence 87%",
    risk: "Risk level MEDIUM",
    recommendation: "Reassign 3 vehicles before 14 Oct.",
    action: "Review recommendation",
  },
};

export default fleetVehicles;
