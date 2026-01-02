import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import auth from '@/lib/auth';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
    // verificar que exista un usuario autenticado
    const session = await auth.api.getSession({
        headers: request.headers
    });

    // retornar error de autorización
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }
    try {
        const { projectName, taskName } = await request.json();

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Eres un asistente que genera descripciones concisas para tareas de proyectos. genera descripciones de máximo 40 palabras, claras y orientadas a la acción."
                },
                {
                    role: "user",
                    content: `Genera una descripción breve para esta tarea:
                    Proyecto: ${projectName}
                    Tarea: ${taskName}
                    
                    Descripción (máximo 40 palabras):`
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 100,
        });

        const description = chatCompletion.choices[0]?.message?.content || "";

        return NextResponse.json({
            success: true,
            description
        });

    } catch (error) {
        console.error("❌ Error:", error);
        return NextResponse.json(
            { success: false, error: "Error al generar descripción" },
            { status: 500 }
        );
    }
}