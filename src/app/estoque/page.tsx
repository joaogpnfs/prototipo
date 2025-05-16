"use client";

import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import {
  FiSearch,
  FiPlus,
  FiAlertCircle,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiChevronDown,
  FiDownload,
  FiUpload,
} from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

const estoqueData = [
  {
    id: 1,
    codigo: "VAC001",
    produto: "Vacina V10",
    categoria: "Vacinas",
    quantidade: 2,
    critico: true,
    minimo: 5,
    preco: 85.9,
    validade: "2025-12-15",
  },
  {
    id: 2,
    codigo: "VAC002",
    produto: "Vacina Antirrábica",
    categoria: "Vacinas",
    quantidade: 8,
    critico: false,
    minimo: 5,
    preco: 65.5,
    validade: "2025-10-20",
  },
  {
    id: 3,
    codigo: "MED001",
    produto: "Antibiótico XYZ",
    categoria: "Medicamentos",
    quantidade: 3,
    critico: true,
    minimo: 5,
    preco: 45.9,
    validade: "2026-02-28",
  },
  {
    id: 4,
    codigo: "MED002",
    produto: "Anti-inflamatório ABC",
    categoria: "Medicamentos",
    quantidade: 12,
    critico: false,
    minimo: 8,
    preco: 32.5,
    validade: "2026-05-15",
  },
  {
    id: 5,
    codigo: "RAC001",
    produto: "Ração Premium",
    categoria: "Alimentação",
    quantidade: 1,
    critico: true,
    minimo: 3,
    preco: 120.9,
    validade: "2025-08-10",
  },
  {
    id: 6,
    codigo: "RAC002",
    produto: "Ração Special Care",
    categoria: "Alimentação",
    quantidade: 5,
    critico: false,
    minimo: 4,
    preco: 145.9,
    validade: "2025-09-05",
  },
];

export default function Estoque() {
  const [filtro, setFiltro] = useState<"todos" | "criticos">("todos");

  const produtosFiltrados =
    filtro === "todos"
      ? estoqueData
      : estoqueData.filter((item) => item.critico);

  return (
    <MainLayout title="Gestão de Estoque" currentPath="/estoque">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Produtos no Estoque
          </h1>
          <Badge variant="secondary">{estoqueData.length} itens</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <FiDownload size={16} />
            Exportar
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <FiUpload size={16} />
            Importar
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <FiPlus size={16} />
                Novo Produto
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Adicionar Novo Produto</SheetTitle>
                <SheetDescription>
                  Preencha os dados do novo produto para adicionar ao estoque.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm font-medium col-span-1">
                    Código
                  </label>
                  <input
                    placeholder="Ex: MED003"
                    className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm font-medium col-span-1">
                    Produto
                  </label>
                  <input
                    placeholder="Nome do produto"
                    className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm font-medium col-span-1">
                    Categoria
                  </label>
                  <select className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Selecione uma categoria</option>
                    <option value="Vacinas">Vacinas</option>
                    <option value="Medicamentos">Medicamentos</option>
                    <option value="Alimentação">Alimentação</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm font-medium col-span-1">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm font-medium col-span-1">
                    Mínimo
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm font-medium col-span-1">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm font-medium col-span-1">
                    Validade
                  </label>
                  <input
                    type="date"
                    className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <SheetFooter>
                <Button type="submit">Salvar Produto</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Barra de ações */}
      <Card className="mb-6">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar produto por nome, código, categoria..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-md border"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={filtro === "todos" ? "default" : "outline"}
                size="sm"
                onClick={() => setFiltro("todos")}
              >
                Todos
              </Button>
              <Button
                variant={filtro === "criticos" ? "default" : "outline"}
                size="sm"
                onClick={() => setFiltro("criticos")}
              >
                <FiAlertCircle className="mr-1" size={16} />
                Críticos
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <FiFilter size={16} />
                    Filtros
                    <FiChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtrar por Categoria</DropdownMenuLabel>
                  <DropdownMenuItem>Todos</DropdownMenuItem>
                  <DropdownMenuItem>Vacinas</DropdownMenuItem>
                  <DropdownMenuItem>Medicamentos</DropdownMenuItem>
                  <DropdownMenuItem>Alimentação</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
                  <DropdownMenuItem>Nome (A-Z)</DropdownMenuItem>
                  <DropdownMenuItem>Nome (Z-A)</DropdownMenuItem>
                  <DropdownMenuItem>Quantidade (Menor-Maior)</DropdownMenuItem>
                  <DropdownMenuItem>Quantidade (Maior-Menor)</DropdownMenuItem>
                  <DropdownMenuItem>Validade (Próxima)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Produtos */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Produtos</CardTitle>
          <CardDescription>
            {filtro === "criticos"
              ? "Lista de produtos com estoque abaixo do mínimo"
              : "Lista de todos os produtos cadastrados no estoque"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtosFiltrados.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.codigo}</TableCell>
                  <TableCell>{item.produto}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.categoria === "Vacinas"
                          ? "info"
                          : item.categoria === "Medicamentos"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {item.categoria}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.critico ? (
                      <Badge variant="danger">{item.quantidade} un</Badge>
                    ) : (
                      <span>{item.quantidade} un</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(item.validade).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.preco)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <FiEdit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <FiTrash2 size={16} className="text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Mostrando {produtosFiltrados.length} de {estoqueData.length}{" "}
            produtos
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Próximo
            </Button>
          </div>
        </CardFooter>
      </Card>
    </MainLayout>
  );
}
