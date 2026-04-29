import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
    request: NextRequest,
    context: any
) {
    const { params } = context;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!apiUrl) {
        return NextResponse.json(
            { message: 'Configuração não definida' },
            { status: 500 }
        );
    }

    if (!token) {
        return NextResponse.json(
            { message: 'Token não fornecido' },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();
        const response = await fetch(`${apiUrl}/dashboard/admin/profile/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            { message: 'Erro ao atualizar perfil' },
            { status: 500 }
        );
    }
}
