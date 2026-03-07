import Image from 'next/image'

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
}

function BlockContent({ block }: { block: Block }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-3" style={{ color: 'var(--text-primary)' }}>
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
    </div>
  )
}

function BlockImage({ block }: { block: Block }) {
  if (!block.image_url && !block.image_path) return null
  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
      <Image
        src={block.image_url!}
        alt={block.title}
        fill
        className="object-cover"
      />
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
                {block.subtitle && <p className="text-lg text-white/80">{block.subtitle}</p>}
                {block.body && <p className="mt-4 text-white/70 leading-relaxed">{block.body}</p>}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full" style={{ backgroundColor: 'var(--bg-card)' }}>
            <div className="text-center max-w-2xl px-6">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{block.title}</h2>
              {block.subtitle && <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>{block.subtitle}</p>}
              {block.body && <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{block.body}</p>}
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
