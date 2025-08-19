import { createClient } from '@supabase/supabase-js';

interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  trend: 'rising' | 'stable' | 'falling';
  relatedKeywords: string[];
}

interface SEOOptimization {
  page: string;
  currentRank: number;
  targetKeyword: string;
  optimizations: string[];
  expectedImprovement: number;
}

interface BacklinkOpportunity {
  domain: string;
  authority: number;
  relevance: number;
  contactEmail?: string;
  outreachTemplate: string;
}

export class SEOBooster {
  private supabase;
  
  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  // Monitora palavras-chave de alto CPC em tempo real
  async monitorHighCPCKeywords(): Promise<KeywordData[]> {
    // Em produção, integraria com SEMrush, Ahrefs, ou Google Keyword Planner
    const highCPCKeywords: KeywordData[] = [
      {
        keyword: 'melhor cartão de crédito',
        volume: 50000,
        difficulty: 65,
        cpc: 8.50,
        trend: 'rising',
        relatedKeywords: ['cartão sem anuidade', 'cartão cashback', 'cartão platinum']
      },
      {
        keyword: 'empréstimo pessoal online',
        volume: 40000,
        difficulty: 70,
        cpc: 12.30,
        trend: 'stable',
        relatedKeywords: ['empréstimo rápido', 'crédito pessoal', 'empréstimo sem consulta']
      },
      {
        keyword: 'como investir em ações',
        volume: 35000,
        difficulty: 55,
        cpc: 6.80,
        trend: 'rising',
        relatedKeywords: ['investir na bolsa', 'ações para iniciantes', 'corretora de valores']
      },
      {
        keyword: 'seguro de vida',
        volume: 30000,
        difficulty: 60,
        cpc: 15.20,
        trend: 'stable',
        relatedKeywords: ['seguro de vida familiar', 'seguro de vida preço', 'melhor seguro de vida']
      },
      {
        keyword: 'financiamento imobiliário',
        volume: 25000,
        difficulty: 75,
        cpc: 18.90,
        trend: 'rising',
        relatedKeywords: ['financiamento casa própria', 'financiamento caixa', 'simulador financiamento']
      }
    ];

    // Salva no banco para tracking
    for (const keyword of highCPCKeywords) {
      await this.supabase
        .from('tracked_keywords')
        .upsert({
          keyword: keyword.keyword,
          volume: keyword.volume,
          difficulty: keyword.difficulty,
          cpc: keyword.cpc,
          trend: keyword.trend,
          related_keywords: keyword.relatedKeywords,
          last_updated: new Date()
        });
    }

    return highCPCKeywords;
  }

  // Atualiza meta descriptions e títulos automaticamente
  async optimizeMetaTags(): Promise<SEOOptimization[]> {
    const { data: articles } = await this.supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .is('seo_optimized', false);

    if (!articles) return [];

    const optimizations: SEOOptimization[] = [];

    for (const article of articles) {
      const optimization = await this.optimizeArticleSEO(article);
      optimizations.push(optimization);
      
      // Aplica otimizações
      await this.applyMetaOptimizations(article.id, optimization);
    }

    return optimizations;
  }

  // Otimiza SEO de um artigo específico
  private async optimizeArticleSEO(article: any): Promise<SEOOptimization> {
    const targetKeyword = await this.identifyTargetKeyword(article);
    const currentRank = await this.getCurrentRanking(article.slug, targetKeyword);
    
    const optimizations: string[] = [];
    let expectedImprovement = 0;

    // Otimização do título
    if (!article.title.toLowerCase().includes(targetKeyword.toLowerCase())) {
      optimizations.push(`Incluir palavra-chave "${targetKeyword}" no título`);
      expectedImprovement += 0.15;
    }

    // Otimização da meta description
    if (!article.meta_description || article.meta_description.length < 150) {
      optimizations.push('Criar meta description otimizada (150-160 caracteres)');
      expectedImprovement += 0.1;
    }

    // Otimização de headings
    const headingOptimization = await this.analyzeHeadings(article.content, targetKeyword);
    if (headingOptimization.needsOptimization) {
      optimizations.push('Otimizar estrutura de headings (H1, H2, H3)');
      expectedImprovement += 0.12;
    }

    // Densidade de palavra-chave
    const keywordDensity = this.calculateKeywordDensity(article.content, targetKeyword);
    if (keywordDensity < 0.5 || keywordDensity > 3) {
      optimizations.push(`Ajustar densidade da palavra-chave para 1-2% (atual: ${keywordDensity.toFixed(1)}%)`);
      expectedImprovement += 0.08;
    }

    // Links internos
    const internalLinks = await this.analyzeInternalLinks(article);
    if (internalLinks.count < 3) {
      optimizations.push('Adicionar mais links internos relevantes');
      expectedImprovement += 0.1;
    }

    return {
      page: article.slug,
      currentRank: currentRank,
      targetKeyword,
      optimizations,
      expectedImprovement
    };
  }

  // Aplica otimizações de meta tags
  private async applyMetaOptimizations(articleId: string, optimization: SEOOptimization): Promise<void> {
    const optimizedTitle = await this.generateOptimizedTitle(optimization.targetKeyword);
    const optimizedDescription = await this.generateOptimizedDescription(optimization.targetKeyword);

    await this.supabase
      .from('articles')
      .update({
        title: optimizedTitle,
        meta_description: optimizedDescription,
        seo_optimized: true,
        target_keyword: optimization.targetKeyword,
        last_seo_update: new Date()
      })
      .eq('id', articleId);

    // Log da otimização
    await this.supabase
      .from('seo_optimizations')
      .insert({
        article_id: articleId,
        optimizations: optimization.optimizations,
        expected_improvement: optimization.expectedImprovement,
        applied_at: new Date()
      });
  }

  // Cria backlinks através de guest posts automatizados
  async createBacklinks(): Promise<BacklinkOpportunity[]> {
    const opportunities = await this.findBacklinkOpportunities();
    
    for (const opportunity of opportunities.slice(0, 5)) { // Limita a 5 por execução
      await this.executeBacklinkOutreach(opportunity);
    }

    return opportunities;
  }

  // Encontra oportunidades de backlinks
  private async findBacklinkOpportunities(): Promise<BacklinkOpportunity[]> {
    // Em produção, integraria com ferramentas como Ahrefs, SEMrush
    const opportunities: BacklinkOpportunity[] = [
      {
        domain: 'blogdoinvestidor.com',
        authority: 45,
        relevance: 90,
        contactEmail: 'contato@blogdoinvestidor.com',
        outreachTemplate: 'guest_post_finance'
      },
      {
        domain: 'financaspessoais.net',
        authority: 38,
        relevance: 95,
        contactEmail: 'editor@financaspessoais.net',
        outreachTemplate: 'collaboration_proposal'
      },
      {
        domain: 'investimentosinteligentes.com.br',
        authority: 42,
        relevance: 88,
        contactEmail: 'parceria@investimentosinteligentes.com.br',
        outreachTemplate: 'content_exchange'
      }
    ];

    return opportunities.filter(opp => opp.authority > 30 && opp.relevance > 80);
  }

  // Executa outreach para backlinks
  private async executeBacklinkOutreach(opportunity: BacklinkOpportunity): Promise<void> {
    const emailTemplate = await this.getOutreachTemplate(opportunity.outreachTemplate);
    
    // Em produção, integraria com serviço de email
    console.log(`Enviando outreach para ${opportunity.domain}`);
    
    await this.supabase
      .from('backlink_outreach')
      .insert({
        target_domain: opportunity.domain,
        authority: opportunity.authority,
        relevance: opportunity.relevance,
        email_template: opportunity.outreachTemplate,
        status: 'sent',
        sent_at: new Date()
      });
  }

  // Submete artigos para diretórios gratuitos
  async submitToDirectories(): Promise<void> {
    const { data: recentArticles } = await this.supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .gte('published_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) // Últimos 7 dias
      .is('submitted_to_directories', false);

    if (!recentArticles) return;

    const directories = [
      'https://www.dmoz-odp.org/',
      'https://www.jayde.com/',
      'https://www.gimpsy.com/',
      'https://www.exactseek.com/',
      'https://www.pegasusdirectory.com/'
    ];

    for (const article of recentArticles) {
      for (const directory of directories) {
        await this.submitToDirectory(article, directory);
      }
      
      // Marca como submetido
      await this.supabase
        .from('articles')
        .update({ submitted_to_directories: true })
        .eq('id', article.id);
    }
  }

  // Submete artigo para diretório específico
  private async submitToDirectory(article: any, directory: string): Promise<void> {
    // Em produção, automatizaria o processo de submissão
    await this.supabase
      .from('directory_submissions')
      .insert({
        article_id: article.id,
        directory_url: directory,
        submitted_at: new Date(),
        status: 'submitted'
      });
  }

  // Monitora e corrige erros de SEO
  async monitorSEOErrors(): Promise<void> {
    const errors = await this.detectSEOErrors();
    
    for (const error of errors) {
      await this.fixSEOError(error);
    }
  }

  // Detecta erros de SEO
  private async detectSEOErrors(): Promise<any[]> {
    const { data: articles } = await this.supabase
      .from('articles')
      .select('*')
      .eq('status', 'published');

    if (!articles) return [];

    const errors: any[] = [];

    for (const article of articles) {
      // Verifica título duplicado
      const { data: duplicateTitles } = await this.supabase
        .from('articles')
        .select('id')
        .eq('title', article.title)
        .neq('id', article.id);

      if (duplicateTitles && duplicateTitles.length > 0) {
        errors.push({
          type: 'duplicate_title',
          article_id: article.id,
          description: 'Título duplicado encontrado'
        });
      }

      // Verifica meta description ausente
      if (!article.meta_description) {
        errors.push({
          type: 'missing_meta_description',
          article_id: article.id,
          description: 'Meta description ausente'
        });
      }

      // Verifica título muito longo
      if (article.title.length > 60) {
        errors.push({
          type: 'title_too_long',
          article_id: article.id,
          description: 'Título muito longo para SEO'
        });
      }
    }

    return errors;
  }

  // Corrige erro de SEO
  private async fixSEOError(error: any): Promise<void> {
    switch (error.type) {
      case 'duplicate_title':
        await this.fixDuplicateTitle(error.article_id);
        break;
      case 'missing_meta_description':
        await this.generateMetaDescription(error.article_id);
        break;
      case 'title_too_long':
        await this.shortenTitle(error.article_id);
        break;
    }

    // Log da correção
    await this.supabase
      .from('seo_error_fixes')
      .insert({
        error_type: error.type,
        article_id: error.article_id,
        fixed_at: new Date()
      });
  }

  // Gera sitemaps dinâmicos
  async generateDynamicSitemap(): Promise<string> {
    const { data: articles } = await this.supabase
      .from('articles')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (!articles) return '';

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://financehub.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    for (const article of articles) {
      sitemap += `
  <url>
    <loc>https://financehub.com/blog/${article.slug}</loc>
    <lastmod>${new Date(article.updated_at || article.published_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }

    sitemap += '\n</urlset>';

    // Salva sitemap
    await this.supabase
      .from('sitemaps')
      .upsert({
        type: 'main',
        content: sitemap,
        generated_at: new Date()
      });

    return sitemap;
  }

  // Funções auxiliares
  private async identifyTargetKeyword(article: any): Promise<string> {
    // Análise simplificada - em produção usaria NLP
    const title = article.title.toLowerCase();
    const keywords = await this.monitorHighCPCKeywords();
    
    for (const keyword of keywords) {
      if (title.includes(keyword.keyword.toLowerCase())) {
        return keyword.keyword;
      }
    }
    
    return article.title.split(' ').slice(0, 3).join(' ');
  }

  private async getCurrentRanking(slug: string, keyword: string): Promise<number> {
    // Em produção, integraria com ferramentas de rank tracking
    return Math.floor(Math.random() * 100) + 1;
  }

  private async analyzeHeadings(content: string, keyword: string): Promise<any> {
    const h1Count = (content.match(/<h1>/g) || []).length;
    const h2Count = (content.match(/<h2>/g) || []).length;
    
    return {
      needsOptimization: h1Count !== 1 || h2Count < 2,
      h1Count,
      h2Count
    };
  }

  private calculateKeywordDensity(content: string, keyword: string): number {
    const words = content.toLowerCase().split(/\s+/).length;
    const keywordOccurrences = (content.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
    
    return (keywordOccurrences / words) * 100;
  }

  private async analyzeInternalLinks(article: any): Promise<any> {
    const linkMatches = article.content.match(/<a[^>]+href="[^"]*"[^>]*>/g) || [];
    const internalLinks = linkMatches.filter(link => link.includes('financehub.com'));
    
    return {
      count: internalLinks.length,
      total: linkMatches.length
    };
  }

  private async generateOptimizedTitle(keyword: string): Promise<string> {
    const templates = [
      `${keyword}: Guia Completo 2025`,
      `Como ${keyword} - Passo a Passo`,
      `${keyword}: Tudo que Você Precisa Saber`,
      `Melhores ${keyword} - Comparação Atualizada`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private async generateOptimizedDescription(keyword: string): Promise<string> {
    return `Descubra tudo sobre ${keyword}. Guia completo com dicas práticas, comparações e análises atualizadas. Leia agora e tome as melhores decisões financeiras.`;
  }

  private async getOutreachTemplate(templateType: string): Promise<string> {
    const templates = {
      guest_post_finance: `
Olá,

Sou do FinanceHub e admiro muito o conteúdo do seu blog sobre finanças.

Gostaria de propor uma parceria de guest post. Posso criar um artigo exclusivo sobre [TÓPICO] para seu público.

Em troca, seria possível incluir um link para nosso site?

Aguardo seu retorno!
`,
      collaboration_proposal: `
Olá,

Representando o FinanceHub, gostaria de propor uma colaboração.

Podemos trocar artigos ou fazer menções cruzadas em nossos conteúdos sobre finanças.

Que tal conversarmos sobre as possibilidades?
`,
      content_exchange: `
Olá,

Notei que produzimos conteúdo similar sobre finanças pessoais.

Que tal uma troca de conteúdo? Posso escrever para vocês e vice-versa.

Interessados?
`
    };

    return templates[templateType] || templates.guest_post_finance;
  }

  private async fixDuplicateTitle(articleId: string): Promise<void> {
    const { data: article } = await this.supabase
      .from('articles')
      .select('title')
      .eq('id', articleId)
      .single();

    if (article) {
      const newTitle = `${article.title} - Atualizado 2025`;
      await this.supabase
        .from('articles')
        .update({ title: newTitle })
        .eq('id', articleId);
    }
  }

  private async generateMetaDescription(articleId: string): Promise<void> {
    const { data: article } = await this.supabase
      .from('articles')
      .select('title, excerpt')
      .eq('id', articleId)
      .single();

    if (article) {
      const metaDescription = article.excerpt?.substring(0, 155) + '...' || 
                             `${article.title} - Guia completo no FinanceHub.`;
      
      await this.supabase
        .from('articles')
        .update({ meta_description: metaDescription })
        .eq('id', articleId);
    }
  }

  private async shortenTitle(articleId: string): Promise<void> {
    const { data: article } = await this.supabase
      .from('articles')
      .select('title')
      .eq('id', articleId)
      .single();

    if (article && article.title.length > 60) {
      const shortenedTitle = article.title.substring(0, 57) + '...';
      await this.supabase
        .from('articles')
        .update({ title: shortenedTitle })
        .eq('id', articleId);
    }
  }
}

