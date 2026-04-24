'use client'
import Link from 'next/link'

const CUSTOMERS = [
  { name: '常連 A', tags: ['🍊 フルーティ', '✨ すっきり'], days: '3日前', status: 'active' },
  { name: '常連 B', tags: ['🍫 チョコっぽい', '💧 コクがある'], days: '8日前', status: 'warn' },
  { name: '常連 C', tags: ['🌰 ナッツっぽい'], days: '12日前', status: 'warn' },
  { name: '常連 D', tags: ['🍊 フルーティ', '🌰 ナッツっぽい'], days: '2日前', status: 'active' },
]

export default function CustomersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#141a16] pb-24">
      <div className="flex items-center justify-between px-5 pt-12 pb-4 border-b border-[#364a40]">
        <Link href="/shop" className="w-8 h-8 bg-[#232e28] border border-[#364a40] rounded-full flex items-center justify-center text-sm text-[#eaf4f0]">←</Link>
        <h1 className="font-serif text-lg font-semibold text-[#eaf4f0]">顧客リスト</h1>
        <div className="w-8 h-8" />
      </div>

      <div className="flex flex-col gap-4 px-5 pt-4">
        <div>
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
          { href: '/shop', icon: '📊', label: 'ホーム', active: false },
          { href: '/shop/customers', icon: '👥', label: '顧客', active: true },
          { href: '/shop/notifications', icon: '🔔', label: '通知', active: false },
          { href: '#', icon: '⚙', label: '設定', active: false },
        ].map(tab => (
          <Link key={tab.label} href={tab.href} className="flex-1 flex flex-col items-center gap-0.5">
            <span className="text-base">{tab.icon}</span>
            <span className={`font-mono text-xs ${tab.active ? 'text-[#80c4a0]' : 'text-[#5e8070]'}`}>{tab.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
