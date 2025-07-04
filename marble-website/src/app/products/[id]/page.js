'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Package, Tag, Info } from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
        
        // İlgili ürünleri getir
        const relatedResponse = await fetch(`/api/products?category=${data.categoryId}&exclude=${params.id}&limit=3`)
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json()
          setRelatedProducts(relatedData)
        }
      } else if (response.status === 404) {
        setError('Ürün bulunamadı')
      } else {
        setError('Ürün yüklenirken hata oluştu')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      setError('Bağlantı hatası')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-900">Ürün detayları yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-24 h-24 text-gray-700 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ürün Bulunamadı</h1>
          <p className="text-gray-900 mb-6">{error || 'Aradığınız ürün mevcut değil.'}</p>
          <Link 
            href="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ürün Kataloğuna Dön
          </Link>
        </div>
      </div>
    )
  }

  const images = product.images ? JSON.parse(product.images) : []
  const hasImages = images.length > 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-800">
            <Link href="/" className="hover:text-gray-900">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-900">Ürünler</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-800 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Geri Dön
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              {hasImages ? (
                <img
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-800 text-lg">Ürün Görseli</span>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {hasImages && images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-medium">{product.category?.name}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Price */}
              <div className="mb-6">
                {product.price ? (
                  <div className="text-3xl font-bold text-blue-600">
                    ₺{product.price}/m²
                  </div>
                ) : (
                  <div className="text-xl text-gray-900">
                    Fiyat için iletişime geçin
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center mb-4">
                <Info className="w-6 h-6 text-gray-900 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Ürün Açıklaması</h2>
              </div>
              <div className="prose prose-gray max-w-none">
                {product.description ? (
                  <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </p>
                ) : (
                  <p className="text-gray-800 italic">
                    Bu ürün için henüz detaylı açıklama eklenmemiş.
                  </p>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ürün Özellikleri</h3>
              <ul className="space-y-2 text-gray-900">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Doğal mermer/doğal taş
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Yüksek kalite standartları
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Profesyonel montaj hizmeti
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Uzun ömürlü ve dayanıklı
                </li>
              </ul>
            </div>

            {/* Contact Actions */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bu Ürünle İlgili</h3>
              <Link
                href="/contact"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition-colors font-medium block"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">İlgili Ürünler</h2>
              <p className="text-gray-900">Size önerebileceğimiz diğer ürünler</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedImages = relatedProduct.images ? JSON.parse(relatedProduct.images) : []
                const relatedMainImage = relatedImages.length > 0 ? relatedImages[0] : null

                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      {relatedMainImage ? (
                        <img
                          src={relatedMainImage}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-800">Ürün Görseli</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                      <p className="text-gray-900 text-sm mb-3 line-clamp-2">{relatedProduct.description}</p>
                      {relatedProduct.price && (
                        <span className="text-blue-600 font-bold">₺{relatedProduct.price}/m²</span>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/products"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                Tüm Ürünleri Gör
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 