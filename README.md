# CoffeeLoop

スペシャリティカフェ向け顧客行動設計プラットフォーム

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example` をコピーして `.env.local` を作成し、各値を設定してください。

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
LINE_CHANNEL_ACCESS_TOKEN=your_line_token
```

### 3. Supabaseのセットアップ

`supabase/schema.sql` をSupabaseのクエリエディタで実行してください。

### 4. 開発サーバーの起動

```bash
npm run dev
```

## 画面構成

| URL | 説明 |
|-----|------|
| `/` | ホーム |
| `/record` | 記録フロー（QR→豆選択→Q1〜Q3→完了） |
| `/profile` | テイストプロフィール + スタンプカード |
| `/shop` | 店側ダッシュボード |

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (PostgreSQL)
- **LINE Messaging API**

## データ設計

```
users          ユーザー基本情報
shops          店舗情報・LINE連携
beans          豆ラインナップ
records        記録データ（Q1〜Q3）
taste_profiles テイストプロフィール（4軸）
stamps         スタンプ状況
```

## 開発メモ

- MVPフェーズはUIのみ実装済み（データはダミー）
- Supabase連携・LINE通知は次のステップ
- ReplitのAIに渡して実装を依頼する場合は `coffeeloop-bolt-prompt.md` を参照
