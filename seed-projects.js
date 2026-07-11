const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

async function seed() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const dummyProjects = [
    {
      title: "E-Commerce Dashboard",
      description: "A comprehensive dashboard for managing e-commerce sales, products, and analytics with real-time updates.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      techStack: "Next.js, Tailwind CSS, Supabase",
      githubLink: "https://github.com",
      demoLink: "https://example.com"
    },
    {
      title: "FinTech Mobile App",
      description: "A mobile-first application for tracking personal finances, budgeting, and investment portfolio monitoring.",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
      techStack: "React Native, Node.js, PostgreSQL",
      githubLink: "https://github.com",
      demoLink: "https://example.com"
    },
    {
      title: "AI Image Generator",
      description: "A web platform that utilizes generative AI to create stunning artwork and designs from text prompts.",
      imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop",
      techStack: "Vue.js, Python, Stable Diffusion",
      githubLink: "https://github.com",
      demoLink: "https://example.com"
    },
    {
      title: "Real Estate Directory",
      description: "A property listing directory featuring advanced search filters, map integration, and virtual tours.",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
      techStack: "React, Firebase, Google Maps API",
      githubLink: "https://github.com",
      demoLink: "https://example.com"
    }
  ];

  console.log("Menambahkan 4 proyek random ke database...");

  try {
    for (const project of dummyProjects) {
      await prisma.project.create({
        data: project
      });
      console.log(`✅ Berhasil menambahkan: ${project.title}`);
    }
    console.log("Selesai! 4 Proyek berhasil ditambahkan.");
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
