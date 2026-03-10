const INSTAMOJO_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://www.instamojo.com/api/1.1'
    : 'https://test.instamojo.com/api/1.1'

const INSTAMOJO_HEADERS = {
  'X-Api-Key': process.env.INSTAMOJO_API_KEY!,
  'X-Auth-Token': process.env.INSTAMOJO_AUTH_TOKEN!,
  'Content-Type': 'application/x-www-form-urlencoded',
}

export async function createInstamojoRequest({
  amount,
  purpose,
  buyerName,
  email,
  redirectUrl,
}: {
  amount: number
  purpose: string
  buyerName: string
  email: string
  redirectUrl: string
}) {
  const body = new URLSearchParams({
    purpose,
    amount: amount.toFixed(2),
    buyer_name: buyerName || email,
    email,
    redirect_url: redirectUrl,
    send_email: 'false',
    send_sms: 'false',
    allow_repeated_payments: 'false',
  })

  const res = await fetch(`${INSTAMOJO_BASE}/payment-requests/`, {
    method: 'POST',
    headers: INSTAMOJO_HEADERS,
    body: body.toString(),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(JSON.stringify(err) || 'Instamojo request creation failed')
  }

  const data = await res.json()
  return data.payment_request as { id: string; longurl: string; status: string }
}

export async function getInstamojoPayment(paymentRequestId: string, paymentId: string) {
  const res = await fetch(
    `${INSTAMOJO_BASE}/payment-requests/${paymentRequestId}/payments/${paymentId}/`,
    { headers: INSTAMOJO_HEADERS }
  )

  if (!res.ok) throw new Error('Instamojo payment fetch failed')

  const data = await res.json()
  return data.payment as {
    status: string
    amount: string
    buyer_name: string
    buyer_email: string
  }
}
