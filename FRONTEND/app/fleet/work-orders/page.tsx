import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { workOrdersScreen } from "@/lib/fleet/fleet-equipment-data";

export default function WorkOrdersPage() {
  return <FleetListScreen config={workOrdersScreen} />;
}
