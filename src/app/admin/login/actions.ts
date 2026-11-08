"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getExpectedSessionToken } from "@/lib/auth";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const validPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (email !== validEmail || password !== validPassword) {
    return { error: "Invalid email or password" };
  }

  const token = await getExpectedSessionToken();
  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
