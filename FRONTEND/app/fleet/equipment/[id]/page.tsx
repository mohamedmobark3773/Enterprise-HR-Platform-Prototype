import { FleetDetailScreen } from "@/components/fleet/FleetDetailScreen";
import { equipmentDetails } from "@/lib/fleet/fleet-equipment-data";

export default async function EquipmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <FleetDetailScreen config={equipmentDetails} id={id} />;
}
