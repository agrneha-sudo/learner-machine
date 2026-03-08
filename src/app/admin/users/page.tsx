import { db } from '@/lib/supabase'
import { Users, ShoppingBag, TrendingUp, Mail } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
  const { data: orders } = await db
    .from('orders')
    .select('*')
    .eq('status', 'paid')
    .order('created_at', { ascending: false })

  // Group by email to build customer list
  const customerMap = new Map<string, {
    email: string
    name: string
    purchases: number
    totalSpent: number
    lastPurchase: string
    products: string[]
  }>()

  for (const order of orders ?? []) {
    const email = order.customer_email || 'unknown'
    if (!customerMap.has(email)) {
      customerMap.set(email, {
        email,
        name: order.customer_name || '',
        purchases: 0,
        totalSpent: 0,
        lastPurchase: order.created_at,
        products: [],
      })
    }
    const c = customerMap.get(email)!
    c.purchases += 1
    c.totalSpent += Number(order.amount)
    if (order.product_title && !c.products.includes(order.product_title)) {
      c.products.push(order.product_title)
    }
    if (order.created_at > c.lastPurchase) c.lastPurchase = order.created_at
  }

  const customers = Array.from(customerMap.values()).sort(
    (a, b) => new Date(b.lastPurchase).getTime() - new Date(a.lastPurchase).getTime()
  )

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0)
  const repeatCustomers = customers.filter((c) => c.purchases > 1).length

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Customers
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          All users who have made a purchase
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Customers', value: customers.length, icon: Users, color: 'text-brand', bg: 'bg-brand/10' },
          { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Total Orders', value: orders?.length ?? 0, icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Repeat Buyers', value: repeatCustomers, icon: Mail, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        ].map((stat) => (
          <div key={stat.label} className="card p-5">
            <div className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={18} />
            </div>
            <div className="font-display text-2xl font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>
              {stat.value}
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {customers.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No customers yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left" style={{ borderColor: 'var(--border)' }}>
                {['Customer', 'Products Bought', 'Orders', 'Total Spent', 'Last Purchase'].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.email} className="border-b last:border-0 hover:bg-brand/5 transition-colors" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand/15 flex items-center justify-center text-brand text-xs font-bold shrink-0">
                        {(c.name || c.email).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          {c.name || '—'}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {c.products.map((p) => (
                        <span key={p} className="text-xs px-2 py-0.5 rounded-md" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{c.purchases}</span>
                    {c.purchases > 1 && (
                      <span className="ml-2 text-xs text-emerald-500 font-medium">Repeat</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    ₹{c.totalSpent.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                    {new Date(c.lastPurchase).toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
