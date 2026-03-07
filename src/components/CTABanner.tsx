import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-12 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          </div>

          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join 5,000+ learners who are already building their skills, side hustles, and income online.
            </p>
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold rounded-xl px-8 py-4 text-base hover:bg-orange-50 transition-colors"
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
