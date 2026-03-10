/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Product card gradients — sourced from DB, invisible to Tailwind's build-time scanner
    'from-violet-600', 'via-purple-600', 'to-indigo-700',
    'from-orange-500', 'via-red-500', 'to-pink-600',
    'from-emerald-500', 'via-teal-500', 'to-cyan-600',
    'from-blue-600', 'via-indigo-600', 'to-purple-700',
    'from-rose-500', 'via-pink-500', 'to-fuchsia-600',
    'from-amber-500', 'via-orange-500', 'to-red-600',
    'from-slate-800', 'via-slate-700', 'to-orange-600',
    'from-gray-900', 'via-gray-800', 'to-orange-500',
    'from-yellow-500', 'via-amber-500', 'to-orange-600',
    'from-green-600', 'via-emerald-600', 'to-teal-700',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        brand: '#c2520c',
        'brand-dark': '#a34108',
      },
    },
  },
  plugins: [],
}
