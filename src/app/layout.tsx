import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Learner Machine — AI, Business & Side Hustle Resources',
  description:
    'Learn AI, build online businesses, and grow your side hustle with ebooks, courses, and training programs in Hindi & English.',
  keywords: ['AI learning', 'side hustle', 'online business', 'Hindi courses', 'ebooks', 'digital products'],
  openGraph: {
    title: 'Learner Machine — AI, Business & Side Hustle Resources',
    description: 'Learn AI, build online businesses, and grow your side hustle.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${playfair.variable}`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
