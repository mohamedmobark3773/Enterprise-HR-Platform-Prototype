import { FleetAnalyticsScreen } from "@/components/fleet/FleetAnalyticsScreen";
import { costAnalyticsScreen } from "@/lib/fleet/fleet-analytics-data";

export default function CostAnalyticsPage() {
  return <FleetAnalyticsScreen config={costAnalyticsScreen} />;
}
