const { PrismaClient } = require('./src/generated/prisma')

const prisma = new PrismaClient()

async function cleanDatabase() {
  try {
    console.log('🧹 Cleaning test data...')
    await prisma.settings.deleteMany()
    console.log('✅ All settings deleted')
  } catch (error) {
    console.error('💥 Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanDatabase() 