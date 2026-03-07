'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface BlockData {
  id?: string
  title?: string
  subtitle?: string
  body?: string
  image_path?: string
  layout?: string
  position?: number
  published?: boolean
}

const LAYOUTS = [
  { value: 'image-right', label: 'Text left, Image right' },
  { value: 'image-left', label: 'Image left, Text right' },
  { value: 'image-top', label: 'Image top, Text below' },
  { value: 'full-width', label: 'Full width image' },
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
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.path) {
        setImagePath(data.path)
        setImagePreview(data.url ?? null)
      }
    } catch {
      setError('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required'); return }

    setSaving(true)
    setError('')

    const payload = { title, subtitle, body, layout, position, published, image_path: imagePath }

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

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            {isEdit ? 'Edit Section' : 'New Section'}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Add an image + text section to your homepage
          </p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="btn-secondary text-sm">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn-primary text-sm">
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Section'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl text-sm text-red-500 bg-red-500/10">{error}</div>
      )}

      <div className="card p-6 space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Content</h2>

        <div className="space-y-1">
          <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Title *</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Section heading"
            className="input w-full"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={e => setSubtitle(e.target.value)}
            placeholder="A short tagline or description"
            className="input w-full"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Body Text</label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Longer description, bullet points, or any text you want to show…"
            rows={5}
            className="input w-full resize-none"
          />
        </div>
      </div>

      <div className="card p-6 space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Image</h2>

        {(imagePreview || imagePath) && (
          <div className="relative w-full h-48 rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
            <Image
              src={imagePreview ?? `/api/admin/image-proxy?path=${encodeURIComponent(imagePath)}`}
              alt="Section image"
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-3">
          <label className="btn-secondary text-sm cursor-pointer">
            {uploading ? 'Uploading…' : imagePath ? 'Replace Image' : 'Upload Image'}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
          </label>
          {imagePath && (
            <button type="button" onClick={() => { setImagePath(''); setImagePreview(null) }} className="text-sm text-red-500 hover:underline">
              Remove
            </button>
          )}
        </div>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Recommended: 1200×800px, JPG or PNG</p>
      </div>

      <div className="card p-6 space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Layout & Settings</h2>

        <div className="space-y-1">
          <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Layout</label>
          <div className="grid grid-cols-2 gap-2">
            {LAYOUTS.map(l => (
              <button
                key={l.value}
                type="button"
                onClick={() => setLayout(l.value)}
                className={`px-3 py-2.5 rounded-xl text-sm text-left transition-colors border ${layout === l.value ? 'border-brand bg-brand/10 text-brand' : 'border-transparent hover:bg-brand/5'}`}
                style={{ borderColor: layout === l.value ? undefined : 'var(--border)', color: layout === l.value ? undefined : 'var(--text-secondary)' }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Display Order</label>
          <input
            type="number"
            min={1}
            value={position}
            onChange={e => setPosition(Number(e.target.value))}
            className="input w-28"
          />
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Lower numbers appear first</p>
        </div>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div
            onClick={() => setPublished(!published)}
            className={`w-10 h-6 rounded-full transition-colors relative ${published ? 'bg-brand' : ''}`}
            style={{ backgroundColor: published ? undefined : 'var(--border)' }}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${published ? 'translate-x-5' : 'translate-x-1'}`} />
          </div>
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {published ? 'Visible on homepage' : 'Hidden (draft)'}
          </span>
        </label>
      </div>
    </form>
  )
}
