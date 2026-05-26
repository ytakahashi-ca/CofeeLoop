'use client'
import Link from 'next/link'
import { useState } from 'react'

const BEANS = [
  { id: '1', name: 'エチオピア イルガチェフェ', detail: 'ナチュラル / エチオピア',  roast: '浅煎り',  orders: 7, img: '/beans/ethiopia.png',  matchTags: ['🍊 フルーティ', '✨ すっきり'],        matchCount: 7 },
  { id: '2', name: 'ケニア AA',               detail: 'ウォッシュド / ケニア',    roast: '中煎り',  orders: 4, img: '/beans/kenya.png',     matchTags: ['🍫 チョコっぽい', '💧 コクがある'],    matchCount: 4 },
  { id: '3', name: 'コロンビア ナリーニョ',     detail: 'ハニー / コロンビア',     roast: '浅煎り',  orders: 2, img: '/beans/colombia.png',  matchTags: ['🍊 フルーティ', '🌰 ナッツっぽい'],    matchCount: 5 },
  { id: '4', name: 'グアテマラ アンティグア',   detail: 'ウォッシュド / グアテマラ', roast: '中深煎り', orders: 1, img: '/beans/guatemala.png', matchTags: ['🍫 チョコっぽい', '🌰 ナッツっぽい'], matchCount: 3 },
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

  const DEFAULT_REMIND_MSG = 'そろそろコーヒー、飲みたくなってませんか？\nお待ちしています。いつでもお気軽にどうぞ☕'

  const [selectedBeanId, setSelectedBeanId] = useState<string | null>(null)
  const [modal, setModal] = useState<'newbean' | 'remind' | null>(null)
  const [newBeanMsg, setNewBeanMsg] = useState('')
  const [remindMsg, setRemindMsg] = useState(DEFAULT_REMIND_MSG)
  const [sent, setSent] = useState(false)

  const selectedBean = BEANS.find(b => b.id === selectedBeanId) ?? null

  const buildNewBeanMsg = (bean: typeof BEANS[0]) =>
    `好きそうな豆、入りました。\n${bean.name}（${bean.roast} / ${bean.detail}）が入荷しています。\nぜひまた来てください！`

  const openNewBeanModal = () => {
    if (!selectedBean) return
    setNewBeanMsg(buildNewBeanMsg(selectedBean))
    setSent(false)
    setModal('newbean')
  }

  const handleSend = () => {
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setModal(null)
    }, 1500)
  }

  const handleSearch = () => {
    const mock = MOCK_CUSTOMERS[searchCode.trim()]
    if (mock) {
      const stored: Record<string, number> = JSON.parse(localStorage.getItem('cl_stamps') || '{}')
      const stamps = stored[searchCode.trim()] ?? mock.stamps
      setSearchResult({ ...mock, stamps })
    } else {
      setSearchResult(null)
    }
    setRecordStep('idle')
    setStampCount(1)
  }

  const handleGiveStamp = () => {
    const stored: Record<string, number> = JSON.parse(localStorage.getItem('cl_stamps') || '{}')
    const current = stored[searchCode] ?? searchResult?.stamps ?? 0
    stored[searchCode] = current + stampCount
    localStorage.setItem('cl_stamps', JSON.stringify(stored))
    if (searchResult) setSearchResult({ ...searchResult, stamps: stored[searchCode] })
    setRecordStep('done')
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
                      onClick={handleGiveStamp}
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
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#364a40] flex-shrink-0">
                  <img src={bean.img} alt={bean.name} className="w-full h-full object-cover" />
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
        <div className="bg-[#80c4a0]/4 border border-[#6ab08a] rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-[#80c4a0] bg-[#80c4a0]/15 border border-[#6ab08a]/20 px-2 py-0.5 rounded uppercase tracking-widest">新豆マッチ</span>
            {selectedBean && (
              <span className="font-mono text-xs text-[#80c4a0]">対象 {selectedBean.matchCount}人</span>
            )}
          </div>

          {/* STEP 1: 豆を選択 */}
          <div>
            <p className="font-mono text-xs text-[#5e8070] uppercase tracking-widest mb-2">① 通知する豆を選択</p>
            <div className="bg-[#1a2820] border border-[#364a40] rounded-xl overflow-hidden">
              {BEANS.map((bean, i) => (
                <button
                  key={bean.id}
                  onClick={() => setSelectedBeanId(bean.id === selectedBeanId ? null : bean.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                    i < BEANS.length - 1 ? 'border-b border-[#364a40]' : ''
                  } ${
                    selectedBeanId === bean.id
                      ? 'bg-[#80c4a0]/10'
                      : 'hover:bg-[#232e28]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#364a40] flex-shrink-0">
                    <img src={bean.img} alt={bean.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#eaf4f0] truncate">{bean.name}</p>
                    <p className="font-mono text-xs text-[#5e8070]">{bean.roast}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    selectedBeanId === bean.id
                      ? 'bg-[#80c4a0] border-[#80c4a0]'
                      : 'border-[#364a40]'
                  }`}>
                    {selectedBeanId === bean.id && (
                      <span className="text-[#0e1210] text-xs leading-none">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: マッチング結果（豆選択後に表示） */}
          {selectedBean && (
            <div className="bg-[#1a2820] border border-[#80c4a0]/30 rounded-xl p-3 flex flex-col gap-2">
              <p className="font-mono text-xs text-[#5e8070] uppercase tracking-widest">② マッチング結果</p>
              <p className="text-sm text-[#eaf4f0] leading-snug">
                {selectedBean.matchTags.map(t => `「${t}」`).join('・')}系が好きな顧客
                <span className="text-[#80c4a0] font-medium"> {selectedBean.matchCount}人</span>が対象です
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selectedBean.matchTags.map(tag => (
                  <span key={tag} className="font-mono text-xs text-[#80c4a0] bg-[#80c4a0]/10 border border-[#80c4a0]/20 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: 送信ボタン */}
          <button
            onClick={openNewBeanModal}
            disabled={!selectedBean}
            className={`w-full font-mono text-xs uppercase tracking-widest py-3 rounded-xl transition-all ${
              selectedBean
                ? 'bg-[#80c4a0] text-[#0e1210]'
                : 'bg-[#232e28] text-[#5e8070] border border-[#364a40] cursor-not-allowed'
            }`}
          >
            {selectedBean ? `${selectedBean.matchCount}人に通知を送る →` : '豆を選んでください'}
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

      {/* モーダル: 新豆マッチ通知 */}
      {modal === 'newbean' && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={() => setModal(null)}>
          <div className="w-full max-w-sm bg-[#1c2420] border border-[#364a40] rounded-t-3xl p-6 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#80c4a0] bg-[#80c4a0]/15 border border-[#6ab08a]/20 px-2 py-0.5 rounded uppercase tracking-widest">新豆マッチ</span>
                {selectedBean && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 rounded-md overflow-hidden border border-[#364a40] flex-shrink-0">
                      <img src={selectedBean.img} alt={selectedBean.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm text-[#eaf4f0] font-medium">{selectedBean.name}</p>
                  </div>
                )}
                <p className="font-mono text-xs text-[#5e8070] mt-1">
                  対象 {selectedBean?.matchCount ?? 0}人 · LINE登録済み
                </p>
              </div>
              <button onClick={() => setModal(null)} className="w-8 h-8 bg-[#232e28] border border-[#364a40] rounded-full flex items-center justify-center text-[#5e8070] text-sm">✕</button>
            </div>
            <textarea
              value={newBeanMsg}
              onChange={e => setNewBeanMsg(e.target.value)}
              rows={5}
              className="w-full bg-[#232e28] border border-[#364a40] rounded-xl px-4 py-3 font-sans text-sm text-[#eaf4f0] leading-relaxed resize-none focus:outline-none focus:border-[#80c4a0] transition-colors"
            />
            <p className="font-mono text-xs text-[#5e8070]">※ 内容は自由に編集できます</p>
            {sent ? (
              <div className="w-full bg-[#80c4a0]/10 border border-[#80c4a0]/30 rounded-xl py-3 text-center font-mono text-xs text-[#80c4a0]">
                ✓ 送信しました
              </div>
            ) : (
              <button onClick={handleSend} className="w-full bg-[#80c4a0] text-[#0e1210] font-mono text-xs uppercase tracking-widest py-3 rounded-xl">
                {selectedBean?.matchCount ?? 0}人に送信する →
              </button>
            )}
          </div>
        </div>
      )}

      {/* モーダル: 未来店リマインド */}
      {modal === 'remind' && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={() => setModal(null)}>
          <div className="w-full max-w-sm bg-[#1c2420] border border-[#364a40] rounded-t-3xl p-6 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#e8a878] bg-[#e8a878]/15 border border-[#e8a878]/20 px-2 py-0.5 rounded uppercase tracking-widest">未来店リマインド</span>
                <p className="text-sm text-[#eaf4f0] font-medium mt-2">リマインドメッセージ</p>
                <p className="font-mono text-xs text-[#5e8070]">対象 4人 · LINE登録済み</p>
              </div>
              <button onClick={() => setModal(null)} className="w-8 h-8 bg-[#232e28] border border-[#364a40] rounded-full flex items-center justify-center text-[#5e8070] text-sm">✕</button>
            </div>
            <textarea
              value={remindMsg}
              onChange={e => setRemindMsg(e.target.value)}
              rows={5}
              className="w-full bg-[#232e28] border border-[#364a40] rounded-xl px-4 py-3 font-sans text-sm text-[#eaf4f0] leading-relaxed resize-none focus:outline-none focus:border-[#e8a878] transition-colors"
            />
            <p className="font-mono text-xs text-[#5e8070]">※ 内容は自由に編集できます</p>
            {sent ? (
              <div className="w-full bg-[#e8a878]/10 border border-[#e8a878]/30 rounded-xl py-3 text-center font-mono text-xs text-[#e8a878]">
                ✓ 送信しました
              </div>
            ) : (
              <button onClick={handleSend} className="w-full bg-[#e8a878] text-[#0e1210] font-mono text-xs uppercase tracking-widest py-3 rounded-xl">
                4人に送信する →
              </button>
            )}
          </div>
        </div>
      )}

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
