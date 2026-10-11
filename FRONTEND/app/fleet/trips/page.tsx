import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { tripsScreen } from "@/lib/fleet/fleet-operations-data";

export default function TripsPage() {
  return <FleetListScreen config={tripsScreen} />;
}
