import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    context: any
) {
    const { params } = context;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!apiUrl || !token) {
        return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    try {
        const response = await fetch(`${apiUrl}/dashboard/projects/${params.id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        return NextResponse.json(await response.json(), { status: response.status });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao carregar projeto' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    context: any
) {
    const { params } = context;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!apiUrl || !token) {
        return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const response = await fetch(`${apiUrl}/dashboard/projects/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        return NextResponse.json(await response.json(), { status: response.status });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao atualizar projeto' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    context: any
) {
    const { params } = context;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!apiUrl || !token) {
        return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    try {
        const response = await fetch(`${apiUrl}/dashboard/projects/${params.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        return NextResponse.json(await response.json(), { status: response.status });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao deletar projeto' }, { status: 500 });
    }
}
