"use client";

import React from "react";
import MainLayout from "@/components/MainLayout";
import { FiBarChart2, FiClock } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RelatoriosPage() {
  return (
    <MainLayout title="Relatórios" currentPath="/relatorios">
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <FiBarChart2 className="text-blue-600" size={36} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Relatórios - Aguarde!</h2>
            <p className="text-muted-foreground mb-6">
              Estamos desenvolvendo um sistema completo de relatórios e análises
              para ajudar você a tomar decisões baseadas em dados. Em breve você
              terá acesso a gráficos, estatísticas e insights valiosos sobre sua
              clínica.
            </p>
            <div className="flex items-center text-sm text-muted-foreground gap-1 mb-6">
              <FiClock size={14} />
              <span>Previsão: 4 semanas</span>
            </div>
            <Button
              variant="default"
              onClick={() => (window.location.href = "/")}
            >
              Voltar para Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
