"use client";

import { SignUp } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen">
      {/* Lado esquerdo - Imagem e mensagem de boas-vindas */}
      <div className="hidden md:flex w-1/2 bg-emerald-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 to-emerald-900 opacity-80 z-10"></div>

        <Image
          src="/close-no-veterinario-cuidando-cachorro.jpg"
          alt="Equipe veterinária"
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
              <h2 className="text-3xl font-bold mb-6">Comece sua jornada!</h2>
              <p className="text-lg opacity-90 max-w-md">
                Crie sua conta e transforme a gestão da sua clínica veterinária
                com nossa plataforma completa.
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Rápido e fácil</h3>
                <p className="opacity-80">
                  Configure sua clínica em minutos e comece a usar
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
                    d="M7 11.5V14m0-2.5v-6a2 2 0 014 0v6m-4 0h4m-4 0h0m-7 4h18M9 18a2 2 0 002 2h.01a2 2 0 002-2m-6 0a2 2 0 012-2h2a2 2 0 012 2m-6 0v-2"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Acesso a todos os recursos</h3>
                <p className="opacity-80">
                  Prontuários, agendamentos, estoque e muito mais
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Suporte dedicado</h3>
                <p className="opacity-80">
                  Nossa equipe está sempre disponível para ajudar
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
                Comece a jornada para transformar sua clínica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignUp
                path="/sign-up"
                routing="path"
                signInUrl="/sign-in"
                appearance={{
                  elements: {
                    formButtonPrimary:
                      "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition-colors",
                    card: "shadow-none",
                    footer: "text-center",
                    formFieldInput:
                      "border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition",
                  },
                  variables: {
                    colorPrimary: "#059669",
                    colorText: "#374151",
                  },
                }}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
