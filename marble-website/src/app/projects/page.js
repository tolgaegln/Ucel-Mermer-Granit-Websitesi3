'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Calendar, Eye, X } from 'lucide-react'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [lightboxImage, setLightboxImage] = useState(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      // Public projeler API'sini kullan - sadece aktif projeler gelir
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        console.log('📡 API Response - Raw Data:', data)
        
        setProjects(data)
        console.log('✅ Projects loaded:', data)
      } else {
        console.error('Projects fetch failed:', response.status)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !locationFilter || 
                           project.location?.toLowerCase().includes(locationFilter.toLowerCase())
    return matchesSearch && matchesLocation
  })

  const uniqueLocations = [...new Set(projects.map(p => p.location).filter(Boolean))]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-900">Projeler yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Referans Projeler</h1>
          <p className="text-xl text-gray-600">
            Tamamladığımız başarılı projelerden seçmeler
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proje Ara
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Proje adı..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasyon
              </label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="">Tüm Lokasyonlar</option>
                {uniqueLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setLocationFilter('')
                }}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Filtreleri Temizle
              </button>
            </div>
          </div>
        </div>

        {/* Projects Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProjects.length} proje bulundu
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aradığınız kriterlere uygun proje bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={() => setSelectedProject(project)}
                onViewImage={(imageUrl) => setLightboxImage(imageUrl)}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          formatDate={formatDate}
          onViewImage={(imageUrl) => setLightboxImage(imageUrl)}
        />
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox
          imageUrl={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  )
}

function ProjectCard({ project, onViewDetails, onViewImage, formatDate }) {
  // Ana sayfadaki mantığı TAMAMEN kopyala
  const images = project.images ? JSON.parse(project.images) : []
  let mainImage = images.length > 0 ? images[0] : null
  
  // URL düzeltmesi - Ana sayfadaki mantık
  if (mainImage) {
    if (mainImage.includes('images/products/')) {
      mainImage = mainImage.replace('images/products/', 'uploads/')
    }
    if (!mainImage.startsWith('/') && !mainImage.startsWith('http')) {
      mainImage = '/' + mainImage
    }
  }

  console.log('🔍 Project Debug:', project.title, mainImage)

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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
        <button
          onClick={onViewDetails}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Detayları Gör
        </button>
      </div>
    </div>
  )
}

function ProjectModal({ project, onClose, formatDate, onViewImage }) {
  // Admin paneli ile aynı şekilde resim parsing
  const images = project.images ? JSON.parse(project.images) : []
  
  // URL düzeltmesi - tüm resimler için
  const correctedImages = images.map(image => {
    let correctedImage = image
    if (correctedImage.includes('images/products/')) {
      correctedImage = correctedImage.replace('images/products/', 'uploads/')
    }
    if (!correctedImage.startsWith('/') && !correctedImage.startsWith('http')) {
      correctedImage = '/' + correctedImage
    }
    return correctedImage
  })
  
  const hasImages = correctedImages.length > 0

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-2 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-[98vw] w-full max-h-[98vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-40 hover:bg-opacity-60 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-20"
          >
            <X className="w-7 h-7" />
          </button>
          
          <div className="max-w-6xl">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-8 text-gray-200">
              {project.location && (
                <div className="flex items-center bg-white bg-opacity-10 rounded-full px-6 py-3">
                  <MapPin className="w-6 h-6 mr-3" />
                  <span className="text-xl font-medium">{project.location}</span>
                </div>
              )}
              
              {project.completedAt && (
                <div className="flex items-center bg-white bg-opacity-10 rounded-full px-6 py-3">
                  <Calendar className="w-6 h-6 mr-3" />
                  <span className="text-xl font-medium">{formatDate(project.completedAt)}</span>
                </div>
              )}
              
              <div className="flex items-center bg-white bg-opacity-10 rounded-full px-6 py-3">
                <Eye className="w-6 h-6 mr-3" />
                <span className="text-xl font-medium">{correctedImages.length} Görsel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 overflow-y-auto max-h-[calc(98vh-200px)]">
          <div className="grid grid-cols-1 2xl:grid-cols-12 gap-10">
            
            {/* Main Image Section - 8 columns */}
            <div className="2xl:col-span-8">
              <div className="h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-xl group relative">
                {hasImages ? (
                  <>
                    <img
                      src={correctedImages[0]}
                      alt={project.title}
                      className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-700"
                      onClick={() => onViewImage(correctedImages[0])}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white bg-opacity-95 px-8 py-4 rounded-2xl shadow-lg">
                        <span className="text-gray-900 font-semibold text-lg">🔍 Büyütmek için tıklayın</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-32 h-32 mb-6 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-500 text-2xl font-medium">Ana Görsel</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Gallery Grid */}
              {hasImages && correctedImages.length > 1 && (
                <div className="mt-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    🖼️ Proje Galerisi
                  </h3>
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {correctedImages.slice(1, 25).map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-gray-100 rounded-xl cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:scale-105"
                        onClick={() => onViewImage(image)}
                      >
                        <img
                          src={image}
                          alt={`${project.title} ${index + 2}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                    {correctedImages.length > 25 && (
                      <div className="aspect-square bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white transform hover:scale-105">
                        <div className="text-center">
                          <span className="text-2xl font-bold">+{correctedImages.length - 25}</span>
                          <p className="text-xs mt-1 font-medium">daha fazla</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Details Section - 4 columns */}
            <div className="2xl:col-span-4 space-y-8">
              
              {/* Project Description */}
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  📋 Proje Açıklaması
                </h2>
                
                {project.description ? (
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                      {project.description}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-lg">
                    Bu proje için henüz açıklama eklenmemiş.
                  </p>
                )}
              </div>

              {/* Project Information */}
              <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  ℹ️ Proje Bilgileri
                </h3>
                
                <div className="space-y-6">
                  {project.location && (
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <span className="text-gray-600 flex items-center font-semibold text-lg">
                        <MapPin className="w-6 h-6 mr-4 text-blue-600" />
                        Lokasyon
                      </span>
                      <span className="font-bold text-gray-900 text-xl">{project.location}</span>
                    </div>
                  )}
                  
                  {project.completedAt && (
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <span className="text-gray-600 flex items-center font-semibold text-lg">
                        <Calendar className="w-6 h-6 mr-4 text-blue-600" />
                        Tamamlanma
                      </span>
                      <span className="font-bold text-gray-900 text-xl">{formatDate(project.completedAt)}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between py-4">
                    <span className="text-gray-600 flex items-center font-semibold text-lg">
                      <Eye className="w-6 h-6 mr-4 text-blue-600" />
                      Galeri
                    </span>
                    <span className="font-bold text-gray-900 text-xl">{correctedImages.length} resim</span>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-8 text-white text-center shadow-xl">
                <h3 className="text-2xl font-bold mb-4">💎 Benzer Bir Proje Mi İstiyorsunuz?</h3>
                <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                  Bu projeyle ilgili detaylı bilgi almak ve benzer çalışmalar için bizimle iletişime geçin
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:scale-105"
                >
                  🚀 Hemen İletişime Geç
                </a>
              </div>

              {/* Features */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border border-green-200 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  ✅ Proje Özellikleri
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4 shadow"></div>
                    <span className="text-gray-700 text-lg">Yüksek kalite doğal taş kullanımı</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4 shadow"></div>
                    <span className="text-gray-700 text-lg">Profesyonel montaj ve uygulama</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4 shadow"></div>
                    <span className="text-gray-700 text-lg">Uzun ömürlü ve dayanıklı malzeme</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4 shadow"></div>
                    <span className="text-gray-700 text-lg">Özel tasarım ve uygulamalar</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4 shadow"></div>
                    <span className="text-gray-700 text-lg">Garanti ve satış sonrası hizmet</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Lightbox({ imageUrl, onClose }) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div className="relative max-w-7xl max-h-full flex items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 hover:bg-opacity-75 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Image */}
        <img
          src={imageUrl}
          alt="Proje Görseli"
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        
        {/* Image Info */}
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            <p className="text-sm">Resmi kapatmak için boş alana tıklayın</p>
          </div>
        </div>
      </div>
    </div>
  )
} 