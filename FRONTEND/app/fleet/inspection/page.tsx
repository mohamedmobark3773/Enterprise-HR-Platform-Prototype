import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { inspectionScreen } from "@/lib/fleet/fleet-operations-data";

export default function InspectionPage() {
  return <FleetListScreen config={inspectionScreen} />;
}
