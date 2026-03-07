import { db } from '@/lib/supabase'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import BlockRow from '@/components/admin/BlockRow'

export const dynamic = 'force-dynamic'

export default async function AdminBlocksPage() {
  const { data: blocks } = await db
    .from('content_blocks')
    .select('*')
    .order('position', { ascending: true })

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Content Sections
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Add custom sections with images and text to your homepage
          </p>
        </div>
        <Link href="/admin/blocks/new" className="btn-primary text-sm">
          <Plus size={16} /> Add Section
        </Link>
      </div>

      <div className="card overflow-hidden">
        {!blocks || blocks.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>No sections yet</p>
            <Link href="/admin/blocks/new" className="btn-primary text-sm">
              <Plus size={16} /> Add your first section
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left" style={{ borderColor: 'var(--border)' }}>
                {['Order', 'Section', 'Layout', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blocks.map((block) => (
                <BlockRow key={block.id} block={block} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
