import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { data, error } = await db
    .from('site_settings')
    .select('key, value')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Return as flat object { key: value }
  const settings = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]))
  return NextResponse.json(settings)
}

export async function PATCH(req: NextRequest) {
  const body = await req.json() // { key: string, value: string | null }

  const { error } = await db
    .from('site_settings')
    .upsert({ key: body.key, value: body.value, updated_at: new Date().toISOString() })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
