import { prisma } from "./prisma";
import {
  signInWithEmail as supabaseSignIn,
  signUp as supabaseSignUp,
  signOut as supabaseSignOut,
  UserMetadata,
  getCurrentUser as getSupabaseUser,
  deleteUser as deleteSupabaseUser,
} from "./supabase";

/**
 * Busca o usuário no banco de dados Prisma pelo email
 */
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      clinica: true,
    },
  });
}

/**
 * Faz login do usuário no Supabase e busca os dados no Prisma
 */
export async function signInWithEmail(email: string, password: string) {
  // Primeiro faz login via Supabase
  const supabaseResponse = await supabaseSignIn(email, password);

  if (supabaseResponse.error) {
    return { error: supabaseResponse.error, user: null, session: null };
  }

  // Depois busca os dados do usuário no Prisma
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      // Se o usuário existe no Supabase mas não no Prisma, algo está errado
      await supabaseSignOut(); // Faz logout
      return {
        error: { message: "Usuário não encontrado no sistema" },
        user: null,
        session: null,
      };
    }

    // Atualiza o último login
    await prisma.user.update({
      where: { id: user.id },
      data: { ultimoLogin: new Date() },
    });

    return {
      error: null,
      user,
      session: supabaseResponse.data.session,
    };
  } catch (error) {
    console.error("Erro ao buscar usuário no Prisma:", error);
    return {
      error: { message: "Erro interno ao processar autenticação" },
      user: null,
      session: null,
    };
  }
}

/**
 * Registra um usuário no Supabase e no Prisma
 */
export async function signUp(
  email: string,
  password: string,
  userData: UserMetadata
) {
  // Primeiro cria o usuário no Supabase
  const supabaseResponse = await supabaseSignUp(email, password, userData);

  if (supabaseResponse.error) {
    return { error: supabaseResponse.error, user: null, session: null };
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

      // Se falhar a criação da clínica, tenta apagar o usuário do Supabase
      if (supabaseResponse.data.user) {
        try {
          await deleteSupabaseUser(supabaseResponse.data.user.id);
        } catch (e) {
          console.error("Erro ao apagar usuário do Supabase após falha:", e);
        }
      }

      return {
        error: { message: "Erro ao criar perfil de usuário" },
        user: null,
        session: null,
      };
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

    return {
      error: null,
      user: novoUsuario,
      session: supabaseResponse.data.session,
    };
  } catch (error) {
    console.error("Erro ao criar usuário no Prisma:", error);

    // Se falhar a criação no Prisma, tenta apagar o usuário do Supabase
    if (supabaseResponse.data.user) {
      try {
        await deleteSupabaseUser(supabaseResponse.data.user.id);
      } catch (e) {
        console.error("Erro ao apagar usuário do Supabase após falha:", e);
      }
    }

    return {
      error: { message: "Erro ao criar perfil de usuário" },
      user: null,
      session: null,
    };
  }
}

/**
 * Busca o usuário atual do Supabase e retorna os dados do Prisma
 */
export async function getCurrentUser() {
  const supabaseUser = await getSupabaseUser();

  if (!supabaseUser) {
    return null;
  }

  try {
    const user = await getUserByEmail(supabaseUser.email!);
    return user;
  } catch (error) {
    console.error("Erro ao buscar usuário do Prisma:", error);
    return null;
  }
}

/**
 * Faz logout do usuário
 */
export async function signOut() {
  return supabaseSignOut();
}

/**
 * Exclui um usuário do Supabase e do Prisma
 */
export async function deleteUser(userId: number, supabaseUserId: string) {
  try {
    // Primeiro exclui do Prisma
    await prisma.user.delete({
      where: { id: userId },
    });

    // Depois exclui do Supabase
    await deleteSupabaseUser(supabaseUserId);

    return { error: null };
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return { error: { message: "Erro ao excluir usuário" } };
  }
}
