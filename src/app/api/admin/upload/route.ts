import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const slug = (formData.get('slug') as string | null) || 'blocks'

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const ext = file.name.split('.').pop()
    const isPdf = file.type === 'application/pdf' || ext === 'pdf'
    const folder = isPdf ? `pdfs/${slug}` : `images/${slug}`
    const filePath = `${folder}/${Date.now()}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error } = await db.storage
      .from('product-files')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    // Generate a signed URL for preview (valid 1 hour)
    const { data: signed } = await db.storage
      .from('product-files')
      .createSignedUrl(filePath, 3600)

    return NextResponse.json({ path: filePath, url: signed?.signedUrl ?? null })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
