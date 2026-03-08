export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label mb-3">OUR STORY</p>
          <h2 className="section-heading mb-2">
            About <span style={{ color: 'var(--brand)' }}>LearnerMachine</span>
          </h2>
        </div>

        <div className="space-y-5 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <p>
            LearnerMachine is an initiative built by startup founders who believe that real learning
            should come from people who are actually building businesses.
          </p>
          <p>
            Today, most courses around AI, digital marketing, and online business are taught by trainers
            or educators who have never built a real company themselves. While their knowledge may be
            theoretical, it often lacks the practical insights that come only from launching products,
            acquiring customers, managing teams, and navigating the challenges of entrepreneurship.
          </p>

          {/* Blockquote */}
          <blockquote className="pl-5 py-1 border-l-4 my-6" style={{ borderColor: 'var(--brand)' }}>
            <p className="font-display font-bold text-lg italic" style={{ color: 'var(--text-primary)' }}>
              LearnerMachine was created to change that.
            </p>
          </blockquote>

          <p>
            The platform is built by founders who run and grow real companies, actively using AI,
            automation, and digital marketing in their everyday operations. The insights shared here are
            not academic frameworks — they are practical lessons drawn directly from real-world business experience.
          </p>
        </div>

        {/* Goal box */}
        <div className="mt-8 p-6 rounded-2xl" style={{ backgroundColor: '#fde8d8' }}>
          <p className="section-label mb-3">OUR GOAL IS SIMPLE</p>
          <p className="text-base leading-relaxed font-medium" style={{ color: 'var(--text-primary)' }}>
            To help students, professionals, and aspiring entrepreneurs understand how modern tools like AI
            and digital marketing can be used to build opportunities, launch businesses, and create real
            value in the digital economy.
          </p>
        </div>
      </div>
    </section>
  )
}
