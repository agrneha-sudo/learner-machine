'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Trash2, Loader2, Check, Video } from 'lucide-react'

interface Props {
  currentVideoPath: string | null
  currentVideoUrl: string | null
}

export default function AdminSettingsForm({ currentVideoPath, currentVideoUrl }: Props) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentVideoUrl)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    // Upload to Supabase via existing upload endpoint
    const fd = new FormData()
    fd.append('file', file)
    fd.append('slug', 'hero')

    const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const uploadData = await uploadRes.json()

    if (!uploadRes.ok) {
      setError(uploadData.error || 'Upload failed')
      setUploading(false)
      return
    }

    // Save the path to site_settings
    const saveRes = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'hero_video_path', value: uploadData.filePath }),
    })

    if (saveRes.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      setPreviewUrl(URL.createObjectURL(file))
      router.refresh()
    } else {
      setError('Failed to save setting')
    }
    setUploading(false)
  }

  const handleRemove = async () => {
    if (!confirm('Remove the hero video? The gradient background will show instead.')) return
    setRemoving(true)

    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'hero_video_path', value: null }),
    })

    setPreviewUrl(null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setRemoving(false)
    router.refresh()
  }

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
          <Video size={20} />
        </div>
        <div>
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Hero Background Video</h2>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Plays silently behind the headline. Recommended: MP4, max 30MB, landscape.
          </p>
        </div>
      </div>

      {/* Current video preview */}
      {previewUrl && (
        <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
          <video
            src={previewUrl}
            className="w-full h-48 object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: 'var(--bg)' }}>
            <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
              <Check size={12} /> Video active — showing in hero
            </span>
            <button
              onClick={handleRemove}
              disabled={removing}
              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 transition-colors"
            >
              {removing ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
              Remove video
            </button>
          </div>
        </div>
      )}

      {/* Upload area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-brand transition-colors"
        style={{ borderColor: 'var(--border)' }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/webm,video/mov"
          className="hidden"
          onChange={handleUpload}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={28} className="animate-spin text-brand" />
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Uploading video...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload size={28} style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {previewUrl ? 'Click to replace video' : 'Click to upload hero video'}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>MP4, WebM or MOV · Max 50MB</p>
          </div>
        )}
      </div>

      {saved && (
        <p className="text-sm text-emerald-500 flex items-center gap-1">
          <Check size={14} /> Saved successfully
        </p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!previewUrl && (
        <p className="text-xs p-3 rounded-xl" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-muted)' }}>
          No video set — the hero section currently shows the gradient background.
          Upload a video above and it will automatically appear on your homepage.
        </p>
      )}
    </div>
  )
}
