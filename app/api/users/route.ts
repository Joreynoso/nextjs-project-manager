import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import auth from '@/lib/auth';

// obtener usuarios
export async function GET(request: Request) {

    // verificar si el usuario esta autenticado 
    const session = await auth.api.getSession({
        headers: request.headers
    });

    // retornar error de autorización
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    // recuperar todos los usuarios
    try {

        // formatear respuesta
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                emailVerified: true,
                createdAt: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        // retornar respuesta
        return NextResponse.json(users);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al obtener los usuarios' }, { status: 500 });
    }
}
