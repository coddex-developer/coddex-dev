import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        return NextResponse.json(
            { message: 'NEXT_PUBLIC_API_URL não configurada' },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();

        const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            credentials: 'include',
        });

        const data = await response.json();

        // Criar resposta e copiar cookies da API para o cliente
        const res = NextResponse.json(data, { status: response.status });

        // Se houver Set-Cookie na resposta, copiar para o cliente
        const setCookieHeader = response.headers.get('set-cookie');
        if (setCookieHeader) {
            res.headers.set('set-cookie', setCookieHeader);
        }

        return res;
    } catch (error) {
        console.error('Erro no login:', error);
        return NextResponse.json(
            { message: 'Erro ao conectar com a API' },
            { status: 500 }
        );
    }
}
