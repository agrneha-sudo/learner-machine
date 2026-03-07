import { BookOpen, Globe, Zap, ShieldCheck } from 'lucide-react'

const features = [
  {
    icon: Globe,
    title: 'Hindi & English',
    description:
      'All content is available in both Hindi and English — so language is never a barrier to learning.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Zap,
    title: 'Actionable & Practical',
    description:
      'No theory overload. Every product gives you step-by-step actions you can start using the same day.',
    color: 'text-brand',
    bg: 'bg-brand/10',
  },
  {
    icon: BookOpen,
    title: 'AI-Focused Learning',
    description:
      'Stay ahead of the curve. Our content leverages the latest AI tools to help you work smarter.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: ShieldCheck,
    title: '30-Day Guarantee',
    description:
      "Not happy with a purchase? We offer a full refund within 30 days — zero questions asked.",
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
]

export default function WhyUs() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-brand uppercase tracking-widest mb-3">Why Learner Machine</p>
          <h2 className="section-heading mb-4">Built for Indian Creators & Hustlers</h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            We create resources that work in the real world — not just in theory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="card p-6">
                <div className={`w-11 h-11 rounded-xl ${f.bg} ${f.color} flex items-center justify-center mb-4`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {f.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
