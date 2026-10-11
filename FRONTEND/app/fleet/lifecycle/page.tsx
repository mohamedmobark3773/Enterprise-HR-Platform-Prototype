import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { lifecycleScreen } from "@/lib/fleet/fleet-equipment-data";

export default function LifecyclePage() {
  return <FleetListScreen config={lifecycleScreen} />;
}
