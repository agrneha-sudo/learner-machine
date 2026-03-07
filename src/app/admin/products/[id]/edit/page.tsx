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

  return (
    <div className="p-6">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm mb-6 hover:text-brand transition-colors" style={{ color: 'var(--text-secondary)' }}>
        <ArrowLeft size={16} /> Back to Products
      </Link>
      <h1 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
        Edit: {product.title}
      </h1>
      <ProductForm mode="edit" initial={product as Product} />
    </div>
  )
}
