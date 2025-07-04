'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MessageSquare, ArrowLeft, Eye, Trash2 } from 'lucide-react'

export default function AdminMessages() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.role !== 'ADMIN') {
      router.push('/login')
      return
    }
    fetchMessages()
  }, [session, status, router])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages')
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      })
      if (response.ok) fetchMessages()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return
    try {
      const response = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
      if (response.ok) fetchMessages()
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
              <MessageSquare className="h-8 w-8 text-red-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Mesaj Yönetimi</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {messages.map((message) => (
                <li key={message.id} className={`${!message.isRead ? 'bg-blue-50' : ''}`}>
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {message.name?.[0]?.toUpperCase()}
                            </span>
                          </div>
                        </div>
                                                  <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {message.name}
                                </div>
                                {!message.isRead && (
                                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Yeni
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-800">
                                  {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                                </span>
                                {!message.isRead && (
                                  <button 
                                    onClick={() => markAsRead(message.id)} 
                                    className="text-blue-600 hover:text-blue-900"
                                    title="Okundu olarak işaretle"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                )}
                                <button 
                                  onClick={() => handleDelete(message.id)} 
                                  className="text-red-600 hover:text-red-900"
                                  title="Sil"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              <span className="font-medium">Email:</span> {message.email}
                              {message.phone && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span className="font-medium">Tel:</span> {message.phone}
                                </>
                              )}
                            </div>
                            <div className="text-sm text-gray-800 mt-1 font-medium">
                              <span className="font-medium">Konu:</span> {message.subject}
                            </div>
                            <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-3 rounded-md">
                              {message.message}
                            </p>
                          </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {messages.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Henüz mesaj yok</h3>
                <p className="mt-1 text-sm text-gray-800">Henüz mesaj gelmemiş.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 