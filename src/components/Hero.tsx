import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

interface HeroProps {
  videoUrl?: string | null
}

export default function Hero({ videoUrl }: HeroProps) {
  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center px-4 sm:px-6">
      {/* Background */}
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
          <div className="absolute inset-0 bg-black/65" />
        </>
      ) : (
        <div className="absolute inset-0 pointer-events-none">
          {/* Dark base */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)' }} />
          {/* Orange glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-25" style={{ background: 'radial-gradient(ellipse at center, #f97316 0%, transparent 70%)' }} />
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
      )}

      <div className="relative w-full max-w-5xl mx-auto text-center py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8" style={{ borderColor: 'rgba(249,115,22,0.3)', color: 'rgba(255,255,255,0.75)', backgroundColor: 'rgba(249,115,22,0.08)' }}>
          <Sparkles size={14} className="text-brand" />
          AI, Business & Side Hustle — Hindi & English में
        </div>

        {/* Hindi headline */}
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-3 leading-[1.05] text-white">
          सीखो.{' '}
          <span className="text-brand">बनाओ.</span>{' '}
          कमाओ.
        </h1>

        {/* English subtitle */}
        <p className="font-display text-2xl sm:text-3xl font-medium mb-7 tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Learn.&nbsp;&nbsp;Build.&nbsp;&nbsp;Earn.
        </p>

        {/* Subheading */}
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
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
            style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff' }}
          >
            Learn More
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-12">
          {[
            { number: '5,000+', label: 'Students' },
            { number: '6', label: 'Products' },
            { number: '4.9★', label: 'Avg Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-brand">{stat.number}</div>
              <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
