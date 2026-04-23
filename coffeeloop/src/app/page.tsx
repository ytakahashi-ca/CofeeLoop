'use client'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 gap-8">
      {/* ロゴ */}
      <div className="text-center">
        <h1 className="font-serif text-5xl font-bold text-accent mb-2">CoffeeLoop.</h1>
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase">
          Specialty Coffee SaaS
        </p>
      </div>

      {/* ユーザー側 */}
      <div className="w-full flex flex-col gap-3">
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-1">
          ユーザー
        </p>
        <Link href="/record" className="btn-primary text-center block">
          ☕ 来店記録をする
        </Link>
        <Link href="/profile" className="btn-secondary text-center block">
          テイストプロフィール
        </Link>
      </div>

      {/* 区切り */}
      <div className="w-full border-t border-border" />

      {/* 店側 */}
      <div className="w-full flex flex-col gap-3">
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-1">
          店舗オーナー
        </p>
        <Link href="/shop" className="btn-secondary text-center block">
          📊 ダッシュボード
        </Link>
      </div>
    </main>
  )
}
