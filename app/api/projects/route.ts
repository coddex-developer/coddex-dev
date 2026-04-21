import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        return NextResponse.json(
            { message: 'Configuração da API não encontrada' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(`${apiUrl}/projects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: 'Erro ao carregar projetos' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}