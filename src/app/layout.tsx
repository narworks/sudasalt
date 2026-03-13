import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, Cinzel, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-accent',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Suda Salt — Türk Kaynak Tuzu | Salt Türk Kaynak Tuzu',
  description: "Suda Salt: Anadolu'nun binlerce yıllık tuz kaynaklarından, doğanın en saf hali. Premium Türk kaynak tuzu. Osmanlı Denizcilik Tarihine Saygıyla.",
  keywords: 'Suda Salt, Türk kaynak tuzu, doğal tuz, premium tuz, Anadolu tuzu, kaynak tuzu, Osmanlı, Şirket-i Hayriye',
  authors: [{ name: 'sudasalt.com' }],
  icons: {
    icon: '/assets/images/logo.webp',
    apple: '/assets/images/logo.webp',
  },
  openGraph: {
    type: 'website',
    title: 'Suda Salt — Türk Kaynak Tuzu',
    description: "Anadolu'nun binlerce yıllık tuz kaynaklarından, doğanın en saf hali. Osmanlı Denizcilik Tarihine Saygıyla.",
    url: 'https://sudasalt.com/',
    siteName: 'Suda Salt',
    locale: 'tr_TR',
    images: [
      {
        url: 'https://sudasalt.com/assets/svg/og-image.svg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suda Salt — Türk Kaynak Tuzu',
    description: "Anadolu'nun binlerce yıllık tuz kaynaklarından, doğanın en saf hali.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`${playfair.variable} ${cormorant.variable} ${cinzel.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  )
}
