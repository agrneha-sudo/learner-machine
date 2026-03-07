import { NextRequest, NextResponse } from 'next/server'
import { verifyPaymentSignature } from '@/lib/razorpay'
import { db } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer_email,
      customer_name,
    } = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 })
    }

    const isValid = verifyPaymentSignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    })

    if (!isValid) {
      // Mark order as failed
      await db
        .from('orders')
        .update({ status: 'failed' })
        .eq('razorpay_order_id', razorpay_order_id)
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 })
    }

    // Mark order as paid and update customer details
    const { data: order } = await db
      .from('orders')
      .update({
        status: 'paid',
        razorpay_payment_id,
        customer_email: customer_email || '',
        customer_name: customer_name || '',
      })
      .eq('razorpay_order_id', razorpay_order_id)
      .select('id, product_id')
      .single()

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Generate a time-limited signed download URL (1 hour)
    let downloadUrl: string | null = null
    if (order.product_id) {
      const { data: product } = await db
        .from('products')
        .select('file_path')
        .eq('id', order.product_id)
        .single()

      if (product?.file_path) {
        const { data: signed } = await db.storage
          .from('product-files')
          .createSignedUrl(product.file_path, 3600) // 1 hour
        downloadUrl = signed?.signedUrl ?? null
      }
    }

    return NextResponse.json({ success: true, orderId: order.id, downloadUrl })
  } catch (err) {
    console.error('Verify payment error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
