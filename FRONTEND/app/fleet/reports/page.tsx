import { FleetAnalyticsScreen } from "@/components/fleet/FleetAnalyticsScreen";
import { reportsScreen } from "@/lib/fleet/fleet-analytics-data";

export default function ReportsPage() {
  return <FleetAnalyticsScreen config={reportsScreen} />;
}
