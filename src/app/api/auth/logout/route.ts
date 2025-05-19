import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAMES } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    // Criar resposta e remover os cookies de autenticação
    const response = NextResponse.json({ success: true }, { status: 200 });

    // Remover cookies de autenticação
    response.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN);
    response.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);

    return response;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return NextResponse.json(
      { error: { message: "Erro interno do servidor" } },
      { status: 500 }
    );
  }
}
