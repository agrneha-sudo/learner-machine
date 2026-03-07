import { db } from '@/lib/supabase'
import Hero from '@/components/Hero'
import ProductsSection from '@/components/ProductsSection'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import CTABanner from '@/components/CTABanner'
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

export default async function HomePage() {
  const products = await getProducts()

  return (
    <>
      <Hero />
      <ProductsSection products={products} />
      <About />
      <Testimonials />
      <CTABanner />
    </>
  )
}
