import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { equipmentScreen } from "@/lib/fleet/fleet-equipment-data";

export default function EquipmentPage() {
  return <FleetListScreen config={equipmentScreen} />;
}
