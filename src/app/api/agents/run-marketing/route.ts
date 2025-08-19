import { NextRequest, NextResponse } from 'next/server';
import { SocialMediaManager } from '@/lib/agents/socialMediaManager';
import { AdRevenueOptimizer } from '@/lib/agents/adRevenueOptimizer';
import { ViralContentCreator } from '@/lib/agents/viralContentCreator';
import { SEOBooster } from '@/lib/agents/seoBooster';

export async function POST(request: NextRequest) {
  try {
    const { agent, action } = await request.json();

    let result;

    switch (agent) {
      case 'social_media':
        const socialManager = new SocialMediaManager();
        switch (action) {
          case 'schedule_posts':
            result = await socialManager.scheduleAutomaticPosts();
            break;
          case 'auto_engage':
            result = await socialManager.autoEngage();
            break;
          case 'analyze_performance':
            result = await socialManager.analyzePostPerformance();
            break;
          default:
            throw new Error('Ação não reconhecida para Social Media Manager');
        }
        break;

      case 'ad_optimizer':
        const adOptimizer = new AdRevenueOptimizer();
        switch (action) {
          case 'optimize_placements':
            result = await adOptimizer.optimizeAdPlacements();
            break;
          case 'run_tests':
            result = await adOptimizer.runAdFormatTests();
            break;
          case 'monitor_ctr':
            result = await adOptimizer.monitorAndAdjustCTR();
            break;
          case 'generate_report':
            result = await adOptimizer.generateAdPerformanceReport();
            break;
          default:
            throw new Error('Ação não reconhecida para Ad Revenue Optimizer');
        }
        break;

      case 'viral_creator':
        const viralCreator = new ViralContentCreator();
        switch (action) {
          case 'create_memes':
            result = await viralCreator.createFinancialMemes();
            break;
          case 'create_infographics':
            result = await viralCreator.createInfographics();
            break;
          case 'create_videos':
            result = await viralCreator.createShortVideos();
            break;
          case 'schedule_viral':
            result = await viralCreator.scheduleViralContent();
            break;
          default:
            throw new Error('Ação não reconhecida para Viral Content Creator');
        }
        break;

      case 'seo_booster':
        const seoBooster = new SEOBooster();
        switch (action) {
          case 'monitor_keywords':
            result = await seoBooster.monitorHighCPCKeywords();
            break;
          case 'optimize_meta':
            result = await seoBooster.optimizeMetaTags();
            break;
          case 'create_backlinks':
            result = await seoBooster.createBacklinks();
            break;
          case 'generate_sitemap':
            result = await seoBooster.generateDynamicSitemap();
            break;
          default:
            throw new Error('Ação não reconhecida para SEO Booster');
        }
        break;

      default:
        throw new Error('Agente não reconhecido');
    }

    return NextResponse.json({
      success: true,
      agent,
      action,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro ao executar agente:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Endpoint para executar todos os agentes em sequência
export async function GET() {
  try {
    const results = [];

    // 1. SEO Booster - Monitora keywords e otimiza
    const seoBooster = new SEOBooster();
    results.push({
      agent: 'seo_booster',
      keywords: await seoBooster.monitorHighCPCKeywords(),
      optimizations: await seoBooster.optimizeMetaTags()
    });

    // 2. Viral Content Creator - Cria conteúdo viral
    const viralCreator = new ViralContentCreator();
    results.push({
      agent: 'viral_creator',
      memes: await viralCreator.createFinancialMemes(),
      videos: await viralCreator.createShortVideos()
    });

    // 3. Social Media Manager - Agenda posts
    const socialManager = new SocialMediaManager();
    await socialManager.scheduleAutomaticPosts();
    results.push({
      agent: 'social_media',
      action: 'posts_scheduled',
      performance: await socialManager.analyzePostPerformance()
    });

    // 4. Ad Revenue Optimizer - Otimiza anúncios
    const adOptimizer = new AdRevenueOptimizer();
    results.push({
      agent: 'ad_optimizer',
      optimizations: await adOptimizer.optimizeAdPlacements(),
      report: await adOptimizer.generateAdPerformanceReport()
    });

    return NextResponse.json({
      success: true,
      message: 'Todos os agentes executados com sucesso',
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro ao executar todos os agentes:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

