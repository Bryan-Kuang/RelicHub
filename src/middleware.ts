import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // This middleware is intentionally minimal
  // Most authentication logic is handled client-side with Firebase
  // This is just to provide basic route protection

  const { pathname } = request.nextUrl;

  // Add any server-side redirects or middleware logic here if needed
  // For example, you could redirect certain paths or add headers

  return NextResponse.next();
}

export const config = {
  // Matcher for paths that should trigger this middleware
  matcher: [
    // Apply to all paths except static files, api routes, etc.
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
