import { db } from '@/lib/supabase'
import Hero from '@/components/Hero'
import ProductsSection from '@/components/ProductsSection'
import Topics from '@/components/Topics'
import WhyUs from '@/components/WhyUs'
import About from '@/components/About'
import ContentBlocks from '@/components/ContentBlocks'
import Testimonials from '@/components/Testimonials'
import CTABanner from '@/components/CTABanner'
import Contact from '@/components/Contact'
import { Product } from '@/types'

export const dynamic = 'force-dynamic'

async function getHeroSettings(): Promise<Record<string, string>> {
  const { data } = await db.from('site_settings').select('key, value')
  const settings = Object.fromEntries((data ?? []).map(r => [r.key, r.value ?? '']))
  if (settings.hero_image_path) {
    const { data: signed } = await db.storage.from('product-files').createSignedUrl(settings.hero_image_path, 3600)
    if (signed?.signedUrl) settings.hero_image_url = signed.signedUrl
  }
  return settings
}

async function getProducts(): Promise<Product[]> {
  const { data } = await db
    .from('products')
    .select('*')
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  const products = (data as Product[]) ?? []

  return await Promise.all(
    products.map(async (p) => {
      if (!p.cover_image_path) return p
      const { data: signed } = await db.storage
        .from('product-files')
        .createSignedUrl(p.cover_image_path, 3600)
      return { ...p, cover_image_url: signed?.signedUrl ?? null }
    })
  )
}

async function getContentBlocks() {
  const { data } = await db
    .from('content_blocks')
    .select('*')
    .eq('published', true)
    .order('position', { ascending: true })

  if (!data || data.length === 0) return []

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
  const [products, heroVideoUrl, contentBlocks, heroSettings] = await Promise.all([
    getProducts(),
    getHeroVideoUrl(),
    getContentBlocks(),
    getHeroSettings(),
  ])

  return (
    <>
      <Hero videoUrl={heroVideoUrl} settings={heroSettings} />
      <ProductsSection products={products} />
      <Topics />
      <WhyUs />
      <About />
      <ContentBlocks blocks={contentBlocks} />
      <Testimonials />
      <CTABanner />
      <Contact />
    </>
  )
}
