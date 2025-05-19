"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";

type UserWithClinica = User & {
  clinica: {
    id: number;
    nome: string;
  };
};

export default function NavBar() {
  const [user, setUser] = useState<UserWithClinica | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch("/api/auth/user");

        if (!response.ok) {
          // Se não estiver autenticado ou houver erro, não mostra a barra
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data.user as UserWithClinica);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/sign-in";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (isLoading) {
    return (
      <header className="bg-white shadow-sm h-16 flex items-center px-4">
        <div className="animate-pulse h-8 w-32 bg-gray-200 rounded"></div>
      </header>
    );
  }

  // Se não houver usuário, não mostramos a barra de navegação
  if (!user) return null;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/clinivet.png"
                alt="CliniVet Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-2 text-lg font-semibold text-emerald-600">
                CliniVet
              </span>
            </Link>
            <div className="ml-3 text-sm text-gray-500">
              {user.clinica.nome}
            </div>
            <nav className="hidden md:ml-10 md:flex space-x-4">
              <Link
                href="/agenda"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600"
              >
                Agenda
              </Link>
              <Link
                href="/pacientes"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600"
              >
                Pacientes
              </Link>
              <Link
                href="/financeiro"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600"
              >
                Financeiro
              </Link>
            </nav>
          </div>

          <div className="flex items-center">
            <div className="relative ml-3">
              <div>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <span className="sr-only">Abrir menu do usuário</span>
                  <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    {user.nome?.charAt(0).toUpperCase() || "U"}
                  </div>
                </button>
              </div>

              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <div className="px-4 py-2 text-xs text-gray-500">
                      {user.nome} ({user.perfil})
                    </div>
                    <div className="px-4 py-1 text-xs text-gray-400">
                      {user.email}
                    </div>
                    <Link
                      href="/configuracoes"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Configurações
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
