import { NextRequest, NextResponse } from 'next/server'
import { createInstamojoRequest } from '@/lib/instamojo'
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

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://learnermachine.com'

    const paymentRequest = await createInstamojoRequest({
      amount: product.price,
      purpose: product.title,
      buyerName: customer_name || customer_email,
      email: customer_email,
      redirectUrl: `${baseUrl}/api/instamojo/callback`,
    })

    // Store pending order — reuse razorpay_order_id column as generic gateway_order_id
    await db.from('orders').insert({
      product_id: product.id,
      product_title: product.title,
      customer_email,
      customer_name: customer_name || '',
      amount: product.price,
      currency: product.currency || 'INR',
      razorpay_order_id: paymentRequest.id,
      status: 'pending',
    })

    return NextResponse.json({ redirectUrl: paymentRequest.longurl })
  } catch (err) {
    console.error('Instamojo create-request error:', err)
    return NextResponse.json({ error: 'Failed to create payment request' }, { status: 500 })
  }
}
