import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signInWithEmail as supabaseSignIn } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Primeiro faz login via Supabase
    const supabaseResponse = await supabaseSignIn(email, password);

    if (supabaseResponse.error) {
      return NextResponse.json(
        { error: supabaseResponse.error },
        { status: 401 }
      );
    }

    // Depois busca os dados do usuário no Prisma
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          clinica: true,
        },
      });

      if (!user) {
        // Usuário existe no Supabase mas não no Prisma
        return NextResponse.json(
          { error: { message: "Usuário não encontrado no sistema" } },
          { status: 404 }
        );
      }

      // Atualiza o último login
      await prisma.user.update({
        where: { id: user.id },
        data: { ultimoLogin: new Date() },
      });

      return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
      console.error("Erro ao buscar usuário no Prisma:", error);
      return NextResponse.json(
        { error: { message: "Erro interno ao processar autenticação" } },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: { message: "Erro interno do servidor" } },
      { status: 500 }
    );
  }
}
