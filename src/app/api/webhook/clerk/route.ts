import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  const payload = await req.text();
  const headerPayload = await headers();

  const svix = new Webhook(WEBHOOK_SECRET);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let event: any;

  try {
    event = svix.verify(payload, {
      "svix-id": headerPayload.get("svix-id") || "",
      "svix-timestamp": headerPayload.get("svix-timestamp") || "",
      "svix-signature": headerPayload.get("svix-signature") || "",
    });
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const { type, data } = event;

  if (type === "user.created") {
    await prisma.user.create({
      data: {
        id: data.id,
        name: data.first_name + " " + data.last_name,
        email: data.email_addresses[0]?.email_address,
      },
    });
  }

  if (type === "user.deleted") {
    await prisma.user.delete({
      where: {
        id: data.id,
      },
    });
  }

  return new NextResponse("Webhook received", { status: 200 });
}
