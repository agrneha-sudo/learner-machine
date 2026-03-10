'use client'

import { useState } from 'react'
import { ShoppingCart, Loader2, Mail, User, CreditCard } from 'lucide-react'
import Script from 'next/script'

interface Props {
  productSlug: string
  productTitle: string
  amount: number
  currency: string
}

type Step = 'idle' | 'collect' | 'paying_cashfree' | 'paying_instamojo'

declare global {
  interface Window {
    Cashfree: (config: { mode: 'sandbox' | 'production' }) => {
      checkout: (opts: {
        paymentSessionId: string
        redirectTarget?: string
      }) => Promise<{ error?: { message: string }; paymentDetails?: unknown }>
    }
  }
}

export default function BuyButton({ productSlug, productTitle, amount, currency }: Props) {
  const [step, setStep] = useState<Step>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  function validate() {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return false
    }
    return true
  }

  // ── Cashfree flow ────────────────────────────────────────────────────────────
  async function handleCashfree() {
    if (!validate()) return
    setError(null)
    setStep('paying_cashfree')

    try {
      const res = await fetch('/api/cashfree/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: productSlug,
          customer_email: email.trim(),
          customer_name: name.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create order')

      const mode = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
      const cashfree = window.Cashfree({ mode })

      const result = await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: '_modal',
      })

      if (result.error) {
        setError(result.error.message || 'Payment failed. Please try again.')
        setStep('collect')
        return
      }

      // Verify server-side
      const verifyRes = await fetch('/api/cashfree/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: data.orderId }),
      })
      const verifyData = await verifyRes.json()

      if (verifyRes.ok && verifyData.success) {
        const params = new URLSearchParams({ orderId: verifyData.orderId })
        if (verifyData.downloadUrl) params.set('dl', verifyData.downloadUrl)
        window.location.href = `/success?${params.toString()}`
      } else {
        setError('Payment verification failed. Please contact support.')
        setStep('collect')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStep('collect')
    }
  }

  // ── Instamojo flow ───────────────────────────────────────────────────────────
  async function handleInstamojo() {
    if (!validate()) return
    setError(null)
    setStep('paying_instamojo')

    try {
      const res = await fetch('/api/instamojo/create-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: productSlug,
          customer_email: email.trim(),
          customer_name: name.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create payment request')

      // Redirect to Instamojo hosted payment page
      window.location.href = data.redirectUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStep('collect')
    }
  }

  const isPaying = step === 'paying_cashfree' || step === 'paying_instamojo'

  // ── Idle ─────────────────────────────────────────────────────────────────────
  if (step === 'idle') {
    return (
      <>
        <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" strategy="lazyOnload" />
        <button
          onClick={() => setStep('collect')}
          className="btn-primary w-full text-base py-4"
        >
          <ShoppingCart size={18} />
          Buy Now — ₹{amount.toLocaleString('en-IN')}
        </button>
      </>
    )
  }

  // ── Collect + gateway selection ───────────────────────────────────────────────
  return (
    <>
      <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" strategy="lazyOnload" />

      <div className="flex flex-col gap-3">
        {/* Name */}
        <div className="relative">
          <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={isPaying}
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border outline-none disabled:opacity-50"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            type="email"
            placeholder="Your email address *"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(null) }}
            disabled={isPaying}
            autoFocus
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border outline-none disabled:opacity-50"
            style={{
              background: 'var(--bg-card)',
              borderColor: error ? '#ef4444' : 'var(--border)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Your download link will be tied to this email. Used for watermarking your copy.
        </p>

        {/* Gateway label */}
        <p className="text-xs font-semibold mt-1" style={{ color: 'var(--text-secondary)' }}>
          Choose how to pay:
        </p>

        {/* Cashfree button */}
        <button
          onClick={handleCashfree}
          disabled={isPaying}
          className="btn-primary w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {step === 'paying_cashfree' ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Opening Cashfree...
            </>
          ) : (
            <>
              <CreditCard size={18} />
              Pay with Cashfree — ₹{amount.toLocaleString('en-IN')}
            </>
          )}
        </button>

        {/* Instamojo button */}
        <button
          onClick={handleInstamojo}
          disabled={isPaying}
          className="btn-secondary w-full text-base py-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {step === 'paying_instamojo' ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Redirecting to Instamojo...
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              Pay via Instamojo — ₹{amount.toLocaleString('en-IN')}
            </>
          )}
        </button>

        <button
          onClick={() => { setStep('idle'); setError(null) }}
          disabled={isPaying}
          className="text-xs text-center disabled:opacity-40"
          style={{ color: 'var(--text-muted)' }}
        >
          Cancel
        </button>
      </div>
    </>
  )
}
