'use client'

import Link from 'next/link'
import { Users, Package, FolderOpen, MessageSquare, BarChart3 } from 'lucide-react'

export default function AdminDashboard() {
  const adminCards = [
    {
      title: 'Kullanıcı Yönetimi',
      description: 'Kullanıcıları görüntüle, düzenle ve yönet',
      icon: <Users className="w-8 h-8" />,
      href: '/admin/users',
      color: 'bg-blue-500',
    },
    {
      title: 'Ürün Yönetimi',
      description: 'Ürünleri ekle, düzenle ve sil',
      icon: <Package className="w-8 h-8" />,
      href: '/admin/products',
      color: 'bg-green-500',
    },
    {
      title: 'Proje Yönetimi',
      description: 'Projeleri yönet ve portföy güncelle',
      icon: <FolderOpen className="w-8 h-8" />,
      href: '/admin/projects',
      color: 'bg-purple-500',
    },
    {
      title: 'Kategori Yönetimi',
      description: 'Ürün kategorilerini düzenle',
      icon: <BarChart3 className="w-8 h-8" />,
      href: '/admin/categories',
      color: 'bg-orange-500',
    },
    {
      title: 'Mesaj Yönetimi',
      description: 'Kullanıcı mesajlarını görüntüle ve yanıtla',
      icon: <MessageSquare className="w-8 h-8" />,
      href: '/admin/messages',
      color: 'bg-red-500',
    },
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
          <p className="text-gray-800 mt-2">
            Hoş geldiniz! Siteyi yönetmek için aşağıdaki seçenekleri kullanabilirsiniz.
          </p>
        </div>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className={`${card.color} p-3 rounded-full text-white`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-4">
                  {card.title}
                </h3>
              </div>
              <p className="text-gray-800">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 