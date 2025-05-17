import { NextRequest, NextResponse } from "next/server";
import { createUser, getAllUsers } from "@/services/userService";

export async function GET() {
  const { users, error } = await getAllUsers();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validação básica
    if (!body.email) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    const { user, error } = await createUser({
      email: body.email,
      nome: body.nome,
      perfil: body.perfil,
      clinicaId: body.clinicaId,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return NextResponse.json(
      { error: "Erro ao processar a requisição" },
      { status: 400 }
    );
  }
}
