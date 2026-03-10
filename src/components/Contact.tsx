import { Mail, Phone, MessageCircle, Clock } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: 'rgba(194,82,12,0.08)', color: 'var(--brand)', border: '1px solid rgba(194,82,12,0.2)' }}>
            <MessageCircle size={14} />
            Get in Touch
          </div>
          <h2 className="font-display font-bold mb-4" style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
            We&apos;re Here to Help
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Have a question about a product, need help with your download, or just want to say hi? Reach out — we respond fast.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

          {/* Phone */}
          <a
            href="tel:+918920621043"
            className="card p-8 text-center flex flex-col items-center gap-4 hover:scale-[1.02] transition-transform"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(194,82,12,0.1)' }}>
              <Phone size={24} style={{ color: 'var(--brand)' }} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Call Us</p>
              <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>+91 89206 21043</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Mon – Sat, 10am – 7pm</p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:Support@learnermachine.com"
            className="card p-8 text-center flex flex-col items-center gap-4 hover:scale-[1.02] transition-transform"
            style={{ borderColor: 'var(--brand)', boxShadow: '0 0 0 1px rgba(194,82,12,0.15)' }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(194,82,12,0.12)' }}>
              <Mail size={24} style={{ color: 'var(--brand)' }} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Email Us</p>
              <p className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Support@learnermachine.com</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Reply within 24 hours</p>
            </div>
          </a>

          {/* Response time */}
          <div className="card p-8 text-center flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(194,82,12,0.1)' }}>
              <Clock size={24} style={{ color: 'var(--brand)' }} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Support Hours</p>
              <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Mon – Sat</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>10:00 AM – 7:00 PM IST</p>
            </div>
          </div>

        </div>

        {/* Bottom note */}
        <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          For download issues, include your <strong style={{ color: 'var(--text-secondary)' }}>Order ID</strong> in your message so we can help you faster.
        </p>

      </div>
    </section>
  )
}
