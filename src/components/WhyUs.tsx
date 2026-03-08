import { Globe, Zap, IndianRupee, Shield, Headphones, RefreshCw } from 'lucide-react'

const features = [
  {
    icon: Globe,
    title: 'Bilingual Content',
    description: 'All products are available in both Hindi and English, so language is never a barrier to your success.',
  },
  {
    icon: Zap,
    title: 'Practical & Actionable',
    description: 'No fluff theory. Every resource includes real-world examples, templates, and step-by-step action plans.',
  },
  {
    icon: IndianRupee,
    title: 'Affordable Pricing',
    description: 'Premium quality at prices that respect your budget. Invest in yourself without breaking the bank.',
  },
  {
    icon: Shield,
    title: 'Beginner Friendly',
    description: 'Everything is explained from scratch. No jargon, no assumptions — just clear, simple learning.',
  },
  {
    icon: Headphones,
    title: 'Community Support',
    description: 'Join a vibrant community of learners and entrepreneurs. Get your questions answered and stay motivated.',
  },
  {
    icon: RefreshCw,
    title: 'Lifetime Updates',
    description: 'Buy once, get updates forever. As AI and business evolve, so do our resources — at no extra cost.',
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 px-4 sm:px-6 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label mb-3">WHY LEARNER MACHINE</p>
          <h2 className="section-heading mb-4">
            Built for <span style={{ color: 'var(--brand)' }}>Indian Learners</span>
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            We understand what Indian professionals and aspiring entrepreneurs need to succeed in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#fde8d8' }}>
                  <Icon size={19} style={{ color: 'var(--brand)' }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base mb-1.5" style={{ color: 'var(--text-primary)' }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {f.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
