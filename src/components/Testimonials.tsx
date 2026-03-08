const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Freelancer, Delhi',
    initials: 'PS',
    rating: 5,
    text: 'The AI for Beginners ebook changed everything for me. I went from being scared of AI to using it daily in my freelance work. The Hindi explanations made it so easy!',
  },
  {
    name: 'Rahul Verma',
    role: 'Small Business Owner, Pune',
    initials: 'RV',
    rating: 5,
    text: 'I started my online business using the side hustle course. The step-by-step approach and practical templates saved me months of guesswork.',
  },
  {
    name: 'Anita Gupta',
    role: 'College Student, Jaipur',
    initials: 'AG',
    rating: 5,
    text: 'Affordable, practical, and in Hindi — exactly what I needed. The live training sessions gave me confidence to start earning while still in college.',
  },
  {
    name: 'Vikram Singh',
    role: 'IT Professional, Bangalore',
    initials: 'VS',
    rating: 5,
    text: 'The entrepreneurship course helped me plan my startup alongside my job. The community support is incredible — always someone to help!',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label mb-3">WHAT OUR LEARNERS SAY</p>
          <h2 className="section-heading mb-4">
            Trusted by <span style={{ color: 'var(--brand)' }}>10,000+</span> Learners
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Real stories from real people who transformed their careers with our resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-7 flex flex-col gap-5">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-lg" style={{ color: 'var(--brand)' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-base leading-relaxed italic flex-1" style={{ color: 'var(--text-secondary)' }}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: '#fde8d8', color: 'var(--brand)' }}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{t.name}</div>
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
