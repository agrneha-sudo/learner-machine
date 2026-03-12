import { db } from '@/lib/supabase'
import HeroSettingsForm, { HeroSettings } from '@/components/admin/HeroSettingsForm'

export const dynamic = 'force-dynamic'

export default async function AdminHeroPage() {
  const { data } = await db.from('site_settings').select('key, value')
  const settings = Object.fromEntries((data ?? []).map(r => [r.key, r.value])) as Partial<HeroSettings> & { hero_video_path?: string; hero_image_path?: string }

  const [currentVideoUrl, currentImageUrl] = await Promise.all([
    settings.hero_video_path
      ? db.storage.from('product-files').createSignedUrl(settings.hero_video_path, 3600).then(r => r.data?.signedUrl ?? null)
      : Promise.resolve(null),
    settings.hero_image_path
      ? db.storage.from('product-files').createSignedUrl(settings.hero_image_path, 3600).then(r => r.data?.signedUrl ?? null)
      : Promise.resolve(null),
  ])

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Hero Section
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Edit the homepage hero — headline, description, stats, video and more
        </p>
      </div>
      <HeroSettingsForm initial={settings} currentVideoUrl={currentVideoUrl} currentImageUrl={currentImageUrl} />
    </div>
  )
}
