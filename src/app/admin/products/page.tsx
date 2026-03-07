import { db } from '@/lib/supabase'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import AdminProductRow from '@/components/admin/ProductRow'
import { Product } from '@/types'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const { data: products } = await db
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Products</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{products?.length ?? 0} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary text-sm">
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      <div className="card overflow-hidden">
        {!products || products.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>No products yet</p>
            <Link href="/admin/products/new" className="btn-primary text-sm">
              <Plus size={16} /> Add your first product
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left" style={{ borderColor: 'var(--border)' }}>
                {['Product', 'Category', 'Price', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <AdminProductRow key={product.id} product={product as Product} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
