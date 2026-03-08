import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { data: order } = await db
    .from('orders')
    .select('id, product_id, status, customer_email')
    .eq('id', params.id)
    .single()

  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  if (order.status !== 'paid') return NextResponse.json({ error: 'Order not paid' }, { status: 400 })

  const { data: product } = await db
    .from('products')
    .select('file_path, title')
    .eq('id', order.product_id)
    .single()

  if (!product?.file_path) {
    return NextResponse.json({ error: 'No file attached to this product' }, { status: 404 })
  }

  const { data: signed } = await db.storage
    .from('product-files')
    .createSignedUrl(product.file_path, 86400) // 24 hours for admin-generated links

  if (!signed?.signedUrl) {
    return NextResponse.json({ error: 'Could not generate download URL' }, { status: 500 })
  }

  return NextResponse.json({ downloadUrl: signed.signedUrl, productTitle: product.title })
}
