import { NextRequest, NextResponse } from 'next/server'
import { getInstamojoPayment } from '@/lib/instamojo'
import { finalizeOrder } from '@/lib/orders'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)

  const paymentId = searchParams.get('payment_id')
  const paymentRequestId = searchParams.get('payment_request_id')
  const paymentStatus = searchParams.get('payment_status')

  // Instamojo sends payment_status=Credit on success
  if (!paymentId || !paymentRequestId || paymentStatus !== 'Credit') {
    return NextResponse.redirect(`${origin}/failed?reason=payment_not_completed`)
  }

  try {
    const payment = await getInstamojoPayment(paymentRequestId, paymentId)

    if (payment.status !== 'Credit') {
      return NextResponse.redirect(`${origin}/failed?reason=payment_not_completed`)
    }

    const result = await finalizeOrder(paymentRequestId, paymentId)

    if (!result) {
      return NextResponse.redirect(`${origin}/failed?reason=order_not_found`)
    }

    const params = new URLSearchParams({ orderId: result.orderId })
    if (result.downloadUrl) params.set('dl', result.downloadUrl)

    return NextResponse.redirect(`${origin}/success?${params.toString()}`)
  } catch (err) {
    console.error('Instamojo callback error:', err)
    return NextResponse.redirect(`${origin}/failed?reason=server_error`)
  }
}
