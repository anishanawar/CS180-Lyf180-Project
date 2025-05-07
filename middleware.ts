import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define which paths are protected (require authentication)
  const isProtectedPath = path.startsWith("/dashboard")

  // Get the session cookie
  const sessionCookie = request.cookies.get("lyf180_session")?.value

  // Check if the user is authenticated
  const isAuthenticated = !!sessionCookie

  // If the path is protected and the user is not authenticated, redirect to login
  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If the user is authenticated and trying to access login page, redirect to dashboard
  if (path === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/", "/dashboard/:path*"],
}
