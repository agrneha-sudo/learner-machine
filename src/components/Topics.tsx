import { Brain, Briefcase, Rocket, TrendingUp } from 'lucide-react'

const topics = [
  {
    icon: Brain,
    title: 'AI for Beginners',
    hindi: 'शुरुआती लोगों के लिए AI',
    description: 'Demystifying artificial intelligence with simple, practical lessons. Learn ChatGPT, AI tools, prompt engineering, and automation — no coding required.',
    iconBg: '#0f1e3a',
    iconColor: '#60a5fa',
    highlight: false,
  },
  {
    icon: Briefcase,
    title: 'Small Business',
    hindi: 'छोटा बिज़नेस',
    description: 'Everything you need to start and manage a small business in India. From GST and compliance to marketing and customer acquisition strategies.',
    iconBg: '#0a1f14',
    iconColor: '#34d399',
    highlight: false,
  },
  {
    icon: Rocket,
    title: 'Entrepreneurship',
    hindi: 'उद्यमिता',
    description: 'Build a founder mindset. Learn idea validation, business planning, fundraising basics, and scaling strategies from real entrepreneurs.',
    iconBg: '#2a1005',
    iconColor: '#fb923c',
    highlight: false,
  },
  {
    icon: TrendingUp,
    title: 'Side Hustle',
    hindi: 'साइड हसल',
    description: 'Turn your skills into income. Discover proven side hustle ideas, freelancing tips, and passive income strategies that work in India.',
    iconBg: '#2a0a1a',
    iconColor: '#f472b6',
    highlight: false,
  },
]

export default function Topics() {
  return (
    <section id="topics" className="py-20 px-4 sm:px-6 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label mb-3">TOPICS WE COVER</p>
          <h2 className="section-heading mb-4">
            Learn What Matters for{' '}
            <span style={{ color: 'var(--brand)' }}>Your Growth</span>
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Focused content in four high-impact areas designed to take you from beginner to confident practitioner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {topics.map((t) => {
            const Icon = t.icon
            return (
              <div key={t.title} className="card p-7"
                style={{}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: t.iconBg }}>
                  <Icon size={22} style={{ color: t.iconColor }} />
                </div>
                <h3 className="font-display font-bold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                  {t.title}
                </h3>
                <p className="text-sm font-medium mb-3" style={{ color: t.iconColor }}>
                  {t.hindi}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
