import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path')
  if (!path) return NextResponse.json({ error: 'Missing path' }, { status: 400 })

  const { data } = await db.storage.from('product-files').createSignedUrl(path, 3600)
  if (!data?.signedUrl) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.redirect(data.signedUrl)
}
