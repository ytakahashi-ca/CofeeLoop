'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const normalizePhone = (v: string) => v.replace(/[-\s]/g, '')

  const handleLogin = () => {
    setError('')
    const stored = JSON.parse(localStorage.getItem('cl_user') || 'null')
    if (!stored) {
      setError('登録されていません。新規登録をお願いします')
      return
    }
    if (normalizePhone(stored.phone) !== normalizePhone(phone)) {
      setError('電話番号またはパスワードが正しくありません')
      return
    }
    if (stored.password !== password) {
      setError('電話番号またはパスワードが正しくありません')
      return
    }
    sessionStorage.setItem('cl_session', 'true')
    router.push('/profile')
  }

  const canSubmit = normalizePhone(phone).length >= 10 && password.length >= 1

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="flex items-center justify-between px-5 pt-12 pb-4 border-b border-border">
        <Link href="/user" className="w-8 h-8 bg-surface2 border border-border rounded-full flex items-center justify-center text-sm">←</Link>
        <h1 className="font-serif text-lg font-semibold text-text">ログイン</h1>
        <div className="w-8 h-8" />
      </div>

      <div className="flex flex-col gap-6 px-5 pt-8">
        <p className="font-serif text-2xl font-semibold text-text leading-snug">
          おかえりなさい。
        </p>

        <div className="flex flex-col gap-4">
          {/* 電話番号 */}
          <div>
            <label className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2 block">
              電話番号
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => { setPhone(e.target.value); setError('') }}
              placeholder="例：09012345678"
              className="w-full bg-surface2 border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* パスワード */}
          <div>
            <label className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2 block">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              placeholder="パスワードを入力"
              className="w-full bg-surface2 border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {error && (
            <p className="font-mono text-xs text-red-400">{error}</p>
          )}
        </div>

        <button
          onClick={handleLogin}
          disabled={!canSubmit}
          className={`btn-primary ${!canSubmit ? 'opacity-40' : ''}`}
        >
          ログイン →
        </button>

        <p className="font-mono text-xs text-text-muted text-center">
          アカウントをお持ちでない方は{' '}
          <Link href="/register" className="text-accent underline underline-offset-2">新規登録</Link>
        </p>
      </div>
    </div>
  )
}
