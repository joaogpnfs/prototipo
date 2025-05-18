import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signUp as supabaseSignUp } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { email, password, userData } = await req.json();

    // Primeiro cria o usuário no Supabase
    const supabaseResponse = await supabaseSignUp(email, password, userData);

    if (supabaseResponse.error) {
      return NextResponse.json(
        { error: supabaseResponse.error },
        { status: 400 }
      );
    }

    // Verifica se existe uma clínica para associar o usuário ou cria uma nova
    let clinicaId = userData.clinicaId as number | undefined;

    if (!clinicaId) {
      // Se não tem clínica, cria uma nova com o nome do email
      try {
        const nomeClinica = `Clínica ${email.split("@")[0]}`;
        const novaClinica = await prisma.clinica.create({
          data: {
            nome: nomeClinica,
            email: email,
            planoAssinatura: "basico",
          },
        });
        clinicaId = novaClinica.id;
      } catch (error) {
        console.error("Erro ao criar clínica:", error);
        return NextResponse.json(
          { error: { message: "Erro ao criar perfil de usuário" } },
          { status: 500 }
        );
      }
    }

    // Cria o usuário no Prisma
    try {
      const novoUsuario = await prisma.user.create({
        data: {
          nome: userData.nome || email.split("@")[0],
          email: email,
          senha: "", // Não armazenamos a senha, isso é gerenciado pelo Supabase
          perfil: userData.perfil || "admin",
          clinicaId: clinicaId,
        },
        include: {
          clinica: true,
        },
      });

      return NextResponse.json(
        { success: true, user: novoUsuario },
        { status: 201 }
      );
    } catch (error) {
      console.error("Erro ao criar usuário no Prisma:", error);
      return NextResponse.json(
        { error: { message: "Erro ao criar perfil de usuário" } },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro na criação de usuário:", error);
    return NextResponse.json(
      { error: { message: "Erro interno do servidor" } },
      { status: 500 }
    );
  }
}
