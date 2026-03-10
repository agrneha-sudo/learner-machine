import { NextRequest, NextResponse } from 'next/server'
import { createCashfreeOrder } from '@/lib/cashfree'
import { db } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { slug, customer_email, customer_name } = await req.json()

    if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 })
    if (!customer_email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const { data: product } = await db
      .from('products')
      .select('id, title, price, currency')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    // Generate a unique order ID — Cashfree requires alphanumeric + underscore/hyphen, max 50 chars
    const orderId = `lm_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

    const cfOrder = await createCashfreeOrder({
      orderId,
      amount: product.price,
      currency: product.currency || 'INR',
      customerEmail: customer_email,
      customerName: customer_name || customer_email,
    })

    // Store pending order — reuse razorpay_order_id column as generic gateway_order_id
    await db.from('orders').insert({
      product_id: product.id,
      product_title: product.title,
      customer_email,
      customer_name: customer_name || '',
      amount: product.price,
      currency: product.currency || 'INR',
      razorpay_order_id: orderId,
      status: 'pending',
    })

    return NextResponse.json({
      orderId,
      paymentSessionId: cfOrder.payment_session_id,
      amount: product.price,
      currency: product.currency || 'INR',
    })
  } catch (err) {
    console.error('Cashfree create-order error:', err)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
