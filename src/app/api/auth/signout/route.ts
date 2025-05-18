import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST() {
  try {
    // Usar o cliente Supabase para servidor
    const supabase = createServerClient();

    // Fazer logout do usuário
    await supabase.auth.signOut();

    // Retornar resposta
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
