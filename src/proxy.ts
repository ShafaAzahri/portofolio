import { NextResponse, type NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const sessionToken = request.cookies.get("admin_session")?.value;
    const isAuthenticated = await verifySession(sessionToken);

    if (pathname === "/admin/login") {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|uploads|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
