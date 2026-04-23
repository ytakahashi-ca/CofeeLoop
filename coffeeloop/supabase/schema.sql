-- CoffeeLoop MVP Schema
-- Supabaseのクエリエディタで実行してください

-- ユーザー
create table users (
  id uuid default gen_random_uuid() primary key,
  line_user_id text unique,
  created_at timestamp with time zone default now()
);

-- 店舗
create table shops (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  line_channel_token text,
  created_at timestamp with time zone default now()
);

-- 豆
create table beans (
  id uuid default gen_random_uuid() primary key,
  shop_id uuid references shops(id) on delete cascade,
  name text not null,
  origin text not null,
  roast text not null check (roast in ('浅煎り', '中煎り', '中深煎り', '深煎り')),
  process text not null,
  date date not null default current_date,
  created_at timestamp with time zone default now()
);

-- 記録
create table records (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  bean_id uuid references beans(id) on delete cascade,
  q1 text not null check (q1 in ('like', 'normal', 'dislike')),
  q2_tags text[] not null default '{}',
  q3 text not null check (q3 in ('same', 'different')),
  created_at timestamp with time zone default now()
);

-- テイストプロフィール
create table taste_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade unique,
  acidity integer not null default 0 check (acidity between 0 and 100),
  bitterness integer not null default 0 check (bitterness between 0 and 100),
  sweetness integer not null default 0 check (sweetness between 0 and 100),
  body integer not null default 0 check (body between 0 and 100),
  updated_at timestamp with time zone default now()
);

-- スタンプ
create table stamps (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  shop_id uuid references shops(id) on delete cascade,
  count integer not null default 0,
  bonus_count integer not null default 0,
  updated_at timestamp with time zone default now(),
  unique(user_id, shop_id)
);

-- サンプルデータ（開発用）
insert into shops (id, name) values
  ('00000000-0000-0000-0000-000000000001', 'Koffee Mameya');

insert into beans (shop_id, name, origin, roast, process, date) values
  ('00000000-0000-0000-0000-000000000001', 'エチオピア イルガチェフェ', 'エチオピア', '浅煎り', 'ナチュラル', current_date),
  ('00000000-0000-0000-0000-000000000001', 'ケニア AA', 'ケニア', '中煎り', 'ウォッシュド', current_date),
  ('00000000-0000-0000-0000-000000000001', 'コロンビア ナリーニョ', 'コロンビア', '浅煎り', 'ハニー', current_date),
  ('00000000-0000-0000-0000-000000000001', 'グアテマラ アンティグア', 'グアテマラ', '中深煎り', 'ウォッシュド', current_date);
