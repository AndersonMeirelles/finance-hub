import { createClient } from '@supabase/supabase-js';

interface ViralContent {
  type: 'meme' | 'infographic' | 'video' | 'quiz' | 'calculator' | 'trend';
  title: string;
  content: string;
  platforms: string[];
  viralPotential: number;
  hashtags: string[];
}

interface TrendingTopic {
  keyword: string;
  volume: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  relatedTerms: string[];
}

export class ViralContentCreator {
  private supabase;
  
  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  // Identifica trends financeiros em tempo real
  async identifyFinancialTrends(): Promise<TrendingTopic[]> {
    // Em produção, integraria com Google Trends API, Twitter API, etc.
    const mockTrends: TrendingTopic[] = [
      {
        keyword: 'bitcoin alta',
        volume: 150000,
        sentiment: 'positive',
        relatedTerms: ['criptomoedas', 'investimento', 'alta', 'lucro']
      },
      {
        keyword: 'taxa selic',
        volume: 80000,
        sentiment: 'neutral',
        relatedTerms: ['juros', 'poupança', 'investimentos', 'economia']
      },
      {
        keyword: 'cartão sem anuidade',
        volume: 60000,
        sentiment: 'positive',
        relatedTerms: ['cartão de crédito', 'gratuito', 'benefícios', 'cashback']
      },
      {
        keyword: 'inflação 2025',
        volume: 90000,
        sentiment: 'negative',
        relatedTerms: ['preços', 'economia', 'poder de compra', 'investimentos']
      }
    ];

    // Salva trends no banco
    for (const trend of mockTrends) {
      await this.supabase
        .from('trending_topics')
        .upsert({
          keyword: trend.keyword,
          volume: trend.volume,
          sentiment: trend.sentiment,
          related_terms: trend.relatedTerms,
          detected_at: new Date()
        });
    }

    return mockTrends;
  }

  // Cria memes financeiros automaticamente
  async createFinancialMemes(): Promise<ViralContent[]> {
    const trends = await this.identifyFinancialTrends();
    const memes: ViralContent[] = [];

    for (const trend of trends.slice(0, 3)) {
      const meme = await this.generateMeme(trend);
      memes.push(meme);
    }

    return memes;
  }

  // Gera meme baseado em trend
  private async generateMeme(trend: TrendingTopic): Promise<ViralContent> {
    const memeTemplates = [
      {
        template: 'Drake pointing',
        text: `Drake rejeitando: Deixar dinheiro parado na conta\nDrake aprovando: ${trend.keyword}`
      },
      {
        template: 'Distracted boyfriend',
        text: `Namorada: Poupança tradicional\nNamorado: Eu\nOutra mulher: ${trend.keyword}`
      },
      {
        template: 'This is fine',
        text: `Quando você vê ${trend.keyword} mas já está preparado financeiramente`
      },
      {
        template: 'Expanding brain',
        text: `Nível 1: Guardar dinheiro no colchão\nNível 2: Poupança\nNível 3: CDB\nNível 4: ${trend.keyword}`
      }
    ];

    const randomTemplate = memeTemplates[Math.floor(Math.random() * memeTemplates.length)];

    return {
      type: 'meme',
      title: `Meme: ${trend.keyword}`,
      content: randomTemplate.text,
      platforms: ['instagram', 'tiktok', 'twitter', 'facebook'],
      viralPotential: this.calculateViralPotential(trend),
      hashtags: ['#memeFinanceiro', '#financaspessoais', '#investimentos', ...trend.relatedTerms.map(t => `#${t.replace(' ', '')}`)]
    };
  }

  // Gera infográficos com dados atuais
  async createInfographics(): Promise<ViralContent[]> {
    const infographics: ViralContent[] = [];

    const topics = [
      {
        title: 'Como a Taxa Selic Afeta Seus Investimentos',
        data: await this.getSelicData(),
        type: 'comparison'
      },
      {
        title: '10 Dicas para Economizar R$ 1000 por Mês',
        data: await this.getSavingsTips(),
        type: 'tips'
      },
      {
        title: 'Evolução do Bitcoin vs Ibovespa em 2025',
        data: await this.getInvestmentComparison(),
        type: 'chart'
      }
    ];

    for (const topic of topics) {
      const infographic = await this.generateInfographic(topic);
      infographics.push(infographic);
    }

    return infographics;
  }

  // Gera infográfico
  private async generateInfographic(topic: any): Promise<ViralContent> {
    const infographicScript = `
INFOGRÁFICO: ${topic.title}

DESIGN:
- Cores: Azul (#2563eb), Verde (#16a34a), Branco (#ffffff)
- Fonte: Inter, sans-serif
- Layout: Vertical, mobile-first

CONTEÚDO:
${JSON.stringify(topic.data, null, 2)}

ELEMENTOS VISUAIS:
- Ícones financeiros
- Gráficos simples
- Estatísticas destacadas
- Call-to-action no final

TEXTO FINAL: "Quer mais dicas? Acesse FinanceHub.com"
`;

    return {
      type: 'infographic',
      title: topic.title,
      content: infographicScript,
      platforms: ['instagram', 'linkedin', 'pinterest', 'facebook'],
      viralPotential: 0.7,
      hashtags: ['#infografico', '#financaspessoais', '#dadosfinanceiros', '#educacaofinanceira']
    };
  }

  // Cria vídeos curtos explicativos
  async createShortVideos(): Promise<ViralContent[]> {
    const videoTopics = [
      'Como calcular juros compostos em 30 segundos',
      '3 erros que te impedem de ficar rico',
      'Cartão de crédito: vilão ou herói?',
      'Bitcoin: vale a pena investir em 2025?',
      'Como sair do vermelho em 5 passos'
    ];

    const videos: ViralContent[] = [];

    for (const topic of videoTopics) {
      const video = await this.generateVideoScript(topic);
      videos.push(video);
    }

    return videos;
  }

  // Gera script para vídeo
  private async generateVideoScript(topic: string): Promise<ViralContent> {
    const scripts = {
      'Como calcular juros compostos em 30 segundos': `
HOOK (0-3s): "Quer saber quanto seus R$ 1000 vão virar em 10 anos?"

CONTEÚDO (3-27s):
- Fórmula: M = C × (1 + i)^t
- Exemplo prático: R$ 1000 a 10% ao ano
- Resultado: R$ 2.594 em 10 anos
- "É por isso que Einstein chamou de 8ª maravilha do mundo!"

CTA (27-30s): "Salva aí e compartilha! 💰"

ELEMENTOS VISUAIS:
- Calculadora na tela
- Números crescendo
- Gráfico exponencial
- Emoji de dinheiro
`,
      '3 erros que te impedem de ficar rico': `
HOOK (0-3s): "Estes 3 erros estão te mantendo pobre!"

CONTEÚDO (3-27s):
1. Não ter reserva de emergência (6 meses de gastos)
2. Investir sem conhecimento (estudar antes!)
3. Gastar mais do que ganha (controle seus gastos)

SOLUÇÃO: "Comece hoje mesmo!"

CTA (27-30s): "Qual erro você comete? Comenta aí! 👇"

ELEMENTOS VISUAIS:
- X vermelho para cada erro
- ✓ verde para soluções
- Gráficos simples
- Transições rápidas
`
    };

    const script = scripts[topic] || `Script para: ${topic}`;

    return {
      type: 'video',
      title: topic,
      content: script,
      platforms: ['tiktok', 'instagram', 'youtube', 'facebook'],
      viralPotential: 0.8,
      hashtags: ['#financaspessoais', '#dicasfinanceiras', '#educacaofinanceira', '#viral', '#fyp']
    };
  }

  // Cria quizzes interativos sobre finanças
  async createInteractiveQuizzes(): Promise<ViralContent[]> {
    const quizzes = [
      {
        title: 'Qual seu perfil de investidor?',
        questions: [
          'Você prefere: A) Segurança B) Rentabilidade C) Equilibrio',
          'Em uma crise, você: A) Vende tudo B) Compra mais C) Mantém posição',
          'Seu prazo de investimento: A) Curto B) Médio C) Longo'
        ],
        results: {
          'AAA': 'Conservador - Prefira renda fixa',
          'BBB': 'Arrojado - Ações podem ser sua praia',
          'CCC': 'Moderado - Diversifique seus investimentos'
        }
      },
      {
        title: 'Você sabe usar cartão de crédito?',
        questions: [
          'Você paga: A) Mínimo B) Total C) Parcelado',
          'Limite ideal: A) Máximo B) 30% da renda C) Não sei',
          'Anuidade: A) Pago qualquer B) Só sem anuidade C) Depende dos benefícios'
        ],
        results: {
          'BBB': 'Expert! Você domina o cartão de crédito',
          'ABC': 'Intermediário - Algumas melhorias necessárias',
          'AAA': 'Iniciante - Cuidado com as armadilhas!'
        }
      }
    ];

    const quizContent: ViralContent[] = [];

    for (const quiz of quizzes) {
      quizContent.push({
        type: 'quiz',
        title: quiz.title,
        content: JSON.stringify(quiz, null, 2),
        platforms: ['instagram', 'facebook', 'website'],
        viralPotential: 0.9,
        hashtags: ['#quiz', '#financaspessoais', '#teste', '#educacaofinanceira']
      });
    }

    return quizContent;
  }

  // Desenvolve calculadoras financeiras virais
  async createViralCalculators(): Promise<ViralContent[]> {
    const calculators = [
      {
        name: 'Calculadora de Aposentadoria',
        description: 'Descubra quanto precisa poupar para se aposentar',
        inputs: ['idade_atual', 'idade_aposentadoria', 'renda_desejada', 'patrimonio_atual'],
        formula: 'Juros compostos + inflação'
      },
      {
        name: 'Calculadora de Juros do Cartão',
        description: 'Veja quanto você paga de juros no rotativo',
        inputs: ['valor_fatura', 'percentual_pago', 'taxa_juros'],
        formula: 'Juros compostos mensais'
      },
      {
        name: 'Simulador de Investimentos',
        description: 'Compare diferentes tipos de investimento',
        inputs: ['valor_inicial', 'aporte_mensal', 'prazo', 'rentabilidade'],
        formula: 'Valor futuro com aportes'
      }
    ];

    const calculatorContent: ViralContent[] = [];

    for (const calc of calculators) {
      calculatorContent.push({
        type: 'calculator',
        title: calc.name,
        content: JSON.stringify(calc, null, 2),
        platforms: ['website', 'instagram', 'tiktok'],
        viralPotential: 0.85,
        hashtags: ['#calculadora', '#financaspessoais', '#planejamento', '#investimentos']
      });
    }

    return calculatorContent;
  }

  // Produz conteúdo baseado em eventos atuais
  async createEventBasedContent(): Promise<ViralContent[]> {
    const currentEvents = await this.getCurrentFinancialEvents();
    const eventContent: ViralContent[] = [];

    for (const event of currentEvents) {
      const content = await this.generateEventContent(event);
      eventContent.push(content);
    }

    return eventContent;
  }

  // Obtém eventos financeiros atuais
  private async getCurrentFinancialEvents(): Promise<any[]> {
    // Em produção, integraria com APIs de notícias financeiras
    return [
      {
        title: 'Banco Central anuncia nova taxa Selic',
        impact: 'high',
        category: 'monetary_policy',
        date: new Date()
      },
      {
        title: 'Nova regulamentação para PIX',
        impact: 'medium',
        category: 'payments',
        date: new Date()
      },
      {
        title: 'Black Friday: dicas para não se endividar',
        impact: 'high',
        category: 'consumer',
        date: new Date()
      }
    ];
  }

  // Gera conteúdo baseado em evento
  private async generateEventContent(event: any): Promise<ViralContent> {
    const contentTypes = ['explanation', 'tips', 'impact_analysis'];
    const randomType = contentTypes[Math.floor(Math.random() * contentTypes.length)];

    let content = '';
    
    switch (randomType) {
      case 'explanation':
        content = `O que significa: ${event.title}\n\nExplicação simples:\n- Impacto direto no seu bolso\n- O que você precisa fazer\n- Oportunidades que surgem`;
        break;
      case 'tips':
        content = `${event.title}\n\n5 dicas para aproveitar:\n1. Analise o impacto\n2. Ajuste sua estratégia\n3. Busque oportunidades\n4. Proteja-se dos riscos\n5. Mantenha-se informado`;
        break;
      case 'impact_analysis':
        content = `ANÁLISE: ${event.title}\n\n✅ Pontos positivos\n❌ Pontos negativos\n💡 Recomendações\n📈 Perspectivas`;
        break;
    }

    return {
      type: 'trend',
      title: `Análise: ${event.title}`,
      content,
      platforms: ['twitter', 'linkedin', 'instagram'],
      viralPotential: event.impact === 'high' ? 0.9 : 0.6,
      hashtags: ['#atualidadefinanceira', '#economia', '#financaspessoais', '#noticias']
    };
  }

  // Calcula potencial viral do conteúdo
  private calculateViralPotential(trend: TrendingTopic): number {
    let potential = 0.5; // Base

    // Volume de busca
    if (trend.volume > 100000) potential += 0.3;
    else if (trend.volume > 50000) potential += 0.2;
    else if (trend.volume > 10000) potential += 0.1;

    // Sentimento
    if (trend.sentiment === 'positive') potential += 0.2;
    else if (trend.sentiment === 'negative') potential += 0.1;

    // Termos relacionados
    potential += Math.min(trend.relatedTerms.length * 0.05, 0.2);

    return Math.min(potential, 1.0);
  }

  // Agenda publicação de conteúdo viral
  async scheduleViralContent(): Promise<void> {
    const allContent = [
      ...(await this.createFinancialMemes()),
      ...(await this.createInfographics()),
      ...(await this.createShortVideos()),
      ...(await this.createInteractiveQuizzes()),
      ...(await this.createViralCalculators()),
      ...(await this.createEventBasedContent())
    ];

    // Ordena por potencial viral
    allContent.sort((a, b) => b.viralPotential - a.viralPotential);

    // Agenda os melhores conteúdos
    for (let i = 0; i < Math.min(allContent.length, 10); i++) {
      const content = allContent[i];
      const scheduledTime = new Date();
      scheduledTime.setHours(scheduledTime.getHours() + (i * 2)); // Espaça 2h entre posts

      await this.supabase
        .from('viral_content_schedule')
        .insert({
          type: content.type,
          title: content.title,
          content: content.content,
          platforms: content.platforms,
          viral_potential: content.viralPotential,
          hashtags: content.hashtags,
          scheduled_time: scheduledTime,
          status: 'scheduled'
        });
    }
  }

  // Dados auxiliares para infográficos
  private async getSelicData(): Promise<any> {
    return {
      current_rate: '10.75%',
      impact_on_savings: '+8%',
      impact_on_cdb: '+12%',
      impact_on_stocks: '-5%'
    };
  }

  private async getSavingsTips(): Promise<any> {
    return [
      { tip: 'Cancele assinaturas não utilizadas', saving: 'R$ 150' },
      { tip: 'Cozinhe mais em casa', saving: 'R$ 300' },
      { tip: 'Use transporte público', saving: 'R$ 200' },
      { tip: 'Renegocie planos de celular', saving: 'R$ 100' },
      { tip: 'Compre genéricos', saving: 'R$ 250' }
    ];
  }

  private async getInvestmentComparison(): Promise<any> {
    return {
      bitcoin: { ytd: '+45%', volatility: 'Alta' },
      ibovespa: { ytd: '+12%', volatility: 'Média' },
      cdi: { ytd: '+10.5%', volatility: 'Baixa' }
    };
  }
}

