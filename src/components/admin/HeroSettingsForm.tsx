'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Loader2, Upload, Trash2, Video } from 'lucide-react'

export interface HeroSettings {
  hero_badge: string
  hero_headline_1: string
  hero_headline_2: string
  hero_highlight_words: string
  hero_subtitle: string
  hero_description: string
  hero_cta_text: string
  hero_stat_1_value: string
  hero_stat_1_label: string
  hero_stat_2_value: string
  hero_stat_2_label: string
  hero_stat_3_value: string
  hero_stat_3_label: string
  hero_stat_4_value: string
  hero_stat_4_label: string
  hero_card_title: string
  hero_card_subtitle: string
}

const DEFAULTS: HeroSettings = {
  hero_badge: 'Available in Hindi & English',
  hero_headline_1: 'Master AI, Build',
  hero_headline_2: 'Your Business',
  hero_highlight_words: 'AI,Business',
  hero_subtitle: 'सीखो, बढ़ो, कामयाब बनो',
  hero_description: 'Premium PDF guides and ebooks to help you understand AI, start a side hustle, and grow your business — all in Hindi and English.',
  hero_cta_text: 'Explore Products',
  hero_stat_1_value: '10K+',
  hero_stat_1_label: 'Students',
  hero_stat_2_value: '50+',
  hero_stat_2_label: 'Resources',
  hero_stat_3_value: '2',
  hero_stat_3_label: 'Languages',
  hero_stat_4_value: '4.9',
  hero_stat_4_label: 'Avg Rating',
  hero_card_title: 'Start Learning Today',
  hero_card_subtitle: 'Join 10,000+ learners across India',
}

const inputClass = 'w-full px-3 py-2.5 text-sm rounded-xl border outline-none transition-colors focus:border-brand'
const inputStyle = { background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }
const labelClass = 'block text-xs font-semibold mb-1.5 uppercase tracking-wide'
const labelStyle = { color: 'var(--text-muted)' }

export default function HeroSettingsForm({ initial, currentVideoUrl }: { initial: Partial<HeroSettings>; currentVideoUrl?: string | null }) {
  const router = useRouter()
  const [form, setForm] = useState<HeroSettings>({ ...DEFAULTS, ...initial })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [videoUrl, setVideoUrl] = useState<string | null>(currentVideoUrl ?? null)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [removingVideo, setRemovingVideo] = useState(false)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const set = (key: keyof HeroSettings, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const entries = Object.entries(form) as [string, string][]
      await Promise.all(
        entries.map(([key, value]) =>
          fetch('/api/admin/settings', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, value }),
          })
        )
      )
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      router.refresh()
    } catch {
      setError('Failed to save settings')
    }
    setSaving(false)
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingVideo(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('slug', 'hero')
    const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const uploadData = await uploadRes.json()
    if (!uploadRes.ok) { setError(uploadData.error || 'Upload failed'); setUploadingVideo(false); return }
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'hero_video_path', value: uploadData.path }),
    })
    setVideoUrl(URL.createObjectURL(file))
    setUploadingVideo(false)
    router.refresh()
  }

  const handleVideoRemove = async () => {
    if (!confirm('Remove the hero video? The animated graphic will show instead.')) return
    setRemovingVideo(true)
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'hero_video_path', value: null }),
    })
    setVideoUrl(null)
    setRemovingVideo(false)
    router.refresh()
  }

  return (
    <div className="space-y-6">

      {/* Badge */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Badge</h2>
        <div>
          <label className={labelClass} style={labelStyle}>Badge Text</label>
          <input className={inputClass} style={inputStyle} value={form.hero_badge} onChange={e => set('hero_badge', e.target.value)} />
        </div>
      </div>

      {/* Headline */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Headline</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>Line 1</label>
            <input className={inputClass} style={inputStyle} value={form.hero_headline_1} onChange={e => set('hero_headline_1', e.target.value)} placeholder="Master AI, Build" />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Line 2</label>
            <input className={inputClass} style={inputStyle} value={form.hero_headline_2} onChange={e => set('hero_headline_2', e.target.value)} placeholder="Your Business" />
          </div>
        </div>
        <div>
          <label className={labelClass} style={labelStyle}>Highlighted Words (comma-separated)</label>
          <input className={inputClass} style={inputStyle} value={form.hero_highlight_words} onChange={e => set('hero_highlight_words', e.target.value)} placeholder="AI,Business" />
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Words in the headline that appear in brand colour</p>
        </div>
        <div>
          <label className={labelClass} style={labelStyle}>Hindi Subtitle</label>
          <input className={inputClass} style={inputStyle} value={form.hero_subtitle} onChange={e => set('hero_subtitle', e.target.value)} />
        </div>
      </div>

      {/* Description & CTA */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Description & CTA</h2>
        <div>
          <label className={labelClass} style={labelStyle}>Description</label>
          <textarea className={`${inputClass} resize-none`} style={inputStyle} value={form.hero_description} onChange={e => set('hero_description', e.target.value)} rows={3} />
        </div>
        <div>
          <label className={labelClass} style={labelStyle}>CTA Button Text</label>
          <input className={inputClass} style={inputStyle} value={form.hero_cta_text} onChange={e => set('hero_cta_text', e.target.value)} />
        </div>
      </div>

      {/* Stats */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Stats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {([1, 2, 3, 4] as const).map(n => (
            <div key={n} className="space-y-2">
              <div>
                <label className={labelClass} style={labelStyle}>Value {n}</label>
                <input className={inputClass} style={inputStyle} value={form[`hero_stat_${n}_value`]} onChange={e => set(`hero_stat_${n}_value`, e.target.value)} placeholder="10K+" />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Label {n}</label>
                <input className={inputClass} style={inputStyle} value={form[`hero_stat_${n}_label`]} onChange={e => set(`hero_stat_${n}_label`, e.target.value)} placeholder="Students" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Card */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Bottom Card (visual panel)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>Title</label>
            <input className={inputClass} style={inputStyle} value={form.hero_card_title} onChange={e => set('hero_card_title', e.target.value)} />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Subtitle</label>
            <input className={inputClass} style={inputStyle} value={form.hero_card_subtitle} onChange={e => set('hero_card_subtitle', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Video / Right Panel */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
            <Video size={20} />
          </div>
          <div>
            <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Hero Video (Right Panel)</h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Plays silently on the right side. If none, the animated graphic shows instead.</p>
          </div>
        </div>

        {videoUrl && (
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
            <video src={videoUrl} className="w-full h-48 object-cover" autoPlay muted loop playsInline />
            <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: 'var(--bg)' }}>
              <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                <Check size={12} /> Video active
              </span>
              <button onClick={handleVideoRemove} disabled={removingVideo} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500">
                {removingVideo ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                Remove
              </button>
            </div>
          </div>
        )}

        <div
          onClick={() => videoInputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-brand transition-colors"
          style={{ borderColor: 'var(--border)' }}
        >
          <input ref={videoInputRef} type="file" accept="video/mp4,video/webm,video/mov" className="hidden" onChange={handleVideoUpload} />
          {uploadingVideo ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={28} className="animate-spin text-brand" />
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Uploading video...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload size={28} style={{ color: 'var(--text-muted)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {videoUrl ? 'Click to replace video' : 'Click to upload hero video'}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>MP4, WebM or MOV · Max 50MB</p>
            </div>
          )}
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : 'Save Changes'}
        </button>
        {saved && <span className="text-sm text-emerald-500 flex items-center gap-1"><Check size={14} /> Saved</span>}
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </div>
  )
}
