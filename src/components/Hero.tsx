import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Brain, GraduationCap, BookOpen, TrendingUp, Rocket, Sparkles } from 'lucide-react'

interface HeroProps {
  videoUrl?: string | null
  settings?: Record<string, string>
}

function highlightWords(text: string, words: string[]) {
  if (!words.length) return <>{text}</>
  const regex = new RegExp(`(${words.map(w => w.trim()).filter(Boolean).join('|')})`, 'g')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        words.map(w => w.trim()).includes(part)
          ? <span key={i} style={{ color: 'var(--brand)' }}>{part}</span>
          : <span key={i}>{part}</span>
      )}
    </>
  )
}

export default function Hero({ videoUrl, settings = {} }: HeroProps) {
  const heroImageUrl = settings.hero_image_url || null
  const badge        = settings.hero_badge        || 'Available in Hindi & English'
  const headline1    = settings.hero_headline_1   || 'Master AI, Build'
  const headline2    = settings.hero_headline_2   || 'Your Business'
  const highlights   = (settings.hero_highlight_words || 'AI,Business').split(',')
  const subtitle     = settings.hero_subtitle     || 'सीखो, बढ़ो, कामयाब बनो'
  const description  = settings.hero_description  || 'Premium PDF guides and ebooks to help you understand AI, start a side hustle, and grow your business — all in Hindi and English.'
  const ctaText      = settings.hero_cta_text     || 'Explore Products'
  const cardTitle    = settings.hero_card_title   || 'Start Learning Today'
  const cardSubtitle = settings.hero_card_subtitle || 'Join 10,000+ learners across India'

  const stats = [
    { value: settings.hero_stat_1_value || '10K+', label: settings.hero_stat_1_label || 'Students' },
    { value: settings.hero_stat_2_value || '50+',  label: settings.hero_stat_2_label || 'Resources' },
    { value: settings.hero_stat_3_value || '2',    label: settings.hero_stat_3_label || 'Languages' },
    { value: settings.hero_stat_4_value || '4.9',  label: settings.hero_stat_4_label || 'Avg Rating' },
  ]

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
              {badge}
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold leading-[1.1] mb-4" style={{ color: 'var(--text-primary)', fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
              {highlightWords(headline1, highlights)}<br />
              {highlightWords(headline2, highlights)}
            </h1>

            {/* Hindi */}
            <p className="font-display text-2xl sm:text-3xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
              {subtitle}
            </p>

            {/* Subtext */}
            <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
              {description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/#products" className="btn-primary text-base px-7 py-3.5 rounded-xl">
                {ctaText} <ArrowRight size={17} />
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
              {stats.map((s) => (
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
              ) : heroImageUrl ? (
                <Image src={heroImageUrl} alt="Hero" fill className="object-cover" />
              ) : (
                <>
                  <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 60% 40%, #c2520c 0%, transparent 60%)' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      {[
                        { Icon: GraduationCap, x: '50%', y: '10%', bg: '#1e3a5f', color: '#60a5fa' },
                        { Icon: Brain,         x: '10%', y: '40%', bg: '#1f2d1e', color: '#4ade80' },
                        { Icon: TrendingUp,    x: '75%', y: '55%', bg: '#2d1f1a', color: '#fb923c' },
                        { Icon: BookOpen,      x: '30%', y: '70%', bg: '#2a1f10', color: '#fbbf24' },
                        { Icon: Rocket,        x: '62%', y: '20%', bg: '#1f1a2d', color: '#a78bfa' },
                      ].map(({ Icon, x, y, bg, color }, i) => (
                        <div key={i} className="absolute w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                          style={{ left: x, top: y, transform: 'translate(-50%,-50%)', backgroundColor: bg }}>
                          <Icon size={22} style={{ color }} />
                        </div>
                      ))}
                      <div className="absolute inset-0 m-auto w-20 h-20 rounded-full opacity-40"
                        style={{ background: 'radial-gradient(circle, #c2520c, transparent)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl p-4 flex items-center gap-3"
                    style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
                    <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                      <Sparkles size={18} style={{ color: 'var(--brand)' }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: '#1c1917' }}>{cardTitle}</div>
                      <div className="text-xs" style={{ color: '#57534e' }}>{cardSubtitle}</div>
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
