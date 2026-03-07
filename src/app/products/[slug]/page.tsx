import { notFound } from 'next/navigation'
import { db } from '@/lib/supabase'
import { Product } from '@/types'
import { BookOpen, Video, Zap, Package, Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import BuyButton from '@/components/BuyButton'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

async function getProduct(slug: string): Promise<Product | null> {
  const { data } = await db
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return data as Product | null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug)
  if (!product) return {}
  return {
    title: `${product.title} — Learner Machine`,
    description: product.description,
  }
}

const categoryIcon = { ebook: BookOpen, course: Video, training: Zap, bundle: Package }
const categoryLabel = { ebook: 'eBook', course: 'Video Course', training: 'Live Training', bundle: 'Bundle' }

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  const Icon = categoryIcon[product.category]
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null
  const features: string[] = Array.isArray(product.features) ? product.features : []

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/#products" className="inline-flex items-center gap-2 text-sm mb-8 hover:text-brand transition-colors" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Cover */}
          <div>
            <div className={`relative rounded-2xl h-80 bg-gradient-to-br ${product.cover_gradient} flex items-center justify-center mb-6 overflow-hidden`}>
              <span className="text-9xl drop-shadow-lg">{product.cover_emoji}</span>
              {product.badge && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-lg bg-brand text-white text-sm font-bold">{product.badge}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                <Icon size={12} />{categoryLabel[product.category]}
              </span>
              <span className="px-3 py-1 rounded-full border text-xs font-medium" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                {product.language}
              </span>
              {product.pages && (
                <span className="px-3 py-1 rounded-full border text-xs font-medium" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                  {product.pages} pages
                </span>
              )}
              {product.duration && (
                <span className="px-3 py-1 rounded-full border text-xs font-medium" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                  {product.duration}
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {product.title}
            </h1>
            <p className="text-lg font-medium text-brand mb-4">{product.tagline}</p>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              {product.description}
            </p>

            {features.length > 0 && (
              <div className="card p-5 mb-6">
                <h3 className="font-semibold text-sm uppercase tracking-wide mb-4" style={{ color: 'var(--text-muted)' }}>
                  What's Included
                </h3>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <Check size={16} className="text-brand shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display font-bold text-4xl" style={{ color: 'var(--text-primary)' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.original_price && (
                <>
                  <span className="text-xl line-through" style={{ color: 'var(--text-muted)' }}>
                    ₹{product.original_price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            <BuyButton
              productSlug={product.slug}
              productTitle={product.title}
              amount={product.price}
              currency={product.currency}
            />
            <p className="text-xs mt-3 text-center" style={{ color: 'var(--text-muted)' }}>
              Secure payment via Razorpay · UPI, Cards, Net Banking · 30-day guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
