"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SignUpPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          userData: {
            nome: nome || email.split("@")[0],
            perfil: "admin",
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Erro ao criar conta");
      }

      console.log("Usuário criado com sucesso:", data.user);

      // Cadastro bem-sucedido - redirecionar para login
      router.push("/sign-in?cadastro=sucesso");
    } catch (err) {
      console.error("Erro ao criar conta:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao criar sua conta. Tente novamente."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Lado esquerdo - Imagem e mensagem de boas-vindas */}
      <div className="hidden md:flex w-1/2 bg-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800 opacity-80 z-10"></div>

        <Image
          src="/close-no-veterinario-cuidando-cachorro.jpg"
          alt="Veterinário cuidando de animais"
          fill
          className="object-cover z-0 opacity-75"
          priority
        />

        <div className="relative z-20 p-12 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/clinivet.png"
                alt="CliniVet Logo"
                width={60}
                height={60}
                className="rounded-full bg-white p-1"
              />
              <h1 className="text-3xl font-bold">CliniVet</h1>
            </div>

            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Crie sua conta!</h2>
              <p className="text-lg opacity-90 max-w-md">
                Registre-se para começar a gerenciar sua clínica veterinária com
                as melhores ferramentas do mercado.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Gerenciamento completo</h3>
                <p className="opacity-80">
                  Gerencie pacientes, consultas e estoque em um só lugar
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Segurança em primeiro lugar</h3>
                <p className="opacity-80">
                  Dados protegidos com a mais alta tecnologia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário de cadastro */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="md:hidden flex flex-col items-center mb-8">
            <div className="flex items-center gap-2">
              <Image
                src="/clinivet.png"
                alt="CliniVet Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <h1 className="text-2xl font-bold text-emerald-600">CliniVet</h1>
            </div>
          </div>

          <Card className="shadow-xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-800">
                Crie sua conta
              </CardTitle>
              <CardDescription className="text-center">
                Preencha seus dados para se registrar
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNome(e.target.value)
                    }
                    required
                    className="rounded border-gray-300 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="rounded border-gray-300 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    required
                    className="rounded border-gray-300 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirme a senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                    className="rounded border-gray-300 focus:border-emerald-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Cadastrando..." : "Criar conta"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{" "}
                  <Link
                    href="/sign-in"
                    className="text-emerald-600 hover:text-emerald-800 font-medium"
                  >
                    Faça login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
