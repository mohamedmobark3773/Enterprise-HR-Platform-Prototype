import { FleetAnalyticsScreen } from "@/components/fleet/FleetAnalyticsScreen";
import { utilizationScreen } from "@/lib/fleet/fleet-analytics-data";

export default function UtilizationPage() {
  return <FleetAnalyticsScreen config={utilizationScreen} />;
}
