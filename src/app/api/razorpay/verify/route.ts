import { NextRequest, NextResponse } from 'next/server'
import { verifyPaymentSignature } from '@/lib/razorpay'
import { finalizeOrder } from '@/lib/orders'
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
      await db
        .from('orders')
        .update({ status: 'failed' })
        .eq('razorpay_order_id', razorpay_order_id)
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 })
    }

    const result = await finalizeOrder(razorpay_order_id, razorpay_payment_id, {
      customerEmail: customer_email || '',
      customerName: customer_name || '',
    })

    if (!result) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, orderId: result.orderId, downloadUrl: result.downloadUrl })
  } catch (err) {
    console.error('Verify payment error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
