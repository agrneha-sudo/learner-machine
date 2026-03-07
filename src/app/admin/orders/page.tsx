import { db } from '@/lib/supabase'
import { Order } from '@/types'

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage() {
  const { data: orders } = await db
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  const paid = orders?.filter((o) => o.status === 'paid') ?? []
  const totalRevenue = paid.reduce((sum, o) => sum + Number(o.amount), 0)

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Orders</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {paid.length} paid orders · ₹{totalRevenue.toLocaleString('en-IN')} total revenue
        </p>
      </div>

      <div className="card overflow-hidden">
        {!orders || orders.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No orders yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left" style={{ borderColor: 'var(--border)' }}>
                {['Product', 'Customer', 'Amount', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(orders as Order[]).map((order) => (
                <tr key={order.id} className="border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {order.product_title}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm" style={{ color: 'var(--text-primary)' }}>{order.customer_name || '—'}</div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{order.customer_email || '—'}</div>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    ₹{Number(order.amount).toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                      order.status === 'paid' ? 'text-emerald-500 bg-emerald-500/10'
                      : order.status === 'failed' ? 'text-red-500 bg-red-500/10'
                      : 'text-yellow-500 bg-yellow-500/10'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                    {new Date(order.created_at).toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric'
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
