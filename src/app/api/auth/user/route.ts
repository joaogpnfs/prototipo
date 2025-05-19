import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthCookies, createAuthenticatedClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    // Verificar token de autorização no cabeçalho
    const authHeader = req.headers.get("authorization");
    let token = "";

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      // Tentar obter do cookie como fallback
      const { accessToken } = getAuthCookies(req.headers);
      token = accessToken || "";
    }

    if (!token) {
      return NextResponse.json(
        { error: { message: "Não autenticado - Token não encontrado" } },
        { status: 401 }
      );
    }

    // Criar cliente autenticado com o token
    const supabase = createAuthenticatedClient(token);

    // Verificar usuário autenticado
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser();

    if (!supabaseUser) {
      return NextResponse.json(
        { error: { message: "Usuário não autenticado ou token inválido" } },
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
