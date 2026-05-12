'use client'
import Link from 'next/link'

const STAMPS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  type: i < 7 ? 'purchase' : 'empty',
}))

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg pb-24">
      {/* ナビゲーション */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <Link href="/" className="w-8 h-8 bg-surface2 border border-border rounded-full flex items-center justify-center text-sm">←</Link>
        <h1 className="font-serif text-lg font-semibold text-text">マイプロフィール</h1>
        <div className="w-8 h-8 bg-surface2 border border-border rounded-full flex items-center justify-center text-sm text-text-muted">⋯</div>
      </div>

      <div className="flex flex-col gap-4 px-5">

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
              <p className="font-mono text-sm text-gold font-medium">7 / 10</p>
              <p className="font-mono text-xs text-[#a08852]">あと3つで特典</p>
            </div>
          </div>

          {/* スタンプグリッド */}
          <div className="grid grid-cols-5 gap-2 mb-3">
            {STAMPS.map(stamp => (
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
            <div className="h-full bg-gradient-to-r from-[#c08c28] to-[#e0c040] rounded" style={{ width: '70%' }} />
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
            <span className="font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">最新5件</span>
          </div>
          <div className="flex flex-col divide-y divide-border">
            {[
              { name: 'エチオピア イルガチェフェ', detail: '浅煎り / ナチュラル — 今日', rating: '好き', ratingColor: 'text-accent' },
              { name: 'ケニア AA',               detail: '中煎り / ウォッシュド — 3日前', rating: '好き', ratingColor: 'text-accent' },
              { name: 'グアテマラ アンティグア',   detail: '中深煎り — 1週間前', rating: 'ふつう', ratingColor: 'text-text-muted' },
              { name: 'コロンビア ナリーニョ',     detail: '浅煎り / ハニー — 10日前', rating: '好き', ratingColor: 'text-accent' },
              { name: 'ブラジル セラード',         detail: '深煎り / ナチュラル — 2週間前', rating: 'ふつう', ratingColor: 'text-text-muted' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${i === 0 ? 'bg-accent' : 'bg-accent-dark'}`} />
                <div className="flex-1">
                  <p className="text-xs text-text">{item.name}</p>
                  <p className="font-mono text-xs text-text-muted">{item.detail}</p>
                </div>
                <span className={`text-xs ${item.ratingColor} bg-accent/10 border border-accent/15 px-2 py-0.5 rounded-full`}>
                  {item.rating}
                </span>
              </div>
            ))}
          </div>
          <p className="font-mono text-xs text-accent text-center mt-3">全件見る →</p>
        </div>

      </div>

      {/* タブバー */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm flex border-t border-border bg-surface pt-2.5 pb-1">
        {[
          { href: '/', icon: '🏠', label: 'ホーム', active: false },
          { href: '/profile', icon: '☕', label: 'プロフィール', active: true },
          { href: '/notifications', icon: '🔔', label: '通知', active: false },
          { href: '#', icon: '⚙', label: '設定', active: false },
        ].map(tab => (
          <Link key={tab.label} href={tab.href} className="flex-1 flex flex-col items-center gap-0.5">
            <span className="text-lg">{tab.icon}</span>
            <span className={`font-mono text-xs ${tab.active ? 'text-accent' : 'text-text-muted'}`}>{tab.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
