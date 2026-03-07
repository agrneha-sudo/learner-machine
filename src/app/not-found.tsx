import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-display text-8xl font-bold text-brand mb-4">404</div>
        <h1 className="text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          Page not found
        </h1>
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
          The page you're looking for doesn't exist.
        </p>
        <Link href="/" className="btn-primary">
          <ArrowLeft size={16} />
          Go Home
        </Link>
      </div>
    </div>
  )
}
