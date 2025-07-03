import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DASHBOARD',
  description: 'Created BY Rounak Gadling',
  generator: 'USER',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
