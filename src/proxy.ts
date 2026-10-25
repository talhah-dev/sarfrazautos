import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoginPage = pathname === "/admin/login"

  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token")

  const isAuthenticated = Boolean(sessionToken?.value)

  if (!isAuthenticated && !isLoginPage) {
    const loginUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthenticated && isLoginPage) {
    const dashboardUrl = new URL("/admin/dashboard", request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  if (isAuthenticated && pathname === "/admin") {
    const dashboardUrl = new URL("/admin/dashboard", request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  const response = NextResponse.next()
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  return response
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}

export default proxy
