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
      console.log('-->[message] Usuario registrado:', userData.email)
      return await res.json()
    } else {
      console.log('-->[warning] Usuario ya existe:', userData.email)
    }
  } catch (error) {
    console.error('-->[error] Error registrando:', userData.email)
  }
}

async function main() {
  console.log('-->[message] Seeding database...\n')
  
  // 1. Registrar usuarios
  console.log('-->[message] Registrando usuarios...')
  for (const user of users) {
    await registerUser(user)
  }
  
  // 2. Obtener IDs de usuarios creados
  console.log('\n -->[message] Obteniendo usuarios de la BD...')
  const dbUsers = await prisma.user.findMany({
    where: {
      email: { in: users.map(u => u.email) }
    },
    select: { id: true, email: true, name: true }
  })
  
  if (dbUsers.length < 3) {
    console.error('-->[error] No se encontraron suficientes usuarios')
    return
  }
  
  console.log(`✅ Encontrados ${dbUsers.length} usuarios`)
  
  // 3. Crear proyecto
  console.log('\n -->[message] Creando proyecto...')
  const alice = dbUsers.find(u => u.email === 'alice@test.com')!
  const bob = dbUsers.find(u => u.email === 'bob@test.com')!
  const charlie = dbUsers.find(u => u.email === 'charlie@test.com')!
  
  const project = await prisma.project.create({
    data: {
      name: 'Plataforma de E-learning',
      description: 'Desarrollo de una plataforma educativa con cursos interactivos',
      tag: 'Development',
      deadline: new Date('2025-12-31'),
      createdBy: alice.id,
      members: {
        create: [
          { userId: alice.id },  // Creadora
          { userId: bob.id },     // Miembro 2
          { userId: charlie.id }, // Miembro 3
        ]
      }
    },
    include: {
      members: {
        include: {
          user: { select: { name: true, email: true } }
        }
      }
    }
  })
  
  console.log(' -->[message] Proyecto creado:', project.name)
  console.log(' -->[message] Creador:', alice.name)
  console.log(' -->[message] Miembros:', project.members.length)
  
  console.log('\n -->[message] Seed completado!')
}

main()
  .catch((e) => {
    console.error('-->[error] Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })