export type ProductCategory = 'ebook' | 'course' | 'training' | 'bundle'

export interface Product {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  price: number
  original_price?: number
  currency: string
  category: ProductCategory
  cover_gradient: string
  cover_emoji: string
  features: string[]
  featured: boolean
  badge?: string
  language: string
  pages?: number
  duration?: string
  file_path?: string | null  // path inside Supabase storage bucket (PDF)
  cover_image_path?: string | null  // path inside Supabase storage (cover image)
  cover_image_url?: string | null   // signed URL for preview (not stored in DB)
  published: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  product_id: string
  product_title: string
  customer_email: string
  customer_name?: string
  amount: number
  currency: string
  razorpay_order_id?: string
  razorpay_payment_id?: string
  status: 'pending' | 'paid' | 'failed'
  created_at: string
}
