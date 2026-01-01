import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import auth from '@/lib/auth';

/**
 * GET /api/profile
 * Obtiene el perfil del usuario autenticado
 */
export async function GET(request: Request) {
    // verificar si el usuario esta autenticado 
    const session = await auth.api.getSession({
        headers: request.headers
    });

    // retornar error de autorización
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    // recuperar perfil del usuario
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
                image: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });

        // retornar respuesta
        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al obtener el perfil' }, { status: 500 });
    }
}