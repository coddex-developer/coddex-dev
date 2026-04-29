import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!apiUrl || !token) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const response = await axios.put(
      `${apiUrl}/dashboard/admin/password/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.response?.data?.message || 'Erro ao alterar senha',
      },
      { status: error?.response?.status || 500 }
    );
  }
}