const { PrismaClient } = require('./src/generated/prisma')

const prisma = new PrismaClient()

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...')
    
    // Test if Settings table exists
    console.log('🗃️ Checking Settings table...')
    const settings = await prisma.settings.findMany()
    console.log('📄 Current settings in database:', settings)
    
    // Try to create a test setting
    console.log('💾 Creating test setting...')
    const testSetting = await prisma.settings.create({
      data: {
        siteName: 'TEST DATABASE ÇALIŞIYOR',
        siteDescription: 'Bu bir test',
        contactEmail: 'test@test.com',
        contactPhone: '+90 555 123 45 67',
        address: 'Test Adres',
        facebookUrl: '',
        instagramUrl: '',
        twitterUrl: '',
        linkedinUrl: ''
      }
    })
    console.log('✅ Test setting created:', testSetting)
    
    // Read all settings again
    const allSettings = await prisma.settings.findMany()
    console.log('📋 All settings after creation:', allSettings)
    
  } catch (error) {
    console.error('💥 Database test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase() 