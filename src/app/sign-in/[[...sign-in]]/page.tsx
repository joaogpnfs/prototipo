"use client";

import { SignIn } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SignInPage() {
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
              <h2 className="text-3xl font-bold mb-6">Bem-vindo de volta!</h2>
              <p className="text-lg opacity-90 max-w-md">
                Acesse sua conta e continue gerenciando sua clínica veterinária
                com as melhores ferramentas do mercado.
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

      {/* Lado direito - Formulário de login */}
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
                Acesse sua conta
              </CardTitle>
              <CardDescription className="text-center">
                Entre com seu email e senha para continuar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignIn
                path="/sign-in"
                routing="path"
                signUpUrl="/sign-up"
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
