"use client";

import { useState } from "react";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
}

interface UserInput {
  email: string;
  name?: string;
  role?: string;
}

export function useUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getUsers(): Promise<User[] | null> {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao buscar usuários");
      }

      const data = await response.json();
      return data.users;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  async function createUser(userData: UserInput) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao criar usuário");
      }

      const data = await response.json();
      return data.user;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  async function updateUser(id: string, userData: Partial<UserInput>) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar usuário");
      }

      const data = await response.json();
      return data.user;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteUser(id: string) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao excluir usuário");
      }

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    error,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}
