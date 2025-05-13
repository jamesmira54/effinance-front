import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // List of public routes (everything in (unprotected))
  const publicRoutes = ["/login", "/signup"];

  // Allow access to public routes
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirect to login if user is not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

   if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Protect all routes EXCEPT those explicitly allowed
export const config = {
  matcher: "/((?!login|signup|api/public|_next|favicon.ico|static|.*\\..*).*)",
};