import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProjectForm from "./EditProjectForm";

// Next.js 16 dynamic route params are handled asynchronously or as a Promise depending on the exact minor version,
// but usually we can await the params object itself if we define it as a Promise.
export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return <EditProjectForm project={project} />;
}
