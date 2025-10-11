import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("job_portal")?.value;

  // Define routes that require authentication
  const protectedRoutes = ["/admin/dashboard"];

  const currentPath = req.nextUrl.pathname;

  // Check if current route is protected
  const isProtected = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  // If trying to access a protected route without token → redirect to login
  if (isProtected && !token) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user has token and tries to visit login page → redirect to dashboard
  if (token && currentPath === "/admin/login") {
    const dashboardUrl = new URL("/admin/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Otherwise allow request
  return NextResponse.next();
}

// Define which routes should use the middleware
export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
