import { db } from '@/lib/supabase'
import BlockForm from '@/components/admin/BlockForm'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EditBlockPage({ params }: { params: { id: string } }) {
  const { data: block } = await db
    .from('content_blocks')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!block) notFound()

  return <BlockForm block={block} />
}
