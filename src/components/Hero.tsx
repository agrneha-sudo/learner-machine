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
  const hasMedia     = !!(videoUrl || heroImageUrl)

  const courses = [
    {
      icon:  settings.hero_course_1_icon  || '🤖',
      title: settings.hero_course_1_title || '200 ChatGPT Prompts for Business',
      tag:   settings.hero_course_1_tag   || 'Bestseller',
      desc:  settings.hero_course_1_desc  || 'Copy-paste AI prompts to grow your business and earn faster',
      price: settings.hero_course_1_price || '₹1,499',
    },
    {
      icon:  settings.hero_course_2_icon  || '🚀',
      title: settings.hero_course_2_title || 'AI Side Hustle Blueprint',
      tag:   settings.hero_course_2_tag   || 'New',
      desc:  settings.hero_course_2_desc  || 'Step-by-step system to start earning with AI in 30 days',
      price: settings.hero_course_2_price || '₹999',
    },
  ]

  const stats = [
    { value: settings.hero_stat_1_value || '10K+', label: settings.hero_stat_1_label || 'Students' },
    { value: settings.hero_stat_2_value || '50+',  label: settings.hero_stat_2_label || 'Resources' },
    { value: settings.hero_stat_3_value || '2',    label: settings.hero_stat_3_label || 'Languages' },
    { value: settings.hero_stat_4_value || '4.9',  label: settings.hero_stat_4_label || 'Avg Rating' },
  ]

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#000', minHeight: '90vh' }}>

      {/* Full-bleed background media (image or video) */}
      {hasMedia && (
        <div className="absolute inset-0 z-0">
          {videoUrl ? (
            <video src={videoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover object-center" />
          ) : heroImageUrl ? (
            <Image src={heroImageUrl} alt="Hero" fill className="object-cover object-center" priority />
          ) : null}
          {/* Fade gradient: solid black on left, transparent on right */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, #000000 0%, #000000 35%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0) 100%)'
          }} />
          {/* Top & bottom fade for clean edges */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%)'
          }} />
        </div>
      )}

      {/* No media fallback — subtle dark gradient */}
      {!hasMedia && (
        <div className="absolute inset-0 z-0" style={{
          background: 'radial-gradient(ellipse at 70% 50%, rgba(194,82,12,0.15) 0%, transparent 60%)'
        }} />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 flex items-center" style={{ minHeight: '90vh' }}>
        <div className="w-full lg:w-1/2">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-7"
            style={{ backgroundColor: 'rgba(194,82,12,0.15)', color: 'var(--brand)', border: '1px solid rgba(194,82,12,0.3)' }}>
            <span className="w-2 h-2 rounded-full bg-brand" />
            {badge}
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold leading-[1.1] mb-4" style={{ color: '#ffffff', fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
            {highlightWords(headline1, highlights)}<br />
            {highlightWords(headline2, highlights)}
          </h1>

          {/* Hindi */}
          <p className="font-display text-2xl sm:text-3xl font-bold mb-5" style={{ color: '#f5f5f4' }}>
            {subtitle}
          </p>

          {/* Subtext */}
          <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg" style={{ color: '#a8a29e' }}>
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
                style={{ color: '#ffffff' }}>
                <span className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/40">
                  <span className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] ml-0.5 border-l-white" />
                </span>
                Watch Intro
              </a>
            ) : (
              <span className="inline-flex items-center gap-3 text-base font-semibold" style={{ color: '#a8a29e' }}>
                <span className="w-10 h-10 rounded-full flex items-center justify-center border-2" style={{ borderColor: '#333' }}>
                  <span className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] ml-0.5" style={{ borderLeftColor: '#57534e' }} />
                </span>
                Watch Intro
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-bold" style={{ color: '#ffffff' }}>{s.value}</div>
                <div className="text-sm" style={{ color: '#57534e' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — always shown on desktop */}
        <div className="hidden lg:flex flex-1 items-center justify-end">
          <div className="relative w-full max-w-xl rounded-3xl overflow-hidden p-10"
            style={{
              background: 'radial-gradient(ellipse at 60% 30%, rgba(212,160,23,0.25) 0%, rgba(194,82,12,0.15) 40%, rgba(0,0,0,0) 70%)',
              border: '1px solid rgba(212,160,23,0.2)',
              backdropFilter: 'blur(2px)',
            }}>

            {/* Golden glow blob */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.3) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#d4a017' }}>
                ✦ What You'll Unlock
              </p>

              <div className="space-y-4">
                {courses.map((c, i) => (
                  <div key={i} className="p-5 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl shrink-0">{c.icon}</span>
                        <div>
                          <div className="font-bold text-base text-white leading-snug">{c.title}</div>
                          <span className="inline-block mt-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full"
                            style={{ background: 'rgba(212,160,23,0.2)', color: '#d4a017' }}>{c.tag}</span>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="font-bold text-lg leading-none" style={{ color: '#d4a017' }}>{c.price}</div>
                        <div className="text-xs mt-1" style={{ color: '#57534e' }}>one-time</div>
                      </div>
                    </div>
                    <div className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{c.desc}</div>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="mt-6 flex items-center gap-3 pt-5"
                style={{ borderTop: '1px solid rgba(212,160,23,0.15)' }}>
                <div className="flex -space-x-2">
                  {['🧑', '👩', '👨', '🧑'].map((e, i) => (
                    <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 border-black"
                      style={{ background: '#1a1a1a' }}>{e}</div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{cardTitle}</div>
                  <div className="text-xs" style={{ color: '#d4a017' }}>{cardSubtitle}</div>
                </div>
                <Sparkles size={16} className="ml-auto" style={{ color: '#d4a017' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
