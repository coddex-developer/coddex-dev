import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!apiUrl || !token) {
        return NextResponse.json(
            { message: 'Não autorizado' },
            { status: 401 }
        );
    }

    try {
        const response = await fetch(`${apiUrl}/dashboard/projects`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        return NextResponse.json(
            await response.json(),
            { status: response.status }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Erro ao carregar projetos' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!apiUrl || !token) {
        return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const response = await fetch(`${apiUrl}/dashboard/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        return NextResponse.json(await response.json(), { status: response.status });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao criar projeto' }, { status: 500 });
    }
}
