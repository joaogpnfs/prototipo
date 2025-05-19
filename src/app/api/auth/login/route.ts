import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signInWithEmail, COOKIE_NAMES, COOKIE_OPTIONS } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Primeiro faz login via Supabase
    const { data, error } = await signInWithEmail(email, password);

    if (error) {
      return NextResponse.json(
        { error: { message: error.message } },
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

      // Cria resposta e define cookies
      const response = NextResponse.json(
        { success: true, user },
        { status: 200 }
      );

      // Define cookies de autenticação
      if (data.session) {
        response.cookies.set(
          COOKIE_NAMES.ACCESS_TOKEN,
          data.session.access_token,
          COOKIE_OPTIONS
        );
        response.cookies.set(
          COOKIE_NAMES.REFRESH_TOKEN,
          data.session.refresh_token,
          COOKIE_OPTIONS
        );
      }

      return response;
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
