const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Freelance Content Creator',
    avatar: 'RS',
    avatarColor: 'from-orange-500 to-red-600',
    rating: 5,
    text: "The AI Prompts Mastery ebook completely changed how I work. I now deliver client projects in half the time and charge double. Best ₹800 I've ever spent.",
  },
  {
    name: 'Priya Mehta',
    role: 'Digital Marketer',
    avatar: 'PM',
    avatarColor: 'from-pink-500 to-rose-600',
    rating: 5,
    text: "Side Hustle Blueprint gave me a clear roadmap I was missing. Within 6 weeks of following it, I landed my first paying client. The Hindi explanations made it so easy to understand.",
  },
  {
    name: 'Arjun Kapoor',
    role: 'Software Engineer',
    avatar: 'AK',
    avatarColor: 'from-purple-500 to-indigo-600',
    rating: 5,
    text: "I was skeptical about another AI course, but this one is different. Super practical, no fluff, and the automation workflows I learned are saving me 3+ hours a day.",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-brand uppercase tracking-widest mb-3">Student Reviews</p>
          <h2 className="section-heading mb-4">What Our Students Say</h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Real results from real learners — no fake testimonials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6 flex flex-col gap-5">
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-brand text-base">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
