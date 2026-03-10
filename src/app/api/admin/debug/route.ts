import { NextResponse } from 'next/server'
import { db } from '@/lib/supabase'
export const dynamic = 'force-dynamic'
export async function GET() {
  const { data } = await db.from('products').select('slug,published').order('created_at', { ascending: false })
  return NextResponse.json({
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    products: data,
  })
}
