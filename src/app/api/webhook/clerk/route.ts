import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  const payload = await req.text();
  const headersList = await headers();

  const svix = new Webhook(WEBHOOK_SECRET);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let event: any;

  try {
    event = svix.verify(payload, {
      "svix-id": headersList.get("svix-id") || "",
      "svix-timestamp": headersList.get("svix-timestamp") || "",
      "svix-signature": headersList.get("svix-signature") || "",
    });
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const { type, data } = event;

  if (type === "user.created") {
    try {
      await prisma.user.create({
        data: {
          id: data.id,
          nome: (data.first_name || "") + " " + (data.last_name || ""),
          email: data.email_addresses?.[0]?.email_address || "",
          senha: "", // Sem senha, pois é OAuth
          perfil: data.public_metadata?.perfil || null,
          clinica: data.public_metadata?.clinica || null,
        },
      });
      console.log("Usuário criado com sucesso:", data.id);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return new NextResponse("Erro ao criar usuário", { status: 500 });
    }
  }

  if (type === "user.deleted") {
    try {
      await prisma.user.delete({
        where: {
          id: data.id,
        },
      });
      console.log("Usuário deletado com sucesso:", data.id);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return new NextResponse("Erro ao deletar usuário", { status: 500 });
    }
  }

  return new NextResponse("Webhook recebido com sucesso", { status: 200 });
}
