"use client";

import { ReactNode } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { useAuth } from "@/contexts/AuthContext";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useAuth();

  // Se estiver carregando ou não houver usuário, não renderiza o layout
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar />
      <Header />
      <main className="pt-16 pl-64 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
