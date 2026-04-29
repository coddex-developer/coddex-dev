import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logout realizado com sucesso" },
      { status: 200 }
    );

    // Limpar cookies
    response.cookies.delete("auth-token");
    response.cookies.delete("admin-id");

    return response;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return NextResponse.json(
      { message: "Erro ao fazer logout" },
      { status: 500 }
    );
  }
}
