import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { insuranceScreen } from "@/lib/fleet/fleet-operations-data";

export default function InsurancePage() {
  return <FleetListScreen config={insuranceScreen} />;
}
