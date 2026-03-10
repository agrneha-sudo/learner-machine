import Link from 'next/link'
import { FileText, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'Terms & Conditions — Learner Machine',
  description: 'Terms and Conditions for purchasing digital products on Learner Machine.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: 'rgba(194,82,12,0.08)', color: 'var(--brand)', border: '1px solid rgba(194,82,12,0.2)' }}>
            <FileText size={14} />
            Legal
          </div>
          <h1 className="font-display font-bold text-4xl mb-4" style={{ color: 'var(--text-primary)' }}>
            Terms &amp; Conditions
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Last updated: March 2025 &nbsp;·&nbsp; Learner Machine (learnermachine.com)
          </p>
        </div>

        {/* Section: Product Information */}
        <div className="card p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(194,82,12,0.1)' }}>
              <ShieldCheck size={18} style={{ color: 'var(--brand)' }} />
            </div>
            <h2 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
              Product Information
            </h2>
          </div>

          <div className="mb-5">
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Product Type</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Digital Educational Products</p>
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            Learnermachine is a digital product platform. Please note that this platform does not sell any product in physical form, and therefore factors such as color, size, and physical quality do not apply.
          </p>

          {/* Key Features */}
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {[
              { label: 'Format', value: 'PDF (Portable Document Format)' },
              { label: 'Access', value: 'Immediate access upon successful purchase and download' },
              { label: 'Compatibility', value: 'All devices that support PDF files — computers, tablets, smartphones, e-readers' },
              { label: 'Language', value: 'English' },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)' }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Important Notes */}
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>Important Notes</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="mt-0.5 flex-shrink-0 text-base" style={{ color: 'var(--brand)' }}>→</span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>No Physical Shipment</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  As this is a digital product, there will be no physical delivery. Upon completing your purchase, you will receive a download link via email.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex-shrink-0 text-base" style={{ color: 'var(--brand)' }}>→</span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>Download Limitations</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  The products may be limited to a certain number of downloads. Make sure to save a copy to your personal device after the purchase.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex-shrink-0 text-base" style={{ color: 'var(--brand)' }}>→</span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>Non-refundable</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Due to the nature of digital products, all sales are final and non-refundable once the file has been successfully delivered.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex-shrink-0 text-base" style={{ color: 'var(--brand)' }}>→</span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>License</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  These products are for personal use only. Unauthorised sharing, reselling, or distribution of this content is strictly prohibited, and strict legal action can be taken if found violating.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex-shrink-0 text-base" style={{ color: 'var(--brand)' }}>→</span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>Support</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  If you experience any issues with your download, please contact our support team at{' '}
                  <a href="mailto:support@learnermachine.com" style={{ color: 'var(--brand)' }}>
                    support@learnermachine.com
                  </a>
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Agreement notice */}
        <div className="rounded-xl p-5 mb-10 text-sm leading-relaxed text-center"
          style={{ background: 'rgba(194,82,12,0.06)', border: '1px solid rgba(194,82,12,0.15)', color: 'var(--text-secondary)' }}>
          By purchasing a product on <strong style={{ color: 'var(--text-primary)' }}>Learnermachine.com</strong>, you acknowledge and agree to the above terms and conditions regarding the digital nature of the product.
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/#products" className="btn-primary">
            Browse Products
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  )
}
