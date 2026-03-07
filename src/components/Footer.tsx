import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t py-12 px-4 sm:px-6" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-sm">
                LM
              </span>
              <span className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                Learner Machine
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              AI, Business & Side Hustle resources in Hindi & English. Learn, build, and earn online.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Products</h4>
            <ul className="space-y-2">
              {['eBooks', 'Courses', 'Trainings', 'Bundles'].map((item) => (
                <li key={item}>
                  <Link href="/#products" className="text-sm hover:text-brand transition-colors" style={{ color: 'var(--text-secondary)' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Legal</h4>
            <ul className="space-y-2">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Refund Policy', href: '/refund' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm hover:text-brand transition-colors" style={{ color: 'var(--text-secondary)' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Learner Machine. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Payments secured by{' '}
            <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Razorpay</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
