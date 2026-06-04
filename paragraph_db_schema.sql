-- ========================================================
-- n8n Paragraph Automation DB Schema (Neon PostgreSQL)
-- ========================================================

-- 1. paragraph_posts テーブル: 各投稿の詳細とメタデータを保存
CREATE TABLE IF NOT EXISTS paragraph_posts (
  id SERIAL PRIMARY KEY,
  post_id VARCHAR(50) UNIQUE NOT NULL,  -- Paragraph返却のpost_id
  title VARCHAR(255) NOT NULL,          -- 記事タイトル（混在版）
  title_ja VARCHAR(255),                -- 日本語版タイトル
  slug VARCHAR(255) UNIQUE NOT NULL,    -- Paragraph slug
  body TEXT NOT NULL,                   -- 本文（日本語+英語混在）
  word_count INTEGER,                   -- 単語数
  read_time_minutes INTEGER,            -- 読了時間
  tags TEXT[],                          -- SEO タグ配列
  hashtags TEXT,                        -- ハッシュタグ文字列
  language VARCHAR(20),                 -- 言語コード: mixed_ja_en
  paragraph_url VARCHAR(500),           -- Paragraph.com の URL
  published_at TIMESTAMP WITH TIME ZONE, -- 実際の発行日時
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  obsidian_source_file VARCHAR(500),    -- Obsidian ファイルパス
  generated_by VARCHAR(100),            -- 生成元（n8n_flow1）
  
  -- メタデータおよび後続フロー状態管理
  engagement_metrics JSONB,             -- いいね、コメント数（後で集計）
  sync_status VARCHAR(50) DEFAULT 'published', -- pending, published, zenn_synced, linkedin_synced
  zenn_article_id VARCHAR(50),          -- Zenn 記事 ID（同期後）
  linkedin_post_id VARCHAR(50),         -- LinkedIn 投稿 ID（同期後）
  
  CONSTRAINT valid_language CHECK (language IN ('mixed_ja_en', 'ja', 'en'))
);

-- Index For Faster Lookups
CREATE INDEX IF NOT EXISTS idx_paragraph_posts_published_at ON paragraph_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_paragraph_posts_tags ON paragraph_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_paragraph_posts_sync_status ON paragraph_posts(sync_status);

-- 2. content_metrics テーブル: 日次のエンゲージメント推移をトラッキング
CREATE TABLE IF NOT EXISTS content_metrics (
  id SERIAL PRIMARY KEY,
  post_id VARCHAR(50) REFERENCES paragraph_posts(post_id) ON DELETE CASCADE,
  date DATE,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  coins_value DECIMAL(10, 2) DEFAULT 0.00,  -- Paragraph coins の価値
  zenn_likes INTEGER DEFAULT 0,
  linkedin_impressions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(post_id, date)
);

CREATE INDEX IF NOT EXISTS idx_content_metrics_post_id ON content_metrics(post_id);
CREATE INDEX IF NOT EXISTS idx_content_metrics_date ON content_metrics(date);

-- 3. n8n_workflow_logs テーブル: n8nの実行ログ保存用
CREATE TABLE IF NOT EXISTS n8n_workflow_logs (
  id SERIAL PRIMARY KEY,
  workflow_id VARCHAR(100),
  step_name VARCHAR(100),
  status VARCHAR(20),  -- success, error, warning
  message TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
