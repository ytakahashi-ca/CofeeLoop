'use client'
import Link from 'next/link'

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'action',
    title: '新豆マッチ — 通知送信待ち',
    body: 'フルーティ系が好きな7人の顧客に、エチオピア イルガチェフェの通知を送れます。',
    time: '10分前',
    unread: true,
    icon: '🫘',
    color: '#80c4a0',
  },
  {
    id: 2,
    type: 'alert',
    title: '未来店アラート — 4件',
    body: '7日以上来店がない顧客が4人います。リマインド通知の送信をご検討ください。',
    time: '1時間前',
    unread: true,
    icon: '⚠️',
    color: '#e8a878',
  },
  {
    id: 3,
    type: 'stamp',
    title: 'スタンプ達成 — 常連 A',
    body: '常連 Aさんがスタンプ10個を達成しました。無料ドリンク特典をご用意ください。',
    time: '昨日',
    unread: false,
    icon: '🎁',
    color: '#e0c040',
  },
  {
    id: 4,
    type: 'record',
    title: '本日の記録まとめ',
    body: '本日は18件の来店記録があり、うち14件がアンケートに回答しました。人気1位はエチオピア イルガチェフェです。',
    time: '昨日',
    unread: false,
    icon: '📊',
    color: '#80c4a0',
  },
  {
    id: 5,
    type: 'alert',
    title: '未来店アラート — 2件',
    body: '先週の未来店アラートのうち2名が再来店しました。残り2名は引き続き未来店です。',
    time: '3日前',
    unread: false,
    icon: '📋',
    color: '#5e8070',
  },
]

export default function ShopNotificationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#141a16] pb-24">
      <div className="flex items-center justify-between px-5 pt-12 pb-4 border-b border-[#364a40]">
        <Link href="/shop" className="w-8 h-8 bg-[#232e28] border border-[#364a40] rounded-full flex items-center justify-center text-sm text-[#eaf4f0]">←</Link>
        <h1 className="font-serif text-lg font-semibold text-[#eaf4f0]">通知</h1>
        <div className="w-8 h-8" />
      </div>

      <div className="flex flex-col gap-0 px-5 pt-4">
        <p className="font-mono text-xs text-[#5e8070] uppercase tracking-widest mb-3">店舗向け通知</p>
        <div className="bg-[#232e28] border border-[#364a40] rounded-2xl overflow-hidden">
          {NOTIFICATIONS.map((notif, i) => (
            <div
              key={notif.id}
              className={`flex gap-3 px-4 py-4 ${i < NOTIFICATIONS.length - 1 ? 'border-b border-[#364a40]' : ''}`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 mt-0.5 bg-[#2c3c34] border border-[#364a40]"
              >
                {notif.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {notif.unread && (
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: notif.color }} />
                  )}
                  <p className={`text-sm leading-snug ${notif.unread ? 'text-[#eaf4f0] font-medium' : 'text-[#8caa9a]'}`}>
                    {notif.title}
                  </p>
                </div>
                <p className="font-mono text-xs text-[#5e8070] leading-relaxed line-clamp-2 mt-1">
                  {notif.body}
                </p>
                <p className="font-mono text-xs text-[#3c5448] mt-1.5">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* タブバー */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm flex border-t border-[#364a40] bg-[#1c2420] pt-2.5 pb-1">
        {[
          { href: '/shop', icon: '📊', label: 'ホーム', active: false },
          { href: '/shop/customers', icon: '👥', label: '顧客', active: false },
          { href: '/shop/notifications', icon: '🔔', label: '通知', active: true },
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
