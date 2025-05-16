"use client";
import React from "react";
import MainLayout from "@/components/MainLayout";
import {
  FiCalendar,
  FiFileText,
  FiPaperclip,
  FiPrinter,
  FiDownload,
  FiEdit,
} from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Prontuario() {
  return (
    <MainLayout title="Prontuário do Pet" currentPath="/prontuario">
      {/* Informações do Pet */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32 border-4 border-primary/10">
                <AvatarImage
                  src="https://placedog.net/200/200"
                  alt="Foto do Pet"
                />
                <AvatarFallback>REX</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <h2 className="text-2xl font-bold text-foreground">Rex</h2>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <FiPrinter size={16} />
                    Imprimir
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <FiDownload size={16} />
                    Exportar
                  </Button>
                  <Button size="sm" className="gap-1.5">
                    <FiEdit size={16} />
                    Editar
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Espécie</p>
                  <p className="font-medium">Canino</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Raça</p>
                  <p className="font-medium">Labrador</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Idade</p>
                  <p className="font-medium">3 anos e 5 meses</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Peso</p>
                  <p className="font-medium">28,5 kg</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tutor</p>
                  <p className="font-medium text-primary hover:underline cursor-pointer">
                    Maria Silva
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Cadastro</p>
                  <p className="font-medium">15/01/2022</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <div className="px-4 py-2 border-t">
          <div className="flex overflow-x-auto space-x-4">
            <Button variant="ghost" className="border-b-2 border-primary">
              Histórico
            </Button>
            <Button variant="ghost">Vacinas</Button>
            <Button variant="ghost">Exames</Button>
            <Button variant="ghost">Medicações</Button>
          </div>
        </div>
      </Card>

      {/* Histórico de Atendimentos */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Histórico de Atendimentos</CardTitle>
            <Button className="gap-1.5">
              <FiCalendar size={16} />
              Novo Atendimento
            </Button>
          </div>
          <CardDescription>
            Lista de todos os atendimentos realizados
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Veterinário</TableHead>
                <TableHead>Diagnóstico</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-primary/5">
                <TableCell>10/05/25</TableCell>
                <TableCell>
                  <Badge variant="info">Consulta</Badge>
                </TableCell>
                <TableCell>Dr. Carlos</TableCell>
                <TableCell className="font-medium">
                  Dermatite alérgica
                </TableCell>
                <TableCell>
                  <Button variant="link" className="p-0 h-auto">
                    Ver detalhes
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>15/04/25</TableCell>
                <TableCell>
                  <Badge variant="success">Vacina</Badge>
                </TableCell>
                <TableCell>Dra. Ana</TableCell>
                <TableCell className="font-medium">Vacina V10</TableCell>
                <TableCell>
                  <Button variant="link" className="p-0 h-auto">
                    Ver detalhes
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>02/03/25</TableCell>
                <TableCell>
                  <Badge variant="warning">Exame</Badge>
                </TableCell>
                <TableCell>Dr. Carlos</TableCell>
                <TableCell className="font-medium">
                  Hemograma completo
                </TableCell>
                <TableCell>
                  <Button variant="link" className="p-0 h-auto">
                    Ver detalhes
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10/02/25</TableCell>
                <TableCell>
                  <Badge variant="danger">Emergência</Badge>
                </TableCell>
                <TableCell>Dra. Patrícia</TableCell>
                <TableCell className="font-medium">
                  Ingestão de corpo estranho
                </TableCell>
                <TableCell>
                  <Button variant="link" className="p-0 h-auto">
                    Ver detalhes
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>05/01/25</TableCell>
                <TableCell>
                  <Badge variant="info">Consulta</Badge>
                </TableCell>
                <TableCell>Dr. Carlos</TableCell>
                <TableCell className="font-medium">
                  Check-up de rotina
                </TableCell>
                <TableCell>
                  <Button variant="link" className="p-0 h-auto">
                    Ver detalhes
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detalhes do Atendimento */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Detalhes do Atendimento (10/05/25)</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <FiPaperclip size={16} />
                Anexos (2)
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <FiFileText size={16} />
                Receita
              </Button>
            </div>
          </div>
          <CardDescription>
            Consulta de rotina realizada pelo Dr. Carlos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="text-md font-medium mb-2">Anamnese</h4>
            <p className="text-muted-foreground">
              Paciente apresentou coceira intensa e vermelhidão na região
              abdominal há 3 dias. Tutor relata que iniciou após passeio em área
              com grama alta. Sem alterações no apetite ou comportamento.
            </p>
          </div>

          <div>
            <h4 className="text-md font-medium mb-2">Exame Físico</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Temperatura
                </p>
                <p className="font-medium">38.5°C</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Frequência Cardíaca
                </p>
                <p className="font-medium">95 bpm</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Frequência Respiratória
                </p>
                <p className="font-medium">22 mpm</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hidratação</p>
                <p className="font-medium">Normal</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Mucosas</p>
                <p className="font-medium">Normocoradas</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Linfonodos</p>
                <p className="font-medium">Sem alterações</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium mb-2">Diagnóstico</h4>
            <p className="text-muted-foreground">
              Dermatite alérgica, possivelmente causada por contato com alérgeno
              ambiental (gramíneas).
            </p>
          </div>

          <div>
            <h4 className="text-md font-medium mb-2">Tratamento Prescrito</h4>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                <p className="text-muted-foreground">
                  Prednisolona 20mg - 1 comprimido a cada 24h por 5 dias
                </p>
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                <p className="text-muted-foreground">
                  Shampoo hipoalergênico - Banho a cada 2 dias por 10 dias
                </p>
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                <p className="text-muted-foreground">
                  Evitar contato com áreas de grama alta
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-medium mb-2">Observações</h4>
            <p className="text-muted-foreground">
              Paciente deve retornar em 7 dias para reavaliação. Em caso de
              piora dos sintomas, retornar imediatamente. Considerar teste
              alérgico se houver recorrência.
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <p className="text-sm text-muted-foreground">
            Última atualização: 10/05/25 às 15:48
          </p>
          <Button variant="outline" size="sm">
            Editar registro
          </Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
}
