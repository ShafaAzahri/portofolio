"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { updateProfile } from "@/actions/adminActions";
import { useRouter } from "next/navigation";

interface Profile {
  id?: number | string;
  name?: string | null;
  headline?: string | null;
  shortBio?: string | null;
  heroTerminal1?: string | null;
  heroTerminal2?: string | null;
  heroTerminal3?: string | null;
  email?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  aboutTitle?: string | null;
  aboutDescription?: string | null;
  location?: string | null;
  focus?: string | null;
  resumeUrl?: string | null;
  [key: string]: unknown;
}

export default function ProfileForm({ profile }: { profile: Profile }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      await updateProfile(formData);
      alert("Profile updated successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
      const msg = error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to update profile: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Global Profile</h1>
        <p className="text-secondary mt-1">Manage the content for your Hero, About, and Contact sections</p>
      </div>

      <form action={handleSubmit} className="space-y-8">
        
        {/* HERO SECTION */}
        <div className="bg-surface p-8 rounded-3xl border border-outline/20 ambient-shadow space-y-6">
          <h2 className="text-xl font-semibold text-foreground border-b border-outline/10 pb-2">Hero Section</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Name</label>
              <input required name="name" defaultValue={profile.name || ""} type="text" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Headline</label>
              <input required name="headline" defaultValue={profile.headline || ""} type="text" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Short Bio (under headline)</label>
            <textarea required name="shortBio" defaultValue={profile.shortBio || ""} rows={3} className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all resize-none"></textarea>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-sm font-medium text-foreground">Hero Terminal Text (3 lines)</label>
            <div className="space-y-3">
              <input required name="heroTerminal1" defaultValue={profile.heroTerminal1 || ""} type="text" placeholder="Line 1 (e.g. Prabaswara Shafa Azarioma)" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground font-mono text-sm focus:outline-none focus:border-primary transition-all" />
              <input required name="heroTerminal2" defaultValue={profile.heroTerminal2 || ""} type="text" placeholder="Line 2 (e.g. Backend Developer | Software QA)" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground font-mono text-sm focus:outline-none focus:border-primary transition-all" />
              <input required name="heroTerminal3" defaultValue={profile.heroTerminal3 || ""} type="text" placeholder="Line 3 (e.g. Tech: PHP, Laravel, Python)" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground font-mono text-sm focus:outline-none focus:border-primary transition-all" />
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="bg-surface p-8 rounded-3xl border border-outline/20 ambient-shadow space-y-6">
          <h2 className="text-xl font-semibold text-foreground border-b border-outline/10 pb-2">About Section</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">About Title (First paragraph)</label>
            <textarea required name="aboutTitle" defaultValue={profile.aboutTitle || ""} rows={3} className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all resize-none"></textarea>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">About Description (Second paragraph)</label>
            <textarea required name="aboutDescription" defaultValue={profile.aboutDescription || ""} rows={3} className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all resize-none"></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Location Stat</label>
              <input required name="location" defaultValue={profile.location || ""} type="text" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Focus Stat</label>
              <input required name="focus" defaultValue={profile.focus || ""} type="text" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all" />
            </div>
          </div>
        </div>

        {/* CONTACT / SOCIALS */}
        <div className="bg-surface p-8 rounded-3xl border border-outline/20 ambient-shadow space-y-6">
          <h2 className="text-xl font-semibold text-foreground border-b border-outline/10 pb-2">Contact & Socials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input required name="email" defaultValue={profile.email || ""} type="email" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">LinkedIn URL</label>
              <input name="linkedinUrl" defaultValue={profile.linkedinUrl || ""} type="url" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">GitHub URL</label>
              <input name="githubUrl" defaultValue={profile.githubUrl || ""} type="url" className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary transition-all" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" variant="primary" size="lg" className="w-full md:w-auto px-12" isDisabled={isLoading}>
            {isLoading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}
