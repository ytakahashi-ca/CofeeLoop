'use client'
import Link from 'next/link'

const MESSAGES = [
  {
    id: 1,
    from: 'Koffee Mameya',
    title: '新豆入荷のお知らせ',
    body: 'エチオピア イルガチェフェの新ロットが入荷しました。フルーティで明るい酸味が特徴です。ぜひお試しください。',
    time: '10分前',
    unread: true,
    icon: '🫘',
  },
  {
    id: 2,
    from: 'Koffee Mameya',
    title: 'スタンプカードあと3つ！',
    body: 'スタンプが7個たまっています。あと3杯で無料ドリンク特典をプレゼントします。ぜひお立ち寄りください。',
    time: '2日前',
    unread: true,
    icon: '🎁',
  },
  {
    id: 3,
    from: 'Koffee Mameya',
    title: 'そろそろコーヒーはいかがですか？',
    body: '最後のご来店から少し経ちました。本日はケニア AAが好評です。お気軽にお越しください。',
    time: '5日前',
    unread: false,
    icon: '☕',
  },
  {
    id: 4,
    from: 'Koffee Mameya',
    title: '好みに合う新豆のご案内',
    body: 'お客様のテイストプロフィールをもとに、コロンビア ナリーニョをおすすめします。ハニープロセスでフルーティな甘みが楽しめます。',
    time: '1週間前',
    unread: false,
    icon: '🍊',
  },
]

export default function NotificationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg pb-8">
      <div className="flex items-center justify-between px-5 pt-12 pb-4 border-b border-border">
        <Link href="/profile" className="w-8 h-8 bg-surface2 border border-border rounded-full flex items-center justify-center text-sm">←</Link>
        <h1 className="font-serif text-lg font-semibold text-text">通知</h1>
        <div className="w-8 h-8" />
      </div>

      <div className="flex flex-col gap-0 px-5 pt-4">
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3">お店からのメッセージ</p>
        <div className="bg-surface2 border border-border rounded-2xl overflow-hidden">
          {MESSAGES.map((msg, i) => (
            <div
              key={msg.id}
              className={`flex gap-3 px-4 py-4 ${i < MESSAGES.length - 1 ? 'border-b border-border' : ''} ${msg.unread ? 'bg-accent/3' : ''}`}
            >
              <div className="w-10 h-10 bg-surface3 border border-border rounded-xl flex items-center justify-center text-xl flex-shrink-0 mt-0.5">
                {msg.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-mono text-xs text-text-muted">{msg.from}</p>
                  {msg.unread && (
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                  )}
                </div>
                <p className={`text-sm mb-1 leading-snug ${msg.unread ? 'text-text font-medium' : 'text-text-sub'}`}>
                  {msg.title}
                </p>
                <p className="font-mono text-xs text-text-muted leading-relaxed line-clamp-2">
                  {msg.body}
                </p>
                <p className="font-mono text-xs text-text-muted mt-1.5">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
