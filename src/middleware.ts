import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // List of public routes (everything in (unprotected) and public site pages)
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/available-grants",
    "/document-forms",
    "/public-announcements",
    "/help-faqs",
    "/about-us",
    "/contact-support",
    "/privacy-terms",
  ];

  // Allow access to public routes
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirect to login if user is not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Protect all routes EXCEPT those explicitly allowed
export const config = {
  matcher:
    "/((?!login|signup|available-grants|document-forms|public-announcements|help-faqs|about-us|contact-support|privacy-terms|api/public|_next|favicon.ico|static|.*\\..*).*)",
};
