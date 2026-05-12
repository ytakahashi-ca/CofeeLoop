'use client'
import Link from 'next/link'
import { useState } from 'react'

const BEANS = [
  { id: '1', name: 'エチオピア イルガチェフェ', detail: 'ナチュラル / エチオピア', roast: '浅煎り', orders: 7, icon: '🌱' },
  { id: '2', name: 'ケニア AA',               detail: 'ウォッシュド / ケニア',    roast: '中煎り', orders: 4, icon: '☕' },
  { id: '3', name: 'コロンビア ナリーニョ',     detail: 'ハニー / コロンビア',     roast: '浅煎り', orders: 2, icon: '🍂' },
  { id: '4', name: 'グアテマラ アンティグア',   detail: 'ウォッシュド / グアテマラ', roast: '中深煎り', orders: 1, icon: '🌙' },
]

const MOCK_CUSTOMERS: Record<string, { name: string; tags: string[]; stamps: number }> = {
  '1234': { name: '田中 さくら', tags: ['🍊 フルーティ', '✨ すっきり'], stamps: 7 },
  '5678': { name: '鈴木 けんた', tags: ['🍫 チョコっぽい', '💧 コクがある'], stamps: 3 },
  '9012': { name: '佐藤 みほ',   tags: ['🌰 ナッツっぽい'], stamps: 12 },
  '3456': { name: '山田 たろう', tags: ['🍊 フルーティ', '🌰 ナッツっぽい'], stamps: 2 },
}

const BEAN_CHART: Record<string, { name: string; orders: number; pct: number }[]> = {
  day: [
    { name: 'エチオピア イルガチェフェ', orders: 7, pct: 100 },
    { name: 'ケニア AA', orders: 4, pct: 57 },
    { name: 'コロンビア ナリーニョ', orders: 2, pct: 29 },
    { name: 'グアテマラ アンティグア', orders: 1, pct: 14 },
  ],
  week: [
    { name: 'エチオピア イルガチェフェ', orders: 42, pct: 100 },
    { name: 'ケニア AA', orders: 28, pct: 67 },
    { name: 'コロンビア ナリーニョ', orders: 18, pct: 43 },
    { name: 'グアテマラ アンティグア', orders: 12, pct: 29 },
  ],
  month: [
    { name: 'エチオピア イルガチェフェ', orders: 168, pct: 100 },
    { name: 'ケニア AA', orders: 112, pct: 67 },
    { name: 'コロンビア ナリーニョ', orders: 76, pct: 45 },
    { name: 'グアテマラ アンティグア', orders: 52, pct: 31 },
  ],
}

const CATEGORY_CHART: Record<string, { name: string; count: number; pct: number }[]> = {
  day: [
    { name: '🍊 フルーティ', count: 9, pct: 100 },
    { name: '✨ すっきり', count: 7, pct: 78 },
    { name: '🍫 チョコっぽい', count: 5, pct: 56 },
    { name: '🌰 ナッツっぽい', count: 3, pct: 33 },
    { name: '💧 コクがある', count: 2, pct: 22 },
  ],
  week: [
    { name: '🍊 フルーティ', count: 54, pct: 100 },
    { name: '✨ すっきり', count: 42, pct: 78 },
    { name: '🍫 チョコっぽい', count: 28, pct: 52 },
    { name: '🌰 ナッツっぽい', count: 18, pct: 33 },
    { name: '💧 コクがある', count: 12, pct: 22 },
  ],
  month: [
    { name: '🍊 フルーティ', count: 210, pct: 100 },
    { name: '✨ すっきり', count: 168, pct: 80 },
    { name: '🍫 チョコっぽい', count: 112, pct: 53 },
    { name: '🌰 ナッツっぽい', count: 74, pct: 35 },
    { name: '💧 コクがある', count: 48, pct: 23 },
  ],
}

const PERIOD_LABELS: Record<string, string> = { day: '日別', week: '週別', month: '月別' }
const UNIT: Record<string, string> = { day: '杯', week: '杯', month: '杯' }
const REGISTER_URL = 'https://cofeeloop.app/register'

type RecordStep = 'idle' | 'stamp' | 'done'

export default function ShopPage() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day')
  const [searchCode, setSearchCode] = useState('')
  const [searchResult, setSearchResult] = useState<{ name: string; tags: string[]; stamps: number } | null | undefined>(undefined)
  const [copied, setCopied] = useState(false)

  const [recordStep, setRecordStep] = useState<RecordStep>('idle')
  const [stampCount, setStampCount] = useState(1)

  const handleSearch = () => {
    const result = MOCK_CUSTOMERS[searchCode.trim()]
    setSearchResult(result ?? null)
    setRecordStep('idle')
    setStampCount(1)
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(REGISTER_URL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const resetRecord = () => {
    setRecordStep('idle')
    setStampCount(1)
  }

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

        {/* 顧客番号検索 */}
        <div>
          <p className="font-mono text-xs text-[#5e8070] uppercase tracking-widest mb-2">顧客番号で検索</p>
          <div className="bg-[#232e28] border border-[#364a40] rounded-2xl p-4">
            <div className="flex gap-2 mb-3">
              <input
                type="tel"
                inputMode="numeric"
                maxLength={4}
                value={searchCode}
                onChange={e => {
                  setSearchCode(e.target.value.replace(/\D/g, ''))
                  setSearchResult(undefined)
                  resetRecord()
                }}
                placeholder="4桁の番号"
                className="flex-1 bg-[#1c2420] border border-[#364a40] rounded-xl px-4 py-3 font-mono text-lg text-[#eaf4f0] placeholder:text-[#3c5448] tracking-widest focus:outline-none focus:border-[#80c4a0] transition-colors text-center"
              />
              <button
                onClick={handleSearch}
                disabled={searchCode.length !== 4}
                className={`px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-widest transition-all ${
                  searchCode.length === 4
                    ? 'bg-[#80c4a0] text-[#0e1210]'
                    : 'bg-[#2c3c34] text-[#3c5448] border border-[#364a40]'
                }`}
              >
                検索
              </button>
            </div>

            {/* 検索結果 */}
            {searchResult === null && (
              <div className="bg-[#1c2420] border border-[#364a40] rounded-xl p-3 text-center">
                <p className="font-mono text-xs text-[#5e8070]">番号 {searchCode} の顧客が見つかりません</p>
              </div>
            )}

            {searchResult && (
              <div className="flex flex-col gap-3">
                {/* 顧客カード */}
                <div className="bg-[#1c2420] border border-[#80c4a0]/30 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#2c3c34] border border-[#364a40] rounded-full flex items-center justify-center font-mono text-sm text-[#80c4a0] flex-shrink-0">
                      {searchResult.name.slice(-1)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#eaf4f0] font-medium">{searchResult.name}</p>
                      <p className="font-mono text-xs text-[#5e8070]">番号 {searchCode}</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#e0c040]/10 border border-[#e0c040]/20 rounded-lg px-2.5 py-1.5">
                      <span className="text-sm">☕</span>
                      <span className="font-mono text-xs text-[#e0c040]">{searchResult.stamps}スタンプ</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {searchResult.tags.map(tag => (
                      <span key={tag} className="font-mono text-xs text-[#5e8070] bg-[#2c3c34] border border-[#364a40] px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* STEP: idle — 開始ボタン */}
                {recordStep === 'idle' && (
                  <button
                    onClick={() => setRecordStep('stamp')}
                    className="w-full bg-[#80c4a0] text-[#0e1210] font-mono text-xs py-3 rounded-xl uppercase tracking-wide"
                  >
                    スタンプを付与する →
                  </button>
                )}

                {/* STEP: スタンプ数選択 */}
                {recordStep === 'stamp' && (
                  <div className="bg-[#1c2420] border border-[#364a40] rounded-xl p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-xs text-[#80c4a0] uppercase tracking-widest">付与するスタンプ数</p>
                      <button onClick={resetRecord} className="font-mono text-xs text-[#5e8070]">キャンセル</button>
                    </div>
                    <div className="flex items-center justify-between bg-[#232e28] border border-[#364a40] rounded-xl px-6 py-4">
                      <button
                        onClick={() => setStampCount(c => Math.max(1, c - 1))}
                        className="w-10 h-10 rounded-full bg-[#2c3c34] border border-[#364a40] text-[#80c4a0] font-mono text-xl flex items-center justify-center"
                      >
                        −
                      </button>
                      <div className="text-center">
                        <span className="font-serif text-5xl font-bold text-[#80c4a0]">{stampCount}</span>
                        <span className="font-mono text-sm text-[#5e8070] ml-2">個</span>
                      </div>
                      <button
                        onClick={() => setStampCount(c => Math.min(10, c + 1))}
                        className="w-10 h-10 rounded-full bg-[#2c3c34] border border-[#364a40] text-[#80c4a0] font-mono text-xl flex items-center justify-center"
                      >
                        ＋
                      </button>
                    </div>
                    <button
                      onClick={() => setRecordStep('done')}
                      className="w-full bg-[#80c4a0] text-[#0e1210] font-mono text-xs py-3 rounded-xl uppercase tracking-wide"
                    >
                      スタンプ {stampCount}個 を付与する →
                    </button>
                  </div>
                )}

                {/* STEP: 完了 */}
                {recordStep === 'done' && (
                  <div className="bg-[#80c4a0]/10 border border-[#80c4a0]/30 rounded-xl p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">✓</span>
                      <p className="font-mono text-xs text-[#80c4a0]">スタンプを {stampCount}個 付与しました</p>
                    </div>
                    <button
                      onClick={() => {
                        setSearchResult(undefined)
                        setSearchCode('')
                        resetRecord()
                      }}
                      className="w-full mt-1 bg-[#2c3c34] text-[#80c4a0] border border-[#6ab08a]/40 font-mono text-xs py-2.5 rounded-xl uppercase tracking-wide"
                    >
                      次の顧客へ
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 登録URL */}
        <button
          onClick={handleCopyUrl}
          className={`flex items-center justify-center gap-2 w-full border rounded-xl py-3 font-mono text-xs uppercase tracking-widest transition-all ${
            copied
              ? 'bg-[#80c4a0]/10 border-[#80c4a0] text-[#80c4a0]'
              : 'bg-[#232e28] border-[#364a40] text-[#5e8070]'
          }`}
        >
          <span>{copied ? '✓' : '🔗'}</span>
          {copied ? 'コピーしました' : '登録URLをコピー'}
        </button>

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

        {/* 人気ランキング */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-xs text-[#5e8070] uppercase tracking-widest">人気ランキング</p>
            <div className="flex gap-1">
              {(['day', 'week', 'month'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`font-mono text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    period === p
                      ? 'bg-[#80c4a0] text-[#0e1210] border-[#80c4a0]'
                      : 'bg-[#232e28] text-[#5e8070] border-[#364a40]'
                  }`}
                >
                  {PERIOD_LABELS[p]}
                </button>
              ))}
            </div>
          </div>

          {/* 豆の種類別 */}
          <div className="bg-[#232e28] border border-[#364a40] rounded-2xl p-4 mb-3">
            <p className="font-mono text-xs text-[#5e8070] uppercase tracking-widest mb-3">豆の種類別</p>
            <div className="flex flex-col gap-3">
              {BEAN_CHART[period].map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#5e8070] w-4 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-[#eaf4f0] w-32 flex-shrink-0 truncate">{item.name}</span>
                  <div className="flex-1 bg-[#1c2420] h-2 rounded overflow-hidden">
                    <div
                      className="h-full bg-[#80c4a0] rounded transition-all duration-300"
                      style={{ width: `${item.pct}%`, opacity: 0.8 }}
                    />
                  </div>
                  <span className="font-mono text-xs text-[#80c4a0] w-12 text-right flex-shrink-0">
                    {item.orders}{UNIT[period]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* カテゴリ別 */}
          <div className="bg-[#232e28] border border-[#364a40] rounded-2xl p-4">
            <p className="font-mono text-xs text-[#5e8070] uppercase tracking-widest mb-3">フレーバーカテゴリ別</p>
            <div className="flex flex-col gap-3">
              {CATEGORY_CHART[period].map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#5e8070] w-4 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-[#eaf4f0] w-32 flex-shrink-0">{item.name}</span>
                  <div className="flex-1 bg-[#1c2420] h-2 rounded overflow-hidden">
                    <div
                      className="h-full bg-[#e8a878] rounded transition-all duration-300"
                      style={{ width: `${item.pct}%`, opacity: 0.8 }}
                    />
                  </div>
                  <span className="font-mono text-xs text-[#e8a878] w-12 text-right flex-shrink-0">
                    {item.count}{UNIT[period]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* タブバー */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm flex border-t border-[#364a40] bg-[#1c2420] pt-2.5 pb-1">
        {[
          { href: '/shop', icon: '📊', label: 'ホーム', active: true },
          { href: '/shop/customers', icon: '👥', label: '顧客', active: false },
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
