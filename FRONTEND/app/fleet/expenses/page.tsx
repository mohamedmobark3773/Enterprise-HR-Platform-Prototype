import { FleetListScreen } from "@/components/fleet/FleetListScreen";
import { expensesScreen } from "@/lib/fleet/fleet-operations-data";

export default function ExpensesPage() {
  return <FleetListScreen config={expensesScreen} />;
}
