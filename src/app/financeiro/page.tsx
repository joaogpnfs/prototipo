"use client";

import React from "react";
import MainLayout from "@/components/MainLayout";
import { FiDollarSign, FiClock } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FinanceiroPage() {
  return (
    <MainLayout title="Financeiro" currentPath="/financeiro">
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <FiDollarSign className="text-green-600" size={36} />
            </div>
            <h2 className="text-2xl font-bold mb-3">
              Módulo em Desenvolvimento
            </h2>
            <p className="text-muted-foreground mb-6">
              O módulo financeiro está sendo desenvolvido para proporcionar
              controle total sobre as finanças da clínica. Em breve você poderá
              gerenciar pagamentos, despesas e relatórios financeiros!
            </p>
            <div className="flex items-center text-sm text-muted-foreground gap-1 mb-6">
              <FiClock size={14} />
              <span>Previsão: 3 semanas</span>
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
