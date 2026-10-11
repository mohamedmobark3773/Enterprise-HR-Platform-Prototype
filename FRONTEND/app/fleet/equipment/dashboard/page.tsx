import { FleetDashboardScreen } from "@/components/fleet/FleetDashboardScreen";
import { equipmentDashboard } from "@/lib/fleet/fleet-dashboard-data";

export default function EquipmentDashboardPage() {
  return <FleetDashboardScreen config={equipmentDashboard} />;
}
