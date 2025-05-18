import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectUrl = requestUrl.searchParams.get("redirect_url") || "/";

  if (code) {
    try {
      // Usar o cliente Supabase para servidor
      const supabase = createServerClient();

      // Trocar o código pelo token de sessão
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error("Erro ao trocar código por sessão:", error);
      // Mesmo com erro, redirecionamos para não deixar o usuário preso
    }
  }

  // Redirecionar para a URL solicitada após login
  return NextResponse.redirect(`${requestUrl.origin}${redirectUrl}`);
}
