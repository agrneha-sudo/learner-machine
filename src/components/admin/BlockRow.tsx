'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'

export default function BlockRow({ block }: { block: Record<string, unknown> }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Delete "${block.title}"?`)) return
    await fetch(`/api/admin/blocks/${block.id}`, { method: 'DELETE' })
    router.refresh()
  }

  const layoutLabel: Record<string, string> = {
    'image-right': 'Text left, Image right',
    'image-left': 'Image left, Text right',
    'image-top': 'Image top, Text below',
    'full-width': 'Full width image',
  }

  return (
    <tr className="border-b last:border-0 hover:bg-brand/5 transition-colors" style={{ borderColor: 'var(--border)' }}>
      <td className="px-4 py-3 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        #{block.position as number}
      </td>
      <td className="px-4 py-3">
        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{block.title as string}</div>
        <div className="text-xs line-clamp-1" style={{ color: 'var(--text-muted)' }}>{block.subtitle as string}</div>
      </td>
      <td className="px-4 py-3">
        <span className="text-xs px-2 py-1 rounded-lg" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-secondary)' }}>
          {layoutLabel[block.layout as string] ?? block.layout as string}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`text-xs font-medium px-2 py-1 rounded-lg ${block.published ? 'text-emerald-500 bg-emerald-500/10' : 'text-yellow-500 bg-yellow-500/10'}`}>
          {block.published ? 'Visible' : 'Hidden'}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Link href={`/admin/blocks/${block.id}/edit`} className="p-1.5 rounded-lg hover:bg-brand/10 hover:text-brand transition-colors" style={{ color: 'var(--text-muted)' }}>
            <Pencil size={14} />
          </Link>
          <button onClick={handleDelete} className="p-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors" style={{ color: 'var(--text-muted)' }}>
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  )
}
