import { NextRequest, NextResponse } from 'next/server'
import { getCashfreeOrder } from '@/lib/cashfree'
import { finalizeOrder } from '@/lib/orders'

export async function POST(req: NextRequest) {
  try {
    const { order_id } = await req.json()

    if (!order_id) return NextResponse.json({ error: 'Order ID required' }, { status: 400 })

    const cfOrder = await getCashfreeOrder(order_id)

    if (cfOrder.order_status !== 'PAID') {
      return NextResponse.json(
        { error: `Payment not completed. Status: ${cfOrder.order_status}` },
        { status: 400 }
      )
    }

    const result = await finalizeOrder(order_id, cfOrder.cf_order_id)

    if (!result) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

    return NextResponse.json({ success: true, orderId: result.orderId, downloadUrl: result.downloadUrl })
  } catch (err) {
    console.error('Cashfree verify error:', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
