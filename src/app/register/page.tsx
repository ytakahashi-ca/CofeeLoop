'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [lineLinked, setLineLinked] = useState(false)
  const [code, setCode] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState('')

  const normalizePhone = (v: string) => v.replace(/[-\s]/g, '')

  const handlePhoneChange = (v: string) => {
    const digits = v.replace(/[^\d\-\s]/g, '')
    setPhone(digits)
    setPhoneError('')
  }

  const handleSubmit = () => {
    const normalized = normalizePhone(phone)
    if (!name.trim()) return
    if (normalized.length < 10 || normalized.length > 11) {
      setPhoneError('正しい電話番号を入力してください（10〜11桁）')
      return
    }

    const existing: { code: string; name: string; phone: string } | null =
      JSON.parse(localStorage.getItem('cl_user') || 'null')
    if (existing && normalizePhone(existing.phone) === normalized) {
      setPhoneError('この電話番号はすでに登録されています')
      return
    }

    const newCode = String(Math.floor(Math.random() * 9000) + 1000)
    localStorage.setItem('cl_user', JSON.stringify({
      code: newCode,
      name: name.trim(),
      phone: normalized,
      lineLinked,
    }))
    setCode(newCode)
  }

  const canSubmit = name.trim() && normalizePhone(phone).length >= 10

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

          {/* 電話番号 */}
          <div>
            <label className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2 block">
              電話番号 <span className="text-accent">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => handlePhoneChange(e.target.value)}
              placeholder="例：09012345678"
              className={`w-full bg-surface2 border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none transition-colors ${
                phoneError ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-accent'
              }`}
            />
            {phoneError ? (
              <p className="font-mono text-xs text-red-400 mt-1.5">{phoneError}</p>
            ) : (
              <p className="font-mono text-xs text-text-muted mt-1.5">
                同じ番号での重複登録はできません
              </p>
            )}
          </div>

          {/* LINE 連携 */}
          <div>
            <label className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2 block">
              LINE連携 <span className="text-text-muted">(任意)</span>
            </label>
            {lineLinked ? (
              <div className="flex items-center justify-between bg-[#06c755]/10 border border-[#06c755]/40 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 bg-[#06c755] rounded-md flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M12 2C6.48 2 2 6.08 2 11.1c0 3.53 2.16 6.62 5.41 8.37-.19.71-.7 2.6-.8 3.01-.13.52.19.51.4.37.16-.1 2.6-1.72 3.65-2.41.44.06.89.09 1.34.09 5.52 0 10-4.08 10-9.1C22 6.08 17.52 2 12 2z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#06c755] font-medium">LINE連携済み</p>
                    <p className="font-mono text-xs text-text-muted">新着通知を受け取れます</p>
                  </div>
                </div>
                <button
                  onClick={() => setLineLinked(false)}
                  className="font-mono text-xs text-text-muted underline underline-offset-2"
                >
                  解除
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setLineLinked(true)}
                className="w-full flex items-center justify-center gap-2.5 bg-[#06c755] hover:bg-[#05b34c] active:bg-[#04a044] rounded-xl px-4 py-3.5 transition-colors"
              >
                <div className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M12 2C6.48 2 2 6.08 2 11.1c0 3.53 2.16 6.62 5.41 8.37-.19.71-.7 2.6-.8 3.01-.13.52.19.51.4.37.16-.1 2.6-1.72 3.65-2.41.44.06.89.09 1.34.09 5.52 0 10-4.08 10-9.1C22 6.08 17.52 2 12 2z"/></svg>
                </div>
                <span className="text-white font-medium text-sm tracking-wide">LINEでログイン</span>
              </button>
            )}
            {!lineLinked && (
              <p className="font-mono text-xs text-text-muted mt-1.5 leading-relaxed">
                連携するとお店からの通知を受け取れます
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`btn-primary ${!canSubmit ? 'opacity-40' : ''}`}
        >
          登録して番号を発行 →
        </button>
      </div>
    </div>
  )
}
