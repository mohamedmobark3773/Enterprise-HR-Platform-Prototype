import { ItemDetailsView } from "@/components/inventory/ItemDetailsView";

export default async function ItemDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ItemDetailsView id={id} />;
}
