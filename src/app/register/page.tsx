'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [lineId, setLineId] = useState('')
  const [code, setCode] = useState<string | null>(null)

  const handleSubmit = () => {
    if (!name.trim()) return
    const num = Math.floor(Math.random() * 9000) + 1000
    const newCode = String(num)
    localStorage.setItem('cl_user', JSON.stringify({ code: newCode, name: name.trim() }))
    setCode(newCode)
  }

  if (code) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg px-6 gap-8 text-center">
        <div className="w-16 h-16 bg-green/10 border border-green rounded-full flex items-center justify-center text-2xl">
          ✓
        </div>
        <div>
          <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3">登録完了</p>
          <p className="font-serif text-lg text-text mb-6">{name} さん、ようこそ</p>
          <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3">あなたの番号</p>
          <div className="bg-surface2 border border-accent/40 rounded-2xl px-10 py-8 mb-4">
            <p className="font-mono text-6xl font-bold text-accent tracking-[0.3em]">{code}</p>
          </div>
          <p className="text-sm text-text-sub leading-relaxed">
            来店時にバリスタにこの番号を<br />お伝えください
          </p>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Link href="/user" className="btn-primary text-center block">
            ホームへ
          </Link>
          <button
            onClick={() => { setCode(null); setName(''); setLineId('') }}
            className="btn-secondary"
          >
            別のアカウントを登録
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="flex items-center justify-between px-5 pt-12 pb-4 border-b border-border">
        <Link href="/" className="w-8 h-8 bg-surface2 border border-border rounded-full flex items-center justify-center text-sm">←</Link>
        <h1 className="font-serif text-lg font-semibold text-text">新規登録</h1>
        <div className="w-8 h-8" />
      </div>

      <div className="flex flex-col gap-6 px-5 pt-8">
        <div>
          <p className="font-serif text-2xl font-semibold text-text leading-snug mb-2">
            はじめまして。<br />まずは登録を。
          </p>
          <p className="font-mono text-xs text-text-muted leading-relaxed">
            登録後に発行される4桁の番号を<br />来店時にバリスタへお伝えください。
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* 名前 */}
          <div>
            <label className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2 block">
              お名前 <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="例：田中 さくら"
              className="w-full bg-surface2 border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* LINE ID */}
          <div>
            <label className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2 block">
              LINE ID <span className="text-text-muted">(任意)</span>
            </label>
            <input
              type="text"
              value={lineId}
              onChange={e => setLineId(e.target.value)}
              placeholder="例：@coffeelover"
              className="w-full bg-surface2 border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <p className="font-mono text-xs text-text-muted mt-1.5 leading-relaxed">
              登録するとお店からの通知を受け取れます
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className={`btn-primary ${!name.trim() ? 'opacity-40' : ''}`}
        >
          登録して番号を発行 →
        </button>
      </div>
    </div>
  )
}
