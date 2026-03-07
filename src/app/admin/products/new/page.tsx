import ProductForm from '@/components/admin/ProductForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewProductPage() {
  return (
    <div className="p-6">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm mb-6 hover:text-brand transition-colors" style={{ color: 'var(--text-secondary)' }}>
        <ArrowLeft size={16} /> Back to Products
      </Link>
      <h1 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
        Add New Product
      </h1>
      <ProductForm mode="create" />
    </div>
  )
}
