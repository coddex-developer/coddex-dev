import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token, adminId } = await request.json();

    if (!token || !adminId) {
      return NextResponse.json(
        { message: "Token e adminId são obrigatórios" },
        { status: 400 }
      );
    }

    const response = NextResponse.json(
      { message: "Token salvo com sucesso" },
      { status: 200 }
    );

    // Configurar cookie httpOnly seguro
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      path: "/",
    });

    // Salvar adminId em cookie seguro também
    response.cookies.set({
      name: "admin-id",
      value: adminId,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Erro ao salvar token:", error);
    return NextResponse.json(
      { message: "Erro ao salvar token" },
      { status: 500 }
    );
  }
}
