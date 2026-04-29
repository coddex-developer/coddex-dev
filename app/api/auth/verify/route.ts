import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;
    const adminId = request.cookies.get("admin-id")?.value;

    if (!token || !adminId) {
      return NextResponse.json(
        { message: "Não autenticado" },
        { status: 401 }
      );
    }

    // Validar token (opcional - fazer uma chamada ao backend se necessário)
    return NextResponse.json(
      { token, adminId, authenticated: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    return NextResponse.json(
      { message: "Erro ao verificar autenticação" },
      { status: 500 }
    );
  }
}
