import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib'
import { db } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const MAX_DOWNLOADS = 5

export async function GET(_: NextRequest, { params }: { params: { token: string } }) {
  const { token } = params

  // 1. Look up order by download token
  const { data: order } = await db
    .from('orders')
    .select('id, status, customer_email, customer_name, download_count, product_id, product_title')
    .eq('download_token', token)
    .single()

  if (!order) {
    return new NextResponse('Invalid download link.', { status: 404 })
  }

  if (order.status !== 'paid') {
    return new NextResponse('Payment not confirmed for this order.', { status: 403 })
  }

  if (order.download_count >= MAX_DOWNLOADS) {
    return new NextResponse(
      `Download limit reached (${MAX_DOWNLOADS} downloads). Contact hello@learnermachine.com with your order ID.`,
      { status: 403 }
    )
  }

  // 2. Get the product file path
  const { data: product } = await db
    .from('products')
    .select('file_path, title')
    .eq('id', order.product_id)
    .single()

  if (!product?.file_path) {
    return new NextResponse('No file found for this product.', { status: 404 })
  }

  // 3. Fetch the raw PDF from Supabase storage (server-side, never exposed to client)
  const { data: fileData, error } = await db.storage
    .from('product-files')
    .download(product.file_path)

  if (error || !fileData) {
    console.error('Storage download error:', error)
    return new NextResponse('Could not retrieve file.', { status: 500 })
  }

  // 4. Watermark every page with buyer info using pdf-lib
  const pdfBytes = await fileData.arrayBuffer()
  const pdfDoc = await PDFDocument.load(pdfBytes)
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)
  const pages = pdfDoc.getPages()

  const buyerName = order.customer_name?.trim() || ''
  const buyerEmail = order.customer_email || ''
  const orderId = order.id.slice(0, 8).toUpperCase()
  const watermarkLine1 = `Licensed to: ${buyerName ? buyerName + ' · ' : ''}${buyerEmail}`
  const watermarkLine2 = `Order #${orderId} · learnermachine.com · Do not share or redistribute`

  for (const page of pages) {
    const { width, height } = page.getSize()
    const fontSize = 7.5

    // Bottom footer bar — subtle but clearly there
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height: 20,
      color: rgb(0.97, 0.97, 0.97),
    })

    page.drawText(watermarkLine1, {
      x: 14,
      y: 7,
      size: fontSize,
      font,
      color: rgb(0.45, 0.45, 0.45),
    })

    page.drawText(watermarkLine2, {
      x: width / 2,
      y: 7,
      size: fontSize,
      font,
      color: rgb(0.55, 0.35, 0.15),
    })

    // Faint diagonal watermark in the centre of each page
    page.drawText(buyerEmail, {
      x: width / 2 - 80,
      y: height / 2 - 10,
      size: 28,
      font,
      color: rgb(0.88, 0.88, 0.88),
      rotate: degrees(45),
      opacity: 0.18,
    })
  }

  const watermarkedBytes = await pdfDoc.save()

  // 5. Increment download count
  await db
    .from('orders')
    .update({ download_count: order.download_count + 1 })
    .eq('id', order.id)

  // 6. Stream the watermarked PDF — inline (opens in browser, not auto-save)
  const safeName = (product.title || 'LearnerMachine').replace(/[^a-z0-9]/gi, '-').toLowerCase()
  return new NextResponse(Buffer.from(watermarkedBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${safeName}.pdf"`,
      'Cache-Control': 'no-store',
      'X-Download-Remaining': String(MAX_DOWNLOADS - order.download_count - 1),
    },
  })
}
