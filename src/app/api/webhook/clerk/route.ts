import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || "";

// Definindo tipos específicos para metadados
interface PublicMetadata {
  perfil?: string;
  clinicaId?: number;
}

export async function POST(req: Request) {
  // Verificar a assinatura do webhook
  const payload = await req.text();
  const headers = req.headers;

  // Obter os headers necessários para verificação
  const svixId = headers.get("svix-id");
  const svixTimestamp = headers.get("svix-timestamp");
  const svixSignature = headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    console.error("Headers de verificação do webhook ausentes");
    return new NextResponse("Headers de verificação ausentes", { status: 400 });
  }

  // Configurar o objeto de headers para verificação
  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixTimestamp,
    "svix-signature": svixSignature,
  };

  // Criar uma instância do Webhook para verificação
  const webhook = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    // Verificar a assinatura usando a biblioteca svix
    evt = webhook.verify(payload, svixHeaders) as WebhookEvent;
  } catch (err) {
    console.error("Erro ao verificar webhook:", err);
    return new NextResponse("Erro ao verificar webhook", { status: 400 });
  }

  const eventType = evt.type;
  console.log(
    `Webhook recebido: ${eventType}`,
    JSON.stringify(evt.data, null, 2)
  );

  // Processar eventos específicos
  if (eventType === "user.created") {
    try {
      const userData = evt.data;

      // Extrair email primário
      const primaryEmailId = userData.primary_email_address_id;
      const emailAddresses = userData.email_addresses || [];
      const primaryEmail = emailAddresses.find(
        (email) => email.id === primaryEmailId
      );
      const emailAddress =
        primaryEmail?.email_address || emailAddresses[0]?.email_address || "";

      // Extrair nome formatado
      const firstName = userData.first_name || "";
      const lastName = userData.last_name || "";
      const nome =
        firstName && lastName
          ? `${firstName} ${lastName}`
          : userData.username || emailAddress.split("@")[0] || "";

      // Extrair metadados
      const publicMetadata = (userData.public_metadata as PublicMetadata) || {};
      const clinicaId = publicMetadata.clinicaId || 1;
      const perfil = publicMetadata.perfil || "usuario";

      console.log("Criando usuário:", {
        id: userData.id,
        email: emailAddress,
        nome,
        clinicaId,
        perfil,
      });

      await prisma.user.create({
        data: {
          nome,
          email: emailAddress,
          senha: "", // Senha gerenciada pelo Clerk
          perfil,
          clinica: {
            connect: {
              id: clinicaId,
            },
          },
          dataCriacao: new Date(),
        },
      });
      console.log("Usuário criado com sucesso no banco de dados");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return new NextResponse("Erro ao criar usuário", { status: 500 });
    }
  }

  if (eventType === "user.updated") {
    try {
      const userData = evt.data;

      // Extrair email primário
      const primaryEmailId = userData.primary_email_address_id;
      const emailAddresses = userData.email_addresses || [];
      const primaryEmail = emailAddresses.find(
        (email) => email.id === primaryEmailId
      );
      const emailAddress =
        primaryEmail?.email_address || emailAddresses[0]?.email_address || "";

      // Buscar usuário no banco
      const usuarioExistente = await prisma.user.findUnique({
        where: {
          email: emailAddress,
        },
      });

      if (!usuarioExistente) {
        console.error("Usuário não encontrado para atualização:", emailAddress);
        return new NextResponse("Usuário não encontrado", { status: 404 });
      }

      // Extrair nome formatado
      const firstName = userData.first_name || "";
      const lastName = userData.last_name || "";
      const nome =
        firstName && lastName
          ? `${firstName} ${lastName}`
          : userData.username || emailAddress.split("@")[0] || "";

      // Extrair metadados
      const publicMetadata = (userData.public_metadata as PublicMetadata) || {};
      const clinicaId = publicMetadata.clinicaId || usuarioExistente.clinicaId;
      const perfil = publicMetadata.perfil || usuarioExistente.perfil;

      await prisma.user.update({
        where: {
          id: usuarioExistente.id,
        },
        data: {
          nome,
          perfil,
          clinica: {
            connect: {
              id: clinicaId,
            },
          },
        },
      });
      console.log("Usuário atualizado com sucesso:", usuarioExistente.id);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return new NextResponse("Erro ao atualizar usuário", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    try {
      const userData = evt.data;

      // Para eventos de exclusão, o Clerk envia um objeto simplificado
      // Precisamos encontrar o usuário pelo clerkId armazenado no e-mail
      let usuario = null;

      // Primeiro verificar se temos um ID do Clerk e tentar usá-lo
      if (userData.id) {
        const clerkId = userData.id;

        // Tenta encontrar o usuário pelo ID do Clerk no campo de email
        usuario = await prisma.user.findFirst({
          where: {
            email: {
              contains: clerkId,
            },
          },
        });
      }

      if (!usuario) {
        console.error(
          "Usuário não encontrado para exclusão. ID do Clerk:",
          userData.id
        );
        return new NextResponse("Usuário não encontrado", { status: 404 });
      }

      await prisma.user.delete({
        where: {
          id: usuario.id,
        },
      });
      console.log("Usuário deletado com sucesso:", usuario.id);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return new NextResponse("Erro ao deletar usuário", { status: 500 });
    }
  }

  // Retorno de sucesso para qualquer evento
  return new NextResponse("Webhook processado com sucesso", { status: 200 });
}
