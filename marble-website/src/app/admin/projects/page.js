'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FolderOpen, 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Plus, 
  Eye, 
  EyeOff,
  Upload,
  X,
  Image as ImageIcon
} from 'lucide-react'

export default function AdminProjects() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    completedAt: '',
    images: '',
    isActive: true
  })

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.role !== 'ADMIN') {
      router.push('/login')
      return
    }
    fetchProjects()
  }, [session, status, router])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (files) => {
    setUploadingImages(true)
    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData()
      formData.append('file', file)
      
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        
        if (response.ok) {
          const data = await response.json()
          return data.url
        } else {
          throw new Error('Upload failed')
        }
      } catch (error) {
        console.error('Error uploading file:', error)
        alert(`${file.name} yüklenirken hata oluştu`)
        return null
      }
    })

    try {
      const uploadedUrls = await Promise.all(uploadPromises)
      const validUrls = uploadedUrls.filter(url => url !== null)
      
      setSelectedImages(prev => [...prev, ...validUrls])
      
      // Form data'ya da ekle
      const currentImages = formData.images ? JSON.parse(formData.images) : []
      const updatedImages = [...currentImages, ...validUrls]
      setFormData(prev => ({
        ...prev,
        images: JSON.stringify(updatedImages)
      }))
    } catch (error) {
      console.error('Error processing uploads:', error)
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (indexToRemove) => {
    const updatedImages = selectedImages.filter((_, index) => index !== indexToRemove)
    setSelectedImages(updatedImages)
    setFormData(prev => ({
      ...prev,
      images: JSON.stringify(updatedImages)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = editingProject ? `/api/admin/projects/${editingProject.id}` : '/api/admin/projects'
      const method = editingProject ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          completedAt: formData.completedAt ? new Date(formData.completedAt).toISOString() : null
        }),
      })
      if (response.ok) {
        setShowModal(false)
        setEditingProject(null)
        setSelectedImages([])
        setFormData({ title: '', description: '', location: '', completedAt: '', images: '', isActive: true })
        fetchProjects()
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    const images = project.images ? JSON.parse(project.images) : []
    setSelectedImages(images)
    setFormData({
      title: project.title,
      description: project.description || '',
      location: project.location || '',
      completedAt: project.completedAt ? new Date(project.completedAt).toISOString().split('T')[0] : '',
      images: project.images || '',
      isActive: project.isActive
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) return
    try {
      const response = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
      if (response.ok) fetchProjects()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/admin" className="mr-4 p-2 rounded-md hover:bg-gray-100">
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </Link>
              <FolderOpen className="h-8 w-8 text-purple-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Proje Yönetimi</h1>
            </div>
            <button
              onClick={() => {
                setEditingProject(null)
                setSelectedImages([])
                setFormData({ title: '', description: '', location: '', completedAt: '', images: '', isActive: true })
                setShowModal(true)
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Yeni Proje
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const images = project.images ? JSON.parse(project.images) : []
              const mainImage = images.length > 0 ? images[0] : null

              return (
                <div key={project.id} className="bg-white overflow-hidden shadow rounded-lg">
                  {/* Project Image */}
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    {mainImage ? (
                      <img
                        src={mainImage}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleEdit(project)} className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    {project.location && <div className="text-sm text-gray-800 mb-2">{project.location}</div>}
                    {project.description && <p className="text-gray-900 text-sm mb-4 line-clamp-3">{project.description}</p>}
                    
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {project.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                      
                      {project.completedAt && (
                        <span className="text-xs text-gray-800">
                          {new Date(project.completedAt).toLocaleDateString('tr-TR')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Henüz proje yok</h3>
              <p className="mt-1 text-sm text-gray-800">Başlamak için yeni bir proje ekleyin.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingProject ? 'Proje Düzenle' : 'Yeni Proje Ekle'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proje Başlığı
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white"
                    placeholder="Proje başlığı girin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lokasyon
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white"
                    placeholder="Proje lokasyonu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tamamlanma Tarihi
                </label>
                <input
                  type="date"
                  value={formData.completedAt}
                  onChange={(e) => setFormData({...formData, completedAt: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white"
                  placeholder="Proje açıklaması"
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proje Resimleri
                </label>
                
                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    id="project-image-upload"
                    disabled={uploadingImages}
                  />
                  <label htmlFor="project-image-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {uploadingImages ? 'Yükleniyor...' : 'Resim yüklemek için tıklayın veya sürükleyin'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, JPEG (Max 5MB)
                    </p>
                  </label>
                </div>

                {/* Selected Images Preview */}
                {selectedImages.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Seçilen Resimler:</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedImages.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={`Proje resmi ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActiveProject"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="isActiveProject" className="ml-2 block text-sm text-gray-900">
                  Aktif
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setSelectedImages([])
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={loading || uploadingImages}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 disabled:opacity-50"
                >
                  {loading ? 'Kaydediliyor...' : (editingProject ? 'Güncelle' : 'Ekle')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 