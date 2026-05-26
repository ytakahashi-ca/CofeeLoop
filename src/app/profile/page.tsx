'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const STAMP_MAX = 10

type HistoryEntry = {
  beanId: string
  beanName: string
  detail: string
  rating: string
  tags: string[]
  date: string
  timestamp: number
}


export default function ProfilePage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [myCode, setMyCode] = useState('')
  const [myName, setMyName] = useState('')
  const [stampsCount, setStampsCount] = useState(0)
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    const user: { code: string; name: string } | null = JSON.parse(localStorage.getItem('cl_user') || 'null')
    if (!user) {
      router.replace('/register')
      return
    }
    const session = sessionStorage.getItem('cl_session')
    if (!session) {
      router.replace('/login')
      return
    }
    const code = user.code
    setMyCode(code)
    setMyName(user.name)

    const stored: Record<string, number> = JSON.parse(localStorage.getItem('cl_stamps') || '{}')
    if (stored[code] !== undefined) setStampsCount(stored[code])

    const hist: HistoryEntry[] = JSON.parse(localStorage.getItem('cl_history') || '[]')
    setHistory(hist)
    setReady(true)
  }, [])

  if (!ready) return <div className="min-h-screen bg-bg" />

  const stamps = Array.from({ length: STAMP_MAX }, (_, i) => ({
    id: i,
    type: i < stampsCount ? 'purchase' : 'empty',
  }))
  const remaining = Math.max(0, STAMP_MAX - stampsCount)
  const pct = Math.min(100, Math.round((stampsCount / STAMP_MAX) * 100))

  return (
    <div className="flex flex-col min-h-screen bg-bg pb-8">
      {/* ナビゲーション */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <Link href="/" className="w-8 h-8 bg-surface2 border border-border rounded-full flex items-center justify-center text-sm">←</Link>
        <h1 className="font-serif text-lg font-semibold text-text">マイプロフィール</h1>
        <Link href="/notifications" className="w-8 h-8 bg-surface2 border border-border rounded-full flex items-center justify-center text-sm">🔔</Link>
      </div>

      <div className="flex flex-col gap-4 px-5">

        {/* あなたの番号 */}
        <div className="bg-surface2 border border-border rounded-2xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-1">あなたの番号</p>
            <p className="font-mono text-xs text-text-muted leading-relaxed">来店時にバリスタへ伝えてください</p>
          </div>
          <p className="font-serif text-4xl font-bold text-accent tracking-[0.2em]">{myCode}</p>
        </div>

        {/* 一言サマリー */}
        <div className="bg-gradient-to-br from-surface2 to-surface3 border border-border rounded-2xl p-4 flex items-center gap-3">
          <span className="text-3xl">☕</span>
          <div>
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-1">一言サマリー</p>
            <p className="font-serif text-base text-accent2 leading-snug">最近はフルーティ系が<br />多めです</p>
          </div>
        </div>

        {/* スタンプカード */}
        <div className="bg-gradient-to-br from-[#38261a] to-[#4c3420] border border-[#6e5030] rounded-2xl p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-mono text-xs text-[#a08852] uppercase tracking-widest mb-1">スタンプカード</p>
              <p className="font-serif text-base text-[#f8e068]">Koffee Mameya</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm text-gold font-medium">{stampsCount} / {STAMP_MAX}</p>
              <p className="font-mono text-xs text-[#a08852]">
                {remaining > 0 ? `あと${remaining}つで特典` : '特典達成！'}
              </p>
            </div>
          </div>

          {/* スタンプグリッド */}
          <div className="grid grid-cols-5 gap-2 mb-3">
            {stamps.map(stamp => (
              <div key={stamp.id} className={`aspect-square rounded-full flex items-center justify-center text-lg border ${
                stamp.type === 'purchase'
                  ? 'bg-gradient-to-br from-[#f0cc50] to-[#c08c28] border-[#e0c040] shadow-md'
                  : 'bg-[#301c0c] border-[#6e5030]'
              }`}>
                {stamp.type === 'purchase' ? '☕' : ''}
              </div>
            ))}
          </div>

          {/* バー */}
          <div className="bg-[#301c0c] rounded h-1 mb-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#c08c28] to-[#e0c040] rounded" style={{ width: `${pct}%` }} />
          </div>

          {/* 特典 */}
          <div className="flex items-center gap-2 bg-gold/5 border border-gold/15 rounded-xl px-3 py-2">
            <span className="text-sm">🎁</span>
            <span className="font-mono text-xs text-[#baa860] flex-1">10杯達成で特典</span>
            <span className="text-sm text-[#f8e068]">無料ドリンク 1杯</span>
          </div>

          {/* 凡例 */}
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5 font-mono text-xs text-[#a08852]">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#f0cc50] to-[#c08c28]" />
              購入スタンプ
            </div>
          </div>
        </div>

        {/* 豆の履歴 */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest">飲んだ豆の履歴</p>
            <div className="flex items-center gap-2">
              {history.length > 0 && (
                <span className="font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">最新{history.slice(0, 5).length}件</span>
              )}
              <Link href="/record" className="font-mono text-xs text-bg bg-accent px-2.5 py-1 rounded-full">
                ＋ 追加
              </Link>
            </div>
          </div>
          {history.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-sm text-text-muted">まだ記録がありません</p>
              <p className="font-mono text-xs text-text-muted mt-1">＋ 追加から記録してみましょう</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col divide-y divide-border">
                {history.slice(0, 5).map((item, i) => {
                  const ratingColor = item.rating === '好き' ? 'text-accent' : item.rating === '× 苦手' ? 'text-red-400' : 'text-text-muted'
                  return (
                    <div key={i} className="flex items-center gap-3 py-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${i === 0 ? 'bg-accent' : 'bg-accent-dark'}`} />
                      <div className="flex-1">
                        <p className="text-xs text-text">{item.beanName}</p>
                        <p className="font-mono text-xs text-text-muted">{item.detail} — {item.date}</p>
                      </div>
                      <span className={`text-xs ${ratingColor} bg-accent/10 border border-accent/15 px-2 py-0.5 rounded-full`}>
                        {item.rating}
                      </span>
                    </div>
                  )
                })}
              </div>
              <p className="font-mono text-xs text-accent text-center mt-3">全件見る →</p>
            </>
          )}
        </div>

      </div>

    </div>
  )
}
