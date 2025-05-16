import React from 'react';
import MainLayout from '@/components/MainLayout';
import { FiSearch, FiPlus, FiCreditCard, FiDollarSign, FiClock } from 'react-icons/fi';

export default function PDV() {
  return (
    <MainLayout title="Ponto de Venda" currentPath="/pdv">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da esquerda - Carrinho */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Buscar cliente..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center">
                      <FiPlus size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pet</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Selecionar Pet</option>
                    <option value="rex">Rex (Labrador)</option>
                    <option value="mia">Mia (Persa)</option>
                    <option value="thor">Thor (Bulldog)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar produto ou serviço..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Itens do Carrinho</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Qtd
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor Unit.
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Consulta</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ 120,00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ 120,00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-red-600 hover:text-red-800">Remover</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Vacina V10</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ 85,00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ 85,00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-red-600 hover:text-red-800">Remover</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Antipulgas</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ 28,00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ 56,00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-red-600 hover:text-red-800">Remover</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">R$ 261,00</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Desconto:</span>
                  <span className="font-semibold">R$ 0,00</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium text-gray-700">Total:</span>
                  <span className="font-bold text-blue-600">R$ 261,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Coluna da direita - Pagamento e Cliente */}
        <div>
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Formas de Pagamento</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FiDollarSign size={18} />
                  <span>Dinheiro</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FiCreditCard size={18} />
                  <span>Débito</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FiCreditCard size={18} />
                  <span>Crédito</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <span>PIX</span>
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Parcelamento</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="1">1x</option>
                  <option value="2">2x</option>
                  <option value="3">3x</option>
                  <option value="4">4x</option>
                  <option value="5">5x</option>
                  <option value="6">6x</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                ></textarea>
              </div>
            </div>
            
            <div className="p-6 flex items-center justify-between">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Cancelar Venda
              </button>
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">
                Finalizar Venda
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Informações do Cliente</h3>
              <div className="space-y-2">
                <p className="text-gray-800 font-medium">Maria Silva</p>
                <p className="text-gray-600">(86) 99999-9999</p>
                <p className="text-gray-600">maria.silva@email.com</p>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Últimas Compras</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FiClock className="text-gray-400 mr-2" size={16} />
                    <span className="text-gray-600">05/05/25</span>
                  </div>
                  <span className="font-medium">R$ 180,00</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FiClock className="text-gray-400 mr-2" size={16} />
                    <span className="text-gray-600">12/04/25</span>
                  </div>
                  <span className="font-medium">R$ 250,00</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FiClock className="text-gray-400 mr-2" size={16} />
                    <span className="text-gray-600">28/03/25</span>
                  </div>
                  <span className="font-medium">R$ 320,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
