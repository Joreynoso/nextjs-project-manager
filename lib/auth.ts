import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    // configuración para autenticación por email y contraseña
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        minPasswordLength: 6,
        maxPasswordLength: 20,
    },

    // configuración para la sesión
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // 5 minutes
        }
    },
});

export default auth