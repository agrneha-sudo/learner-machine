import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy singleton — only instantiated at runtime, not build time
let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
    }
    _client = createClient(url, key, { auth: { persistSession: false } })
  }
  return _client
}

// Convenience alias
export const db = {
  from: (...args: Parameters<SupabaseClient['from']>) => getSupabase().from(...args),
  storage: {
    from: (...args: Parameters<SupabaseClient['storage']['from']>) => getSupabase().storage.from(...args),
  },
}
