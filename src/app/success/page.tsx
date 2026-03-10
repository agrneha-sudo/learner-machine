import Link from 'next/link'
import { CheckCircle, BookOpen, ArrowRight, Mail, ShieldCheck } from 'lucide-react'

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
          Thank you for your purchase.
        </p>
        {orderId && (
          <p className="text-xs mb-8" style={{ color: 'var(--text-muted)' }}>
            Order ID: {orderId}
          </p>
        )}

        {downloadUrl ? (
          <div className="card p-6 mb-6 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                <BookOpen size={20} className="text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  Your download is ready
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Opens in your browser — up to 5 times
                </p>
              </div>
            </div>

            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full mb-4"
            >
              <BookOpen size={16} />
              Open My PDF
            </a>

            <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
              <ShieldCheck size={14} className="text-brand mt-0.5 flex-shrink-0" />
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Your copy is watermarked with your name and email. The link is unique to your order and works up to 5 times. Please do not share it.
              </p>
            </div>
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
