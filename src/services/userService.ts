import { prisma } from "@/lib/db";

export interface UserData {
  email: string;
  nome?: string;
  senha?: string;
  perfil?: string;
  clinicaId?: number;
}

export async function createUser(userData: UserData) {
  try {
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        nome: userData.nome!,
        senha: userData.senha!,
        perfil: userData.perfil!,
        clinicaId: userData.clinicaId!,
      },
    });
    return { user, error: null };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return {
      user: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return { user, error: null };
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return {
      user: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return { users, error: null };
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return {
      users: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function updateUser(id: string, userData: Partial<UserData>) {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: userData,
    });
    return { user, error: null };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return {
      user: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    return { success: true, error: null };
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
