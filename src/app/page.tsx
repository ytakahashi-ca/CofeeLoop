'use client'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 gap-10">
      {/* ロゴ */}
      <div className="text-center">
        <h1 className="font-serif text-5xl font-bold text-accent mb-2">CoffeeLoop.</h1>
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase">
          Specialty Coffee SaaS
        </p>
      </div>

      <p className="font-sans text-sm text-text-muted text-center">
        ご利用の方法を選択してください
      </p>

      {/* ロール選択 */}
      <div className="w-full flex flex-col gap-4">
        <Link href="/user" className="btn-primary text-center block py-5">
          <span className="block text-lg mb-1">☕ ユーザーとして使う</span>
          <span className="block font-mono text-xs opacity-70 tracking-wide">来店記録・テイストプロフィール</span>
        </Link>

        <Link href="/shop" className="btn-secondary text-center block py-5">
          <span className="block text-lg mb-1">📊 店舗オーナーとして使う</span>
          <span className="block font-mono text-xs opacity-70 tracking-wide">ダッシュボード・顧客管理</span>
        </Link>
      </div>
    </main>
  )
}
