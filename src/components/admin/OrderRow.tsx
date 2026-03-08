'use client'

import { useState } from 'react'
import { Download, Loader2, Copy, Check } from 'lucide-react'
import { Order } from '@/types'

export default function OrderRow({ order }: { order: Order }) {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const generateLink = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/orders/${order.id}/download`)
      const data = await res.json()
      if (data.downloadUrl) {
        setUrl(data.downloadUrl)
        // Auto-open in new tab
        window.open(data.downloadUrl, '_blank')
      } else {
        setError(data.error ?? 'No file')
      }
    } catch {
      setError('Failed')
    } finally {
      setLoading(false)
    }
  }

  const copyLink = async () => {
    if (!url) return
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <tr className="border-b last:border-0 hover:bg-brand/5 transition-colors" style={{ borderColor: 'var(--border)' }}>
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
          day: '2-digit', month: 'short', year: 'numeric',
        })}
      </td>
      <td className="px-4 py-3">
        {order.status === 'paid' ? (
          <div className="flex items-center gap-1">
            <button
              onClick={generateLink}
              disabled={loading}
              title="Generate & open download link"
              className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-colors hover:bg-brand/10 hover:text-brand disabled:opacity-50"
              style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
            >
              {loading ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
              {url ? 'Re-send' : 'Get Link'}
            </button>
            {url && (
              <button
                onClick={copyLink}
                title="Copy download link"
                className="p-1.5 rounded-lg transition-colors hover:bg-brand/10 hover:text-brand"
                style={{ color: 'var(--text-muted)' }}
              >
                {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
              </button>
            )}
            {error && <span className="text-xs text-red-500">{error}</span>}
          </div>
        ) : (
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>—</span>
        )}
      </td>
    </tr>
  )
}
