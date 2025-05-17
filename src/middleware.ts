import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Rotas públicas
const isPublicRoute = createRouteMatcher([
  "/login(.*)",
  "/cadastro(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/(.*)auth(.*)",
  "/_clerk/(.*)",
  "/api/webhooks(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth();

  if (!isPublicRoute(req) && !authObject.userId) {
    // Redirecionar para login se não estiver autenticado
    const url = new URL("/sign-in", req.url);
    url.searchParams.set("redirect_url", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Bloqueia tudo, exceto arquivos estáticos e _next
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
