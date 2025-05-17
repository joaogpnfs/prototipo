"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const cadastrar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmSenha) {
      setError("As senhas não coincidem");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Registrar o usuário no Supabase
      const { error: authError } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            name: nome,
          },
        },
      });

      if (authError) {
        throw new Error(authError.message);
      }

      // 2. Criar o registro do usuário no banco de dados
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: nome,
          role: "user",
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || "Erro ao criar usuário no banco");
      }

      // Redirecionar para login com mensagem de confirmação
      router.push("/login?cadastro=sucesso");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao realizar cadastro"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Seção esquerda - Imagem/Branding */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 justify-center items-center p-10">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Sistema Médico</h1>
          <p className="text-blue-100 text-lg mb-8">
            Crie uma conta para acessar todos os recursos do sistema.
          </p>
          <div className="relative h-64 w-full">
            <Image
              src="/cadastro-illustration.svg"
              alt="Ilustração de cadastro"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Seção direita - Formulário */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-10 md:hidden">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Sistema Médico
            </h1>
            <p className="text-gray-600">Crie sua conta no sistema</p>
          </div>

          <div className="bg-white shadow-xl rounded-lg p-8 w-full">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Criar nova conta
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={cadastrar} className="space-y-5">
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nome completo
                </label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="senha"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Senha
                </label>
                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmSenha"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirmar senha
                </label>
                <input
                  id="confirmSenha"
                  type="password"
                  value={confirmSenha}
                  onChange={(e) => setConfirmSenha(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Cadastrando..." : "Criar conta"}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-medium transition"
              >
                Fazer login
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} Sistema Médico. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
