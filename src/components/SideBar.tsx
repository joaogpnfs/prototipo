"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarDays,
  PawPrint,
  DollarSign,
  ShoppingBag,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

type SideBarItemProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

const SideBarItem = ({ href, label, icon, active }: SideBarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
        active
          ? "bg-emerald-100 text-emerald-800 font-medium"
          : "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"
      )}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      href: "/agenda",
      label: "Agenda",
      icon: <CalendarDays size={20} />,
    },
    {
      href: "/pacientes",
      label: "Pacientes",
      icon: <PawPrint size={20} />,
    },
    {
      href: "/financeiro",
      label: "Financeiro",
      icon: <DollarSign size={20} />,
    },
    {
      href: "/produtos",
      label: "Produtos",
      icon: <ShoppingBag size={20} />,
    },
    {
      href: "/equipe",
      label: "Equipe",
      icon: <Users size={20} />,
    },
    {
      href: "/configuracoes",
      label: "Configurações",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside
      className={cn(
        "fixed h-screen top-0 left-0 z-30 bg-white shadow-md transition-all border-r border-gray-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Image
              src="/clinivet.png"
              alt="CliniVet Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-semibold text-emerald-700">CliniVet</span>
          </div>
        )}
        {collapsed && (
          <Image
            src="/clinivet.png"
            alt="CliniVet Logo"
            width={32}
            height={32}
            className="rounded-full mx-auto"
          />
        )}
        <button
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight size={20} className="text-gray-500" />
          ) : (
            <ChevronLeft size={20} className="text-gray-500" />
          )}
        </button>
      </div>
      <nav className="flex flex-col gap-1 p-2">
        {navItems.map((item) => (
          <SideBarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={collapsed ? "" : item.label}
            active={pathname === item.href}
          />
        ))}
      </nav>
    </aside>
  );
}
