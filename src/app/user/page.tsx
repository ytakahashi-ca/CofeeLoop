'use client'
import Link from 'next/link'

export default function UserHomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 gap-8">
      {/* ロゴ */}
      <div className="text-center">
        <h1 className="font-serif text-5xl font-bold text-accent mb-2">CoffeeLoop.</h1>
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase">
          Specialty Coffee SaaS
        </p>
      </div>

      {/* ユーザーメニュー */}
      <div className="w-full flex flex-col gap-3">
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-1">
          メニュー
        </p>
        <Link href="/record" className="btn-primary text-center block">
          ☕ 来店記録をする
        </Link>
        <Link href="/profile" className="btn-secondary text-center block">
          テイストプロフィール
        </Link>
      </div>

      {/* 戻るリンク */}
      <Link href="/" className="font-mono text-xs text-text-muted underline underline-offset-4">
        ← トップに戻る
      </Link>
    </main>
  )
}
