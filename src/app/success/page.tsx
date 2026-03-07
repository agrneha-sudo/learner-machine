import Link from 'next/link'
import { CheckCircle, Download, ArrowRight, Mail } from 'lucide-react'

interface Props {
  searchParams: { orderId?: string; dl?: string }
}

export default function SuccessPage({ searchParams }: Props) {
  const downloadUrl = searchParams.dl
  const orderId = searchParams.orderId

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center">
            <CheckCircle size={44} className="text-emerald-500" />
          </div>
        </div>

        <h1 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Payment Successful!
        </h1>
        <p className="text-base mb-2" style={{ color: 'var(--text-secondary)' }}>
          Thank you for your purchase!
        </p>
        {orderId && (
          <p className="text-xs mb-8" style={{ color: 'var(--text-muted)' }}>
            Order ID: {orderId}
          </p>
        )}

        {/* Download link if available */}
        {downloadUrl ? (
          <div className="card p-6 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-3">
              <Download size={20} className="text-brand" />
            </div>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Your Download is Ready
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              This link expires in 1 hour. Download your product now.
            </p>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              <Download size={16} />
              Download Now
            </a>
          </div>
        ) : (
          <div className="card p-6 mb-6">
            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <Mail size={16} className="text-brand shrink-0" />
              Check your email — your download link has been sent.
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link href="/#products" className="btn-primary">
            Browse More Products <ArrowRight size={16} />
          </Link>
          <Link href="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
