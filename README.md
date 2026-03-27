# Project Manager - Documentación Completa

## 📋 Descripción del Proyecto

**Project Manager** es un sistema completo de gestión de proyectos desarrollado con Next.js 16, que permite a los equipos colaborar de manera eficiente mediante la creación y administración de proyectos, asignación de tareas, y comunicación en tiempo real.

### Características Principales

- ✅ **Autenticación Segura**: Integración con Better Auth soportando múltiples proveedores (GitHub, Google)
- 📊 **Gestión de Proyectos**: CRUD completo de proyectos con etiquetas y fechas límite
- ✔️ **Sistema de Tareas**: Creación, edición, eliminación y seguimiento de estado de tareas
- 👥 **Gestión de Miembros**: Asignación de miembros a proyectos con roles
- 🤖 **IA Integrada**: Generación automática de descripciones de tareas usando Groq AI
- 🎨 **UI Moderna**: Interfaz construida con Shadcn/UI y Tailwind CSS
- 🌙 **Modo Oscuro**: Soporte completo para tema claro/oscuro
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos

---

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

- **Framework**: Next.js 16.0.10 (App Router)
- **Lenguaje**: TypeScript 5
- **Base de Datos**: PostgreSQL con Prisma ORM 6.19.0
- **Autenticación**: Better Auth 1.4.7
- **UI**: React 19.2.0, Shadcn/UI, Radix UI
- **Estilos**: Tailwind CSS 4, Motion 12.23.26
- **IA**: Groq SDK 0.37.0
- **Validación**: Zod 4.3.5
- **Email**: Nodemailer 7.0.11

### Estructura de Directorios

```
project-manager/
├── app/                      # App Router de Next.js
│   ├── api/                  # API Routes
│   │   ├── projects/         # Endpoints de proyectos
│   │   ├── tasks/            # Endpoints de tareas
│   │   ├── users/            # Endpoints de usuarios
│   │   ├── profile/          # Endpoint de perfil
│   │   └── generate-description/ # IA para descripciones
│   ├── auth/                 # Páginas de autenticación
│   ├── projects/             # Páginas de proyectos
│   └── layout.tsx            # Layout principal
├── components/               # Componentes React
│   ├── ui/                   # Componentes de Shadcn/UI
│   ├── projects/             # Componentes de proyectos
│   ├── tasks/                # Componentes de tareas
│   └── users/                # Componentes de usuarios
├── lib/                      # Utilidades y configuraciones
│   ├── auth.ts               # Configuración de Better Auth
│   ├── prisma.ts             # Cliente de Prisma
│   ├── validations/          # Esquemas de validación Zod
│   └── utils.ts              # Funciones auxiliares
├── prisma/                   # Configuración de base de datos
│   ├── schema.prisma         # Esquema de la base de datos
│   └── seed.ts               # Datos de prueba
├── types/                    # Definiciones de tipos TypeScript
├── actions/                  # Server Actions
└── middlewares/              # Middlewares de Next.js
```

---

## 📡 API Endpoints

### Autenticación

Todos los endpoints requieren autenticación mediante Better Auth. Las sesiones se validan usando cookies HTTP-only.

### Proyectos

#### `GET /api/projects`
Obtiene todos los proyectos donde el usuario es miembro.

**Respuesta:**
```json
[
  {
    "id": "clxxx...",
    "name": "Proyecto Ejemplo",
    "description": "Descripción del proyecto",
    "tag": "Development",
    "deadline": "2026-12-31T00:00:00.000Z",
    "createdAt": "2026-01-14T00:00:00.000Z",
    "updatedAt": "2026-01-14T00:00:00.000Z",
    "createdBy": "user_id",
    "creator": {
      "id": "user_id",
      "name": "Usuario",
      "email": "usuario@example.com",
      "image": "https://..."
    },
    "members": [...],
    "_count": {
      "tasks": 5,
      "messages": 12
    }
  }
]
```

#### `POST /api/projects`
Crea un nuevo proyecto.

**Body:**
```json
{
  "name": "Nuevo Proyecto",
  "description": "Descripción opcional",
  "tag": "Research | Design | Development",
  "memberIds": ["user_id_1", "user_id_2"]
}
```

**Validaciones:**
- `name`: Requerido, no vacío
- `tag`: Requerido, debe ser uno de: "Research", "Design", "Development"
- `memberIds`: Opcional, array de IDs de usuarios

**Respuesta:** `201 Created` con el proyecto creado

#### `GET /api/projects/[id]`
Obtiene un proyecto específico por ID.

**Parámetros:**
- `id`: ID del proyecto (en la URL)

**Respuesta:** Proyecto con todos sus detalles

---

### Tareas

#### `GET /api/projects/[id]/tasks`
Obtiene todas las tareas de un proyecto específico.

**Parámetros:**
- `id`: ID del proyecto (en la URL)

**Respuesta:**
```json
{
  "tasks": [
    {
      "id": "task_id",
      "title": "Título de la tarea",
      "description": "Descripción de la tarea",
      "status": "pending | in_progress | completed",
      "projectId": "project_id",
      "assignedTo": "user_id",
      "createdAt": "2026-01-14T00:00:00.000Z",
      "updatedAt": "2026-01-14T00:00:00.000Z"
    }
  ]
}
```

#### `POST /api/projects/[id]/tasks`
Crea una nueva tarea en un proyecto.

**Body:**
```json
{
  "title": "Nueva tarea",
  "description": "Descripción de la tarea"
}
```

**Validaciones (Zod):**
- `title`: Requerido, string no vacío
- `description`: Requerido, string no vacío

**Respuesta:** `200 OK` con la tarea creada

#### `PATCH /api/tasks/[taskId]`
Actualiza el estado de una tarea.

**Body:**
```json
{
  "status": "pending | in_progress | completed"
}
```

**Respuesta:** Tarea actualizada

#### `PUT /api/tasks/[taskId]`
Actualiza el título y descripción de una tarea.

**Body:**
```json
{
  "title": "Título actualizado",
  "description": "Descripción actualizada"
}
```

**Respuesta:** Tarea actualizada

#### `DELETE /api/tasks/[taskId]`
Elimina una tarea.

**Respuesta:** `200 OK` con mensaje de confirmación

---

### Usuarios

#### `GET /api/users`
Obtiene todos los usuarios del sistema.

**Respuesta:**
```json
[
  {
    "id": "user_id",
    "name": "Usuario",
    "email": "usuario@example.com",
    "role": "user | admin",
    "emailVerified": true,
    "createdAt": "2026-01-14T00:00:00.000Z"
  }
]
```

#### `GET /api/profile`
Obtiene el perfil del usuario autenticado.

**Respuesta:**
```json
{
  "id": "user_id",
  "name": "Usuario",
  "email": "usuario@example.com",
  "emailVerified": true,
  "image": "https://...",
  "role": "user",
  "createdAt": "2026-01-14T00:00:00.000Z",
  "updatedAt": "2026-01-14T00:00:00.000Z"
}
```

---

### IA - Generación de Descripciones

#### `POST /api/generate-description`
Genera una descripción automática para una tarea usando IA (Groq).

**Body:**
```json
{
  "projectName": "Nombre del proyecto",
  "taskName": "Nombre de la tarea"
}
```

**Respuesta:**
```json
{
  "success": true,
  "description": "Descripción generada por IA (máximo 30-40 palabras)"
}
```

**Modelo utilizado:** `llama-3.3-70b-versatile`

---

## 🗄️ Modelo de Base de Datos

### Entidades Principales

#### User (Usuario)
```prisma
model User {
  id              String          @id
  name            String
  email           String          @unique
  emailVerified   Boolean         @default(false)
  image           String?
  role            Role            @default(user)
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  
  // Relaciones
  createdProjects Project[]
  projectMembers  ProjectMember[]
  assignedTasks   Task[]
  sentMessages    Message[]
  accounts        Account[]
  sessions        Session[]
}
```

#### Project (Proyecto)
```prisma
model Project {
  id          String          @id @default(cuid())
  name        String
  description String?
  tag         String
  deadline    DateTime?
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  createdBy   String
  
  // Relaciones
  creator     User            @relation("CreatedProjects")
  members     ProjectMember[]
  tasks       Task[]
  messages    Message[]
}
```

#### Task (Tarea)
```prisma
model Task {
  id          String      @id @default(cuid())
  title       String
  description String?
  status      TaskStatus  @default(pending)
  projectId   String
  assignedTo  String?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  // Relaciones
  project     Project
  assignee    User?
}
```

#### ProjectMember (Miembro de Proyecto)
```prisma
model ProjectMember {
  id        String   @id @default(cuid())
  projectId String
  userId    String
  joinedAt  DateTime @default(now())
  
  // Relaciones
  project   Project
  user      User
  
  @@unique([projectId, userId])
}
```

### Enums

```prisma
enum Role {
  admin
  user
}

enum TaskStatus {
  pending
  in_progress
  completed
}
```

---

## 📦 Dependencias

### Dependencias de Producción

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `next` | ^16.0.10 | Framework React para producción |
| `react` | 19.2.0 | Biblioteca UI |
| `react-dom` | 19.2.0 | Renderizado de React |
| `@prisma/client` | ^6.19.0 | ORM para base de datos |
| `better-auth` | ^1.4.7 | Sistema de autenticación |
| `zod` | ^4.3.5 | Validación de esquemas |
| `groq-sdk` | ^0.37.0 | SDK para IA de Groq |
| `nodemailer` | ^7.0.11 | Envío de emails |
| `tailwind-merge` | ^3.4.0 | Utilidad para clases de Tailwind |
| `clsx` | ^2.1.1 | Utilidad para clases condicionales |
| `class-variance-authority` | ^0.7.1 | Variantes de componentes |
| `lucide-react` | ^0.554.0 | Iconos |
| `motion` | ^12.23.26 | Animaciones |
| `next-themes` | ^0.4.6 | Gestión de temas |
| `sonner` | ^2.0.7 | Notificaciones toast |
| `react-icons` | ^5.5.0 | Biblioteca de iconos |

### Radix UI Components

| Componente | Versión | Uso |
|------------|---------|-----|
| `@radix-ui/react-avatar` | ^1.1.11 | Avatares de usuario |
| `@radix-ui/react-dialog` | ^1.1.15 | Modales y diálogos |
| `@radix-ui/react-dropdown-menu` | ^2.1.16 | Menús desplegables |
| `@radix-ui/react-select` | ^2.2.6 | Selectores |
| `@radix-ui/react-label` | ^2.1.8 | Etiquetas de formulario |
| `@radix-ui/react-tooltip` | ^1.2.8 | Tooltips |
| `@radix-ui/react-separator` | ^1.1.8 | Separadores |
| `@radix-ui/react-collapsible` | ^1.1.12 | Elementos colapsables |
| `@radix-ui/react-slot` | ^1.2.4 | Composición de componentes |

### Dependencias de Desarrollo

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `typescript` | ^5 | Lenguaje tipado |
| `@types/node` | ^20 | Tipos de Node.js |
| `@types/react` | ^19 | Tipos de React |
| `@types/react-dom` | ^19 | Tipos de React DOM |
| `@types/nodemailer` | ^7.0.4 | Tipos de Nodemailer |
| `tailwindcss` | ^4 | Framework CSS |
| `@tailwindcss/postcss` | ^4 | PostCSS para Tailwind |
| `eslint` | ^9 | Linter de código |
| `eslint-config-next` | 16.0.3 | Configuración ESLint para Next.js |
| `tsx` | ^4.21.0 | Ejecutor de TypeScript |
| `tw-animate-css` | ^1.4.0 | Animaciones CSS para Tailwind |
| `prisma` | ^6.19.0 | CLI de Prisma |

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- **Node.js**: v20 o superior
- **PostgreSQL**: v14 o superior
- **npm** o **pnpm**: Gestor de paquetes

### Pasos de Instalación

#### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd project-manager
```

#### 2. Instalar Dependencias

```bash
npm install
# o
pnpm install
```

#### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Base de Datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/project_manager"

# Better Auth
BETTER_AUTH_SECRET="tu-secreto-aleatorio-muy-seguro"
BETTER_AUTH_URL="http://localhost:3000"

# OAuth Providers (Opcional)
GITHUB_CLIENT_ID="tu-github-client-id"
GITHUB_CLIENT_SECRET="tu-github-client-secret"

GOOGLE_CLIENT_ID="tu-google-client-id"
GOOGLE_CLIENT_SECRET="tu-google-client-secret"

# Groq AI (para generación de descripciones)
GROQ_API_KEY="tu-groq-api-key"

# Email (Nodemailer)
EMAIL_SERVER="smtp://usuario:contraseña@smtp.example.com:587"
EMAIL_FROM="noreply@tudominio.com"
```

#### 4. Configurar la Base de Datos

```bash
# Generar el cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# (Opcional) Poblar con datos de prueba
npm run seed
```

#### 5. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 🎯 Uso y Funcionalidades

### Autenticación

1. **Registro**: Los usuarios pueden registrarse con email/contraseña o mediante OAuth (GitHub, Google)
2. **Login**: Inicio de sesión con credenciales o proveedores OAuth
3. **Verificación de Email**: Sistema de verificación mediante enlaces enviados por email
4. **Sesiones**: Gestión automática de sesiones con cookies HTTP-only

### Gestión de Proyectos

1. **Crear Proyecto**:
   - Navegar a la página de proyectos
   - Hacer clic en "Nuevo Proyecto"
   - Completar nombre, descripción, tag y seleccionar miembros
   - El creador se agrega automáticamente como miembro

2. **Ver Proyectos**:
   - Lista de todos los proyectos donde eres miembro
   - Visualización de tags, miembros y contadores de tareas/mensajes

3. **Editar/Eliminar Proyecto**:
   - Acceder al proyecto
   - Usar las opciones de edición o eliminación

### Gestión de Tareas

1. **Crear Tarea**:
   - Dentro de un proyecto, hacer clic en "Nueva Tarea"
   - Ingresar título y descripción
   - Opcionalmente, usar el botón de IA para generar descripción automática

2. **Actualizar Estado**:
   - Arrastrar y soltar tareas entre columnas (Pending, In Progress, Completed)
   - O usar el menú de opciones de cada tarea

3. **Editar Tarea**:
   - Hacer clic en el ícono de edición
   - Modificar título y/o descripción
   - Guardar cambios

4. **Eliminar Tarea**:
   - Usar el menú de opciones
   - Confirmar eliminación

5. **Chat**:
   - Abrir el chat
   - Enviar mensajes
   - Ver mensajes

6. **Usuarios por defecto pra testear el sistema**:
   - alice@test.com / [test13456]
   - bob@test.com / [test13456]
   - charlie@test.com / [test13456]


### Características Adicionales

- **Modo Oscuro**: Toggle en la barra de navegación
- **Responsive**: Funciona en desktop, tablet y móvil
- **Notificaciones**: Toast notifications para acciones exitosas/fallidas
- **Validación en Tiempo Real**: Formularios con validación Zod

---

## 🔧 Scripts Disponibles

```json
{
  "dev": "npx prisma generate && next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "postinstall": "prisma generate",
  "seed": "tsx prisma/seed.ts"
}
```

- **`npm run dev`**: Inicia el servidor de desarrollo
- **`npm run build`**: Construye la aplicación para producción
- **`npm start`**: Inicia el servidor de producción
- **`npm run lint`**: Ejecuta el linter
- **`npm run seed`**: Puebla la base de datos con datos de prueba

---

## 🔐 Seguridad

- **Autenticación**: Better Auth con soporte para múltiples proveedores
- **Sesiones**: Cookies HTTP-only, secure en producción
- **Validación**: Zod para validación de datos en cliente y servidor
- **SQL Injection**: Protección mediante Prisma ORM
- **CSRF**: Protección integrada en Next.js
- **Variables de Entorno**: Nunca expuestas al cliente

---

## 📝 Notas de Desarrollo

### Validaciones con Zod

El proyecto utiliza Zod para validaciones tanto en el cliente como en el servidor:

```typescript
// lib/validations/tasks.ts
export const taskSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida")
})

export const taskStatusSchema = z.object({
  status: z.enum(["pending", "in_progress", "completed"])
})
```

### Better Auth Configuration

La autenticación está configurada en `lib/auth.ts` con soporte para:
- Email/Password
- GitHub OAuth
- Google OAuth
- Verificación de email

### Prisma Client

El cliente de Prisma está configurado con singleton pattern para evitar múltiples instancias en desarrollo:

```typescript
// lib/prisma.ts
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### Error de conexión a la base de datos
- Verificar que PostgreSQL esté corriendo
- Revisar la variable `DATABASE_URL` en `.env`
- Ejecutar `npx prisma migrate dev`

### Errores de autenticación
- Verificar que `BETTER_AUTH_SECRET` esté configurado
- Revisar que las credenciales de OAuth sean correctas
- Limpiar cookies del navegador

---

## 📄 Licencia de Uso

Este proyecto es de **uso abierto**. Podés usarlo, modificarlo, integrarlo en otros sistemas y distribuirlo libremente, incluso con fines comerciales.

### Condiciones
- **Mantener la atribución original** del proyecto al autor (José Oscar Reynoso).  
- **No presentar el trabajo como propio** ni eliminar mi crédito como autor.

El software se entrega **"tal cual"**, sin garantías de ningún tipo.

---

## 👥 Contribución

Para contribuir al proyecto:

1. Crear una rama feature: `git checkout -b feature/nueva-funcionalidad`
2. Hacer commit de los cambios: `git commit -m 'Agregar nueva funcionalidad'`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Crear un Pull Request

---

## 📞 Soporte

Para reportar bugs o solicitar nuevas funcionalidades, crear un issue en el repositorio.

---

**Última actualización**: 14 de Enero, 2026
