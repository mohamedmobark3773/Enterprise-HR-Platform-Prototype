import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { maintenanceScreen } from "@/lib/fleet/fleet-operations-data";

export default function MaintenancePage() {
  return <FleetListScreen config={maintenanceScreen} />;
}
