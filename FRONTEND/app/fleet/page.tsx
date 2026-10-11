import { FleetDashboardScreen } from "@/components/fleet/FleetDashboardScreen";
import { fleetDashboard } from "@/lib/fleet/fleet-dashboard-data";

export default function FleetDashboardPage() {
  return <FleetDashboardScreen config={fleetDashboard} />;
}
