import { ProjectTaskDetailScreen } from "@/components/projects/ProjectTaskDetailScreen";

export default async function ProjectTaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectTaskDetailScreen id={decodeURIComponent(id)} />;
}
