"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import MainLayout from "@/components/MainLayout";
import {
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiPackage,
  FiFilter,
  FiRefreshCw,
} from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Configuração do gráfico para renderização no lado do servidor
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Faturamento Semanal",
    },
  },
};

// Dados para o gráfico
const data = {
  labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  datasets: [
    {
      label: "Faturamento (R$)",
      data: [1200, 1900, 1500, 2200, 1800, 1100],
      backgroundColor: "rgba(59, 130, 246, 0.5)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 1,
    },
  ],
};

export default function Home() {
  return (
    <MainLayout title="Dashboard" currentPath="/">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold tracking-tight">Visão Geral</h1>
          <Badge variant="secondary">Hoje</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <FiFilter size={16} />
            Filtros
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <FiRefreshCw size={16} />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Consultas Hoje
              </CardTitle>
              <FiCalendar className="text-primary" size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 inline-flex items-center">
                <FiTrendingUp className="mr-1" size={14} />
                +8%
              </span>{" "}
              desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Pacientes Ativos
              </CardTitle>
              <FiUsers className="text-primary" size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 inline-flex items-center">
                <FiTrendingUp className="mr-1" size={14} />
                +12%
              </span>{" "}
              este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Estoque Crítico
              </CardTitle>
              <FiPackage className="text-destructive" size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground mt-1">
              Itens com estoque baixo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Faturamento Hoje
              </CardTitle>
              <FiDollarSign className="text-emerald-500" size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1.850,00</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 inline-flex items-center">
                <FiTrendingUp className="mr-1" size={14} />
                +15%
              </span>{" "}
              desde ontem
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Próximos Atendimentos */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Próximos Atendimentos</CardTitle>
            <Button size="sm" className="gap-1">
              <FiCalendar size={16} />
              Ver agenda
            </Button>
          </div>
          <CardDescription>
            Lista de próximos atendimentos agendados para hoje
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Horário</TableHead>
                <TableHead>Pet</TableHead>
                <TableHead>Tutor</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>14:30</TableCell>
                <TableCell className="font-medium">Rex</TableCell>
                <TableCell>Maria Silva</TableCell>
                <TableCell>
                  <Badge variant="info">Consulta</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="warning">Aguardando</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>15:00</TableCell>
                <TableCell className="font-medium">Mia</TableCell>
                <TableCell>João Pereira</TableCell>
                <TableCell>
                  <Badge variant="success">Vacina</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="warning">Aguardando</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>15:30</TableCell>
                <TableCell className="font-medium">Tobby</TableCell>
                <TableCell>Ana Oliveira</TableCell>
                <TableCell>
                  <Badge variant="secondary">Banho e Tosa</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="warning">Aguardando</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>16:00</TableCell>
                <TableCell className="font-medium">Luna</TableCell>
                <TableCell>Carlos Santos</TableCell>
                <TableCell>
                  <Badge variant="danger">Exame</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="warning">Aguardando</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Estoque Crítico e Faturamento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Estoque Crítico</CardTitle>
            <CardDescription>
              Produtos com estoque abaixo do mínimo
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Vacina V10</TableCell>
                  <TableCell>
                    <Badge variant="danger">2 unidades</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Antibiótico XYZ</TableCell>
                  <TableCell>
                    <Badge variant="danger">3 unidades</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Ração Premium</TableCell>
                  <TableCell>
                    <Badge variant="danger">1 unidade</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" size="sm" className="ml-auto">
              Ver todos
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Faturamento Semanal</CardTitle>
            <CardDescription>Acompanhamento dos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Renderização condicional do gráfico apenas no lado do cliente */}
            <div className="h-[220px] flex items-center justify-center">
              {typeof window !== "undefined" && (
                <Bar options={options} data={data} height={220} />
              )}
              {typeof window === "undefined" && (
                <div className="text-muted-foreground flex items-center justify-center h-full">
                  Carregando gráfico...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
