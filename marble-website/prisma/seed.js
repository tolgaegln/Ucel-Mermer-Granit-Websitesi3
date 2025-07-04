const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@marble.com' },
    update: {},
    create: {
      email: 'admin@marble.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+90 212 123 45 67',
      role: 'ADMIN'
    }
  })

  console.log('Admin user created:', admin.email)

  // Create categories
  const categories = [
    {
      name: 'Beyaz Mermer',
      description: 'Kaliteli beyaz mermer çeşitleri',
      image: '/images/categories/white-marble.jpg'
    },
    {
      name: 'Siyah Mermer',
      description: 'Zarif siyah mermer ürünleri',
      image: '/images/categories/black-marble.jpg'
    },
    {
      name: 'Gri Mermer',
      description: 'Modern gri mermer koleksiyonu',
      image: '/images/categories/grey-marble.jpg'
    },
    {
      name: 'Travertin',
      description: 'Doğal travertin taşları',
      image: '/images/categories/travertine.jpg'
    },
    {
      name: 'Bazalt',
      description: 'Sağlam bazalt taş ürünleri',
      image: '/images/categories/basalt.jpg'
    },
    {
      name: 'Doğal Taş',
      description: 'Çeşitli doğal taş seçenekleri',
      image: '/images/categories/natural-stone.jpg'
    }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    })
  }

  console.log('Categories created')

  // Create sample products
  const whiteMarbleCategory = await prisma.category.findUnique({
    where: { name: 'Beyaz Mermer' }
  })

  const blackMarbleCategory = await prisma.category.findUnique({
    where: { name: 'Siyah Mermer' }
  })

  const travertineCategory = await prisma.category.findUnique({
    where: { name: 'Travertin' }
  })

  const products = [
    {
      name: 'Carrara Beyaz Mermer',
      description: 'İtalyan Carrara bölgesinden özel beyaz mermer. Mutfak tezgahı ve banyo uygulamaları için ideal.',
      price: 250.00,
      images: JSON.stringify(['/images/products/carrara-white-1.jpg', '/images/products/carrara-white-2.jpg']),
      categoryId: whiteMarbleCategory.id,
      isActive: true
    },
    {
      name: 'Thassos Beyaz Mermer',
      description: 'Yunan adası Thassos\'tan gelen kristal beyazlığında mermer. Premium kalite.',
      price: 300.00,
      images: JSON.stringify(['/images/products/thassos-white-1.jpg', '/images/products/thassos-white-2.jpg']),
      categoryId: whiteMarbleCategory.id,
      isActive: true
    },
    {
      name: 'Nero Marquina Siyah Mermer',
      description: 'İspanyol siyah mermer. Beyaz damarları ile şık görünüm.',
      price: 280.00,
      images: JSON.stringify(['/images/products/nero-marquina-1.jpg', '/images/products/nero-marquina-2.jpg']),
      categoryId: blackMarbleCategory.id,
      isActive: true
    },
    {
      name: 'Denizli Travertin',
      description: 'Türk travertini. Dış mekan ve iç mekan uygulamaları için uygun.',
      price: 120.00,
      images: JSON.stringify(['/images/products/denizli-travertine-1.jpg', '/images/products/denizli-travertine-2.jpg']),
      categoryId: travertineCategory.id,
      isActive: true
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Sample products created')

  // Create sample projects
  const projects = [
    {
      title: 'Luxury Villa Istanbul',
      description: 'Boğaz manzaralı lüks villada kapsamlı mermer uygulaması. Mutfak, banyo ve salon alanlarında Carrara mermer kullanıldı.',
      images: JSON.stringify(['/images/projects/villa-istanbul-1.jpg', '/images/projects/villa-istanbul-2.jpg', '/images/projects/villa-istanbul-3.jpg']),
      location: 'İstanbul, Türkiye',
      completedAt: new Date('2024-03-15'),
      isActive: true
    },
    {
      title: 'Grand Hotel Antalya',
      description: 'Antalya\'da 5 yıldızlı otel projesi. Lobi, resepsiyon ve kat koridorlarında travertin uygulaması.',
      images: JSON.stringify(['/images/projects/hotel-antalya-1.jpg', '/images/projects/hotel-antalya-2.jpg']),
      location: 'Antalya, Türkiye',
      completedAt: new Date('2024-01-20'),
      isActive: true
    },
    {
      title: 'Corporate Office Ankara',
      description: 'Ankara\'da kurumsal ofis binası cephe kaplama projesi. Gri mermer ile modern tasarım.',
      images: JSON.stringify(['/images/projects/office-ankara-1.jpg', '/images/projects/office-ankara-2.jpg']),
      location: 'Ankara, Türkiye',
      completedAt: new Date('2023-11-10'),
      isActive: true
    }
  ]

  for (const project of projects) {
    await prisma.project.create({
      data: project
    })
  }

  console.log('Sample projects created')

  // Create services
  const services = [
    {
      name: 'Özel Tasarım',
      description: 'Hayalinizdeki tasarımı gerçeğe dönüştürelim.',
      image: null,
      isActive: true,
      sortOrder: 1
    },
    {
      name: 'Cephe Kaplama',
      description: 'İç ve dış cephe kaplamalarınızı tasarlayalım.',
      image: null,
      isActive: true,
      sortOrder: 2
    },
    {
      name: 'Dekorasyon - Tadilat',
      description: 'Dekorasyon ve tadilat işlerinizde yanınızdayız.',
      image: null,
      isActive: true,
      sortOrder: 3
    },
    {
      name: 'El İşçiliği',
      description: 'Özel el işçiliği ile detaylarınızı tamamlarız.',
      image: null,
      isActive: true,
      sortOrder: 4
    },
    {
      name: 'Mutfak Banyo Tezgahı',
      description: 'Kaliteli tezgah çözümlerimizi keşfedin.',
      image: null,
      isActive: true,
      sortOrder: 5
    },
    {
      name: 'Yer Döşemesi',
      description: 'Profesyonel yer döşeme hizmetleri.',
      image: null,
      isActive: true,
      sortOrder: 6
    }
  ]

  for (const service of services) {
    await prisma.service.create({
      data: service
    })
  }

  console.log('Services created')

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 