// Componente de layout principal que será usado em todas as páginas
"use client";
import React from "react";
import Link from "next/link";
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiClipboard,
  FiPackage,
  FiShoppingCart,
  FiDollarSign,
  FiBarChart2,
  FiSettings,
  FiBell,
  FiSearch,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiHelpCircle,
  FiChevronDown,
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon,
  text,
  active,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-4 py-3 text-sm rounded-lg transition-colors",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </Link>
  );
};

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  currentPath: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  currentPath,
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r shadow-sm transition-transform duration-300 md:translate-x-0 md:static md:z-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <h1 className="text-xl font-semibold text-primary">VetClinic</h1>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={20} />
          </Button>
        </div>
        <div className="p-4 space-y-1">
          <SidebarItem
            href="/"
            icon={<FiHome size={18} />}
            text="Dashboard"
            active={currentPath === "/"}
          />
          <SidebarItem
            href="/agenda"
            icon={<FiCalendar size={18} />}
            text="Agenda"
            active={currentPath === "/agenda"}
          />
          <SidebarItem
            href="/pacientes"
            icon={<FiUsers size={18} />}
            text="Pacientes"
            active={currentPath === "/pacientes"}
          />
          <SidebarItem
            href="/prontuario"
            icon={<FiClipboard size={18} />}
            text="Prontuário"
            active={currentPath === "/prontuario"}
          />
          <SidebarItem
            href="/estoque"
            icon={<FiPackage size={18} />}
            text="Estoque"
            active={currentPath === "/estoque"}
          />
          <SidebarItem
            href="/pdv"
            icon={<FiShoppingCart size={18} />}
            text="Vendas"
            active={currentPath === "/pdv"}
          />
          <SidebarItem
            href="/financeiro"
            icon={<FiDollarSign size={18} />}
            text="Financeiro"
            active={currentPath === "/financeiro"}
          />
          <SidebarItem
            href="/relatorios"
            icon={<FiBarChart2 size={18} />}
            text="Relatórios"
            active={currentPath === "/relatorios"}
          />
          <SidebarItem
            href="/configuracoes"
            icon={<FiSettings size={18} />}
            text="Configurações"
            active={currentPath === "/configuracoes"}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-card border-b shadow-sm">
          <div className="px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <FiMenu size={20} />
              </Button>
              <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:flex w-40 lg:w-64">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-md border bg-background"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <FiBell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-y-auto">
                    <DropdownMenuItem className="flex flex-col items-start py-2 cursor-pointer">
                      <div className="font-medium">Agenda</div>
                      <div className="text-xs text-muted-foreground">
                        5 novas consultas agendadas para hoje
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Há 30 minutos
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start py-2 cursor-pointer">
                      <div className="font-medium">Estoque</div>
                      <div className="text-xs text-muted-foreground">
                        Produto &quot;Vacina V10&quot; com estoque baixo
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Há 2 horas
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start py-2 cursor-pointer">
                      <div className="font-medium">Financeiro</div>
                      <div className="text-xs text-muted-foreground">
                        3 pagamentos vencidos precisam de atenção
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Ontem às 18:30
                      </div>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center text-primary cursor-pointer">
                    Ver todas as notificações
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        U
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:flex items-center gap-1">
                      <span className="text-sm font-medium">Usuário</span>
                      <FiChevronDown
                        size={16}
                        className="text-muted-foreground"
                      />
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <FiUser className="mr-2" size={16} />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <FiSettings className="mr-2" size={16} />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <FiHelpCircle className="mr-2" size={16} />
                    Ajuda
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-destructive">
                    <FiLogOut className="mr-2" size={16} />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
