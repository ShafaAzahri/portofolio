"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

async function uploadImage(file: File) {
  if (!file || file.size === 0) return null;
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileExt = file.name.split('.').pop() || 'png';
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, fileName), buffer);
  
  return `/uploads/${fileName}`;
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const techStack = formData.get("techStack") as string;
  const demoLink = formData.get("demoLink") as string | null;
  const githubLink = formData.get("githubLink") as string | null;
  const orderStr = formData.get("order") as string;
  const order = orderStr ? parseInt(orderStr, 10) : 0;
  
  const imageFile = formData.get("image") as File;
  const imageUrl = await uploadImage(imageFile);

  if (!imageUrl) {
    throw new Error("Image is required");
  }

  await prisma.project.create({
    data: {
      title,
      description,
      techStack,
      demoLink,
      githubLink,
      order,
      imageUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function createCertification(formData: FormData) {
  const title = formData.get("title") as string;
  const issuer = formData.get("issuer") as string;
  const date = formData.get("date") as string;
  const icon = formData.get("icon") as string;
  const link = formData.get("link") as string | null;
  
  const imageFile = formData.get("image") as File;
  const imageUrl = await uploadImage(imageFile);

  if (!imageUrl) {
    throw new Error("Image is required");
  }

  await prisma.certification.create({
    data: {
      title,
      issuer,
      date,
      icon,
      link,
      imageUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/certifications");
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const techStack = formData.get("techStack") as string;
  const demoLink = formData.get("demoLink") as string | null;
  const githubLink = formData.get("githubLink") as string | null;
  const orderStr = formData.get("order") as string;
  const order = orderStr ? parseInt(orderStr, 10) : 0;
  
  const imageFile = formData.get("image") as File;
  let imageUrl = undefined;
  
  // Only upload if a new file is provided
  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage(imageFile);
  }

  await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
      techStack,
      demoLink,
      githubLink,
      order,
      ...(imageUrl && { imageUrl }), // Only update imageUrl if a new one was uploaded
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteCertification(id: string) {
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/certifications");
}

export async function updateCertification(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const issuer = formData.get("issuer") as string;
  const date = formData.get("date") as string;
  const icon = formData.get("icon") as string;
  const link = formData.get("link") as string | null;
  
  const imageFile = formData.get("image") as File;
  let imageUrl = undefined;
  
  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage(imageFile);
  }

  await prisma.certification.update({
    where: { id },
    data: {
      title,
      issuer,
      date,
      icon,
      link,
      ...(imageUrl && { imageUrl }),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/certifications");
}

export async function updateProfile(formData: FormData) {
  const name = formData.get("name") as string;
  const headline = formData.get("headline") as string;
  const shortBio = formData.get("shortBio") as string;
  const email = formData.get("email") as string;
  const linkedinUrl = formData.get("linkedinUrl") as string | null;
  const githubUrl = formData.get("githubUrl") as string | null;
  const resumeUrl = formData.get("resumeUrl") as string | null;
  
  const heroTerminal1 = formData.get("heroTerminal1") as string;
  const heroTerminal2 = formData.get("heroTerminal2") as string;
  const heroTerminal3 = formData.get("heroTerminal3") as string;
  
  const aboutTitle = formData.get("aboutTitle") as string;
  const aboutDescription = formData.get("aboutDescription") as string;
  const location = formData.get("location") as string;
  const focus = formData.get("focus") as string;

  await prisma.profile.update({
    where: { id: 1 },
    data: {
      name,
      headline,
      shortBio,
      email,
      linkedinUrl,
      githubUrl,
      resumeUrl,
      heroTerminal1,
      heroTerminal2,
      heroTerminal3,
      aboutTitle,
      aboutDescription,
      location,
      focus,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/profile");
}
