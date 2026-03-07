import { Building2, Users, Lightbulb } from 'lucide-react'

const pillars = [
  {
    icon: Building2,
    title: 'Built by Real Founders',
    description: 'Every insight comes from people actively running and growing real companies — not trainers reading from textbooks.',
    color: 'text-brand',
    bg: 'bg-brand/10',
  },
  {
    icon: Lightbulb,
    title: 'Practical, Not Academic',
    description: 'No frameworks from a classroom. What we teach is drawn directly from launching products, acquiring customers, and managing teams.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Users,
    title: 'For Builders & Hustlers',
    description: 'Whether you are a student, professional, or aspiring entrepreneur — our goal is to help you create real value in the digital economy.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div>
            <p className="text-sm font-semibold text-brand uppercase tracking-widest mb-4">
              LearnerMachine के बारे में
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-6" style={{ color: 'var(--text-primary)' }}>
              उनसे सीखो जो{' '}
              <span className="text-brand">खुद बना रहे हैं</span>
            </h2>

            <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                LearnerMachine is an initiative built by startup founders who believe that real learning
                should come from people who are actually building businesses.
              </p>
              <p>
                Today, most courses around AI, digital marketing, and online business are taught by
                trainers who have never built a real company themselves. While their knowledge may be
                theoretical, it often lacks the practical insights that come only from launching products,
                acquiring customers, managing teams, and navigating the challenges of entrepreneurship.
              </p>
              <p>
                The platform is built by founders who run and grow real companies, actively using AI,
                automation, and digital marketing in their everyday operations. The insights shared here
                are not academic frameworks — they are practical lessons drawn directly from real-world
                business experience.
              </p>
            </div>

            {/* Goal callout */}
            <div className="mt-8 p-5 rounded-2xl border-l-4 border-brand" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <p className="text-sm font-semibold text-brand mb-1 uppercase tracking-wide">Our Goal</p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                To help students, professionals, and aspiring entrepreneurs understand how modern tools
                like AI and digital marketing can be used to build opportunities, launch businesses, and
                create real value in the digital economy.
              </p>
              <p className="mt-3 font-medium" style={{ color: 'var(--text-primary)' }}>
                At LearnerMachine, the focus is not just on learning concepts —
                it&apos;s about learning <span className="text-brand">how things actually work</span> in the real world.
              </p>
            </div>
          </div>

          {/* Right — Pillars */}
          <div className="space-y-4">
            {pillars.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="card p-6 flex gap-5">
                  <div className={`w-11 h-11 rounded-xl ${p.bg} ${p.color} flex items-center justify-center shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1.5" style={{ color: 'var(--text-primary)' }}>
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {p.description}
                    </p>
                  </div>
                </div>
              )
            })}

            {/* Stats strip */}
            <div className="card p-6 grid grid-cols-3 divide-x" style={{ divideColor: 'var(--border)' }}>
              {[
                { value: '5,000+', label: 'Students' },
                { value: '100%', label: 'Practical' },
                { value: '4.9★', label: 'Rating' },
              ].map((s) => (
                <div key={s.label} className="text-center px-4 first:pl-0 last:pr-0">
                  <div className="font-display text-2xl font-bold text-brand">{s.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
