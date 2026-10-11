import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { failuresScreen } from "@/lib/fleet/fleet-equipment-data";

export default function FailuresPage() {
  return <FleetListScreen config={failuresScreen} />;
}
