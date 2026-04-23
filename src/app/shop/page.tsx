'use client'
import Link from 'next/link'

const BEANS = [
  { name: 'エチオピア イルガチェフェ', detail: 'ナチュラル / エチオピア', roast: '浅煎り', orders: 7, icon: '🌱' },
  { name: 'ケニア AA',               detail: 'ウォッシュド / ケニア',    roast: '中煎り', orders: 4, icon: '☕' },
  { name: 'コロンビア ナリーニョ',     detail: 'ハニー / コロンビア',     roast: '浅煎り', orders: 2, icon: '🍂' },
  { name: 'グアテマラ アンティグア',   detail: 'ウォッシュド / グアテマラ', roast: '中深煎り', orders: 1, icon: '🌙' },
]

const CUSTOMERS = [
  { name: '常連 A', tags: ['🍊 フルーティ', '✨ すっきり'], days: '3日前', status: 'active' },
  { name: '常連 B', tags: ['🍫 チョコっぽい', '💧 コクがある'], days: '8日前', status: 'warn' },
  { name: '常連 C', tags: ['🌰 ナッツっぽい'], days: '12日前', status: 'warn' },
  { name: '常連 D', tags: ['🍊 フルーティ', '🌰 ナッツっぽい'], days: '2日前', status: 'active' },
]

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#141a16] pb-24">
      {/* ショップヘッダー */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4 border-b border-[#364a40]">
        <div>
          <h1 className="font-serif text-lg font-semibold text-[#eaf4f0]">Koffee Mameya</h1>
          <p className="font-mono text-xs text-[#5e8070]">2026.04.20 — 月曜日</p>
        </div>
        <div className="w-10 h-10 bg-[#232e28] border border-[#364a40] rounded-full flex items-center justify-center text-xl">☕</div>
      </div>

      <div className="flex flex-col gap-4 px-5 pt-4">

        {/* 本日の状況 */}
        <div>
          <p className="font-mono text-xs text-[#5e8070] uppercase tracking-widest mb-2">本日の状況</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: '18', label: '来店数', alert: false },
              { val: '14', label: '記録数', alert: false },
              { val: '4',  label: '要通知', alert: true },
            ].map(stat => (
              <div key={stat.label} className={`rounded-2xl p-3 text-center border ${
                stat.alert
                  ? 'bg-[#e8a878]/5 border-[#e8a878]'
                  : 'bg-[#232e28] border-[#364a40]'
              }`}>
                <p className={`font-serif text-3xl font-bold ${stat.alert ? 'text-[#e8a878]' : 'text-[#80c4a0]'}`}>{stat.val}</p>
                <p className="font-mono text-xs text-[#5e8070]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 本日のラインナップ */}
        <div>
          <p className="font-mono text-xs text-[#5e8070] uppercase tracking-widest mb-2">本日のラインナップ</p>
          <div className="bg-[#232e28] border border-[#364a40] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#364a40]">
              <span className="font-mono text-xs text-[#5e8070] uppercase tracking-widest">提供中 4種</span>
              <span className="font-mono text-xs text-[#80c4a0] bg-[#80c4a0]/10 border border-[#6ab08a]/20 px-2 py-0.5 rounded">編集</span>
            </div>
            {BEANS.map((bean, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < BEANS.length - 1 ? 'border-b border-[#364a40]' : ''}`}>
                <div className="w-8 h-8 bg-[#2c3c34] border border-[#364a40] rounded-xl flex items-center justify-center text-base flex-shrink-0">
                  {bean.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#eaf4f0]">{bean.name}</p>
                  <p className="font-mono text-xs text-[#5e8070]">{bean.detail}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-xs text-[#5e8070] bg-[#2c3c34] border border-[#364a40] px-2 py-0.5 rounded">{bean.roast}</span>
                  <span className="font-mono text-xs text-[#80c4a0]">{bean.orders}杯</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-dashed border-[#364a40]">
              <span className="font-mono text-xs text-[#5e8070]">＋ 豆を追加する</span>
            </div>
          </div>
        </div>

        {/* アクション: 新豆マッチ */}
        <div className="bg-[#80c4a0]/4 border border-[#6ab08a] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-[#80c4a0] bg-[#80c4a0]/15 border border-[#6ab08a]/20 px-2 py-0.5 rounded uppercase tracking-widest">新豆マッチ</span>
            <span className="font-mono text-xs text-[#5e8070]">対象 7人</span>
          </div>
          <p className="text-sm text-[#eaf4f0] mb-1 leading-snug">フルーティ系が好きな顧客に<br />イルガチェフェを通知できます</p>
          <p className="font-mono text-xs text-[#5e8070] mb-3 leading-relaxed">好みタグ「フルーティ」「すっきり」<br />が多い顧客に自動マッチ済み</p>
          <button className="w-full bg-[#80c4a0] text-[#0e1210] font-mono text-xs uppercase tracking-widest py-3 rounded-xl">
            通知を送る →
          </button>
        </div>

        {/* アクション: 未来店 */}
        <div className="bg-[#e8a878]/4 border border-[#e8a878] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-[#e8a878] bg-[#e8a878]/15 border border-[#e8a878]/20 px-2 py-0.5 rounded uppercase tracking-widest">未来店</span>
            <span className="font-mono text-xs text-[#5e8070]">対象 4人</span>
          </div>
          <p className="text-sm text-[#eaf4f0] mb-1 leading-snug">7日以上来店がない<br />顧客がいます</p>
          <p className="font-mono text-xs text-[#5e8070] mb-3 leading-relaxed">最終来店から7日以上経過。<br />再来店を促す通知を送りましょう。</p>
          <button className="w-full bg-[#e8a878] text-[#0e1210] font-mono text-xs uppercase tracking-widest py-3 rounded-xl">
            リマインドを送る →
          </button>
        </div>

        {/* 顧客リスト */}
        <div>
          <p className="font-mono text-xs text-[#5e8070] uppercase tracking-widest mb-2">顧客リスト</p>
          <div className="bg-[#232e28] border border-[#364a40] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#364a40]">
              <span className="font-mono text-xs text-[#5e8070] uppercase tracking-widest">来店頻度順</span>
              <span className="font-mono text-xs text-[#80c4a0]">並び替え ↕</span>
            </div>
            {CUSTOMERS.map((c, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < CUSTOMERS.length - 1 ? 'border-b border-[#364a40]' : ''}`}>
                <div className="w-7 h-7 bg-[#2c3c34] border border-[#364a40] rounded-full flex items-center justify-center font-mono text-xs text-[#8caa9a] flex-shrink-0">
                  {c.name.slice(-1)}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#eaf4f0] mb-1">{c.name}</p>
                  <div className="flex flex-wrap gap-1">
                    {c.tags.map(tag => (
                      <span key={tag} className="font-mono text-xs text-[#5e8070] bg-[#2c3c34] border border-[#364a40] px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-xs text-[#5e8070]">{c.days}</span>
                  <span className={`font-mono text-xs px-1.5 py-0.5 rounded ${
                    c.status === 'active'
                      ? 'text-[#80c4a0] bg-[#80c4a0]/10 border border-[#6ab08a]/20'
                      : 'text-[#e8a878] bg-[#e8a878]/10 border border-[#e8a878]/20'
                  }`}>
                    {c.status === 'active' ? 'アクティブ' : '要通知'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* タブバー */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm flex border-t border-[#364a40] bg-[#1c2420] pt-2.5 pb-1">
        {[
          { icon: '📊', label: 'ホーム', active: true },
          { icon: '👥', label: '顧客', active: false },
          { icon: '🔔', label: '通知', active: false },
          { icon: '⚙', label: '設定', active: false },
        ].map(tab => (
          <button key={tab.label} className="flex-1 flex flex-col items-center gap-0.5">
            <span className="text-base">{tab.icon}</span>
            <span className={`font-mono text-xs ${tab.active ? 'text-[#80c4a0]' : 'text-[#5e8070]'}`}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
