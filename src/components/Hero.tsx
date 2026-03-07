import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-28 px-4 sm:px-6">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8"
          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-card)' }}>
          <Sparkles size={14} className="text-brand" />
          AI, Business & Side Hustle — Hindi & English में
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 leading-[1.1]"
          style={{ color: 'var(--text-primary)' }}>
          सीखो.{' '}
          <span className="text-brand">बनाओ.</span>{' '}
          कमाओ.
        </h1>

        {/* English translation line */}
        <p className="font-display text-xl sm:text-2xl font-medium mb-6 tracking-wide"
          style={{ color: 'var(--text-muted)' }}>
          Learn.&nbsp; Build.&nbsp; Earn.
        </p>

        {/* Subheading */}
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}>
          AI, business और side hustle के लिए practical ebooks, video courses और live trainings —
          real founders से, Hindi & English में।
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/#products" className="btn-primary text-base px-8 py-4">
            Explore Products
            <ArrowRight size={18} />
          </Link>
          <Link href="/#about" className="btn-secondary text-base px-8 py-4">
            Learn More
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8">
          {[
            { number: '5,000+', label: 'Students' },
            { number: '6', label: 'Products' },
            { number: '4.9★', label: 'Avg Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl font-bold text-brand">{stat.number}</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
