import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { movementOrdersScreen } from "@/lib/fleet/fleet-operations-data";

export default function MovementOrdersPage() {
  return <FleetListScreen config={movementOrdersScreen} />;
}
