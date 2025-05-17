import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/services/userService";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email é obrigatório" }, { status: 400 });
  }

  const { user, error } = await getUserByEmail(email);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  // Retorna apenas o ID e email, para segurança
  return NextResponse.json({
    id: user.id,
    email: user.email,
    nome: user.nome,
    perfil: user.perfil,
    clinica: user.clinicaId,
  });
}
