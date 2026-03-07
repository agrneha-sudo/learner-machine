import Link from 'next/link'
import { ArrowRight, BookOpen, Video, Zap, Package } from 'lucide-react'
import { Product } from '@/types'

const categoryIcon = {
  ebook: BookOpen,
  course: Video,
  training: Zap,
  bundle: Package,
}

const categoryLabel = {
  ebook: 'eBook',
  course: 'Course',
  training: 'Training',
  bundle: 'Bundle',
}

export default function ProductCard({ product }: { product: Product }) {
  const Icon = categoryIcon[product.category]
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className={`card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-brand/10 hover:-translate-y-1 ${product.featured ? 'ring-1 ring-brand/30' : ''}`}>
        {/* Cover */}
        <div className={`relative h-44 bg-gradient-to-br ${product.cover_gradient} flex items-center justify-center`}>
          <span className="text-6xl drop-shadow-lg">{product.cover_emoji}</span>

          <div className="absolute top-3 left-3 flex gap-2">
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/30 backdrop-blur-sm text-white text-xs font-medium">
              <Icon size={11} />
              {categoryLabel[product.category]}
            </span>
            <span className="px-2 py-1 rounded-lg bg-black/30 backdrop-blur-sm text-white text-xs font-medium">
              {product.language}
            </span>
          </div>

          {product.badge && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 rounded-lg bg-brand text-white text-xs font-bold">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display font-bold text-lg mb-1 group-hover:text-brand transition-colors" style={{ color: 'var(--text-primary)' }}>
            {product.title}
          </h3>
          <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
            {product.tagline}
          </p>

          {(product.pages || product.duration) && (
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              {product.pages ? `${product.pages} pages` : product.duration}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.original_price && (
                <span className="text-sm line-through" style={{ color: 'var(--text-muted)' }}>
                  ₹{product.original_price.toLocaleString('en-IN')}
                </span>
              )}
              {discount && (
                <span className="text-xs font-semibold text-emerald-500">-{discount}%</span>
              )}
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-2 transition-all">
              Buy Now <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
