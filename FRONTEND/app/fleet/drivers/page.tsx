import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { driversScreen } from "@/lib/fleet/fleet-operations-data";

export default function DriversPage() {
  return <FleetListScreen config={driversScreen} />;
}
