'use client'
import Link from 'next/link'

const STAMPS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  type: i < 6 ? 'purchase' : i === 6 ? 'bonus' : 'empty',
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
        <div className="bg-gradient-to-br from-[#2a1e10] to-[#3a2810] border border-[#5a4020] rounded-2xl p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-mono text-xs text-[#8a7040] uppercase tracking-widest mb-1">スタンプカード</p>
              <p className="font-serif text-base text-[#f0d060]">Koffee Mameya</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm text-gold font-medium">7 / 10</p>
              <p className="font-mono text-xs text-[#8a7040]">あと3つで特典</p>
            </div>
          </div>

          {/* スタンプグリッド */}
          <div className="grid grid-cols-5 gap-2 mb-3">
            {STAMPS.map(stamp => (
              <div key={stamp.id} className={`aspect-square rounded-full flex items-center justify-center text-lg border ${
                stamp.type === 'purchase'
                  ? 'bg-gradient-to-br from-[#e8c040] to-[#a87820] border-[#d4af37] shadow-md'
                  : stamp.type === 'bonus'
                  ? 'bg-gradient-to-br from-[#d4956a] to-[#8a4820] border-accent'
                  : 'bg-[#221508] border-[#5a4020]'
              }`}>
                {stamp.type === 'purchase' ? '☕' : stamp.type === 'bonus' ? '★' : ''}
              </div>
            ))}
          </div>

          {/* バー */}
          <div className="bg-[#221508] rounded h-1 mb-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#a87820] to-[#d4af37] rounded" style={{ width: '70%' }} />
          </div>

          {/* 特典 */}
          <div className="flex items-center gap-2 bg-gold/5 border border-gold/15 rounded-xl px-3 py-2">
            <span className="text-sm">🎁</span>
            <span className="font-mono text-xs text-[#a09050] flex-1">10杯達成で特典</span>
            <span className="text-sm text-[#f0d060]">無料ドリンク 1杯</span>
          </div>

          {/* 凡例 */}
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5 font-mono text-xs text-[#8a7040]">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#e8c040] to-[#a87820]" />
              購入スタンプ
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs text-[#8a7040]">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#d4956a] to-[#8a4820]" />
              記録ボーナス
            </div>
          </div>
        </div>

        {/* レーダーチャート */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest">テイストプロフィール</p>
            <span className="font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">18杯記録</span>
          </div>
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 180 180" className="w-44 h-44">
              <polygon points="90,15 155,52.5 155,127.5 90,165 25,127.5 25,52.5" fill="none" stroke="#3d3028" strokeWidth="1"/>
              <polygon points="90,37 132,60 132,120 90,143 48,120 48,60" fill="none" stroke="#3d3028" strokeWidth="0.6"/>
              <polygon points="90,59 109,70 109,110 90,121 71,110 71,70" fill="none" stroke="#3d3028" strokeWidth="0.4"/>
              <line x1="90" y1="15" x2="90" y2="165" stroke="#3d3028" strokeWidth="0.5"/>
              <line x1="25" y1="52.5" x2="155" y2="127.5" stroke="#3d3028" strokeWidth="0.5"/>
              <line x1="25" y1="127.5" x2="155" y2="52.5" stroke="#3d3028" strokeWidth="0.5"/>
              <polygon points="90,22 140,72 100,138 50,105" fill="#d4956a" fillOpacity="0.18" stroke="#d4956a" strokeWidth="2"/>
              <circle cx="90" cy="22" r="4" fill="#d4956a"/>
              <circle cx="140" cy="72" r="4" fill="#d4956a"/>
              <circle cx="100" cy="138" r="4" fill="#d4956a"/>
              <circle cx="50" cy="105" r="4" fill="#d4956a"/>
              <text x="90" y="10" textAnchor="middle" fontFamily="DM Mono" fontSize="10" fill="#a89080">酸味</text>
              <text x="162" y="76" fontFamily="DM Mono" fontSize="10" fill="#a89080">苦味</text>
              <text x="162" y="132" fontFamily="DM Mono" fontSize="10" fill="#a89080">コク</text>
              <text x="18" y="110" textAnchor="end" fontFamily="DM Mono" fontSize="10" fill="#a89080">甘み</text>
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: '酸味', val: '82%', opacity: 1 },
              { name: '苦味', val: '44%', opacity: 0.5 },
              { name: 'コク', val: '60%', opacity: 0.7 },
              { name: '甘み', val: '38%', opacity: 0.4 },
            ].map(axis => (
              <div key={axis.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm bg-accent flex-shrink-0" style={{ opacity: axis.opacity }} />
                <span className="font-mono text-xs text-text-muted flex-1">{axis.name}</span>
                <span className="font-mono text-xs text-accent">{axis.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* タグランキング */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest">よく選ぶ味タグ</p>
            <span className="font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">TOP 3</span>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { rank: '01', name: '🍊 フルーティ', count: '11回', pct: 88 },
              { rank: '02', name: '✨ すっきり',   count: '7回',  pct: 56 },
              { rank: '03', name: '🌰 ナッツっぽい', count: '4回', pct: 32 },
            ].map(tag => (
              <div key={tag.rank} className="flex items-center gap-2">
                <span className="font-mono text-xs text-text-muted w-5">{tag.rank}</span>
                <span className="text-sm text-text-sub w-28">{tag.name}</span>
                <div className="flex-1 bg-surface3 h-1 rounded overflow-hidden">
                  <div className="h-full bg-accent rounded" style={{ width: `${tag.pct}%`, opacity: 0.7 }} />
                </div>
                <span className="font-mono text-xs text-text-muted w-8 text-right">{tag.count}</span>
              </div>
            ))}
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
          { href: '#', icon: '🔔', label: '通知', active: false },
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
