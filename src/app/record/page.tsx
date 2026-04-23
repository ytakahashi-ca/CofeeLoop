'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TASTE_TAGS, Q1_OPTIONS, Q3_OPTIONS } from '@/types'

const BEANS = [
  { id: '1', name: 'エチオピア イルガチェフェ', origin: 'エチオピア', roast: '浅煎り', process: 'ナチュラル' },
  { id: '2', name: 'ケニア AA',               origin: 'ケニア',    roast: '中煎り', process: 'ウォッシュド' },
  { id: '3', name: 'コロンビア ナリーニョ',     origin: 'コロンビア', roast: '浅煎り', process: 'ハニー' },
  { id: '4', name: 'グアテマラ アンティグア',   origin: 'グアテマラ', roast: '中深煎り', process: 'ウォッシュド' },
]

type Step = 'qr' | 'line' | 'bean' | 'q1' | 'q2' | 'q3' | 'done'
const STEPS: Step[] = ['qr', 'line', 'bean', 'q1', 'q2', 'q3', 'done']

export default function RecordPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('qr')
  const [selectedBean, setSelectedBean] = useState<string | null>(null)
  const [q1, setQ1] = useState<string | null>(null)
  const [q2, setQ2] = useState<string[]>([])
  const [q3, setQ3] = useState<string | null>(null)

  const stepIndex = STEPS.indexOf(step)
  const totalSteps = STEPS.length - 1

  const next = (nextStep: Step) => setStep(nextStep)

  const toggleQ2 = (id: string) => {
    if (q2.includes(id)) {
      setQ2(q2.filter(t => t !== id))
    } else if (q2.length < 2) {
      setQ2([...q2, id])
    } else {
      setQ2([q2[1], id])
    }
  }

  const beanName = BEANS.find(b => b.id === selectedBean)?.name ?? ''

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* ナビゲーション */}
      {step !== 'done' && (
        <div className="flex items-center justify-between px-5 pt-12 pb-3">
          <button onClick={() => router.back()} className="font-mono text-xs text-accent">
            ← 戻る
          </button>
          <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
            {step === 'qr' ? '来店記録' : step === 'line' ? 'LINE連携' : step === 'bean' ? '本日のメニュー' : `${['q1','q2','q3'].indexOf(step) + 1} / 3`}
          </span>
          {['q1', 'q2', 'q3'].includes(step) ? (
            <button onClick={() => next(step === 'q1' ? 'q2' : step === 'q2' ? 'q3' : 'done')} className="font-mono text-xs text-text-muted">
              スキップ
            </button>
          ) : <div className="w-10" />}
        </div>
      )}

      {/* プログレスバー */}
      {step !== 'done' && (
        <div className="flex gap-1 px-5 mb-6">
          {STEPS.slice(0, -1).map((s, i) => (
            <div key={s} className={`flex-1 h-0.5 rounded-full transition-all ${
              i < stepIndex ? 'bg-accent-dark' : i === stepIndex ? 'bg-accent' : 'bg-border'
            }`} />
          ))}
        </div>
      )}

      <div className="flex-1 px-5 pb-8">

        {/* S1: QR */}
        {step === 'qr' && (
          <div className="flex flex-col items-center justify-center h-full gap-8 pt-8">
            <div className="relative w-44 h-44 border-2 border-accent rounded-2xl flex items-center justify-center bg-surface2">
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-accent2 rounded-tl-lg -translate-x-0.5 -translate-y-0.5" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-accent2 rounded-tr-lg translate-x-0.5 -translate-y-0.5" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-accent2 rounded-bl-lg -translate-x-0.5 translate-y-0.5" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-accent2 rounded-br-lg translate-x-0.5 translate-y-0.5" />
              <span className="text-5xl">📷</span>
            </div>
            <div className="text-center">
              <h2 className="font-serif text-xl text-text mb-2">店のQRをスキャン</h2>
              <p className="font-mono text-xs text-text-muted leading-relaxed">
                レジ横のコードを読み取ってください<br />来店が自動で記録されます
              </p>
            </div>
            <button onClick={() => next('line')} className="btn-primary">
              スキャン完了（デモ）
            </button>
          </div>
        )}

        {/* S2: LINE */}
        {step === 'line' && (
          <div className="flex flex-col items-center gap-4 pt-4">
            <div className="inline-flex items-center gap-1 bg-line-green/10 border border-line-green/20 rounded-full px-3 py-1 font-mono text-xs text-line-green tracking-widest">
              初回のみ
            </div>
            <div className="w-16 h-16 bg-line-green rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              💬
            </div>
            <div className="text-center">
              <h2 className="font-serif text-xl text-text mb-2">LINEで通知を<br />受け取りませんか？</h2>
              <p className="font-mono text-xs text-text-muted leading-relaxed">
                好みに合う新豆や来店タイミングを<br />お知らせします
              </p>
            </div>
            <div className="w-full bg-surface2 border border-border rounded-2xl p-4 flex flex-col gap-3">
              {[
                { icon: '🫘', text: '好みに合う豆が入ったらお知らせ' },
                { icon: '☕', text: '「そろそろコーヒー飲みたい頃では？」' },
                { icon: '🎁', text: 'スタンプ達成時に特典のご案内' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3 text-sm text-text-sub">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <button onClick={() => next('bean')} className="w-full bg-line-green text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-sm">
              💬 LINEで友だち追加
            </button>
            <button onClick={() => next('bean')} className="font-mono text-xs text-text-muted py-2 tracking-widest">
              今はスキップ →
            </button>
          </div>
        )}

        {/* S3: 豆選択 */}
        {step === 'bean' && (
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">STEP 1</p>
              <h2 className="font-serif text-2xl font-semibold text-text leading-snug">
                今日はどれを<br />飲みましたか？
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {BEANS.map(bean => (
                <button
                  key={bean.id}
                  onClick={() => setSelectedBean(bean.id)}
                  className={`flex items-center gap-3 border rounded-2xl p-3 text-left transition-all ${
                    selectedBean === bean.id
                      ? 'bg-accent/10 border-accent'
                      : 'bg-surface2 border-border'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedBean === bean.id ? 'bg-accent border-accent' : 'border-border'
                  }`}>
                    {selectedBean === bean.id && <div className="w-2 h-2 bg-bg rounded-full" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${selectedBean === bean.id ? 'text-accent2' : 'text-text'}`}>
                      {bean.name}
                    </p>
                    <p className="font-mono text-xs text-text-muted">{bean.process} / {bean.origin}</p>
                  </div>
                  <span className={`font-mono text-xs px-2 py-1 rounded border ${
                    selectedBean === bean.id
                      ? 'bg-accent/10 text-accent border-accent/20'
                      : 'bg-surface3 text-text-muted border-border'
                  }`}>
                    {bean.roast}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => selectedBean && next('q1')}
              className={`btn-primary mt-2 ${!selectedBean ? 'opacity-40' : ''}`}
              disabled={!selectedBean}
            >
              次へ →
            </button>
          </div>
        )}

        {/* S4: Q1 */}
        {step === 'q1' && (
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-3 py-1 self-start">
              <span className="text-xs">☕</span>
              <span className="font-mono text-xs text-accent">{beanName}</span>
            </div>
            <div>
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">Q1</p>
              <h2 className="font-serif text-2xl font-semibold text-text leading-snug">
                この一杯、<br />どうでした？
              </h2>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {Q1_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setQ1(opt.id)}
                  className={`option-btn ${q1 === opt.id ? 'selected' : ''}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    q1 === opt.id ? 'bg-accent border-accent' : 'border-border'
                  }`}>
                    {q1 === opt.id && <div className="w-2 h-2 bg-bg rounded-full" />}
                  </div>
                  <span className={`text-sm ${q1 === opt.id ? 'text-text' : 'text-text-sub'}`}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
            <button onClick={() => q1 && next('q2')} className={`btn-primary ${!q1 ? 'opacity-40' : ''}`} disabled={!q1}>
              次へ →
            </button>
          </div>
        )}

        {/* S5: Q2 */}
        {step === 'q2' && (
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-3 py-1 self-start">
              <span className="text-xs">☕</span>
              <span className="font-mono text-xs text-accent">{beanName}</span>
            </div>
            <div>
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">Q2</p>
              <h2 className="font-serif text-2xl font-semibold text-text leading-snug">
                どんな感じが<br />近かった？
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {TASTE_TAGS.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => toggleQ2(tag.id)}
                  className={`tag-btn ${q2.includes(tag.id) ? 'selected' : ''}`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
            <p className="font-mono text-xs text-text-muted">※ 1〜2個まで選べます</p>
            <button onClick={() => next('q3')} className="btn-primary mt-auto">
              次へ →
            </button>
          </div>
        )}

        {/* S6: Q3 */}
        {step === 'q3' && (
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-3 py-1 self-start">
              <span className="text-xs">☕</span>
              <span className="font-mono text-xs text-accent">{beanName}</span>
            </div>
            <div>
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">Q3 — 最後にひとつだけ</p>
              <h2 className="font-serif text-2xl font-semibold text-text leading-snug">
                次はどうしたい？
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {Q3_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setQ3(opt.id)}
                  className={`option-btn ${q3 === opt.id ? 'selected' : ''}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    q3 === opt.id ? 'bg-accent border-accent' : 'border-border'
                  }`}>
                    {q3 === opt.id && <div className="w-2 h-2 bg-bg rounded-full" />}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`text-sm ${q3 === opt.id ? 'text-text' : 'text-text-sub'}`}>{opt.label}</p>
                    <p className="font-mono text-xs text-text-muted mt-0.5">{opt.hint}</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => next('done')} className={`btn-primary mt-auto ${!q3 ? 'opacity-40' : ''}`} disabled={!q3}>
              保存して完了
            </button>
            <button onClick={() => next('done')} className="btn-secondary">スキップ</button>
          </div>
        )}

        {/* S7: 完了 */}
        {step === 'done' && (
          <div className="flex flex-col items-center justify-center min-h-screen gap-5 text-center pb-8">
            <div className="w-16 h-16 bg-green/10 border border-green rounded-full flex items-center justify-center text-2xl">
              ✓
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text mb-2">記録しました</h2>
              <p className="text-sm text-text-muted leading-relaxed">
                {q2.length > 0 ? TASTE_TAGS.filter(t => q2.includes(t.id)).map(t => t.label).join('・') : '記録完了'}<br />
                プロフィールに反映されました
              </p>
            </div>
            {/* ミニレーダー */}
            <div className="w-full bg-surface2 border border-border rounded-2xl p-4">
              <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3 text-left">テイストプロフィール更新</p>
              <svg viewBox="0 0 180 120" className="w-full max-w-xs mx-auto">
                <polygon points="90,8 158,44 158,86 90,104 22,86 22,44" fill="none" stroke="#524038" strokeWidth="1"/>
                <polygon points="90,28 132,54 132,80 90,88 48,80 48,54" fill="none" stroke="#524038" strokeWidth="0.5"/>
                <line x1="90" y1="8" x2="90" y2="104" stroke="#524038" strokeWidth="0.5"/>
                <line x1="22" y1="44" x2="158" y2="86" stroke="#524038" strokeWidth="0.5"/>
                <line x1="22" y1="86" x2="158" y2="44" stroke="#524038" strokeWidth="0.5"/>
                <polygon points="90,16 142,56 108,90 42,78" fill="#e8a878" fillOpacity="0.2" stroke="#e8a878" strokeWidth="1.5"/>
                <circle cx="90" cy="16" r="3" fill="#e8a878"/>
                <circle cx="142" cy="56" r="3" fill="#e8a878"/>
                <circle cx="108" cy="90" r="3" fill="#e8a878"/>
                <circle cx="42" cy="78" r="3" fill="#e8a878"/>
                <text x="90" y="4" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill="#94786c">酸味</text>
                <text x="163" y="59" fontFamily="DM Mono" fontSize="8" fill="#94786c">苦味</text>
                <text x="163" y="89" fontFamily="DM Mono" fontSize="8" fill="#94786c">コク</text>
                <text x="16" y="82" textAnchor="end" fontFamily="DM Mono" fontSize="8" fill="#94786c">甘み</text>
              </svg>
            </div>
            <div className="w-full bg-line-green/5 border border-line-green/15 rounded-xl p-3 flex items-center gap-3">
              <span className="text-base">💬</span>
              <p className="font-mono text-xs text-line-green leading-relaxed">
                LINE通知が有効です。<br />新豆入荷時にお知らせします。
              </p>
            </div>
            <button onClick={() => router.push('/profile')} className="btn-primary w-full">
              ホームへ戻る
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
