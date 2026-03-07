import { Product } from '@/types'
import ProductCard from './ProductCard'

export default function ProductsSection({ products }: { products: Product[] }) {
  return (
    <section id="products" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand uppercase tracking-widest mb-3">Digital Products</p>
          <h2 className="section-heading mb-4">Everything You Need to Succeed</h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Practical resources designed for action-takers. No fluff — just results.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
            Products coming soon. Check back shortly!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
