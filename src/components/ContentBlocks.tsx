import Image from 'next/image'
import Link from 'next/link'
import { FileText } from 'lucide-react'

interface Block {
  id: string
  title: string
  subtitle?: string
  body?: string
  image_path?: string
  image_url?: string
  layout: string
  position: number
  published: boolean
  price?: number | null
  original_price?: number | null
  pdf_path?: string | null
  cta_label?: string | null
  cta_url?: string | null
}

function PriceDisplay({ block }: { block: Block }) {
  if (!block.price) return null
  const discount = block.original_price
    ? Math.round(((block.original_price - block.price) / block.original_price) * 100)
    : null

  return (
    <div className="flex items-baseline gap-3 mt-4">
      <span className="font-display font-bold text-3xl" style={{ color: 'var(--text-primary)' }}>
        ₹{block.price.toLocaleString('en-IN')}
      </span>
      {block.original_price && (
        <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>
          ₹{block.original_price.toLocaleString('en-IN')}
        </span>
      )}
      {discount && discount > 0 && (
        <span className="text-sm font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
          {discount}% OFF
        </span>
      )}
    </div>
  )
}

function CtaButton({ block }: { block: Block }) {
  if (!block.cta_url && !block.cta_label) return null
  const href = block.cta_url || '#'
  return (
    <div className="flex flex-wrap items-center gap-3 mt-5">
      <Link href={href} className="btn-primary">
        {block.cta_label || 'Buy Now'} →
      </Link>
      {block.pdf_path && (
        <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-muted)' }}>
          <FileText size={14} style={{ color: 'var(--brand)' }} />
          Instant PDF download
        </span>
      )}
    </div>
  )
}

function BlockContent({ block }: { block: Block }) {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-2" style={{ color: 'var(--text-primary)' }}>
          {block.title}
        </h2>
        {block.subtitle && (
          <p className="text-lg font-medium" style={{ color: 'var(--brand)' }}>
            {block.subtitle}
          </p>
        )}
      </div>
      {block.body && (
        <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
          {block.body}
        </p>
      )}
      <PriceDisplay block={block} />
      <CtaButton block={block} />
    </div>
  )
}

function BlockImage({ block }: { block: Block }) {
  if (!block.image_url && !block.image_path) return null
  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
      <Image src={block.image_url!} alt={block.title} fill className="object-cover" />
    </div>
  )
}

function ContentBlock({ block }: { block: Block }) {
  const hasImage = !!(block.image_url || block.image_path)

  if (block.layout === 'full-width') {
    return (
      <section className="relative w-full h-80 md:h-[500px] overflow-hidden">
        {hasImage ? (
          <>
            <Image src={block.image_url!} alt={block.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center max-w-2xl px-6">
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">{block.title}</h2>
                {block.subtitle && <p className="text-lg text-white/80 mb-2">{block.subtitle}</p>}
                {block.body && <p className="mt-2 text-white/70 leading-relaxed">{block.body}</p>}
                {block.price && (
                  <p className="mt-4 text-3xl font-bold text-white">
                    ₹{block.price.toLocaleString('en-IN')}
                    {block.original_price && <span className="text-lg line-through text-white/50 ml-3">₹{block.original_price.toLocaleString('en-IN')}</span>}
                  </p>
                )}
                {block.cta_url && (
                  <Link href={block.cta_url} className="btn-primary mt-5 inline-flex">
                    {block.cta_label || 'Buy Now'} →
                  </Link>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full px-6" style={{ backgroundColor: 'var(--bg-card)' }}>
            <div className="text-center max-w-2xl">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{block.title}</h2>
              {block.subtitle && <p className="text-lg mb-2" style={{ color: 'var(--brand)' }}>{block.subtitle}</p>}
              {block.body && <p className="mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{block.body}</p>}
              <PriceDisplay block={block} />
              <CtaButton block={block} />
            </div>
          </div>
        )}
      </section>
    )
  }

  if (block.layout === 'image-top') {
    return (
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        {hasImage && <BlockImage block={block} />}
        <BlockContent block={block} />
      </section>
    )
  }

  const isImageLeft = block.layout === 'image-left'

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className={`grid md:grid-cols-2 gap-12 items-center ${isImageLeft ? '' : 'md:[&>*:first-child]:order-2'}`}>
        <BlockContent block={block} />
        {hasImage && <BlockImage block={block} />}
      </div>
    </section>
  )
}

export default function ContentBlocks({ blocks }: { blocks: Block[] }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
      {blocks.map(block => (
        <ContentBlock key={block.id} block={block} />
      ))}
    </div>
  )
}
