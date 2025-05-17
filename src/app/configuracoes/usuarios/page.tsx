"use client";

import { useEffect, useState } from "react";
import UserForm from "@/components/UserForm";
import { useUsers } from "@/hooks/useUsers";

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const { getUsers, deleteUser, isLoading, error } = useUsers();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getUsers();
      if (data) {
        setUsers(data);
      }
    };
    loadUsers();
  }, [getUsers]);

  const handleDeleteUser = async (id: string) => {
    const success = await deleteUser(id);
    if (success) {
      getUsers();
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Gerenciamento de Usuários</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {showForm ? "Cancelar" : "Novo Usuário"}
      </button>

      {showForm && (
        <div className="mb-8 p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Cadastrar Usuário</h2>
          <UserForm
            onSuccess={() => {
              setShowForm(false);
              getUsers();
            }}
          />
        </div>
      )}

      {error && (
        <div className="my-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-4">Carregando...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Nome</th>
                <th className="py-2 px-4 border-b text-left">Papel</th>
                <th className="py-2 px-4 border-b text-left">
                  Data de Criação
                </th>
                <th className="py-2 px-4 border-b text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.name || "-"}</td>
                    <td className="py-2 px-4 border-b">{user.role}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center">
                    Nenhum usuário encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
