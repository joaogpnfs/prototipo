import { NextResponse } from "next/server";
import { signOut } from "@/lib/supabase";

export async function POST() {
  try {
    await signOut();

    return NextResponse.json(
      { success: true, message: "Logout realizado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao fazer logout" },
      { status: 500 }
    );
  }
}
