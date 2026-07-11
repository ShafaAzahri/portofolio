const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

async function main() {
  console.log("Testing database connection...");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    console.log("1. Creating dummy project...");
    const project = await prisma.project.create({
      data: {
        title: "Test CRUD Project",
        description: "This is a test project to verify CRUD operations.",
        imageUrl: "https://example.com/dummy.jpg",
        githubLink: "https://github.com",
        demoLink: "https://example.com",
        techStack: "React, Next.js, Prisma",
      }
    });
    console.log("Success! Created project with ID:", project.id);

    console.log("2. Fetching projects...");
    const projects = await prisma.project.findMany();
    console.log(`Success! Found ${projects.length} projects in the database.`);

    console.log("3. Updating project...");
    const updated = await prisma.project.update({
      where: { id: project.id },
      data: { title: "Test CRUD Project (Updated)" }
    });
    console.log("Success! Updated title to:", updated.title);

    console.log("4. Deleting project...");
    await prisma.project.delete({
      where: { id: project.id }
    });
    console.log("Success! Project deleted.");

    console.log("\n✅ ALL DATABASE CRUD OPERATIONS ARE WORKING PERFECTLY!");
  } catch (error) {
    console.error("❌ CRUD Test Failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
