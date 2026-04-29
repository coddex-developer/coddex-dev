import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const bodySchema = z.object({
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!token || !apiUrl) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      );
    }

    const body = bodySchema.parse(await request.json());

    const response = await fetch(
      `${apiUrl}/dashboard/admin/password/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    let data;
    try {
      data = await response.json();
    } catch {
      data = { message: 'Resposta inválida do servidor' };
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: 'Dados inválidos',
          errors: error.format(),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Erro interno ao alterar senha' },
      { status: 500 }
    );
  }
}