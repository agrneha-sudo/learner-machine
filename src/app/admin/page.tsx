import { db } from '@/lib/supabase'
import { IndianRupee, Package, ShoppingBag, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getStats() {
  const [{ data: products }, { data: orders }] = await Promise.all([
    db.from('products').select('id, published'),
    db.from('orders').select('amount, status, created_at, product_title, customer_email'),
  ])

  const totalProducts = products?.length ?? 0
  const publishedProducts = products?.filter((p) => p.published).length ?? 0
  const paidOrders = orders?.filter((o) => o.status === 'paid') ?? []
  const totalRevenue = paidOrders.reduce((sum, o) => sum + Number(o.amount), 0)
  const totalOrders = paidOrders.length

  const recentOrders = orders
    ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5) ?? []

  return { totalProducts, publishedProducts, totalRevenue, totalOrders, recentOrders }
}

export default async function AdminDashboard() {
  const { totalProducts, publishedProducts, totalRevenue, totalOrders, recentOrders } = await getStats()

  const stats = [
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-brand', bg: 'bg-brand/10' },
    { label: 'Paid Orders', value: totalOrders, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Total Products', value: totalProducts, icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Published', value: publishedProducts, icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ]

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Overview of your store</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="card p-5">
              <div className={`w-9 h-9 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-3`}>
                <Icon size={18} />
              </div>
              <div className="font-bold text-2xl mb-0.5" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          )
        })}
      </div>

      {/* Recent orders */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-brand hover:underline">View all</Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-sm py-4 text-center" style={{ color: 'var(--text-muted)' }}>No orders yet</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order: { product_title: string; customer_email: string; amount: number; status: string; created_at: string }, i: number) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{order.product_title}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{order.customer_email || 'No email'}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>₹{Number(order.amount).toLocaleString('en-IN')}</div>
                  <span className={`text-xs font-medium ${order.status === 'paid' ? 'text-emerald-500' : order.status === 'failed' ? 'text-red-500' : 'text-yellow-500'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
