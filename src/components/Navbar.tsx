'use client'

import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import { Sun, Moon, Menu, X, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 85%, transparent)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-sm shrink-0">
            LM
          </span>
          <span className="font-display font-bold text-lg hidden sm:block" style={{ color: 'var(--text-primary)' }}>
            Learner Machine
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { href: '/#products', label: 'Products' },
            { href: '/#about', label: 'About' },
            { href: '/#testimonials', label: 'Reviews' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-brand/10 hover:text-brand transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-brand/10"
            aria-label="Toggle theme"
          >
            {theme === 'dark'
              ? <Sun size={17} style={{ color: 'var(--text-secondary)' }} />
              : <Moon size={17} style={{ color: 'var(--text-secondary)' }} />
            }
          </button>

          <Link href="/#products" className="hidden md:flex btn-primary text-sm py-2 px-4">
            <ShoppingBag size={15} />
            Browse Products
          </Link>

          <button
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen
              ? <X size={20} style={{ color: 'var(--text-primary)' }} />
              : <Menu size={20} style={{ color: 'var(--text-primary)' }} />
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-1" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          {[
            { href: '/#products', label: 'Products' },
            { href: '/#about', label: 'About' },
            { href: '/#testimonials', label: 'Reviews' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium px-3 py-3 rounded-xl hover:bg-brand/10 hover:text-brand transition-colors"
              style={{ color: 'var(--text-primary)' }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/#products" className="btn-primary text-sm mt-2" onClick={() => setMenuOpen(false)}>
            Browse Products
          </Link>
        </div>
      )}
    </nav>
  )
}
