import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Verificar autenticação
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Pathname atual
  const pathname = req.nextUrl.pathname;

  // Rotas que não precisam de autenticação
  const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-up",
    "/api/auth/signup",
    "/api/auth/login",
    "/api/auth/user",
  ];

  // Se não estamos em uma rota pública e não temos sessão, redirecionar para login
  if (
    !publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    ) &&
    !session
  ) {
    const redirectUrl = new URL("/sign-in", req.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Se estamos na página de login ou cadastro com sessão ativa, redirecionar para dashboard
  if (
    (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) &&
    session
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

// Configuração para qual rotas o middleware deve ser executado
export const config = {
  matcher: [
    /*
     * Corresponde a rotas exceto:
     * - /_next (arquivos estáticos do Next.js)
     * - /api (rotas da API que não precisam de middleware)
     * - /_vercel (arquivos do sistema)
     * - /.well-known (JSON metadata)
     * - /favicon.ico, /sitemap.xml (arquivos estáticos)
     */
    "/((?!_next|_vercel|.well-known|favicon.ico|sitemap.xml).*)",
  ],
};
