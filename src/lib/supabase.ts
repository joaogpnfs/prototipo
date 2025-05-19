import { createClient } from "@supabase/supabase-js";
import { type Database } from "@/types/supabase";

// Configurações compartilhadas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * CLIENTES SUPABASE
 */

// Cliente padrão para uso no navegador
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storageKey: "sb-session",
    flowType: "pkce" as const,
  },
});

/**
 * Cria um cliente Supabase para uso no servidor
 */
export function createServerClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  });
}

/**
 * Cria um cliente Supabase com token específico
 */
export function createAuthenticatedClient(token: string) {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Cria um cliente Supabase Admin para operações privilegiadas (apenas no servidor)
 */
export function createAdminClient() {
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * UTILITÁRIOS PARA COOKIES
 */

// Nomes dos cookies do Supabase
export const COOKIE_NAMES = {
  ACCESS_TOKEN: "sb-access-token",
  REFRESH_TOKEN: "sb-refresh-token",
};

// Opções padrão para cookies de autenticação
export const COOKIE_OPTIONS = {
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 dias
  httpOnly: true,
};

/**
 * Obtém os cookies de autenticação do request
 */
export function getAuthCookies(headers: Headers): {
  accessToken?: string;
  refreshToken?: string;
} {
  const cookieHeader = headers.get("cookie") || "";
  const cookies = parseCookieString(cookieHeader);

  return {
    accessToken: cookies[COOKIE_NAMES.ACCESS_TOKEN],
    refreshToken: cookies[COOKIE_NAMES.REFRESH_TOKEN],
  };
}

/**
 * Função auxiliar para fazer parse da string de cookie
 */
function parseCookieString(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};

  cookieString.split(";").forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });

  return cookies;
}

/**
 * FUNÇÕES DE AUTENTICAÇÃO
 */

// Tipo para metadados do usuário
export type UserMetadata = {
  nome?: string;
  perfil?: string;
  clinicaId?: number;
  [key: string]: unknown;
};

/**
 * Realiza o login do usuário com email e senha
 */
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

/**
 * Realiza o login do usuário com provedor OAuth
 */
export async function signInWithOAuth(
  provider: "google" | "github" | "facebook",
  redirectTo?: string
) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
    },
  });

  return { data, error };
}

/**
 * Registra um novo usuário
 */
export async function signUp(
  email: string,
  password: string,
  metadata?: UserMetadata
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });

  return { data, error };
}

/**
 * Realiza o logout do usuário
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Obtém o usuário atual se estiver autenticado
 */
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Verifica se o usuário está autenticado
 */
export async function isAuthenticated() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return !!session;
}

/**
 * Reseta a senha do usuário
 */
export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  return { data, error };
}

/**
 * Atualiza os dados do usuário
 */
export async function updateUserData(userData: UserMetadata) {
  const { data, error } = await supabase.auth.updateUser({
    data: userData,
  });

  return { data, error };
}

/**
 * Função para deletar usuário (apenas no servidor)
 */
export async function deleteUser(userId: string) {
  const adminClient = createAdminClient();
  return adminClient.auth.admin.deleteUser(userId);
}
