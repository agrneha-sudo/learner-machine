import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Product } from '@/types'

export default function ProductsSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null

  return (
    <section id="products" className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label mb-3">OUR PRODUCTS</p>
          <h2 className="section-heading mb-4">
            Digital Products That{' '}
            <span style={{ color: 'var(--brand)' }}>Transform</span> Your Skills
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Instantly downloadable PDF guides and ebooks — crafted in Hindi and English for maximum impact.
          </p>
        </div>

        {/* Product grid */}
        <div id="product-list" className={`grid gap-8 ${products.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : products.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
          {products.map((product) => {
            const rawFeatures = product.features
            const features: string[] = Array.isArray(rawFeatures)
              ? rawFeatures
              : typeof rawFeatures === 'string'
                ? (() => { try { const p = JSON.parse(rawFeatures); return Array.isArray(p) ? p : [] } catch { return [] } })()
                : []
            const discount = product.original_price
              ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
              : null

            return (
              <div key={product.id} className={`card overflow-hidden flex flex-col ${product.featured ? 'ring-2 ring-brand/40' : ''}`}>

                {/* Cover */}
                <div className={`relative h-52 bg-gradient-to-br ${product.cover_gradient} flex items-center justify-center overflow-hidden`}>
                  <span className="text-7xl drop-shadow-lg">{product.cover_emoji}</span>
                  {product.badge && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-lg text-white text-xs font-bold"
                      style={{ backgroundColor: 'var(--brand)' }}>
                      {product.badge}
                    </span>
                  )}
                  {discount && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-emerald-500 text-white text-xs font-bold">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--brand)' }}>
                      {product.category}
                    </span>
                    {product.language && (
                      <span className="text-xs px-2 py-0.5 rounded-full border" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                        {product.language}
                      </span>
                    )}
                    {product.pages && (
                      <span className="text-xs px-2 py-0.5 rounded-full border" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                        {product.pages}p
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                    {product.title}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: 'var(--brand)' }}>{product.tagline}</p>
                  <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {product.description}
                  </p>

                  {/* Features */}
                  {features.length > 0 && (
                    <ul className="space-y-1.5 mb-5">
                      {features.slice(0, 5).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <Check size={14} className="text-brand shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                      {features.length > 5 && (
                        <li className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                          + {features.length - 5} more included
                        </li>
                      )}
                    </ul>
                  )}

                  {/* Price + CTA */}
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="font-display font-bold text-3xl" style={{ color: 'var(--text-primary)' }}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.original_price && (
                        <span className="text-base line-through" style={{ color: 'var(--text-muted)' }}>
                          ₹{product.original_price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <Link href={`/products/${product.slug}`} className="btn-primary w-full">
                      Buy Now <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
