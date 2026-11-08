import Navbar from "@/components/Navbar";
import prisma from "@/lib/prisma";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import ClientWrapper from "@/components/ClientWrapper";

export const dynamic = "force-dynamic";

export default async function Home() {
  const profile = await prisma.profile.findUnique({
    where: { id: 1 },
  });

  const projectCount = await prisma.project.count();
  const certificationCount = await prisma.certification.count();

  const p = profile || {
    id: 1,
    name: "Prabaswara Shafa Azarioma",
    headline: "Backend Developer & Software QA Enthusiast",
    shortBio: "Building robust, scalable backends and ensuring software quality through rigorous testing methodologies.",
    email: "hello@example.com",
    linkedinUrl: "https://www.linkedin.com/in/prabaswara-shafa-azarioma",
    githubUrl: "https://github.com/ShafaAzahri",
    resumeUrl: "https://drive.google.com/file/d/1zR_DHnFhX9uCBPCxbiudyjFPqkQkYI7D/view?usp=drive_link",
    heroTerminal1: "Prabaswara Shafa Azarioma",
    heroTerminal2: "Backend Developer | Software QA Enthusiast",
    heroTerminal3: "Tech: PHP, Laravel, Python, MySQL",
    aboutTitle: "Computer Engineering student with experience in backend development, database management, and software application development. Familiar with software testing, API validation, debugging, and defect identification.",
    aboutDescription: "Experienced in working with PHP, MySQL, Flutter, and Python. Interested in Software Quality Assurance and passionate about ensuring software quality through systematic testing and problem-solving.",
    location: "Semarang",
    focus: "Backend & Quality Assurance",
    updatedAt: new Date(),
  };

  return (
    <ClientWrapper>
      <div className="min-h-screen bg-background">
        <Navbar profile={p} />
        
        <main className="flex-grow">
          <Hero profile={p} projectCount={projectCount} certificateCount={certificationCount} />
          <About profile={p} />
          <Projects />
          <TechStack />
          <Certifications />
          <Contact profile={p} />
        </main>
        
        <footer className="py-6 border-t border-outline/10 text-center text-secondary text-sm">
          <p>© {new Date().getFullYear()} {p.name}. All rights reserved.</p>
        </footer>
      </div>
    </ClientWrapper>
  );
}
