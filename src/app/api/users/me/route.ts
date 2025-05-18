import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  try {
    // Usar o cliente Supabase para servidor
    const supabase = createServerClient();

    // Obter dados do usuário atual
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Erro ao obter usuário:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
