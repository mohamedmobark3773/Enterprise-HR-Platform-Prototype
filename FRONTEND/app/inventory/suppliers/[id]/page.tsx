import { SupplierDetailsView } from "@/components/inventory/SupplierDetailsView";

export default async function SupplierDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SupplierDetailsView id={id} />;
}