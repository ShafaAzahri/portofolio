"use client";

export default function TechStack() {
  const stack = [
    { icon: "terminal", name: "PHP" },
    { icon: "layers", name: "Laravel" },
    { icon: "code_blocks", name: "Python" },
    { icon: "database", name: "MySQL" },
    { icon: "api", name: "REST API" },
    { icon: "sync_alt", name: "Postman" },
    { icon: "source_environment", name: "Git" },
    { icon: "hub", name: "GitHub" },
  ];

  return (
    <section id="tech-stack" className="py-20 bg-surface-container-lowest overflow-hidden border-t border-outline/10">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h3 className="font-mono text-sm text-secondary uppercase tracking-widest">Core Capabilities</h3>
      </div>
      
      {/* Marquee effect wrapper */}
      <div className="relative flex overflow-x-hidden border-y border-outline/10 py-8">
        <div className="animate-marquee whitespace-nowrap flex gap-4 px-4 items-center">
          {/* First set */}
          {stack.map((item, index) => (
            <span key={index} className="px-6 py-3 bg-surface border border-outline/20 rounded-2xl font-medium text-sm text-foreground flex items-center gap-2 ambient-shadow">
              <span className="material-symbols-outlined text-base text-primary">{item.icon}</span> 
              {item.name}
            </span>
          ))}
          {/* Duplicated set for seamless loop */}
          {stack.map((item, index) => (
            <span key={`dup-${index}`} className="px-6 py-3 bg-surface border border-outline/20 rounded-2xl font-medium text-sm text-foreground flex items-center gap-2 ambient-shadow">
              <span className="material-symbols-outlined text-base text-primary">{item.icon}</span> 
              {item.name}
            </span>
          ))}
           {/* Third set just to be safe */}
           {stack.map((item, index) => (
            <span key={`dup2-${index}`} className="px-6 py-3 bg-surface border border-outline/20 rounded-2xl font-medium text-sm text-foreground flex items-center gap-2 ambient-shadow">
              <span className="material-symbols-outlined text-base text-primary">{item.icon}</span> 
              {item.name}
            </span>
          ))}
        </div>
        
        {/* Gradient fades for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface-container-lowest to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface-container-lowest to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
