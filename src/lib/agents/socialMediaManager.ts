import { createClient } from '@supabase/supabase-js';

interface SocialPost {
  platform: string;
  content: string;
  hashtags: string[];
  scheduledTime: Date;
  articleId?: string;
}

interface TrendingTopic {
  keyword: string;
  volume: number;
  platform: string;
}

export class SocialMediaManager {
  private supabase;
  
  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  // Gera conteúdo para redes sociais baseado em artigos
  async generateSocialContent(articleId: string): Promise<SocialPost[]> {
    const { data: article } = await this.supabase
      .from('articles')
      .select('*')
      .eq('id', articleId)
      .single();

    if (!article) return [];

    const posts: SocialPost[] = [];

    // Twitter/X Thread
    posts.push({
      platform: 'twitter',
      content: this.generateTwitterThread(article),
      hashtags: this.getFinanceHashtags('twitter'),
      scheduledTime: this.getOptimalPostTime('twitter'),
      articleId
    });

    // LinkedIn Post
    posts.push({
      platform: 'linkedin',
      content: this.generateLinkedInPost(article),
      hashtags: this.getFinanceHashtags('linkedin'),
      scheduledTime: this.getOptimalPostTime('linkedin'),
      articleId
    });

    // Instagram Story
    posts.push({
      platform: 'instagram',
      content: this.generateInstagramStory(article),
      hashtags: this.getFinanceHashtags('instagram'),
      scheduledTime: this.getOptimalPostTime('instagram'),
      articleId
    });

    // TikTok Script
    posts.push({
      platform: 'tiktok',
      content: this.generateTikTokScript(article),
      hashtags: this.getFinanceHashtags('tiktok'),
      scheduledTime: this.getOptimalPostTime('tiktok'),
      articleId
    });

    return posts;
  }

  // Gera thread para Twitter
  private generateTwitterThread(article: any): string {
    const title = article.title;
    const excerpt = article.excerpt;
    const url = `https://financehub.com/blog/${article.slug}`;

    return `🧵 THREAD: ${title}

1/ ${excerpt}

2/ Principais pontos abordados:
• Estratégias práticas
• Dicas de especialistas  
• Exemplos reais
• Análise detalhada

3/ Quer saber mais? Leia o artigo completo: ${url}

#FinançasPessoais #Investimentos #DicasFinanceiras`;
  }

  // Gera post para LinkedIn
  private generateLinkedInPost(article: any): string {
    const title = article.title;
    const excerpt = article.excerpt;
    const url = `https://financehub.com/blog/${article.slug}`;

    return `💰 ${title}

${excerpt}

Este artigo oferece insights valiosos para profissionais que buscam:
✅ Otimizar suas finanças pessoais
✅ Tomar decisões de investimento mais inteligentes
✅ Construir riqueza de forma sustentável

Compartilhe suas experiências nos comentários!

Leia mais: ${url}`;
  }

  // Gera conteúdo para Instagram Story
  private generateInstagramStory(article: any): string {
    const title = article.title;
    const mainTip = this.extractMainTip(article.content);

    return `💡 DICA FINANCEIRA DO DIA

${title}

🎯 Dica principal:
${mainTip}

👆 Deslize para mais dicas
📖 Link na bio para artigo completo`;
  }

  // Gera script para TikTok
  private generateTikTokScript(article: any): string {
    const title = article.title;
    const tips = this.extractTips(article.content, 3);

    return `🎬 SCRIPT TIKTOK: ${title}

HOOK (0-3s): "Você sabia que 90% das pessoas cometem ESTE erro financeiro?"

CONTEÚDO (3-25s):
${tips.map((tip, index) => `${index + 1}. ${tip}`).join('\n')}

CTA (25-30s): "Quer mais dicas? Segue aqui e comenta 💰"

TEXTO NA TELA: "${title}"
MÚSICA: Trending finance sound`;
  }

  // Obtém hashtags relevantes por plataforma
  private getFinanceHashtags(platform: string): string[] {
    const hashtagsByPlatform = {
      twitter: [
        '#FinançasPessoais', '#Investimentos', '#DicasFinanceiras',
        '#EducaçãoFinanceira', '#Poupança', '#RendaPassiva',
        '#CartãoDeCredito', '#Empréstimos', '#CriptoMoedas'
      ],
      linkedin: [
        '#FinançasPessoais', '#Investimentos', '#PlanejamentoFinanceiro',
        '#EducaçãoFinanceira', '#Carreira', '#Empreendedorismo',
        '#MercadoFinanceiro', '#Economia'
      ],
      instagram: [
        '#financaspessoais', '#investimentos', '#dicasfinanceiras',
        '#educacaofinanceira', '#poupanca', '#rendapassiva',
        '#dinheiro', '#economia', '#planejamentofinanceiro'
      ],
      tiktok: [
        '#financaspessoais', '#investimentos', '#dicasfinanceiras',
        '#dinheiro', '#poupanca', '#rendapassiva', '#economia',
        '#educacaofinanceira', '#viral', '#fyp'
      ]
    };

    return hashtagsByPlatform[platform] || [];
  }

  // Determina horário ótimo para postagem por plataforma
  private getOptimalPostTime(platform: string): Date {
    const now = new Date();
    const optimalHours = {
      twitter: [8, 12, 17, 20], // 8h, 12h, 17h, 20h
      linkedin: [8, 12, 17], // 8h, 12h, 17h
      instagram: [11, 14, 17, 20], // 11h, 14h, 17h, 20h
      tiktok: [18, 19, 20, 21] // 18h, 19h, 20h, 21h
    };

    const hours = optimalHours[platform] || [12];
    const randomHour = hours[Math.floor(Math.random() * hours.length)];
    
    const scheduledTime = new Date(now);
    scheduledTime.setHours(randomHour, Math.floor(Math.random() * 60), 0, 0);
    
    // Se o horário já passou hoje, agenda para amanhã
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    return scheduledTime;
  }

  // Extrai dica principal do artigo
  private extractMainTip(content: string): string {
    // Lógica simplificada - em produção usaria NLP
    const sentences = content.split('.').filter(s => s.length > 50);
    return sentences[0]?.substring(0, 100) + '...' || 'Confira o artigo completo!';
  }

  // Extrai múltiplas dicas do artigo
  private extractTips(content: string, count: number): string[] {
    // Lógica simplificada - em produção usaria NLP
    const sentences = content.split('.').filter(s => s.length > 30 && s.length < 100);
    return sentences.slice(0, count).map(s => s.trim());
  }

  // Monitora trending topics relacionados a finanças
  async getTrendingFinanceTopics(): Promise<TrendingTopic[]> {
    // Em produção, integraria com APIs de trending topics
    const mockTrends: TrendingTopic[] = [
      { keyword: 'bitcoin', volume: 100000, platform: 'twitter' },
      { keyword: 'investimentos', volume: 50000, platform: 'instagram' },
      { keyword: 'poupança', volume: 30000, platform: 'tiktok' },
      { keyword: 'cartão de crédito', volume: 40000, platform: 'linkedin' }
    ];

    return mockTrends;
  }

  // Agenda posts automaticamente
  async scheduleAutomaticPosts(): Promise<void> {
    const { data: recentArticles } = await this.supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(5);

    if (!recentArticles) return;

    for (const article of recentArticles) {
      const socialPosts = await this.generateSocialContent(article.id);
      
      for (const post of socialPosts) {
        await this.supabase
          .from('social_posts')
          .insert({
            platform: post.platform,
            content: post.content,
            hashtags: post.hashtags,
            scheduled_time: post.scheduledTime,
            article_id: post.articleId,
            status: 'scheduled'
          });
      }
    }
  }

  // Engaja automaticamente com outros posts
  async autoEngage(): Promise<void> {
    const engagementActions = [
      'like_finance_posts',
      'comment_on_trending',
      'share_relevant_content',
      'follow_finance_influencers'
    ];

    // Simula engajamento automático
    console.log('Executando ações de engajamento automático...');
    
    // Em produção, integraria com APIs das redes sociais
    for (const action of engagementActions) {
      await this.executeEngagementAction(action);
    }
  }

  private async executeEngagementAction(action: string): Promise<void> {
    // Implementação específica para cada ação de engajamento
    console.log(`Executando: ${action}`);
    
    // Log da ação no banco
    await this.supabase
      .from('engagement_logs')
      .insert({
        action,
        executed_at: new Date(),
        status: 'completed'
      });
  }

  // Analisa performance dos posts
  async analyzePostPerformance(): Promise<any> {
    const { data: posts } = await this.supabase
      .from('social_posts')
      .select('*')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // Últimos 7 dias

    if (!posts) return null;

    const analytics = {
      totalPosts: posts.length,
      byPlatform: {},
      avgEngagement: 0,
      topPerformingPosts: []
    };

    // Agrupa por plataforma
    posts.forEach(post => {
      if (!analytics.byPlatform[post.platform]) {
        analytics.byPlatform[post.platform] = 0;
      }
      analytics.byPlatform[post.platform]++;
    });

    return analytics;
  }
}

