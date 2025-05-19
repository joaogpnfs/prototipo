"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  CalendarIcon,
  PawPrintIcon,
  LineChartIcon,
  SettingsIcon,
  MenuIcon,
  XIcon,
  HomeIcon,
  UserIcon,
  LogOutIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

function SidebarLink({
  href,
  icon,
  children,
  active,
  onClick,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center p-3 rounded-lg transition-colors ${
        active
          ? "bg-emerald-100 text-emerald-900"
          : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{children}</span>
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Overlay para dispositivos móveis */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo e título */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Image
                src="/clinivet.png"
                alt="CliniVet Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-emerald-700">
                CliniVet
              </span>
            </Link>
            <button
              className="p-1 rounded-md md:hidden hover:bg-gray-100"
              onClick={closeSidebar}
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Links de navegação */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            <SidebarLink
              href="/dashboard"
              icon={<HomeIcon className="w-5 h-5" />}
              active={pathname === "/dashboard"}
              onClick={closeSidebar}
            >
              Dashboard
            </SidebarLink>
            <SidebarLink
              href="/consultas"
              icon={<CalendarIcon className="w-5 h-5" />}
              active={pathname.startsWith("/consultas")}
              onClick={closeSidebar}
            >
              Agenda
            </SidebarLink>
            <SidebarLink
              href="/pacientes"
              icon={<PawPrintIcon className="w-5 h-5" />}
              active={pathname.startsWith("/pacientes")}
              onClick={closeSidebar}
            >
              Pacientes
            </SidebarLink>
            <SidebarLink
              href="/produtos"
              icon={<ShoppingBagIcon className="w-5 h-5" />}
              active={pathname.startsWith("/produtos")}
              onClick={closeSidebar}
            >
              Produtos
            </SidebarLink>
            <SidebarLink
              href="/financeiro"
              icon={<LineChartIcon className="w-5 h-5" />}
              active={pathname.startsWith("/financeiro")}
              onClick={closeSidebar}
            >
              Financeiro
            </SidebarLink>
            <SidebarLink
              href="/configuracoes"
              icon={<SettingsIcon className="w-5 h-5" />}
              active={pathname.startsWith("/configuracoes")}
              onClick={closeSidebar}
            >
              Configurações
            </SidebarLink>
          </div>

          {/* Perfil do usuário */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-700">
                <UserIcon className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <div className="font-medium truncate">
                  {user?.nome || user?.email?.split("@")[0] || "Usuário"}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {user?.email}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              onClick={handleSignOut}
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1 md:pl-64">
        {/* Barra superior para dispositivos móveis */}
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white shadow md:hidden">
          <button
            className="p-1 rounded-md hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <Image
              src="/clinivet.png"
              alt="CliniVet Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-bold text-emerald-700">CliniVet</span>
          </div>
        </header>

        {/* Conteúdo da página */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
