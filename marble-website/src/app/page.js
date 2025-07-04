'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, Award, Users, Briefcase, ThumbsUp } from 'lucide-react'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
    fetchFeaturedProjects()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        // İlk 3 aktif ürünü öne çıkan olarak göster
        const featured = data.filter(product => product.isActive).slice(0, 3)
        setFeaturedProducts(featured)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      // Hata durumunda örnek ürünleri göster
      setFeaturedProducts([
        {
          id: 1,
          name: 'Beyaz Mermer',
          description: 'Kaliteli beyaz mermer döşeme ve kaplama için',
          price: 150
        },
        {
          id: 2,
          name: 'Siyah Mermer',
          description: 'Zarif siyah mermer mutfak tezgahı için',
          price: 200
        },
        {
          id: 3,
          name: 'Travertin',
          description: 'Doğal travertin dış mekan uygulamaları',
          price: 120
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const fetchFeaturedProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        // İlk 3 aktif projeyi öne çıkan olarak göster
        const featured = data.filter(project => project.isActive).slice(0, 3)
        setFeaturedProjects(featured)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      // Hata durumunda örnek projeler
      setFeaturedProjects([
        {
          id: 1,
          title: 'Modern Villa Projesi',
          location: 'Samsun',
        },
        {
          id: 2,
          title: 'Lüks Otel Lobisi',
          location: 'İstanbul',
        },
        {
          id: 3,
          title: 'Ofis Binası Cephe',
          location: 'Ankara',
        }
      ])
    }
  }

  const stats = [
    { number: '15+', label: 'Yıllık Deneyim' },
    { number: '500+', label: 'Tamamlanan Proje' },
    { number: '1000+', label: 'Mutlu Müşteri' },
    { number: '99%', label: 'Müşteri Memnuniyeti' }
  ]

  const services = [
    'Özel Tasarım',
    'Cephe Kaplama', 
    'Dekorasyon - Tadilat',
    'El İşçiliği',
    'Mutfak Banyo Tezgahı',
    'Yer Döşemesi'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-600">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Kaliteli Mermer ve <span className="text-blue-400">Doğal Taş</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Hayallerinizdeki mekanları gerçeğe dönüştürüyoruz. 
            Yılların deneyimi ile size en kaliteli mermer ve doğal taş ürünlerini sunuyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center transition-colors"
            >
              Ürünleri İncele
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hizmetlerimiz</h2>
            <p className="text-xl text-gray-800">Mermer ve doğal taş konusunda kapsamlı çözümler</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service}</h3>
                <p className="text-gray-600">
                  Profesyonel {service.toLowerCase()} hizmetleri ile projelerinizi hayata geçiriyoruz.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Öne Çıkan Ürünler */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-xl text-gray-800">En popüler mermer ve doğal taş çeşitlerimiz</p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-900">Ürünler yükleniyor...</p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => {
                const images = product.images ? JSON.parse(product.images) : []
                const mainImage = images.length > 0 ? images[0] : null
                
                return (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="h-64 bg-gray-200 overflow-hidden">
                      {mainImage ? (
                        <img
                          src={mainImage}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-800">Ürün Görseli</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-900 mb-4">{product.description}</p>
                      {product.price && (
                        <p className="text-lg font-bold text-blue-600 mb-4">₺{product.price}/m²</p>
                      )}
                      <Link
                        href={`/products/${product.id}`}
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Detayları Gör
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-900">Henüz ürün eklenmemiş.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Projelerimiz</h2>
            <p className="text-xl text-gray-800">Tamamladığımız başarılı projelerden örnekler</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => {
              // Basit resim parse - ürünler gibi
              const images = project.images ? JSON.parse(project.images) : []
              let mainImage = images.length > 0 ? images[0] : null
              
              // URL düzeltmesi
              if (mainImage) {
                if (mainImage.includes('images/products/')) {
                  mainImage = mainImage.replace('images/products/', 'uploads/')
                }
                if (!mainImage.startsWith('/') && !mainImage.startsWith('http')) {
                  mainImage = '/' + mainImage
                }
              }

              return (
                <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-64 bg-gray-200 overflow-hidden">
                    {mainImage ? (
                      <img
                        src={mainImage}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-800">Proje Görseli</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{project.title}</h3>
                    <p className="text-gray-900 mb-4">{project.description}</p>
                    {project.location && (
                      <p className="text-gray-800 text-sm">{project.location}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg text-lg font-semibold inline-flex items-center transition-colors"
            >
              Tüm Projeleri Gör
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Rakamlarla Biz</h2>
            <p className="text-xl text-blue-200">Güvenilir ortağınız olmanın gururunu yaşıyoruz</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  {index === 0 && <Award className="w-12 h-12 text-blue-400" />}
                  {index === 1 && <Briefcase className="w-12 h-12 text-blue-400" />}
                  {index === 2 && <Users className="w-12 h-12 text-blue-400" />}
                  {index === 3 && <ThumbsUp className="w-12 h-12 text-blue-400" />}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Projenize Başlayalım</h2>
          <p className="text-xl text-gray-300 mb-8">
            Hayallerinizdeki mekana sahip olmak için bugün bize ulaşın. 
            Uzman ekibimiz size en uygun çözümleri sunmak için hazır.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Ücretsiz Teklif Al
            </Link>
            <Link
              href="/products"
              className="border-2 border-gray-300 hover:bg-gray-300 hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Katalog İncele
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
