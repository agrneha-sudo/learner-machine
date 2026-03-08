import Link from 'next/link'
import { ArrowRight, Brain, GraduationCap, BookOpen, TrendingUp, Rocket, Sparkles } from 'lucide-react'

interface HeroProps {
  videoUrl?: string | null
}

export default function Hero({ videoUrl }: HeroProps) {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-7"
              style={{ backgroundColor: '#fde8d8', color: 'var(--brand)', border: '1px solid #f5c9a8' }}>
              <span className="w-2 h-2 rounded-full bg-brand" />
              Available in Hindi &amp; English
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold leading-[1.1] mb-4" style={{ color: 'var(--text-primary)', fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
              Master <span style={{ color: 'var(--brand)' }}>AI</span>, Build<br />
              Your <span style={{ color: 'var(--brand)' }}>Business</span>
            </h1>

            {/* Hindi */}
            <p className="font-display text-2xl sm:text-3xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
              सीखो, बढ़ो, कामयाब बनो
            </p>

            {/* Subtext */}
            <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
              Premium ebooks, courses, and live trainings to help you understand AI, start a side hustle, and grow your business — all in Hindi and English.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/#products" className="btn-primary text-base px-7 py-3.5 rounded-xl">
                Explore Products <ArrowRight size={17} />
              </Link>
              {videoUrl ? (
                <a href={videoUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-base font-semibold transition-colors hover:text-brand"
                  style={{ color: 'var(--text-primary)' }}>
                  <span className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                    style={{ borderColor: 'var(--text-primary)' }}>
                    <span className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] ml-0.5"
                      style={{ borderLeftColor: 'var(--text-primary)' }} />
                  </span>
                  Watch Intro
                </a>
              ) : (
                <span className="inline-flex items-center gap-3 text-base font-semibold"
                  style={{ color: 'var(--text-primary)' }}>
                  <span className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                    style={{ borderColor: 'var(--border)' }}>
                    <span className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] ml-0.5"
                      style={{ borderLeftColor: 'var(--text-muted)' }} />
                  </span>
                  Watch Intro
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {[
                { value: '10K+', label: 'Students' },
                { value: '50+', label: 'Resources' },
                { value: '2', label: 'Languages' },
                { value: '4.9', label: 'Avg Rating' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e1a2e 0%, #2d1f3d 50%, #1a1830 100%)', aspectRatio: '4/3' }}>
              {videoUrl ? (
                <video src={videoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover" />
              ) : (
                <>
                  {/* Decorative glow */}
                  <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 60% 40%, #c2520c 0%, transparent 60%)' }} />

                  {/* Floating icons */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      {[
                        { Icon: GraduationCap, x: '50%', y: '10%', bg: '#1e3a5f', color: '#60a5fa' },
                        { Icon: Brain, x: '10%', y: '40%', bg: '#1f2d1e', color: '#4ade80' },
                        { Icon: TrendingUp, x: '75%', y: '55%', bg: '#2d1f1a', color: '#fb923c' },
                        { Icon: BookOpen, x: '30%', y: '70%', bg: '#2a1f10', color: '#fbbf24' },
                        { Icon: Rocket, x: '62%', y: '20%', bg: '#1f1a2d', color: '#a78bfa' },
                      ].map(({ Icon, x, y, bg, color }, i) => (
                        <div key={i} className="absolute w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                          style={{ left: x, top: y, transform: 'translate(-50%,-50%)', backgroundColor: bg }}>
                          <Icon size={22} style={{ color }} />
                        </div>
                      ))}
                      {/* Center glow */}
                      <div className="absolute inset-0 m-auto w-20 h-20 rounded-full opacity-40"
                        style={{ background: 'radial-gradient(circle, #c2520c, transparent)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                    </div>
                  </div>

                  {/* Bottom card */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl p-4 flex items-center gap-3"
                    style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
                    <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                      <Sparkles size={18} style={{ color: 'var(--brand)' }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: '#1c1917' }}>Start Learning Today</div>
                      <div className="text-xs" style={{ color: '#57534e' }}>Join 10,000+ learners across India</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
