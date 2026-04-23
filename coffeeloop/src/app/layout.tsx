import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CoffeeLoop',
  description: 'スペシャリティカフェ向け顧客行動設計プラットフォーム',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-bg">
        <div className="max-w-sm mx-auto min-h-screen relative">
          {children}
        </div>
      </body>
    </html>
  )
}
