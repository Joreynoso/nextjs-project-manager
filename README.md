# Next.js Better Auth Starter

Este proyecto es una aplicación boilerplate construida con Next.js 15, Prisma y Better Auth, diseñada para ofrecer un sistema de autenticación robusto y listo para usar. Incluye soporte para autenticación con correo/contraseña, proveedores sociales (Google, GitHub) y gestión de roles.

## Características

-   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
-   **Base de Datos:** [PostgreSQL](https://www.postgresql.org/) (vía Prisma ORM)
-   **Autenticación:** [Better Auth](https://www.better-auth.com/)
    -   Email y Contraseña
    -   Google & GitHub OAuth
    -   Recuperación de contraseña
-   **Gestión de Roles:** Roles de usuario y admin integrados.
-   **UI:** [Shadcn UI](https://ui.shadcn.com/) + Tailwind CSS
-   **Emails:** [Nodemailer](https://nodemailer.com/) para envío de correos transaccionales.

## Pre-requisitos

Antes de comenzar, asegúrate de tener instalado:

-   [Node.js](https://nodejs.org/) (Se recomienda v18 o superior)
-   Una base de datos PostgreSQL (local o en la nube como Render, Supabase, Neon).

## Guía Paso a Paso para Usar el Proyecto

Sigue estos pasos para configurar y ejecutar la aplicación en tu entorno local.

### 1. Clonar e Instalar Dependencias

```bash
git clone <tu-repositorio>
cd nextjs-better-auth
npm install
```

### 2. Configurar Variables de Entorno

Renombra el archivo de ejemplo `.env.example` a `.env` y rellena las variables con tus propias claves.

```bash
cp .env.example .env
```

Abre el archivo `.env` y configura lo siguiente:

-   **DATABASE_URL**: La URL de conexión a tu base de datos PostgreSQL.
-   **Better Auth**:
    -   `BETTER_AUTH_SECRET`: Una cadena aleatoria larga para firmar tokens. Puedes generar una ejecutando `openssl rand -hex 32` en tu terminal.
    -   `BETTER_AUTH_URL`: La URL base de tu aplicación (ej. `http://localhost:3000`).
-   **Social Providers** (Opcional): Si vas a usar Google o GitHub, añade tus Client IDs y Secrets.
-   **SMTP (Nodemailer)**: Configuración de tu servidor de correo para envío de emails (ej. recuperación de contraseña).

### 3. Configurar la Base de Datos

Inicializa la base de datos utilizando Prisma. Esto creará las tablas necesarias (User, Session, Account, etc.).

```bash
npx prisma db push
```

Este comando sincronizará tu esquema de Prisma con tu base de datos.

### 4. Generar Cliente de Prisma

Asegúrate de que el cliente de Prisma esté generado (normalmente se hace automáticamente tras `npm install`, pero es buena práctica hacerlo si hay errores):

```bash
npx prisma generate
```

### 5. Ejecutar Scripts de Better Auth (Opcional)

Si necesitas generar migraciones específicas o utilizar el CLI de Better Auth:

```bash
npx @better-auth/cli generate
```

### 6. Ejecutar el Servidor de Desarrollo

Una vez configurado todo, inicia la aplicación:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

-   `/app`: Rutas de la aplicación (Next.js App Router).
-   `/components`: Componentes reutilizables (Navbar, UI components).
-   `/lib`: Utilidades y configuraciones (auth.ts, prisma.ts, email.ts).
-   `/prisma`: Esquema de la base de datos.
-   `/types`: Definiciones de tipos TypeScript adicionales.

## Recursos Adicionales

-   [Documentación de Better Auth](https://www.better-auth.com/docs)
-   [Documentación de Prisma](https://www.prisma.io/docs)
-   [Documentación de Next.js](https://nextjs.org/docs)

