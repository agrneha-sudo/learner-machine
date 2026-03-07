'use client'

import { useState } from 'react'
import { ShoppingCart, Loader2 } from 'lucide-react'
import Script from 'next/script'

interface Props {
  productSlug: string
  productTitle: string
  amount: number
  currency: string
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void }
  }
}

export default function BuyButton({ productSlug, productTitle, amount, currency }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleBuy = async () => {
    setLoading(true)
    setError(null)

    try {
      // 1. Create Razorpay order
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: productSlug }),
      })
      const orderData = await res.json()
      if (!res.ok) throw new Error(orderData.error || 'Failed to create order')

      // 2. Open Razorpay checkout modal
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Learner Machine',
        description: productTitle,
        order_id: orderData.orderId,
        theme: { color: '#f97316' },
        handler: async (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
          [key: string]: unknown
        }) => {
          // 3. Verify payment on server
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })
          const verifyData = await verifyRes.json()

          if (verifyRes.ok && verifyData.success) {
            // Redirect to success page with download URL if available
            const params = new URLSearchParams({ orderId: verifyData.orderId })
            if (verifyData.downloadUrl) params.set('dl', verifyData.downloadUrl)
            window.location.href = `/success?${params.toString()}`
          } else {
            setError('Payment verification failed. Please contact support.')
            setLoading(false)
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      })

      rzp.open()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div>
        <button
          onClick={handleBuy}
          disabled={loading}
          className="btn-primary w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Opening Checkout...
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              Buy Now — ₹{amount.toLocaleString('en-IN')}
            </>
          )}
        </button>
        {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </>
  )
}
