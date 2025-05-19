"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Calendar, CircleDollarSign, PawPrint } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Bem-vindo ao seu sistema de gestão veterinária
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de estatísticas */}
        <Card className="p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-emerald-100 rounded-md flex items-center justify-center">
              <Calendar className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">
                Consultas Hoje
              </h2>
              <p className="text-3xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </Card>

        {/* Card de estatísticas */}
        <Card className="p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
              <PawPrint className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">
                Pacientes Ativos
              </h2>
              <p className="text-3xl font-semibold text-gray-900">248</p>
            </div>
          </div>
        </Card>

        {/* Card de estatísticas */}
        <Card className="p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-yellow-100 rounded-md flex items-center justify-center">
              <CircleDollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">
                Faturamento Mensal
              </h2>
              <p className="text-3xl font-semibold text-gray-900">R$ 42.580</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Próximas consultas */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Próximas Consultas
        </h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Paciente
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tutor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Horário
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Max (Labrador)
                      </div>
                      <div className="text-sm text-gray-500">
                        Consulta de rotina
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">João Silva</div>
                  <div className="text-sm text-gray-500">(11) 99999-8888</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Hoje, 14:30</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Confirmado
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Luna (Gato SRD)
                      </div>
                      <div className="text-sm text-gray-500">Vacinação</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Maria Oliveira</div>
                  <div className="text-sm text-gray-500">(11) 98765-4321</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Hoje, 16:00</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Aguardando
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
