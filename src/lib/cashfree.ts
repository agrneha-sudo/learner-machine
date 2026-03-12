const CASHFREE_BASE =
  process.env.CASHFREE_ENV === 'production'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg'

const CASHFREE_HEADERS = {
  'Content-Type': 'application/json',
  'x-api-version': '2023-08-01',
  'x-client-id': process.env.CASHFREE_APP_ID!,
  'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
}

export async function createCashfreeOrder({
  orderId,
  amount,
  currency,
  customerEmail,
  customerName,
}: {
  orderId: string
  amount: number
  currency: string
  customerEmail: string
  customerName: string
}) {
  const res = await fetch(`${CASHFREE_BASE}/orders`, {
    method: 'POST',
    headers: CASHFREE_HEADERS,
    body: JSON.stringify({
      order_id: orderId,
      order_amount: amount,
      order_currency: currency,
      customer_details: {
        customer_id: customerEmail.replace(/[^a-z0-9]/gi, '_').slice(0, 50),
        customer_email: customerEmail,
        customer_name: customerName || customerEmail,
        customer_phone: '9999999999', // required by Cashfree; not used
      },
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Cashfree order creation failed')
  }

  return res.json() as Promise<{
    cf_order_id: string
    payment_session_id: string
    order_status: string
  }>
}

export async function getCashfreeOrder(orderId: string) {
  const res = await fetch(`${CASHFREE_BASE}/orders/${orderId}`, {
    headers: CASHFREE_HEADERS,
  })

  if (!res.ok) throw new Error('Cashfree order fetch failed')

  return res.json() as Promise<{
    order_status: string
    cf_order_id: string
    order_id: string
  }>
}
