import { db } from '@/lib/supabase'
import Hero from '@/components/Hero'
import ProductsSection from '@/components/ProductsSection'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import CTABanner from '@/components/CTABanner'
import ContentBlocks from '@/components/ContentBlocks'
import { Product } from '@/types'

export const dynamic = 'force-dynamic'

async function getProducts(): Promise<Product[]> {
  const { data } = await db
    .from('products')
    .select('*')
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
  return (data as Product[]) ?? []
}

async function getContentBlocks() {
  const { data } = await db
    .from('content_blocks')
    .select('*')
    .eq('published', true)
    .order('position', { ascending: true })

  if (!data || data.length === 0) return []

  // Generate signed URLs for images
  return await Promise.all(
    data.map(async (block) => {
      if (!block.image_path) return block
      const { data: signed } = await db.storage
        .from('product-files')
        .createSignedUrl(block.image_path, 3600)
      return { ...block, image_url: signed?.signedUrl ?? null }
    })
  )
}

async function getHeroVideoUrl(): Promise<string | null> {
  const { data } = await db
    .from('site_settings')
    .select('value')
    .eq('key', 'hero_video_path')
    .single()

  if (!data?.value) return null

  const { data: signed } = await db.storage
    .from('product-files')
    .createSignedUrl(data.value, 3600)

  return signed?.signedUrl ?? null
}

export default async function HomePage() {
  const [products, heroVideoUrl, contentBlocks] = await Promise.all([
    getProducts(),
    getHeroVideoUrl(),
    getContentBlocks(),
  ])

  return (
    <>
      <Hero videoUrl={heroVideoUrl} />
      <ProductsSection products={products} />
      <ContentBlocks blocks={contentBlocks} />
      <About />
      <Testimonials />
      <CTABanner />
    </>
  )
}
