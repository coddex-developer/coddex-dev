import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!apiUrl || !token) {
        return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    try {
        const response = await fetch(`${apiUrl}/dashboard/config`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        return NextResponse.json(await response.json(), { status: response.status });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao carregar configuração' }, { status: 500 });
    }
}
