import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { fuelScreen } from "@/lib/fleet/fleet-operations-data";

export default function FuelPage() {
  return <FleetListScreen config={fuelScreen} />;
}
