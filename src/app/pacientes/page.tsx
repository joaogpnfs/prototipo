"use client";

import React from "react";
import MainLayout from "@/components/MainLayout";
import { FiTool, FiClock } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PacientesPage() {
  return (
    <MainLayout title="Pacientes" currentPath="/pacientes">
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <FiTool className="text-primary" size={36} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Página em Construção</h2>
            <p className="text-muted-foreground mb-6">
              Estamos trabalhando para implementar o módulo de Pacientes. Em
              breve estará disponível com todos os recursos!
            </p>
            <div className="flex items-center text-sm text-muted-foreground gap-1 mb-6">
              <FiClock size={14} />
              <span>Previsão: 2 semanas</span>
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
