import { VehicleDetailsView } from "@/components/fleet/VehicleDetailsView";

export default async function VehicleDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <VehicleDetailsView id={id} />;
}
