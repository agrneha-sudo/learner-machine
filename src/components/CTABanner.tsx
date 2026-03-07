import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl text-center" style={{ background: 'linear-gradient(135deg, #ea580c 0%, #f97316 40%, #fb923c 100%)' }}>
          {/* Decoration blobs */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="relative px-8 py-16 sm:py-20">
            <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-4">Start Today</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join 5,000+ learners who are already building their skills, side hustles, and income online.
            </p>
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 bg-white font-bold rounded-xl px-8 py-4 text-base transition-all hover:bg-orange-50 hover:scale-[1.02]"
              style={{ color: '#ea580c' }}
            >
              Browse All Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
