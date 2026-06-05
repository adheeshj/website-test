import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jyoti Music | Premium Guitar & Music Instruments Store in Pune',
  description:
    'Your music starts here. Visit Jyoti Music at Camp, Pune for premium guitars, strings, and music accessories. Rated 4.8★ by 607+ customers.',
  keywords: [
    'guitar store pune',
    'music instruments pune',
    'acoustic guitar',
    'guitar accessories',
    'jyoti music',
  ],
  openGraph: {
    title: 'Jyoti Music | Premium Guitar & Music Instruments Store in Pune',
    description:
      'Your music starts here. Premium guitars, strings, and accessories at Camp, Pune.',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} scroll-smooth bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
