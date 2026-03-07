import Link from 'next/link'
import AdminLogoutButton from '@/components/admin/LogoutButton'
import { LayoutDashboard, Package, ShoppingBag, ExternalLink, Settings } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r flex flex-col" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <Link href="/admin" className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-xs">
              LM
            </span>
            <span className="font-display font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
              Admin
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-brand/10 hover:text-brand"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t space-y-1" style={{ borderColor: 'var(--border)' }}>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-brand/10 hover:text-brand"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ExternalLink size={16} />
            View Site
          </Link>
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
