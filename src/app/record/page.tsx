'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TASTE_TAGS, Q1_OPTIONS } from '@/types'

const BEANS = [
  { id: '1', name: 'エチオピア イルガチェフェ', origin: 'エチオピア', roast: '浅煎り', process: 'ナチュラル' },
  { id: '2', name: 'ケニア AA',               origin: 'ケニア',    roast: '中煎り', process: 'ウォッシュド' },
  { id: '3', name: 'コロンビア ナリーニョ',     origin: 'コロンビア', roast: '浅煎り', process: 'ハニー' },
  { id: '4', name: 'グアテマラ アンティグア',   origin: 'グアテマラ', roast: '中深煎り', process: 'ウォッシュド' },
]

type Step = 'bean' | 'q1' | 'q2' | 'done'
const STEPS: Step[] = ['bean', 'q1', 'q2', 'done']

export default function RecordPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('bean')
  const [selectedBean, setSelectedBean] = useState<string | null>(null)
  const [q1, setQ1] = useState<string | null>(null)
  const [q2, setQ2] = useState<string[]>([])
  const stepIndex = STEPS.indexOf(step)

  const next = (nextStep: Step) => setStep(nextStep)

  const saveAndDone = () => {
    const bean = BEANS.find(b => b.id === selectedBean)
    if (bean) {
      const ratingMap: Record<string, string> = { like: '好き', normal: 'ふつう', dislike: '× 苦手' }
      const tagLabels = TASTE_TAGS.filter(t => q2.includes(t.id)).map(t => t.label)
      const entry = {
        beanId: bean.id,
        beanName: bean.name,
        detail: `${bean.roast} / ${bean.process}`,
        rating: ratingMap[q1 ?? 'normal'] ?? 'ふつう',
        tags: tagLabels,
        date: '今日',
        timestamp: Date.now(),
      }
      const history = JSON.parse(localStorage.getItem('cl_history') || '[]')
      localStorage.setItem('cl_history', JSON.stringify([entry, ...history].slice(0, 20)))
    }
    next('done')
  }

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
            {step === 'bean' ? '本日のメニュー' : `${['q1','q2'].indexOf(step) + 1} / 2`}
          </span>
          {['q1', 'q2'].includes(step) ? (
            <button onClick={() => next(step === 'q1' ? 'q2' : 'done')} className="font-mono text-xs text-text-muted">
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

        {/* 豆選択 */}
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

        {/* Q1 */}
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

        {/* Q2 */}
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
            <button onClick={saveAndDone} className="btn-primary mt-auto">
              保存して完了
            </button>
          </div>
        )}

        {/* 完了 */}
        {step === 'done' && (
          <div className="flex flex-col items-center justify-center min-h-screen gap-5 text-center pb-8">
            <div className="w-16 h-16 bg-green/10 border border-green rounded-full flex items-center justify-center text-2xl">
              ✓
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text mb-2">テイストを記録しました</h2>
              <p className="text-sm text-text-muted leading-relaxed">
                {q2.length > 0 ? TASTE_TAGS.filter(t => q2.includes(t.id)).map(t => t.label).join('・') : '記録完了'}<br />
                プロフィールに反映されました
              </p>
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
