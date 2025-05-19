"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  clinicaId: string;
  clinica?: {
    id: string;
    nome: string;
    planoAssinatura: string;
  };
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (
    email: string,
    password: string,
    userData: {
      nome: string;
      perfil: string;
      clinicaId: string;
    }
  ) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Função para buscar dados do usuário da API
  const fetchUserData = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        console.log("Nenhuma sessão ativa encontrada");
        setUser(null);
        setLoading(false);
        return;
      }

      const res = await fetch("/api/auth/user", {
        headers: {
          "Content-Type": "application/json",
          // Incluir explicitamente o token de autenticação
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        console.error("Erro na resposta da API:", await res.text());
        setUser(null);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      setUser(null);
    }
    setLoading(false);
  };

  // Verificar autenticação ao carregar
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        await fetchUserData();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setLoading(false);
      }
    });

    // Verificar se já está autenticado
    fetchUserData();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Função de login
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);

      // Login diretamente no Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      // Após o login bem-sucedido, buscar os dados completos do usuário
      await fetchUserData();

      return {};
    } catch (error) {
      console.error("Erro no login:", error);
      return { error: "Erro ao processar login" };
    } finally {
      setLoading(false);
    }
  };

  // Função de cadastro
  const signUp = async (
    email: string,
    password: string,
    userData: {
      nome: string;
      perfil: string;
      clinicaId: string;
    }
  ) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userData }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data.error?.message || "Erro ao criar conta" };
      }

      return {};
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return { error: "Erro ao processar cadastro" };
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const signOut = async () => {
    try {
      setLoading(true);

      // Primeiro limpa os cookies no servidor
      await fetch("/api/auth/logout", { method: "POST" });

      // Depois faz logout no Supabase
      await supabase.auth.signOut();

      setUser(null);
      router.push("/sign-in");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar dados do usuário
  const refreshUser = async () => {
    await fetchUserData();
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
