import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAMES } from "@/lib/supabase";

// Rotas públicas que não precisam de autenticação
const publicRoutes = [
  "/login",
  "/cadastro",
  "/sign-in",
  "/sign-up",
  "/api/auth",
  "/api/webhook",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Verificar se a rota atual é pública
  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathname.startsWith(route) || pathname.match(new RegExp(`^${route}(.*)`))
  );

  // Se for uma rota pública, permite o acesso
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Verificar se o usuário tem token de sessão
  const hasSessionCookie =
    req.cookies.has(COOKIE_NAMES.ACCESS_TOKEN) ||
    req.cookies.has(COOKIE_NAMES.REFRESH_TOKEN);

  // Se não estiver autenticado, redirecionar para login
  if (!hasSessionCookie) {
    const redirectUrl = new URL("/sign-in", req.url);
    redirectUrl.searchParams.set("redirect_url", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Bloqueia tudo, exceto arquivos estáticos e _next
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
