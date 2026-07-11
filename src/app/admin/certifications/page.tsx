import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@heroui/react";
import { deleteCertification } from "@/actions/adminActions";

export default async function CertificationsAdminPage() {
  const certs = await prisma.certification.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Certifications</h1>
          <p className="text-secondary mt-1">Manage your certificates and achievements</p>
        </div>
        <Link href="/admin/certifications/new" className="inline-flex items-center justify-center h-10 px-4 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
          Add New Certificate
        </Link>
      </div>

      <div className="bg-surface rounded-3xl border border-outline/20 overflow-hidden ambient-shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline/20">
              <th className="p-4 text-sm font-medium text-secondary">Certificate</th>
              <th className="p-4 text-sm font-medium text-secondary">Issuer & Date</th>
              <th className="p-4 text-sm font-medium text-secondary text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certs.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-secondary">No certificates found. Create one!</td>
              </tr>
            ) : (
              certs.map((cert) => (
                <tr key={cert.id} className="border-b border-outline/10 hover:bg-surface-container-lowest transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-surface-container-high rounded-lg overflow-hidden shrink-0">
                        <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="font-medium text-foreground">{cert.title}</div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-secondary">
                    <div>{cert.issuer}</div>
                    <div className="text-xs font-mono mt-1">{cert.date}</div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/certifications/edit/${cert.id}`} className="text-primary hover:text-primary/80 p-2 rounded-lg hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteCertification(cert.id);
                      }}>
                        <button type="submit" className="text-danger hover:text-danger/80 p-2 rounded-lg hover:bg-danger/10 transition-colors">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
