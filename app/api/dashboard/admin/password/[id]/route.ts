import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!apiUrl || !token) {
        return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const response = await fetch(`${apiUrl}/dashboard/admin/password/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        return NextResponse.json(await response.json(), { status: response.status });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao alterar senha' }, { status: 500 });
    }
}
