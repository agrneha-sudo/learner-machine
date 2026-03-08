import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center" style={{
        background: 'linear-gradient(135deg, #fdf0e8 0%, #faf5f0 50%, #fde8d8 100%)',
        borderRadius: '2rem',
        padding: '5rem 2rem',
      }}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{ backgroundColor: 'rgba(255,255,255,0.7)', color: 'var(--brand)', border: '1px solid #f5c9a8' }}>
          <Sparkles size={14} />
          Limited Time Offer
        </div>

        <h2 className="font-display font-bold leading-tight mb-4" style={{ color: 'var(--text-primary)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Ready to Start Your{' '}
          <span style={{ color: 'var(--brand)' }}>Digital Journey</span>?
        </h2>

        <p className="text-base sm:text-lg max-w-xl mx-auto mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Join thousands of learners who are already building their future with AI, entrepreneurship, and smart side hustles. Your transformation starts with one click.
        </p>

        <p className="font-medium mb-8" style={{ color: 'var(--brand)' }}>
          अपनी डिजिटल यात्रा आज से शुरू करें
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link href="/#products" className="btn-primary text-base px-8 py-4 rounded-xl">
            Get Started Now <ArrowRight size={17} />
          </Link>
          <Link href="/#product-list" className="btn-secondary text-base px-8 py-4 rounded-xl">
            View All Products
          </Link>
        </div>

        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Instant access after purchase. 30-day money back guarantee.
        </p>
      </div>
    </section>
  )
}
