import React from 'react';
import MainLayout from '@/components/MainLayout';
import { FiCalendar, FiEdit, FiTrash2, FiCheck, FiPlay } from 'react-icons/fi';

export default function Agenda() {
  return (
    <MainLayout title="Agenda" currentPath="/agenda">
      {/* Barra de ações */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FiCalendar size={18} />
            <span>Novo Agendamento</span>
          </button>
          
          <div className="flex items-center bg-white rounded-lg shadow">
            <button className="px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600">
              Hoje
            </button>
            <button className="px-4 py-2 font-medium text-gray-600 hover:text-blue-600">
              Semana
            </button>
            <button className="px-4 py-2 font-medium text-gray-600 hover:text-blue-600">
              Mês
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-600 hover:text-blue-600">
            <FiCalendar size={20} />
          </button>
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-600 hover:text-blue-600">
              ◀
            </button>
            <span className="font-medium">16/05/2025</span>
            <button className="p-1 text-gray-600 hover:text-blue-600">
              ▶
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="todos">Todos</option>
              <option value="consulta">Consulta</option>
              <option value="vacina">Vacina</option>
              <option value="banho">Banho</option>
              <option value="tosa">Tosa</option>
              <option value="exame">Exame</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="todos">Todos Veterinários</option>
              <option value="dr-carlos">Dr. Carlos</option>
              <option value="dra-ana">Dra. Ana</option>
              <option value="dr-paulo">Dr. Paulo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grade de Horários */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                  Horário
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dr. Carlos
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dra. Ana
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dr. Paulo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">08:00</td>
                <td className="px-6 py-4">
                  <div className="bg-blue-100 border-l-4 border-blue-500 rounded p-2">
                    <p className="font-medium text-blue-800">Rex</p>
                    <p className="text-xs text-blue-600">Consulta</p>
                  </div>
                </td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">
                  <div className="bg-purple-100 border-l-4 border-purple-500 rounded p-2">
                    <p className="font-medium text-purple-800">Mia</p>
                    <p className="text-xs text-purple-600">Banho e Tosa</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">09:00</td>
                <td className="px-6 py-4">
                  <div className="bg-green-100 border-l-4 border-green-500 rounded p-2">
                    <p className="font-medium text-green-800">Luna</p>
                    <p className="text-xs text-green-600">Vacina</p>
                  </div>
                </td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">
                  <div className="bg-purple-100 border-l-4 border-purple-500 rounded p-2">
                    <p className="font-medium text-purple-800">Thor</p>
                    <p className="text-xs text-purple-600">Banho</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">10:00</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">
                  <div className="bg-blue-100 border-l-4 border-blue-500 rounded p-2">
                    <p className="font-medium text-blue-800">Nina</p>
                    <p className="text-xs text-blue-600">Consulta</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="bg-purple-100 border-l-4 border-purple-500 rounded p-2">
                    <p className="font-medium text-purple-800">Bella</p>
                    <p className="text-xs text-purple-600">Tosa</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">11:00</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">
                  <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded p-2">
                    <p className="font-medium text-yellow-800">Max</p>
                    <p className="text-xs text-yellow-600">Exame</p>
                  </div>
                </td>
                <td className="px-6 py-4"></td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">12:00</td>
                <td className="px-6 py-4 bg-gray-100 text-center text-sm text-gray-500">ALMOÇO</td>
                <td className="px-6 py-4 bg-gray-100 text-center text-sm text-gray-500">ALMOÇO</td>
                <td className="px-6 py-4 bg-gray-100 text-center text-sm text-gray-500">ALMOÇO</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">13:00</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4 bg-red-100 border-l-4 border-red-500 rounded" rowSpan={2}>
                  <div className="p-2 h-full">
                    <p className="font-medium text-red-800">Bob</p>
                    <p className="text-xs text-red-600">Cirurgia</p>
                  </div>
                </td>
                <td className="px-6 py-4"></td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">14:00</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">15:00</td>
                <td className="px-6 py-4">
                  <div className="bg-blue-100 border-l-4 border-blue-500 rounded p-2">
                    <p className="font-medium text-blue-800">Toby</p>
                    <p className="text-xs text-blue-600">Retorno</p>
                  </div>
                </td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">
                  <div className="bg-purple-100 border-l-4 border-purple-500 rounded p-2">
                    <p className="font-medium text-purple-800">Lola</p>
                    <p className="text-xs text-purple-600">Banho</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Detalhes do Agendamento */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Detalhes do Agendamento</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pet</p>
                <p className="font-medium">Rex (Labrador, 3 anos)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tutor</p>
                <p className="font-medium">Maria Silva - (86) 99999-9999</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Horário</p>
                <p className="font-medium">08:00 - 09:00</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tipo</p>
                <p className="font-medium">Consulta - Retorno dermatológico</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Profissional</p>
                <p className="font-medium">Dr. Carlos</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Observações</p>
              <p className="text-gray-700">Trazer exames anteriores e verificar reação à medicação prescrita na última consulta.</p>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              <FiEdit size={16} />
              <span>Editar</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
              <FiTrash2 size={16} />
              <span>Cancelar</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg">
              <FiCheck size={16} />
              <span>Confirmar</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
              <FiPlay size={16} />
              <span>Iniciar Atendimento</span>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
