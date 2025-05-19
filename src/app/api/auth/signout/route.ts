import { NextResponse } from "next/server";
import { signOut, COOKIE_NAMES } from "@/lib/supabase";

export async function POST() {
  try {
    await signOut();

    // Cria resposta e limpa cookies
    const response = NextResponse.json(
      { success: true, message: "Logout realizado com sucesso" },
      { status: 200 }
    );

    // Remove cookies de autenticação
    response.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN);
    response.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);

    return response;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao fazer logout" },
      { status: 500 }
    );
  }
}
