import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

interface HeroProps {
  videoUrl?: string | null
}

export default function Hero({ videoUrl }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-20 pb-28 px-4 sm:px-6">
      {/* Background — video if available, else gradient glow */}
      {videoUrl ? (
        <>
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay so text stays readable */}
          <div className="absolute inset-0 bg-black/60" />
        </>
      ) : (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand/10 rounded-full blur-[120px]" />
        </div>
      )}

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8"
          style={{
            borderColor: videoUrl ? 'rgba(255,255,255,0.2)' : 'var(--border)',
            color: videoUrl ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)',
            backgroundColor: videoUrl ? 'rgba(255,255,255,0.1)' : 'var(--bg-card)',
          }}
        >
          <Sparkles size={14} className="text-brand" />
          AI, Business & Side Hustle — Hindi & English में
        </div>

        {/* Headline */}
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 leading-[1.1]"
          style={{ color: videoUrl ? '#ffffff' : 'var(--text-primary)' }}
        >
          सीखो.{' '}
          <span className="text-brand">बनाओ.</span>{' '}
          कमाओ.
        </h1>

        {/* English subtitle */}
        <p
          className="font-display text-xl sm:text-2xl font-medium mb-6 tracking-wide"
          style={{ color: videoUrl ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)' }}
        >
          Learn.&nbsp; Build.&nbsp; Earn.
        </p>

        {/* Subheading */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: videoUrl ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)' }}
        >
          AI, business और side hustle के लिए practical ebooks, video courses और live trainings —
          real founders से, Hindi & English में।
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/#products" className="btn-primary text-base px-8 py-4">
            Explore Products
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/#about"
            className="text-base px-8 py-4 inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02]"
            style={{
              backgroundColor: videoUrl ? 'rgba(255,255,255,0.15)' : 'var(--bg-card)',
              border: `1px solid ${videoUrl ? 'rgba(255,255,255,0.25)' : 'var(--border)'}`,
              color: videoUrl ? '#ffffff' : 'var(--text-primary)',
            }}
          >
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
              <div className="text-sm" style={{ color: videoUrl ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
