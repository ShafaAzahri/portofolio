"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { createProject } from "@/actions/adminActions";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      await createProject(formData);
      router.push("/admin/projects");
    } catch (error) {
      console.error(error);
      const msg = error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to create project: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="w-10 h-10 rounded-full bg-surface border border-outline/20 flex items-center justify-center text-secondary hover:text-foreground transition-colors ambient-shadow">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">New Project</h1>
          <p className="text-secondary mt-1">Add a new project to your portfolio</p>
        </div>
      </div>

      <div className="bg-surface p-8 rounded-3xl border border-outline/20 ambient-shadow">
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Project Title *</label>
            <input required name="title" type="text" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description *</label>
            <textarea required name="description" rows={4} className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all resize-none"></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tech Stack (comma separated) *</label>
            <input required name="techStack" type="text" placeholder="Next.js, Tailwind, Prisma" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Demo Link (optional)</label>
              <input name="demoLink" type="url" placeholder="https://" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">GitHub Link (optional)</label>
              <input name="githubLink" type="url" placeholder="https://" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Order</label>
              <input name="order" type="number" defaultValue="0" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Project Image *</label>
            <div className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 border-dashed rounded-xl text-foreground flex items-center justify-center">
              <input required name="image" type="file" accept="image/*" className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors" />
            </div>
            <p className="text-xs text-secondary">Supported formats: JPG, PNG, WebP.</p>
          </div>

          <div className="pt-4">
            <Button type="submit" variant="primary" className="w-full" isDisabled={isLoading}>
              Save Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
