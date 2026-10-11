import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { equipmentMaintenanceScreen } from "@/lib/fleet/fleet-equipment-data";

export default function EquipmentMaintenancePage() {
  return <FleetListScreen config={equipmentMaintenanceScreen} />;
}
