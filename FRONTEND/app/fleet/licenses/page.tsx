import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { licensesScreen } from "@/lib/fleet/fleet-operations-data";

export default function LicensesPage() {
  return <FleetListScreen config={licensesScreen} />;
}
