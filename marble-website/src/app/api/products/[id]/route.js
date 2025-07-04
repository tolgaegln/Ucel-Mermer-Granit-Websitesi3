import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { id } = params
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { message: 'Geçersiz ürün ID' },
        { status: 400 }
      )
    }

    const product = await prisma.product.findFirst({
      where: {
        id: parseInt(id),
        isActive: true
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    if (!product) {
      return NextResponse.json(
        { message: 'Ürün bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    )
  }
} 