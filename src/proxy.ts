import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminLoginPage = pathname === "/admin/login"
  const isCustomerLoginPage = pathname === "/login"
  const isCustomerPortal = pathname === "/customer-portal" || pathname.startsWith("/customer-portal/")
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/")

  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token")

  const isAuthenticated = Boolean(sessionToken?.value)

  if (isAdminRoute) {
    if (!isAuthenticated && !isAdminLoginPage) {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    if (isAuthenticated && isAdminLoginPage) {
      const dashboardUrl = new URL("/admin/dashboard", request.url)
      return NextResponse.redirect(dashboardUrl)
    }

    if (isAuthenticated && pathname === "/admin") {
      const dashboardUrl = new URL("/admin/dashboard", request.url)
      return NextResponse.redirect(dashboardUrl)
    }
  }

  if (isCustomerPortal && !isAuthenticated) {
    const loginUrl = new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (isCustomerLoginPage && isAuthenticated) {
    const redirectParam = request.nextUrl.searchParams.get("redirect") || "/customer-portal"
    const targetUrl = new URL(redirectParam, request.url)
    return NextResponse.redirect(targetUrl)
  }

  const response = NextResponse.next()
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  return response
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/customer-portal",
    "/customer-portal/:path*",
    "/login",
  ],
}

export default proxy
