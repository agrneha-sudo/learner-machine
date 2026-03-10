'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Plus, X, Upload, Loader2, Check, ImageIcon, FileText } from 'lucide-react'
import { Product, ProductCategory } from '@/types'

type FormData = {
  slug: string
  title: string
  tagline: string
  description: string
  price: number | string
  original_price: number | string | undefined
  currency: string
  category: ProductCategory
  cover_gradient: string
  cover_emoji: string
  cover_image_path: string | null
  features: string[]
  featured: boolean
  badge: string
  language: string
  pages: number | string | undefined
  duration: string
  file_path: string | null
  published: boolean
}

const defaultForm: FormData = {
  slug: '',
  title: '',
  tagline: '',
  description: '',
  price: 0,
  original_price: undefined,
  currency: 'INR',
  category: 'ebook',
  cover_gradient: 'from-violet-600 via-purple-600 to-indigo-700',
  cover_emoji: '📚',
  cover_image_path: null,
  features: [],
  featured: false,
  badge: '',
  language: 'Hindi & English',
  pages: undefined,
  duration: '',
  file_path: null,
  published: true,
}

const gradientOptions = [
  { label: 'Violet → Indigo', value: 'from-violet-600 via-purple-600 to-indigo-700' },
  { label: 'Orange → Pink', value: 'from-orange-500 via-red-500 to-pink-600' },
  { label: 'Emerald → Cyan', value: 'from-emerald-500 via-teal-500 to-cyan-600' },
  { label: 'Blue → Cyan', value: 'from-blue-500 via-sky-500 to-cyan-500' },
  { label: 'Red → Pink', value: 'from-red-500 via-rose-500 to-pink-500' },
  { label: 'Yellow → Red', value: 'from-yellow-400 via-orange-500 to-red-500' },
  { label: 'Pink → Purple', value: 'from-pink-500 via-purple-500 to-indigo-500' },
  { label: 'Green → Blue', value: 'from-green-500 via-teal-500 to-blue-500' },
]

interface Props {
  initial?: Product
  mode: 'create' | 'edit'
}

export default function ProductForm({ initial, mode }: Props) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<FormData>(() => {
    if (initial) {
      const { id, created_at, updated_at, cover_image_url, ...rest } = initial as Product & { cover_image_url?: string }
      return {
        ...defaultForm,
        ...rest,
        features: Array.isArray(rest.features) ? rest.features : [],
        cover_image_path: rest.cover_image_path ?? null,
        file_path: rest.file_path ?? null,
        badge: rest.badge ?? '',
        duration: rest.duration ?? '',
        original_price: rest.original_price ?? undefined,
        pages: rest.pages ?? undefined,
      }
    }
    return defaultForm
  })

  const [newFeature, setNewFeature] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
    (initial as Product & { cover_image_url?: string } | undefined)?.cover_image_url ?? null
  )

  const set = (key: keyof FormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleTitleChange = (title: string) => {
    set('title', title)
    if (mode === 'create') {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
      set('slug', slug)
    }
  }

  const addFeature = () => {
    if (!newFeature.trim()) return
    set('features', [...(form.features ?? []), newFeature.trim()])
    setNewFeature('')
  }

  const removeFeature = (i: number) => {
    set('features', (form.features ?? []).filter((_, idx) => idx !== i))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !form.slug) return

    setUploadingFile(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('slug', String(form.slug))

    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()

    if (res.ok && data.path) {
      set('file_path', data.path)
    } else {
      setError(data.error || 'File upload failed')
    }
    setUploadingFile(false)
    e.target.value = ''
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !form.slug) return

    setUploadingImage(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('slug', String(form.slug))

    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()

    if (res.ok && data.path) {
      set('cover_image_path', data.path)
      setImagePreviewUrl(data.url ?? null)
    } else {
      setError(data.error || 'Image upload failed')
    }
    setUploadingImage(false)
    e.target.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      price: Number(form.price) || 0,
      original_price: form.original_price ? Number(form.original_price) : null,
      pages: form.pages ? Number(form.pages) : null,
      badge: form.badge || null,
      duration: form.duration || null,
      file_path: form.file_path || null,
      cover_image_path: form.cover_image_path || null,
    }

    const url = mode === 'create' ? '/api/admin/products' : `/api/admin/products/${initial!.id}`
    const method = mode === 'create' ? 'POST' : 'PATCH'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      if (mode === 'create') router.push('/admin/products')
      else router.refresh()
    } else {
      setError(data.error || 'Failed to save product')
    }
    setSaving(false)
  }

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-brand/50 transition-all"
  const inputStyle = { backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }
  const labelClass = "block text-sm font-medium mb-1.5"
  const labelStyle = { color: 'var(--text-secondary)' }

  const priceNum = Number(form.price) || 0
  const origNum = Number(form.original_price) || 0
  const discount = origNum > priceNum ? Math.round(((origNum - priceNum) / origNum) * 100) : null

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">

      {/* Basic Info */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Basic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass} style={labelStyle}>Title *</label>
            <input className={inputClass} style={inputStyle} value={form.title ?? ''} onChange={(e) => handleTitleChange(e.target.value)} placeholder="AI Prompts Mastery" required />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} style={labelStyle}>Slug (URL) *</label>
            <input className={inputClass} style={inputStyle} value={form.slug ?? ''} onChange={(e) => set('slug', e.target.value)} placeholder="ai-prompts-mastery" required />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} style={labelStyle}>Tagline *</label>
            <input className={inputClass} style={inputStyle} value={form.tagline ?? ''} onChange={(e) => set('tagline', e.target.value)} placeholder="One-line description shown on cards" required />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} style={labelStyle}>Description *</label>
            <textarea className={`${inputClass} resize-none`} style={inputStyle} value={form.description ?? ''} onChange={(e) => set('description', e.target.value)} placeholder="Full product description..." rows={4} required />
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Pricing</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>Price (₹) *</label>
            <input type="number" className={inputClass} style={inputStyle} value={form.price ?? 0} onChange={(e) => set('price', e.target.value)} min="0" step="1" required />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Original Price (₹)</label>
            <input type="number" className={inputClass} style={inputStyle} value={form.original_price ?? ''} onChange={(e) => set('original_price', e.target.value || undefined)} min="0" step="1" placeholder="For strikethrough" />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Currency</label>
            <select className={inputClass} style={inputStyle} value={form.currency ?? 'INR'} onChange={(e) => set('currency', e.target.value)}>
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
        </div>
        {discount && discount > 0 && (
          <div className="flex items-center gap-2 text-sm text-emerald-500">
            <Check size={14} />
            <span>{discount}% discount applied — customers save ₹{(origNum - priceNum).toLocaleString('en-IN')}</span>
          </div>
        )}
      </div>

      {/* Category & Details */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Category & Details</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>Category *</label>
            <select className={inputClass} style={inputStyle} value={form.category} onChange={(e) => set('category', e.target.value as ProductCategory)}>
              <option value="ebook">eBook / PDF</option>
              <option value="course">Course</option>
              <option value="training">Training</option>
              <option value="bundle">Bundle</option>
            </select>
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Language</label>
            <select className={inputClass} style={inputStyle} value={form.language ?? 'Hindi & English'} onChange={(e) => set('language', e.target.value)}>
              <option value="Hindi & English">Hindi & English</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Badge (optional)</label>
            <input className={inputClass} style={inputStyle} value={form.badge ?? ''} onChange={(e) => set('badge', e.target.value)} placeholder="Bestseller, New…" />
          </div>
          {form.category === 'ebook' && (
            <div>
              <label className={labelClass} style={labelStyle}>Pages</label>
              <input type="number" className={inputClass} style={inputStyle} value={form.pages ?? ''} onChange={(e) => set('pages', e.target.value || undefined)} placeholder="120" />
            </div>
          )}
          {(form.category === 'course' || form.category === 'training') && (
            <div>
              <label className={labelClass} style={labelStyle}>Duration</label>
              <input className={inputClass} style={inputStyle} value={form.duration ?? ''} onChange={(e) => set('duration', e.target.value)} placeholder="8 hours, 4 weeks…" />
            </div>
          )}
        </div>
      </div>

      {/* Cover Image Upload */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Cover Image</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Upload a cover image for this product. If no image is uploaded, the gradient + emoji design will be used.</p>

        {imagePreviewUrl && (
          <div className="relative w-48 h-32 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
            <Image src={imagePreviewUrl} alt="Cover preview" fill className="object-cover" />
            <button
              type="button"
              onClick={() => { set('cover_image_path', null); setImagePreviewUrl(null) }}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"
            >
              <X size={12} />
            </button>
          </div>
        )}

        <div className="flex gap-3 items-center">
          <input ref={imageInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          <button
            type="button"
            disabled={uploadingImage || !form.slug}
            onClick={() => imageInputRef.current?.click()}
            className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadingImage ? <Loader2 size={15} className="animate-spin" /> : <ImageIcon size={15} />}
            {uploadingImage ? 'Uploading…' : imagePreviewUrl ? 'Replace Image' : 'Upload Cover Image'}
          </button>
          {!form.slug && <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Enter a title/slug first</span>}
        </div>
      </div>

      {/* Cover Design (gradient fallback) */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Cover Design <span className="text-xs font-normal ml-1" style={{ color: 'var(--text-muted)' }}>(used if no image uploaded)</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>Cover Emoji</label>
            <input className={inputClass} style={inputStyle} value={form.cover_emoji ?? '📚'} onChange={(e) => set('cover_emoji', e.target.value)} placeholder="📚" />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Gradient</label>
            <select className={inputClass} style={inputStyle} value={form.cover_gradient ?? gradientOptions[0].value} onChange={(e) => set('cover_gradient', e.target.value)}>
              {gradientOptions.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={`h-24 rounded-xl bg-gradient-to-br ${form.cover_gradient ?? gradientOptions[0].value} flex items-center justify-center`}>
          <span className="text-5xl">{form.cover_emoji ?? '📚'}</span>
        </div>
      </div>

      {/* Features */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Features / What's Included</h2>
        <ul className="space-y-2">
          {(form.features ?? []).map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <Check size={14} className="text-brand shrink-0" />
              <span className="flex-1">{f}</span>
              <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-500"><X size={14} /></button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            className={`${inputClass} flex-1`}
            style={inputStyle}
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature or included item…"
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature() } }}
          />
          <button type="button" onClick={addFeature} className="btn-secondary px-4 shrink-0"><Plus size={16} /></button>
        </div>
      </div>

      {/* PDF / Product File Upload */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Product PDF / File</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Upload the PDF or file customers download after purchase. Stored securely — links expire after 1 hour.</p>

        {form.file_path && (
          <div className="flex items-center gap-2 text-sm text-emerald-500">
            <FileText size={14} />
            <span>File uploaded: <code className="text-xs">{form.file_path}</code></span>
            <button type="button" onClick={() => set('file_path', null)} className="text-red-400 hover:text-red-500 ml-2"><X size={13} /></button>
          </div>
        )}

        <div className="flex gap-3 items-center">
          <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.zip,.epub" onChange={handleFileUpload} />
          <button
            type="button"
            disabled={uploadingFile || !form.slug}
            onClick={() => fileInputRef.current?.click()}
            className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadingFile ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
            {uploadingFile ? 'Uploading…' : form.file_path ? 'Replace PDF' : 'Upload PDF'}
          </button>
          {!form.slug && <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Enter a title/slug first</span>}
        </div>
      </div>

      {/* Settings */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Settings</h2>
        <div className="flex flex-col gap-3">
          {[
            { key: 'published', label: 'Published', desc: 'Show this product on the store' },
            { key: 'featured', label: 'Featured', desc: 'Highlight with a featured border' },
          ].map(({ key, label, desc }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => set(key as keyof FormData, !form[key as keyof FormData])}
                className={`relative w-10 h-5 rounded-full transition-colors ${form[key as keyof FormData] ? 'bg-brand' : 'bg-[var(--border)]'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form[key as keyof FormData] ? 'translate-x-5' : ''}`} />
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : null}
          {saving ? 'Saving…' : saved ? 'Saved!' : mode === 'create' ? 'Create Product' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/products')} className="btn-secondary">Cancel</button>
      </div>
    </form>
  )
}
