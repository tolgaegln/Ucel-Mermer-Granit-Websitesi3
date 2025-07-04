'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, User, LogOut, Settings } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Üçel Mermer Granit
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors">
              Ürünler
            </Link>
            <Link href="/projects" className="text-gray-600 hover:text-gray-900 transition-colors">
              Projeler
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              Hakkımızda
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              İletişim
            </Link>
            
            {session ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                  <User className="w-4 h-4" />
                  <span>{session.user.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {session.user.role === 'ADMIN' && (
                    <Link 
                      href="/admin" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Çıkış Yap
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Giriş Yap
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Ana Sayfa
              </Link>
              <Link href="/products" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Ürünler
              </Link>
              <Link href="/projects" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Projeler
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Hakkımızda
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                İletişim
              </Link>
              
              {session ? (
                <div className="border-t border-gray-200 pt-2">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    {session.user.name}
                  </div>
                  {session.user.role === 'ADMIN' && (
                    <Link href="/admin" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Çıkış Yap
                  </button>
                </div>
              ) : (
                <Link href="/login" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                  Giriş Yap
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 