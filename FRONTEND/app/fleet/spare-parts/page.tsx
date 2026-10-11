import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { sparePartsScreen } from "@/lib/fleet/fleet-equipment-data";

export default function SparePartsPage() {
  return <FleetListScreen config={sparePartsScreen} />;
}
