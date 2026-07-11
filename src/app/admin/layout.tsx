import Link from "next/link";
import { logout } from "./login/actions";
import { Button } from "@heroui/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface border-r border-outline/20 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            P
          </div>
          <span className="font-bold text-foreground">Admin Panel</span>
        </div>

        <nav className="flex-grow space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-container-low text-foreground font-medium transition-colors">
            <span className="material-symbols-outlined text-secondary">dashboard</span>
            Dashboard
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-container-low text-foreground font-medium transition-colors">
            <span className="material-symbols-outlined text-secondary">work</span>
            Projects
          </Link>
          <Link href="/admin/certifications" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-container-low text-foreground font-medium transition-colors">
            <span className="material-symbols-outlined text-secondary">workspace_premium</span>
            Certificates
          </Link>
          <Link href="/admin/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-container-low text-foreground font-medium transition-colors">
            <span className="material-symbols-outlined text-secondary">person</span>
            Profile
          </Link>
        </nav>

        <form action={logout} className="mt-auto pt-6 border-t border-outline/10">
          <button type="submit" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-danger/10 text-danger font-medium transition-colors">
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-surface-container-lowest">
        {children}
      </main>
    </div>
  );
}
