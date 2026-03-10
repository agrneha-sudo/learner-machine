import { notFound } from 'next/navigation'
import { db } from '@/lib/supabase'
import { Product } from '@/types'
import ProductForm from '@/components/admin/ProductForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const { data: product, error } = await db
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !product) notFound()

  // Generate signed URL for cover image if it exists
  let cover_image_url: string | null = null
  if (product.cover_image_path) {
    const { data: signed } = await db.storage
      .from('product-files')
      .createSignedUrl(product.cover_image_path, 3600)
    cover_image_url = signed?.signedUrl ?? null
  }

  const productWithUrl = { ...product, cover_image_url } as Product & { cover_image_url: string | null }

  return (
    <div className="p-6">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm mb-6 hover:text-brand transition-colors" style={{ color: 'var(--text-secondary)' }}>
        <ArrowLeft size={16} /> Back to Products
      </Link>
      <h1 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
        Edit: {product.title}
      </h1>
      <ProductForm mode="edit" initial={productWithUrl} />
    </div>
  )
}
