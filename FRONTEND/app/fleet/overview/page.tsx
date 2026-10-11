import { FleetAnalyticsScreen } from "@/components/fleet/FleetAnalyticsScreen";
import { overviewScreen } from "@/lib/fleet/fleet-analytics-data";

export default function OverviewPage() {
  return <FleetAnalyticsScreen config={overviewScreen} />;
}
