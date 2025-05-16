"use client";

import React from "react";
import MainLayout from "@/components/MainLayout";
import { FiSettings, FiClock } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ConfiguracoesPage() {
  return (
    <MainLayout title="Configurações" currentPath="/configuracoes">
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <FiSettings className="text-purple-600" size={36} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Configurações em Breve</h2>
            <p className="text-muted-foreground mb-6">
              O módulo de configurações está sendo aprimorado para oferecer
              personalização completa do sistema. Em breve você poderá ajustar
              preferências, perfis de usuário, permissões e muito mais.
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
