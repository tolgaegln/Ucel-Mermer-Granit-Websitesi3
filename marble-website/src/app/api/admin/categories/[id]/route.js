import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// PUT update category
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, image } = body

    const category = await prisma.category.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image })
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// DELETE category
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if category has products
    const productsCount = await prisma.product.count({
      where: { categoryId: parseInt(params.id) }
    })

    if (productsCount > 0) {
      return NextResponse.json({ error: 'Bu kategoriye ait ürünler var, önce ürünleri silin' }, { status: 400 })
    }

    await prisma.category.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
} 