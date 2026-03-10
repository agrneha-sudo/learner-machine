import Link from 'next/link'
import { Sparkles, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f0f0f', color: '#d4d0cc' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#c2520c' }}>
                <Sparkles size={18} className="text-white" />
              </span>
              <span className="font-display font-bold text-lg text-white">Learner Machine</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#a8a29e' }}>
              Your machine for learning. Master AI, build businesses, and create income streams — in Hindi and English.
            </p>
            <p className="text-sm font-medium" style={{ color: '#a8a29e' }}>सीखो. बढ़ो. कमाओ.</p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5 text-white">PRODUCTS</h4>
            <ul className="space-y-3">
              {['eBooks', 'Courses', 'Live Trainings', 'Bundles'].map((item) => (
                <li key={item}>
                  <Link href="/#products" className="text-sm transition-colors hover:text-white" style={{ color: '#a8a29e' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5 text-white">TOPICS</h4>
            <ul className="space-y-3">
              {['AI for Beginners', 'Small Business', 'Entrepreneurship', 'Side Hustle'].map((item) => (
                <li key={item}>
                  <Link href="/#topics" className="text-sm transition-colors hover:text-white" style={{ color: '#a8a29e' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5 text-white">SUPPORT</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+918920621043" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: '#a8a29e' }}>
                  <Phone size={13} />
                  +91 89206 21043
                </a>
              </li>
              <li>
                <a href="mailto:Support@learnermachine.com" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: '#a8a29e' }}>
                  <Mail size={13} />
                  Support@learnermachine.com
                </a>
              </li>
              {[
                { label: 'Contact Us', href: '/contact' },
                { label: 'Terms & Conditions', href: '/terms' },
                { label: 'Refund Policy', href: '/refund' },
                { label: 'Privacy Policy', href: '/privacy' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: '#a8a29e' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: '#2a2a2a' }}>
          <p className="text-sm" style={{ color: '#57534e' }}>
            © {new Date().getFullYear()} Learner Machine. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: 'Terms', href: '/terms' },
              { label: 'Privacy', href: '/privacy' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: '#57534e' }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
