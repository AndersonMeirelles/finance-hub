-- FinanceHub Database Schema for Supabase

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Articles table
CREATE TABLE articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  meta_description TEXT,
  target_keyword TEXT,
  author TEXT NOT NULL DEFAULT 'FinanceHub Team',
  category TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured_image TEXT,
  read_time TEXT DEFAULT '5 min',
  seo_optimized BOOLEAN DEFAULT FALSE,
  submitted_to_directories BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0
);

-- Tracked keywords table
CREATE TABLE tracked_keywords (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  keyword TEXT UNIQUE NOT NULL,
  volume INTEGER DEFAULT 0,
  difficulty INTEGER DEFAULT 0,
  cpc DECIMAL(10,2) DEFAULT 0,
  trend TEXT DEFAULT 'stable' CHECK (trend IN ('rising', 'stable', 'falling')),
  related_keywords TEXT[],
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social media posts table
CREATE TABLE social_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  platform TEXT NOT NULL,
  content TEXT NOT NULL,
  hashtags TEXT[],
  scheduled_time TIMESTAMP WITH TIME ZONE,
  article_id UUID REFERENCES articles(id),
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'published', 'failed')),
  engagement_metrics JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Ad placements table
CREATE TABLE ad_placements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  position TEXT NOT NULL,
  format TEXT NOT NULL,
  ctr DECIMAL(5,3) DEFAULT 0,
  rpm DECIMAL(10,2) DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  date DATE DEFAULT CURRENT_DATE
);

-- SEO optimizations table
CREATE TABLE seo_optimizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  article_id UUID REFERENCES articles(id),
  optimizations TEXT[],
  expected_improvement DECIMAL(5,3),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Backlink outreach table
CREATE TABLE backlink_outreach (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  target_domain TEXT NOT NULL,
  authority INTEGER,
  relevance INTEGER,
  email_template TEXT,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'replied', 'accepted', 'rejected')),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  replied_at TIMESTAMP WITH TIME ZONE
);

-- Directory submissions table
CREATE TABLE directory_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  article_id UUID REFERENCES articles(id),
  directory_url TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'approved', 'rejected'))
);

-- Viral content schedule table
CREATE TABLE viral_content_schedule (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('meme', 'infographic', 'video', 'quiz', 'calculator', 'trend')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  platforms TEXT[],
  viral_potential DECIMAL(3,2),
  hashtags TEXT[],
  scheduled_time TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'published', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Engagement logs table
CREATE TABLE engagement_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  action TEXT NOT NULL,
  platform TEXT,
  target_user TEXT,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'failed'))
);

-- Ad tests table
CREATE TABLE ad_tests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  format TEXT NOT NULL,
  position TEXT NOT NULL,
  size TEXT,
  test_duration_days INTEGER DEFAULT 7,
  status TEXT DEFAULT 'running' CHECK (status IN ('running', 'completed', 'cancelled')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  results JSONB
);

-- Ad adjustments table
CREATE TABLE ad_adjustments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  placement_id UUID,
  adjustments TEXT[],
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'applied' CHECK (status IN ('applied', 'reverted'))
);

-- Ad networks table
CREATE TABLE ad_networks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  priority INTEGER DEFAULT 1,
  fill_rate DECIMAL(3,2) DEFAULT 0.95,
  avg_cpm DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audience segments table
CREATE TABLE audience_segments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  user_count INTEGER DEFAULT 0,
  criteria JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ad reports table
CREATE TABLE ad_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  report_data JSONB NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  period_days INTEGER DEFAULT 30
);

-- SEO error fixes table
CREATE TABLE seo_error_fixes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  error_type TEXT NOT NULL,
  article_id UUID REFERENCES articles(id),
  fixed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sitemaps table
CREATE TABLE sitemaps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT DEFAULT 'main',
  content TEXT NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trending topics table
CREATE TABLE trending_topics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  keyword TEXT NOT NULL,
  volume INTEGER DEFAULT 0,
  sentiment TEXT DEFAULT 'neutral' CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  related_terms TEXT[],
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User analytics table (for audience segmentation)
CREATE TABLE user_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT,
  session_duration INTEGER DEFAULT 0,
  pages_viewed INTEGER DEFAULT 0,
  interests TEXT[],
  last_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  preferences JSONB
);

-- Create indexes for better performance
CREATE INDEX idx_articles_status_published ON articles(status, published_at DESC);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_keywords_cpc ON tracked_keywords(cpc DESC);
CREATE INDEX idx_social_posts_platform_status ON social_posts(platform, status);
CREATE INDEX idx_social_posts_scheduled_time ON social_posts(scheduled_time);
CREATE INDEX idx_ad_placements_date ON ad_placements(date DESC);
CREATE INDEX idx_trending_topics_volume ON trending_topics(volume DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_keywords_updated_at BEFORE UPDATE ON tracked_keywords
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO articles (title, slug, content, excerpt, category, status, published_at) VALUES
('Como Escolher o Melhor Cartão de Crédito em 2025', 'melhor-cartao-credito-2025', 
'Conteúdo completo sobre cartões de crédito...', 
'Descubra os critérios essenciais para escolher o cartão de crédito ideal para seu perfil financeiro.',
'Cartões', 'published', NOW()),

('Investindo em Ações: Guia Completo para Iniciantes', 'investindo-acoes-iniciantes',
'Guia completo sobre investimento em ações...', 
'Aprenda os fundamentos do investimento em ações, desde a abertura de conta até a análise de empresas.',
'Investimentos', 'published', NOW()),

('Empréstimo Pessoal: Como Conseguir as Melhores Taxas', 'emprestimo-pessoal-melhores-taxas',
'Estratégias para conseguir melhores taxas...', 
'Estratégias para negociar taxas de juros mais baixas e evitar armadilhas comuns.',
'Empréstimos', 'published', NOW());

-- Insert sample keywords
INSERT INTO tracked_keywords (keyword, volume, difficulty, cpc, trend) VALUES
('melhor cartão de crédito', 50000, 65, 8.50, 'rising'),
('empréstimo pessoal online', 40000, 70, 12.30, 'stable'),
('como investir em ações', 35000, 55, 6.80, 'rising'),
('seguro de vida', 30000, 60, 15.20, 'stable'),
('financiamento imobiliário', 25000, 75, 18.90, 'rising');

-- Insert sample ad networks
INSERT INTO ad_networks (name, priority, fill_rate, avg_cpm) VALUES
('Google AdSense', 1, 0.95, 2.50),
('Media.net', 2, 0.85, 2.00),
('PropellerAds', 3, 0.90, 1.50);

-- Row Level Security (RLS) policies
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracked_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_placements ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published articles
CREATE POLICY "Public articles are viewable by everyone" ON articles
    FOR SELECT USING (status = 'published');

-- Allow public read access to keywords (for research)
CREATE POLICY "Keywords are viewable by everyone" ON tracked_keywords
    FOR SELECT USING (true);

-- Restrict write access to authenticated users only
CREATE POLICY "Only authenticated users can insert articles" ON articles
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update articles" ON articles
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON articles TO anon;
GRANT SELECT ON tracked_keywords TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

