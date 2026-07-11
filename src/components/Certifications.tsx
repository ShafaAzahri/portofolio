import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function Certifications() {
  const certifications = await prisma.certification.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section id="certifications" className="py-20 relative z-10 bg-background border-t border-outline/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 text-center md:text-left">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground">Certifications</h3>
          <p className="text-base text-secondary mt-2">Continuous learning and professional development.</p>
        </div>

        {certifications.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-outline/20">
            <p className="text-secondary">No certifications added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group bg-surface rounded-3xl border border-outline/20 ambient-shadow hover:shadow-lg hover:border-primary/50 transition-all duration-300 flex flex-col h-full overflow-hidden"
              >
                {/* Image Banner */}
                <div className="h-40 w-full relative overflow-hidden bg-surface-container-high">
                  <Image 
                    src={cert.imageUrl} 
                    alt={cert.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Overlay gradient so text/icon stands out */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-90"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute bottom-4 left-6 w-12 h-12 rounded-xl bg-surface/80 backdrop-blur-md border border-outline/20 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 z-10 text-foreground">
                    <span className="material-symbols-outlined text-2xl">{cert.icon || "workspace_premium"}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-lg font-bold text-foreground mb-1 leading-tight">{cert.title}</h4>
                  <p className="text-sm font-medium text-primary mb-4">{cert.issuer}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline/10">
                    <span className="text-xs text-secondary font-mono">{cert.date}</span>
                    {cert.link && (
                      <Link
                        href={cert.link}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-low hover:bg-primary hover:text-primary-foreground transition-colors text-foreground"
                      >
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
