'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'
import { Product } from '@/types'

export default function AdminProductRow({ product }: { product: Product }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Delete "${product.title}"? This cannot be undone.`)) return
    await fetch(`/api/admin/products/${product.id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <tr className="border-b last:border-0 hover:bg-brand/5 transition-colors" style={{ borderColor: 'var(--border)' }}>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{product.cover_emoji}</span>
          <div>
            <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{product.title}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{product.slug}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="text-xs px-2 py-1 rounded-lg capitalize" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-secondary)' }}>
          {product.category}
        </span>
      </td>
      <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
        {product.price != null ? `₹${Number(product.price).toLocaleString('en-IN')}` : '—'}
        {product.original_price != null && (
          <span className="text-xs line-through ml-1" style={{ color: 'var(--text-muted)' }}>
            ₹{Number(product.original_price).toLocaleString('en-IN')}
          </span>
        )}
      </td>
      <td className="px-4 py-3">
        <span className={`text-xs font-medium px-2 py-1 rounded-lg ${product.published ? 'text-emerald-500 bg-emerald-500/10' : 'text-yellow-500 bg-yellow-500/10'}`}>
          {product.published ? 'Published' : 'Draft'}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="p-1.5 rounded-lg hover:bg-brand/10 hover:text-brand transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <Pencil size={14} />
          </Link>
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  )
}
