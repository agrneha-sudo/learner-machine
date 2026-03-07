import { db } from '@/lib/supabase'
import AdminSettingsForm from '@/components/admin/SettingsForm'

export const dynamic = 'force-dynamic'

export default async function AdminSettingsPage() {
  const { data } = await db.from('site_settings').select('key, value')
  const settings = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]))

  // Generate a signed URL for the current video if it exists
  let heroVideoUrl: string | null = null
  if (settings.hero_video_path) {
    const { data: signed } = await db.storage
      .from('product-files')
      .createSignedUrl(settings.hero_video_path, 3600)
    heroVideoUrl = signed?.signedUrl ?? null
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Site Settings
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Manage your hero video and site-wide settings
        </p>
      </div>
      <AdminSettingsForm currentVideoPath={settings.hero_video_path ?? null} currentVideoUrl={heroVideoUrl} />
    </div>
  )
}
