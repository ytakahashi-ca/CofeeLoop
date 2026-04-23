// ユーザー
export type User = {
  id: string
  line_user_id: string | null
  created_at: string
}

// 店舗
export type Shop = {
  id: string
  name: string
  line_channel_token: string | null
  created_at: string
}

// 豆
export type Bean = {
  id: string
  shop_id: string
  name: string
  origin: string
  roast: '浅煎り' | '中煎り' | '中深煎り' | '深煎り'
  process: string
  date: string
}

// 記録
export type Record = {
  id: string
  user_id: string
  bean_id: string
  q1: 'like' | 'normal' | 'dislike'
  q2_tags: string[]
  q3: 'same' | 'different'
  created_at: string
}

// テイストプロフィール
export type TasteProfile = {
  id: string
  user_id: string
  acidity: number    // 酸味 0-100
  bitterness: number // 苦味 0-100
  sweetness: number  // 甘み 0-100
  body: number       // コク 0-100
}

// スタンプ
export type Stamp = {
  id: string
  user_id: string
  shop_id: string
  count: number       // 購入スタンプ
  bonus_count: number // 記録ボーナス
  updated_at: string
}

// 味タグ
export const TASTE_TAGS = [
  { id: 'fruity',     label: '🍊 フルーティ',   axis: 'acidity' },
  { id: 'chocolate',  label: '🍫 チョコっぽい',  axis: 'bitterness' },
  { id: 'nutty',      label: '🌰 ナッツっぽい',  axis: 'body' },
  { id: 'clean',      label: '✨ すっきり',      axis: 'body' },
  { id: 'rich',       label: '💧 コクがある',    axis: 'body' },
] as const

export type TasteTagId = typeof TASTE_TAGS[number]['id']

// Q1の選択肢
export const Q1_OPTIONS = [
  { id: 'like',    label: 'かなり好き 👍' },
  { id: 'normal',  label: 'ふつう' },
  { id: 'dislike', label: 'あまり好みじゃない' },
] as const

// Q3の選択肢
export const Q3_OPTIONS = [
  { id: 'same',      label: '次も近い感じを飲みたい',   hint: '同系統をレコメンド' },
  { id: 'different', label: '別の系統を試したい',        hint: '新しい発見をレコメンド' },
] as const
