import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta http-equiv='cache-control' content='no-cache'></meta>
<meta http-equiv='expires' content='0'></meta>
<meta http-equiv='pragma' content='no-cache'></meta>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
