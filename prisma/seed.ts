import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const API_URL = 'http://localhost:3000'

const users = [
  { email: 'alice@test.com', password: 'test123456', name: 'Alice Johnson' },
  { email: 'bob@test.com', password: 'test123456', name: 'Bob Smith' },
  { email: 'charlie@test.com', password: 'test123456', name: 'Charlie Brown' },
]

async function registerUser(userData: { email: string; password: string; name: string }) {
  try {
    const res = await fetch(`${API_URL}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': API_URL,
      },
      body: JSON.stringify(userData),
    })
    
    if (res.ok) {
      console.log('✅ Usuario registrado:', userData.email)
    } else {
      console.log('⚠️  Usuario ya existe:', userData.email)
    }
  } catch (error) {
    console.error('❌ Error registrando:', userData.email)
  }
}

async function main() {
  console.log('🌱 Seeding database...\n')
  
  // 1. Registrar usuarios
  console.log('👥 Registrando usuarios...')
  for (const user of users) {
    await registerUser(user)
  }
  
  // 2. Obtener usuarios
  console.log('\n📋 Obteniendo usuarios...')
  const dbUsers = await prisma.user.findMany({
    where: {
      email: { in: users.map(u => u.email) }
    },
    select: { id: true, email: true, name: true }
  })
  
  if (dbUsers.length < 3) {
    console.error('❌ No se encontraron suficientes usuarios')
    return
  }
  
  console.log(`✅ Encontrados ${dbUsers.length} usuarios`)
  
  const alice = dbUsers.find(u => u.email === 'alice@test.com')!
  const bob = dbUsers.find(u => u.email === 'bob@test.com')!
  const charlie = dbUsers.find(u => u.email === 'charlie@test.com')!
  
  // 3. Crear proyecto
  console.log('\n📁 Creando proyecto...')
  const project = await prisma.project.create({
    data: {
      name: 'Plataforma de E-learning',
      description: 'Desarrollo de una plataforma educativa con cursos interactivos',
      tag: 'Development',
      createdBy: alice.id,
      members: {
        create: [
          { userId: alice.id },
          { userId: bob.id },
          { userId: charlie.id },
        ]
      }
    }
  })
  
  console.log('✅ Proyecto creado:', project.name)
  
  // 4. Crear tareas
  console.log('\n✏️  Creando tareas...')
  
  const tasks = [
    // Pendientes
    { title: 'Diseñar mockups de UI', description: 'Crear diseños en Figma', status: 'pending', assignedTo: null },
    { title: 'Definir arquitectura de BD', description: 'Esquema de base de datos', status: 'pending', assignedTo: null },
    { title: 'Setup del proyecto', description: 'Inicializar Next.js y dependencias', status: 'pending', assignedTo: bob.id },
    
    // En progreso
    { title: 'Implementar autenticación', description: 'Better Auth con Google y GitHub', status: 'in_progress', assignedTo: alice.id },
    { title: 'API de usuarios', description: 'CRUD de usuarios', status: 'in_progress', assignedTo: bob.id },
    
    // Completadas
    { title: 'Configurar Prisma', description: 'Schema y migraciones', status: 'done', assignedTo: alice.id },
    { title: 'Deploy inicial', description: 'Deploy en Vercel', status: 'done', assignedTo: charlie.id },
  ]
  
  for (const taskData of tasks) {
    await prisma.task.create({
      data: {
        ...taskData,
        projectId: project.id,
      }
    })
  }
  
  console.log(`✅ ${tasks.length} tareas creadas`)
  
  console.log('\n✨ Seed completado!')
  console.log('\n📊 Resumen:')
  console.log(`   - ${dbUsers.length} usuarios`)
  console.log(`   - 1 proyecto`)
  console.log(`   - ${tasks.length} tareas`)
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })