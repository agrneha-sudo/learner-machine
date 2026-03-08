import Link from 'next/link'
import { ArrowRight, BookOpen, GraduationCap, Users } from 'lucide-react'
import { Product } from '@/types'

const categories = [
  {
    badge: 'Most Popular',
    icon: BookOpen,
    title: 'eBooks',
    hindi: 'ई-बुक्स',
    description: 'In-depth guides on AI fundamentals, business strategies, and side hustle blueprints. Download instantly and learn at your own pace.',
    price: '₹199',
    bgGradient: 'linear-gradient(135deg, #1e1a2e 0%, #2d1f10 100%)',
    glowColor: '#c2520c',
  },
  {
    badge: 'Best Value',
    icon: GraduationCap,
    title: 'Courses',
    hindi: 'कोर्सेज़',
    description: 'Step-by-step video courses with real-world projects. Master AI tools, digital marketing, and entrepreneurship fundamentals.',
    price: '₹499',
    bgGradient: 'linear-gradient(135deg, #1a1830 0%, #2d1f3d 100%)',
    glowColor: '#7c3aed',
  },
  {
    badge: 'Premium',
    icon: Users,
    title: 'Live Trainings',
    hindi: 'लाइव ट्रेनिंग',
    description: 'Interactive workshops with Q&A sessions. Get personalized guidance, accountability, and a community of like-minded learners.',
    price: '₹999',
    bgGradient: 'linear-gradient(135deg, #1a1830 0%, #3b1f5e 100%)',
    glowColor: '#a855f7',
  },
]

export default function ProductsSection({ products }: { products: Product[] }) {
  return (
    <section id="products" className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label mb-3">WHAT WE OFFER</p>
          <h2 className="section-heading mb-4">
            Digital Products That{' '}
            <span style={{ color: 'var(--brand)' }}>Transform</span> Your Skills
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Choose from ebooks, video courses, and live training sessions — all crafted in Hindi and English for maximum impact.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <div key={cat.title} className="card overflow-hidden flex flex-col">
                {/* Dark image area */}
                <div className="relative h-52 flex items-center justify-center overflow-hidden"
                  style={{ background: cat.bgGradient }}>
                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: 'var(--brand)' }}>
                    {cat.badge}
                  </div>
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-20"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${cat.glowColor}, transparent 70%)` }} />
                  <Icon size={64} className="opacity-60" style={{ color: cat.glowColor }} />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: '#fde8d8' }}>
                      <Icon size={18} style={{ color: 'var(--brand)' }} />
                    </div>
                    <div>
                      <div className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                        {cat.title}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--brand)' }}>{cat.hindi}</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      From <span className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{cat.price}</span>
                    </span>
                    <Link href="/#product-list" className="btn-primary text-sm py-2 px-4 rounded-xl">
                      Browse <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Actual products from DB */}
        {products.length > 0 && (
          <div id="product-list">
            <h3 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              All Products
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                  <div className={`card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${product.featured ? 'ring-1 ring-brand/30' : ''}`}>
                    <div className={`relative h-40 bg-gradient-to-br ${product.cover_gradient} flex items-center justify-center`}>
                      <span className="text-5xl drop-shadow-lg">{product.cover_emoji}</span>
                      {product.badge && (
                        <span className="absolute top-3 right-3 px-2 py-1 rounded-lg text-white text-xs font-bold" style={{ backgroundColor: 'var(--brand)' }}>
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-display font-bold text-base mb-1 group-hover:text-brand transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {product.title}
                      </h4>
                      <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{product.tagline}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-semibold text-brand">Buy Now →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
