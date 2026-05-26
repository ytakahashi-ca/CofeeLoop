'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function UserHomePage() {
  const [registered, setRegistered] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('cl_user')
    const session = sessionStorage.getItem('cl_session')
    setRegistered(!!user)
    setLoggedIn(!!session)
  }, [])

  const SHOP_NAME = 'Koffee Mameya'
  const SHOP_TAGLINE = 'Specialty Coffee'

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 gap-8 relative">
      {/* 店舗ロゴ */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-surface2 border border-border flex items-center justify-center text-4xl mx-auto mb-4">
          ☕
        </div>
        <h1 className="font-serif text-3xl font-bold text-text mb-1">{SHOP_NAME}</h1>
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase">{SHOP_TAGLINE}</p>
      </div>

      {/* ユーザーメニュー */}
      <div className="w-full flex flex-col gap-3">
        {loggedIn && (
          <Link href="/profile" className="btn-primary text-center block">
            ポイントカードを見る
          </Link>
        )}
        {registered && !loggedIn && (
          <Link href="/login" className="btn-primary text-center block">
            ログイン
          </Link>
        )}
        {!registered && (
          <Link href="/register" className="btn-secondary text-center block">
            新規登録
          </Link>
        )}
      </div>

      {/* Powered by */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <p className="font-mono text-xs text-text-muted tracking-widest">
          Powered by <span className="text-accent font-semibold">CoffeeLoop.</span>
        </p>
      </div>
    </main>
  )
}
