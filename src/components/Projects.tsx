import { Link } from "@heroui/react";
import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function Projects() {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: "desc" }, { createdAt: "desc" }],
  });

  return (
    <section id="projects" className="py-20 relative z-10 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground">Featured Work</h3>
          <p className="text-base text-secondary mt-2">Engineering solutions that scale.</p>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-outline/20">
            <p className="text-secondary">No projects added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
              const isLarge = index === 0; // First project is large
              const tags = project.techStack.split(',').map(t => t.trim());
              
              return (
                <div key={project.id} className={`${isLarge ? 'md:col-span-2 md:flex-row h-auto md:min-h-[400px]' : 'md:col-span-1 flex-col h-[400px]'} group relative bg-surface rounded-3xl border border-outline/20 overflow-hidden ambient-shadow hover:shadow-lg transition-all duration-300 flex`}>
                  <div className={`${isLarge ? 'w-full md:w-3/5 h-[240px] md:h-full' : 'h-[200px] w-full'} bg-surface-container-high overflow-hidden relative`}>
                    <Image 
                      alt={project.title} 
                      className={`w-full h-full object-cover transition-all duration-700 ${!isLarge ? 'grayscale group-hover:grayscale-0' : ''} group-hover:scale-105`} 
                      src={project.imageUrl}
                      fill
                      sizes={isLarge ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 50vw"}
                    />
                  </div>
                  <div className={`${isLarge ? 'p-8 md:p-10 w-full md:w-2/5 flex flex-col justify-between' : 'p-8 flex-1 flex flex-col justify-between'}`}>
                    <div>
                      <h4 className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold text-foreground mb-2`}>{project.title}</h4>
                      <p className={`text-secondary ${isLarge ? 'mb-6' : 'text-sm line-clamp-3'}`}>{project.description}</p>
                    </div>
                    <div className={`flex items-center justify-between ${isLarge ? 'mt-auto' : 'mt-4'}`}>
                      <div className="flex gap-2 flex-wrap">
                        {tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-surface-container-high rounded-full font-mono text-[11px] text-foreground/70">{tag}</span>
                        ))}
                      </div>
                      
                      <div className="flex gap-3">
                        {project.githubLink && (
                          <Link href={project.githubLink} target="_blank" className="h-8 px-3 flex items-center gap-1.5 justify-center border border-outline/20 rounded-xl hover:bg-surface-container-low transition-colors text-foreground text-sm font-medium">
                            <span className="material-symbols-outlined text-sm">code</span> GitHub
                          </Link>
                        )}
                        {project.demoLink && (
                          <Link href={project.demoLink} target="_blank" className="h-8 px-3 flex items-center gap-1.5 justify-center bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity text-sm font-medium">
                            Demo <span className="material-symbols-outlined text-sm">open_in_new</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
