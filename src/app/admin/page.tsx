import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const projectsCount = await prisma.project.count();
  const certsCount = await prisma.certification.count();

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
      <p className="text-secondary mb-8">Welcome back! Here&apos;s what&apos;s happening with your portfolio.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-surface p-6 rounded-3xl border border-outline/20 ambient-shadow flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">work</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Projects</h2>
              <p className="text-sm text-secondary">Active projects in portfolio</p>
            </div>
          </div>
          <div className="text-5xl font-bold text-foreground mb-6">{projectsCount}</div>
          <div className="mt-auto">
            <Link href="/admin/projects" className="w-full inline-flex items-center justify-center h-10 px-4 rounded-xl border border-outline/20 hover:bg-surface-container-low transition-colors font-medium text-sm">
              Manage Projects
            </Link>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-3xl border border-outline/20 ambient-shadow flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">workspace_premium</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Certifications</h2>
              <p className="text-sm text-secondary">Earned certificates & achievements</p>
            </div>
          </div>
          <div className="text-5xl font-bold text-foreground mb-6">{certsCount}</div>
          <div className="mt-auto">
            <Link href="/admin/certifications" className="w-full inline-flex items-center justify-center h-10 px-4 rounded-xl border border-outline/20 hover:bg-surface-container-low transition-colors font-medium text-sm">
              Manage Certifications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
