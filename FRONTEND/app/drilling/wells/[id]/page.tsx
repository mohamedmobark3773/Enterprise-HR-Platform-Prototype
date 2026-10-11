import { DrillingWellDetailScreen } from "@/components/drilling/DrillingWellDetailScreen";

export default async function DrillingWellDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DrillingWellDetailScreen id={id} />;
}