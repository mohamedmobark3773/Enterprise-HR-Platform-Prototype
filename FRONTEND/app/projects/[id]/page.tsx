import { ProjectsDetailScreen } from "@/components/projects/ProjectsDetailScreen";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectsDetailScreen id={id} />;
}
