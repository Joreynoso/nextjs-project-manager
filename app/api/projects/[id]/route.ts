import { NextResponse } from "next/server"
import auth from "@/lib/auth"
import prisma from "@/lib/prisma"
import { headers } from "next/headers"

export async function GET(
  { params }: { params: { id: string } }
) {
  try {
    // Verificar sesión
    const session = await auth.api.getSession({
      headers: await headers()
    })
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }
    
    // Buscar proyecto (solo si soy miembro)
    const project = await prisma.project.findFirst({
      where: {
        id: params.id,
        members: {
          some: {
            userId: session.user.id
          }
        }
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true
              }
            }
          }
        },
        tasks: {
          include: {
            assignee: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true
              }
            }
          },
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    })
    
    if (!project) {
      return NextResponse.json(
        { error: "Proyecto no encontrado" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json(
      { error: "Error al cargar proyecto" },
      { status: 500 }
    )
  }
}
