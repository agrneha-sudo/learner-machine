'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FileText, ImageIcon, Eye, EyeOff, Check, X } from 'lucide-react'

interface BlockData {
  id?: string
  title?: string
  subtitle?: string
  body?: string
  image_path?: string
  image_url?: string
  layout?: string
  position?: number
  published?: boolean
  price?: number | null
  original_price?: number | null
  pdf_path?: string
  cta_label?: string
  cta_url?: string
}

const LAYOUTS = [
  { value: 'image-right', label: 'Text left · Image right' },
  { value: 'image-left', label: 'Image left · Text right' },
  { value: 'image-top', label: 'Image top · Text below' },
  { value: 'full-width', label: 'Full width banner' },
]

export default function BlockForm({ block }: { block?: BlockData }) {
  const router = useRouter()
  const isEdit = !!block?.id

  const [title, setTitle] = useState(block?.title ?? '')
  const [subtitle, setSubtitle] = useState(block?.subtitle ?? '')
  const [body, setBody] = useState(block?.body ?? '')
  const [layout, setLayout] = useState(block?.layout ?? 'image-right')
  const [position, setPosition] = useState(block?.position ?? 1)
  const [published, setPublished] = useState(block?.published ?? false)

  const [imagePath, setImagePath] = useState(block?.image_path ?? '')
  const [imagePreview, setImagePreview] = useState<string | null>(block?.image_url ?? null)

  const [price, setPrice] = useState<string>(block?.price != null ? String(block.price) : '')
  const [originalPrice, setOriginalPrice] = useState<string>(block?.original_price != null ? String(block.original_price) : '')
  const [ctaLabel, setCtaLabel] = useState(block?.cta_label ?? 'Buy Now')
  const [ctaUrl, setCtaUrl] = useState(block?.cta_url ?? '')

  const [pdfPath, setPdfPath] = useState(block?.pdf_path ?? '')
  const [pdfName, setPdfName] = useState('')

  const [imageUploading, setImageUploading] = useState(false)
  const [pdfUploading, setPdfUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const uploadFile = async (file: File, type: 'image' | 'pdf') => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('slug', 'blocks')
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Upload failed')
    return data as { path: string; url: string | null }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUploading(true)
    setError('')
    try {
      const { path, url } = await uploadFile(file, 'image')
      setImagePath(path)
      setImagePreview(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed')
    } finally {
      setImageUploading(false)
    }
  }

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPdfUploading(true)
    setError('')
    try {
      const { path } = await uploadFile(file, 'pdf')
      setPdfPath(path)
      setPdfName(file.name)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PDF upload failed')
    } finally {
      setPdfUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required'); return }

    setSaving(true)
    setError('')

    const payload: Record<string, unknown> = {
      title, subtitle, body, layout, position, published,
      image_path: imagePath || null,
      pdf_path: pdfPath || null,
      cta_label: ctaLabel || 'Buy Now',
      cta_url: ctaUrl || null,
      price: price !== '' ? parseFloat(price) : null,
      original_price: originalPrice !== '' ? parseFloat(originalPrice) : null,
    }

    const url = isEdit ? `/api/admin/blocks/${block!.id}` : '/api/admin/blocks'
    const method = isEdit ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin/blocks')
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Save failed')
      setSaving(false)
    }
  }

  const discount = price && originalPrice
    ? Math.round(((parseFloat(originalPrice) - parseFloat(price)) / parseFloat(originalPrice)) * 100)
    : null

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            {isEdit ? 'Edit Section' : 'New Section'}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Add a content block to your homepage with image, text, price and downloadable PDF
          </p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => setShowPreview(!showPreview)}
            className="btn-secondary text-sm flex items-center gap-2">
            {showPreview ? <EyeOff size={15} /> : <Eye size={15} />}
            {showPreview ? 'Hide Preview' : 'Preview'}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary text-sm">Cancel</button>
          <button onClick={handleSubmit} disabled={saving} className="btn-primary text-sm">
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Section'}
          </button>
        </div>
      </div>

      {error && <div className="mb-6 p-3 rounded-xl text-sm text-red-500 bg-red-500/10">{error}</div>}

      <div className={`grid gap-8 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-3xl'}`}>

        {/* ── FORM ── */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Content */}
          <div className="card p-6 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Content</h2>

            <div className="space-y-1">
              <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Title *</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                placeholder="Section heading" className="input w-full" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Subtitle</label>
              <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)}
                placeholder="A short tagline or description" className="input w-full" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Body Text</label>
              <textarea value={body} onChange={e => setBody(e.target.value)}
                placeholder="Longer description, bullet points, features…"
                rows={5} className="input w-full resize-none" />
            </div>
          </div>

          {/* Image */}
          <div className="card p-6 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              <ImageIcon size={13} className="inline mr-1.5" />Image
            </h2>

            {imagePreview && (
              <div className="relative w-full h-44 rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                <button type="button"
                  onClick={() => { setImagePath(''); setImagePreview(null) }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80">
                  <X size={14} />
                </button>
              </div>
            )}

            <label className="btn-secondary text-sm cursor-pointer inline-flex items-center gap-2">
              <ImageIcon size={14} />
              {imageUploading ? 'Uploading…' : imagePreview ? 'Replace Image' : 'Upload Image'}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={imageUploading} />
            </label>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>JPG, PNG or WebP · Recommended 1200×800px</p>
          </div>

          {/* PDF Upload */}
          <div className="card p-6 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              <FileText size={13} className="inline mr-1.5" />PDF File
            </h2>

            {pdfPath && (
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                <FileText size={18} style={{ color: 'var(--brand)' }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                    {pdfName || pdfPath.split('/').pop()}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>PDF uploaded</p>
                </div>
                <button type="button" onClick={() => { setPdfPath(''); setPdfName('') }}
                  className="text-red-500 hover:text-red-600"><X size={16} /></button>
              </div>
            )}

            <label className="btn-secondary text-sm cursor-pointer inline-flex items-center gap-2">
              <FileText size={14} />
              {pdfUploading ? 'Uploading…' : pdfPath ? 'Replace PDF' : 'Upload PDF'}
              <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={handlePdfUpload} disabled={pdfUploading} />
            </label>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>The PDF buyers will receive after purchase</p>
          </div>

          {/* Pricing */}
          <div className="card p-6 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Pricing</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Sale Price (₹)</label>
                <input type="number" min={0} value={price} onChange={e => setPrice(e.target.value)}
                  placeholder="e.g. 499" className="input w-full" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Original Price (₹)</label>
                <input type="number" min={0} value={originalPrice} onChange={e => setOriginalPrice(e.target.value)}
                  placeholder="e.g. 999" className="input w-full" />
              </div>
            </div>
            {discount && discount > 0 && (
              <p className="text-sm font-semibold text-emerald-500">
                <Check size={14} className="inline mr-1" />{discount}% discount will be shown
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Button Label</label>
                <input type="text" value={ctaLabel} onChange={e => setCtaLabel(e.target.value)}
                  placeholder="Buy Now" className="input w-full" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Button URL</label>
                <input type="text" value={ctaUrl} onChange={e => setCtaUrl(e.target.value)}
                  placeholder="/products/your-product-slug" className="input w-full" />
              </div>
            </div>
          </div>

          {/* Layout & Settings */}
          <div className="card p-6 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Layout &amp; Settings</h2>

            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Layout</label>
              <div className="grid grid-cols-2 gap-2">
                {LAYOUTS.map(l => (
                  <button key={l.value} type="button" onClick={() => setLayout(l.value)}
                    className={`px-3 py-2.5 rounded-xl text-sm text-left transition-colors border ${layout === l.value ? 'border-brand bg-brand/10 text-brand' : ''}`}
                    style={{ borderColor: layout === l.value ? undefined : 'var(--border)', color: layout === l.value ? undefined : 'var(--text-secondary)' }}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Display Order</label>
              <input type="number" min={1} value={position} onChange={e => setPosition(Number(e.target.value))}
                className="input w-28" />
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Lower numbers appear first on homepage</p>
            </div>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div onClick={() => setPublished(!published)}
                className={`w-10 h-6 rounded-full transition-colors relative`}
                style={{ backgroundColor: published ? 'var(--brand)' : 'var(--border)' }}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${published ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                {published ? 'Visible on homepage' : 'Hidden (draft)'}
              </span>
            </label>
          </div>
        </form>

        {/* ── LIVE PREVIEW ── */}
        {showPreview && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Eye size={15} style={{ color: 'var(--brand)' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Live Preview
              </span>
            </div>

            <div className="card overflow-hidden">
              {/* Image preview */}
              {imagePreview && layout !== 'image-right' && layout !== 'image-left' && (
                <div className="relative w-full h-52 overflow-hidden">
                  <Image src={imagePreview} alt={title || 'Preview'} fill className="object-cover" />
                </div>
              )}

              <div className={`p-6 ${layout === 'image-right' || layout === 'image-left' ? 'flex gap-5 items-start' : ''}`}>
                {imagePreview && layout === 'image-left' && (
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={imagePreview} alt={title || 'Preview'} fill className="object-cover" />
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  {title && (
                    <h3 className="font-display font-bold text-xl leading-tight" style={{ color: 'var(--text-primary)' }}>
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className="text-sm font-medium" style={{ color: 'var(--brand)' }}>{subtitle}</p>
                  )}
                  {body && (
                    <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
                      {body}
                    </p>
                  )}

                  {/* Price preview */}
                  {price && (
                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
                        ₹{parseFloat(price).toLocaleString('en-IN')}
                      </span>
                      {originalPrice && (
                        <>
                          <span className="text-base line-through" style={{ color: 'var(--text-muted)' }}>
                            ₹{parseFloat(originalPrice).toLocaleString('en-IN')}
                          </span>
                          {discount && discount > 0 && (
                            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                              {discount}% OFF
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* PDF indicator */}
                  {pdfPath && (
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <FileText size={12} style={{ color: 'var(--brand)' }} />
                      PDF attached · watermarked on purchase
                    </div>
                  )}

                  {/* CTA button */}
                  {(ctaLabel || ctaUrl) && (
                    <div className="pt-2">
                      <span className="btn-primary text-sm inline-flex">
                        {ctaLabel || 'Buy Now'} →
                      </span>
                    </div>
                  )}
                </div>

                {imagePreview && layout === 'image-right' && (
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={imagePreview} alt={title || 'Preview'} fill className="object-cover" />
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
              This is an approximate preview. Actual homepage layout may vary.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
