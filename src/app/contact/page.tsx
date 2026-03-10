import { Mail, Phone, Clock, MessageCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Contact Us — Learner Machine',
  description: 'Get in touch with the Learner Machine support team. Call, email, or message us — we respond within 24 hours.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: 'rgba(194,82,12,0.08)', color: 'var(--brand)', border: '1px solid rgba(194,82,12,0.2)' }}>
            <MessageCircle size={14} />
            Contact Support
          </div>
          <h1 className="font-display font-bold text-4xl mb-4" style={{ color: 'var(--text-primary)' }}>
            How can we help you?
          </h1>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Questions about your order, download issues, or anything else — we&apos;re just a call or email away.
          </p>
        </div>

        {/* Contact methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">

          {/* Phone */}
          <a
            href="tel:+918920621043"
            className="card p-8 flex flex-col gap-4 hover:scale-[1.01] transition-transform"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(194,82,12,0.1)' }}>
              <Phone size={22} style={{ color: 'var(--brand)' }} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Call Us</p>
              <p className="font-bold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>+91 89206 21043</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Mon – Sat · 10am to 7pm IST</p>
            </div>
            <span className="text-sm font-semibold flex items-center gap-1" style={{ color: 'var(--brand)' }}>
              Tap to call <ArrowRight size={14} />
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:Support@learnermachine.com"
            className="card p-8 flex flex-col gap-4 hover:scale-[1.01] transition-transform"
            style={{ borderColor: 'rgba(194,82,12,0.3)' }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(194,82,12,0.12)' }}>
              <Mail size={22} style={{ color: 'var(--brand)' }} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Email Us</p>
              <p className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>Support@learnermachine.com</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>We reply within 24 hours</p>
            </div>
            <span className="text-sm font-semibold flex items-center gap-1" style={{ color: 'var(--brand)' }}>
              Send an email <ArrowRight size={14} />
            </span>
          </a>

        </div>

        {/* Support hours */}
        <div className="card p-6 flex items-start gap-4 mb-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(194,82,12,0.1)' }}>
            <Clock size={18} style={{ color: 'var(--brand)' }} />
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Support Hours</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Monday to Saturday · 10:00 AM – 7:00 PM IST
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              We are closed on Sundays and national holidays. Emails sent outside hours are answered the next business day.
            </p>
          </div>
        </div>

        {/* Common topics */}
        <div className="card p-6 mb-10">
          <p className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Common questions we can help with:</p>
          <ul className="space-y-2">
            {[
              'My download link is not working',
              'I paid but did not receive my order',
              'I want a refund',
              'I have a question before buying',
              'I want to know more about a course',
            ].map(q => (
              <li key={q} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--brand)', flexShrink: 0 }}>→</span>
                {q}
              </li>
            ))}
          </ul>
        </div>

        {/* Tip */}
        <div className="rounded-xl p-4 text-sm text-center" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
          For faster help with download issues, please include your <strong style={{ color: 'var(--text-secondary)' }}>Order ID</strong> when you contact us.
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="btn-secondary">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}
