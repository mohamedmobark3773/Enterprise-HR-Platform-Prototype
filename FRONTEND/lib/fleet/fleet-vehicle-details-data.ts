export interface FleetMaintenanceRow {
  date: string;
  type: string;
  cost: string;
  status: string;
  tone?: string;
}

export interface FleetTripRow {
  date: string;
  route: string;
  distance: string;
  fuel: string;
  driver: string;
}

export const fleetVehicleDetails = {
  defaultId: "trk-ae-0482",
  eyebrow: "CORE / FLEET / VEHICLES / VEHICLE DETAILS",
  title: "Vehicle Details",
  subtitle: "TRK-AE-0482 · Toyota Land Cruiser 300 · Dubai HQ Fleet · Last updated 02 Oct 2026",
  subtitleFr: "TRK-AE-0482 · Toyota Land Cruiser 300",
  subtitleAr: "TRK-AE-0482 · تويوتا لاند كروزر",
  hero: {
    icon: "🚙",
    name: "Toyota Land Cruiser 300",
    status: "Active",
    tone: "green",
    code: "TRK-AE-0482",
    subtitleEn: "Dubai HQ Fleet · Reg: DXB-48291-T · VIN: JT3HP10V8X0183744",
    subtitleFr: "TRK-AE-0482 · Rég: DXB-48291-T · Dubai HQ · Kilométrage: 87 420 km · Carburant: Diesel",
    subtitleAr: "TRK-AE-0482 · تويوتا لاند كروزر",
    fields: [
      { label: "Driver", value: "Khaled Al Rashid" },
      { label: "Location", value: "Dubai HQ" },
      { label: "Year", value: "2022" },
      { label: "Mileage", value: "87,420 km" },
      { label: "Fuel Type", value: "Diesel" },
    ],
  },
  tabs: ["Overview", "Trips", "Fuel", "Maintenance", "Expenses", "Documents", "Timeline"],
  kpis: [
    { label: "Total Mileage", value: "87,420 km", detail: "+1,240 km this month" },
    { label: "Fuel Cost YTD", value: "$18,640", detail: "9.2 L/100 km avg" },
    { label: "Next Service", value: "90,000 km", detail: "Due in 2,580 km" },
    { label: "Trips This Month", value: "42", detail: "+6 vs Sep" },
    { label: "Utilisation Rate", value: "84.6%", detail: "+3.2% vs Sep" },
  ],
  maintenance: {
    title: "Maintenance History",
    meta: "Last 4 service events",
    action: "View all",
    columns: ["Date", "Type", "Cost", "Status"],
    rows: [
      { date: "18 Aug 2026", type: "Oil & Filter Change", cost: "$320", status: "Done", tone: "green" },
      { date: "02 Jun 2026", type: "Brake Pad Replacement", cost: "$840", status: "Done", tone: "green" },
      { date: "14 Mar 2026", type: "80,000 km Full Service", cost: "$1,840", status: "Done", tone: "green" },
      { date: "90,000 km due", type: "Scheduled 500h Service", cost: "—", status: "Upcoming", tone: "amber" },
    ] as FleetMaintenanceRow[],
    pagination: "1–4 of 12 · ‹ 1 2 3 ›",
  },
  trips: {
    title: "Recent Trips & Fuel",
    meta: "Oct 2026 · 3 latest trips",
    action: "View all trips",
    columns: ["Date", "Route", "Distance", "Fuel Used", "Driver"],
    rows: [
      { date: "02 Oct 2026", route: "Dubai HQ → Jebel Ali", distance: "48 km", fuel: "4.4 L", driver: "K. Al Rashid" },
      { date: "01 Oct 2026", route: "Dubai HQ → Abu Dhabi", distance: "140 km", fuel: "12.9 L", driver: "K. Al Rashid" },
      { date: "29 Sep 2026", route: "Site Visit — DXB Port", distance: "62 km", fuel: "5.7 L", driver: "K. Al Rashid" },
    ] as FleetTripRow[],
  },
  tags: ["Insured · 31 Dec", "Reg. valid"],
  actions: ["Log Trip", "Report Issue"],
  insight: {
    title: "✦ AI Failure-Risk Insight",
    model: "Model: FleetGuard v1.8 · UI preview",
    prediction: "Prediction: Engine mount fatigue likely by 95,000 km",
    confidence: "Confidence: 87% · Risk: Medium",
    basedOn: "Based on mileage pattern, vibration logs and fleet history.",
    recommended: "Recommended: Inspect engine mounts at next service",
    status: "Status: Monitor",
    action: "Human review required →",
  },
};

export default fleetVehicleDetails;
