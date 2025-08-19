import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database schema types
export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  meta_description?: string;
  target_keyword?: string;
  author: string;
  category: string;
  published_at: string;
  updated_at: string;
  status: 'draft' | 'published';
  featured_image?: string;
  read_time: string;
  seo_optimized: boolean;
  submitted_to_directories: boolean;
}

export interface Keyword {
  id: string;
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  trend: 'rising' | 'stable' | 'falling';
  related_keywords: string[];
  last_updated: string;
}

export interface SocialPost {
  id: string;
  platform: string;
  content: string;
  hashtags: string[];
  scheduled_time: string;
  article_id?: string;
  status: 'scheduled' | 'published' | 'failed';
  engagement_metrics?: {
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
  };
}

export interface AdPlacement {
  id: string;
  position: string;
  format: string;
  ctr: number;
  rpm: number;
  impressions: number;
  clicks: number;
  revenue: number;
  created_at: string;
}

// Helper functions for database operations
export const articleService = {
  async getPublishedArticles(limit = 10) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async getArticleBySlug(slug: string) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    
    if (error) throw error;
    return data;
  },

  async createArticle(article: Partial<Article>) {
    const { data, error } = await supabase
      .from('articles')
      .insert(article)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateArticle(id: string, updates: Partial<Article>) {
    const { data, error } = await supabase
      .from('articles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

export const keywordService = {
  async getHighCPCKeywords(limit = 50) {
    const { data, error } = await supabase
      .from('tracked_keywords')
      .select('*')
      .order('cpc', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async addKeyword(keyword: Partial<Keyword>) {
    const { data, error } = await supabase
      .from('tracked_keywords')
      .upsert(keyword)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

export const socialMediaService = {
  async schedulePost(post: Partial<SocialPost>) {
    const { data, error } = await supabase
      .from('social_posts')
      .insert(post)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getScheduledPosts(platform?: string) {
    let query = supabase
      .from('social_posts')
      .select('*')
      .eq('status', 'scheduled')
      .order('scheduled_time', { ascending: true });
    
    if (platform) {
      query = query.eq('platform', platform);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
};

export const adService = {
  async recordAdMetrics(placement: Partial<AdPlacement>) {
    const { data, error } = await supabase
      .from('ad_placements')
      .insert(placement)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getAdPerformance(days = 30) {
    const { data, error } = await supabase
      .from('ad_placements')
      .select('*')
      .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());
    
    if (error) throw error;
    return data;
  }
};

