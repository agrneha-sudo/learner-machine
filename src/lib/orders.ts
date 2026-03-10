import { db } from './supabase'
import { sendDownloadEmail } from './email'

/**
 * Shared order finalization used by all payment gateways.
 * Marks order as paid, returns the protected download URL, and emails the buyer.
 *
 * @param gatewayOrderId - stored in razorpay_order_id column (used for all gateways)
 * @param gatewayPaymentId - stored in razorpay_payment_id column (used for all gateways)
 * @param overrides - optional customer details to persist (Cashfree/Instamojo already have them)
 */
export async function finalizeOrder(
  gatewayOrderId: string,
  gatewayPaymentId: string,
  overrides?: { customerEmail?: string; customerName?: string }
) {
  const update: Record<string, string> = {
    status: 'paid',
    razorpay_payment_id: gatewayPaymentId,
  }
  if (overrides?.customerEmail) update.customer_email = overrides.customerEmail
  if (overrides?.customerName) update.customer_name = overrides.customerName

  const { data: order } = await db
    .from('orders')
    .update(update)
    .eq('razorpay_order_id', gatewayOrderId)
    .select('id, product_id, customer_email, customer_name, product_title')
    .single()

  if (!order) return null

  const { data: orderWithToken } = await db
    .from('orders')
    .select('download_token, product_id')
    .eq('id', order.id)
    .single()

  let downloadUrl: string | null = null

  if (orderWithToken?.download_token && orderWithToken.product_id) {
    const { data: product } = await db
      .from('products')
      .select('file_path')
      .eq('id', orderWithToken.product_id)
      .single()

    if (product?.file_path) {
      downloadUrl = `/api/download/${orderWithToken.download_token}`
    }
  }

  // Send download email to buyer (non-blocking — don't fail the order if email fails)
  if (downloadUrl && order.customer_email) {
    sendDownloadEmail({
      to: order.customer_email,
      customerName: order.customer_name || '',
      productTitle: order.product_title,
      orderId: order.id,
      downloadUrl,
    }).catch(err => console.error('Email send error:', err))
  }

  return { orderId: order.id, downloadUrl }
}
