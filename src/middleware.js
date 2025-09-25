import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request) {
  const token = request.cookies.get("BEARER")?.value;
  const { pathname } = request.nextUrl;

  const isAccountPage = pathname.startsWith("/account");
  const isAdminPage = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  // Si déjà connecté et tente d’aller sur /login ou /register → redirection
  if ((isLoginPage || isRegisterPage) && token) {
    try {
      jwtDecode(token);
      return NextResponse.redirect(new URL("/account", request.url));
    } catch (err) {
      return NextResponse.redirect(new URL("/login?auth=invalid", request.url));
    }
  }

  // Pas connecté mais tente d'accéder à une route protégée
  if ((isAccountPage || isAdminPage) && !token) {
    return NextResponse.redirect(new URL("/login?auth=required", request.url));
  }

  //Connecté mais tente d’accéder à une route protégée avec le mauvais rôle ou avec un token expiré et/ou invalide
  if ((isAccountPage || isAdminPage) && token) {
    try {
      const decoded = jwtDecode(token);
      const role = decoded?.roles[0];

      if (isAdminPage && role !== "ROLE_ADMIN" && role !== "ROLE_SUPER_ADMIN") {
        return NextResponse.rewrite(new URL("/account", request.url));
      }
    } catch (err) {
      // cas où le token est mal formé, pas décodable
      return NextResponse.redirect(new URL("/login?auth=invalid", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/login", "/register"],
};
