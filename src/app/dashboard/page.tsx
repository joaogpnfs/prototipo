"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState({
    pacientes: 0,
    consultas: 0,
    pendentes: 0,
    receita: 0,
  });

  useEffect(() => {
    // Em uma implementação real, aqui seria feita uma chamada à API para buscar estatísticas
    // Por enquanto, usaremos dados fictícios
    const loadStats = async () => {
      // Simulando atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 500));

      setStats({
        pacientes: 157,
        consultas: 42,
        pendentes: 8,
        receita: 12500,
      });
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Bem-vindo, {user?.nome || user?.email?.split("@")[0] || "Usuário"}
        </h1>
        <p className="text-gray-600 mt-2">
          Confira o resumo das atividades da sua clínica
        </p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de pacientes</CardDescription>
            <CardTitle className="text-3xl">{stats.pacientes}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-emerald-600">
              +3 novos na última semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Consultas este mês</CardDescription>
            <CardTitle className="text-3xl">{stats.consultas}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-emerald-600">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Consultas pendentes</CardDescription>
            <CardTitle className="text-3xl">{stats.pendentes}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-600">Precisa de atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Receita do mês (R$)</CardDescription>
            <CardTitle className="text-3xl">
              {stats.receita.toLocaleString("pt-BR")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-emerald-600">
              +8% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ações rápidas */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Ações rápidas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/pacientes/novo">Novo paciente</Link>
        </Button>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/consultas/agendar">Agendar consulta</Link>
        </Button>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/financeiro/nova-transacao">Registrar pagamento</Link>
        </Button>
      </div>

      {/* Próximas consultas - Placeholder */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Próximas consultas
      </h2>
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">
              As próximas consultas aparecerão aqui quando forem agendadas.
            </p>
            <Button
              asChild
              className="mt-4 bg-emerald-600 hover:bg-emerald-700"
            >
              <Link href="/consultas/agendar">Agendar consulta</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pacientes recentes - Placeholder */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Pacientes recentes
      </h2>
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">
              Os pacientes recentes aparecerão aqui quando forem cadastrados.
            </p>
            <Button
              asChild
              className="mt-4 bg-emerald-600 hover:bg-emerald-700"
            >
              <Link href="/pacientes/novo">Cadastrar paciente</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
