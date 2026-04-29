import { NextRequest, NextResponse } from "next/server";

// Rotas que requerem autenticação
const protectedRoutes = [
  "/dashboard",
  "/api/dashboard",
  "/api/auth/verify",
];

// Rotas públicas que não verificam auth
const publicRoutes = [
  "/",
  "/login",
  "/api/auth/login",
  "/api/projects",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Verificar se é rota protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Verificar se é rota pública
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Se é rota pública, deixar passar
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Se é rota protegida, verificar autenticação
  if (isProtectedRoute) {
    const token = request.cookies.get("auth-token")?.value;
    const adminId = request.cookies.get("admin-id")?.value;

    // Se não tem cookie de autenticação, redirecionar para login
    if (!token || !adminId) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { message: "Não autenticado" },
          { status: 401 }
        );
      }

      // Redirecionar para login mantendo a URL original
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Adicionar headers com informações do usuário para as rotas API
    if (pathname.startsWith("/api/")) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("X-Admin-ID", adminId);
      requestHeaders.set("Authorization", `Bearer ${token}`);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Incluir todas as rotas exceto arquivos estáticos
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Reincluir APIs
    "/api/:path*",
  ],
};
