import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

// GET single product
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { data, error } = await db
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}

// PATCH update product
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { data, error } = await db
      .from('products')
      .update(body)
      .eq('id', params.id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

// DELETE product
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await db.from('products').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
