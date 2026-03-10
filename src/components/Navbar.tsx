'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const navLinks = [
  { href: '/#products', label: 'Products' },
  { href: '/#topics', label: 'Topics' },
  { href: '/#why-us', label: 'Why Us' },
  { href: '/#about', label: 'About' },
  { href: '/#testimonials', label: 'Reviews' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-28 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.png" alt="Learner Machine" width={280} height={112} className="h-24 w-auto object-contain" priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:text-brand"
              style={{ color: 'var(--text-secondary)' }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link href="/#products" className="hidden md:flex btn-primary text-sm py-2.5 px-5 rounded-xl">
            Shop Now
          </Link>
          <button
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ color: 'var(--text-primary)' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-1" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm font-medium px-3 py-3 rounded-xl hover:text-brand transition-colors"
              style={{ color: 'var(--text-primary)' }} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/#products" className="btn-primary text-sm mt-2" onClick={() => setMenuOpen(false)}>
            Shop Now
          </Link>
        </div>
      )}
    </nav>
  )
}
