import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser as getSupabaseUser } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const supabaseUser = await getSupabaseUser();

    if (!supabaseUser) {
      return NextResponse.json(
        { error: { message: "Usuário não autenticado" } },
        { status: 401 }
      );
    }

    const email = supabaseUser.email;

    if (!email) {
      return NextResponse.json(
        { error: { message: "Email do usuário não encontrado" } },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        clinica: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: { message: "Usuário não encontrado no sistema" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuário atual:", error);
    return NextResponse.json(
      { error: { message: "Erro interno do servidor" } },
      { status: 500 }
    );
  }
}
