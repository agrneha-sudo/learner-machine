import { NextRequest, NextResponse } from 'next/server'
import { getRazorpay } from '@/lib/razorpay'
import { db } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json()
    if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 })

    const { data: product, error } = await db
      .from('products')
      .select('id, title, price, currency')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Razorpay amounts are in smallest currency unit (paise for INR)
    const amountInPaise = Math.round(product.price * 100)

    const order = await getRazorpay().orders.create({
      amount: amountInPaise,
      currency: product.currency || 'INR',
      receipt: `rcpt_${Date.now()}`,
      notes: { productSlug: slug, productId: product.id },
    })

    // Create a pending order record in DB
    await db.from('orders').insert({
      product_id: product.id,
      product_title: product.title,
      customer_email: '',          // filled in after payment
      amount: product.price,
      currency: product.currency || 'INR',
      razorpay_order_id: order.id,
      status: 'pending',
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      productTitle: product.title,
    })
  } catch (err) {
    console.error('Create order error:', err)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
