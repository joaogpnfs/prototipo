"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/supabase";

export default function AuthRequired({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        // Primeiro verifica se está autenticado no Supabase
        const authenticated = await isAuthenticated();

        if (!authenticated) {
          router.push(
            `/sign-in?redirect_url=${encodeURIComponent(
              window.location.pathname
            )}`
          );
          return;
        }

        // Depois verifica se o usuário existe no Prisma via API
        const response = await fetch("/api/auth/user");

        if (!response.ok) {
          setError("Erro: Usuário autenticado mas não encontrado no sistema");
          await fetch("/api/auth/logout", { method: "POST" });
          router.push("/sign-in");
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setError("Erro ao verificar autenticação");
        router.push("/sign-in");
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
