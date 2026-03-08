import { db } from '@/lib/supabase'
import { Order } from '@/types'
import OrderRow from '@/components/admin/OrderRow'

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
                {['Product', 'Customer', 'Amount', 'Status', 'Date', 'Download'].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(orders as Order[]).map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
