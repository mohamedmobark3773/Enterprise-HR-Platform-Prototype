import { WarehouseDetailsView } from "@/components/inventory/WarehouseDetailsView";

export default async function WarehouseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WarehouseDetailsView id={id} />;
}
