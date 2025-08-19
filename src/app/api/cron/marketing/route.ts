import { NextRequest, NextResponse } from 'next/server';
import { MarketingAutomation } from '@/lib/cron/marketingAutomation';

// Endpoint para execução manual ou via cron job
export async function POST(request: NextRequest) {
  try {
    const { action, hour } = await request.json();
    
    const automation = new MarketingAutomation();
    let result;

    switch (action) {
      case 'full_automation':
        result = await automation.runFullMarketingAutomation();
        break;
        
      case 'scheduled_automation':
        const currentHour = hour || new Date().getHours();
        result = await automation.runScheduledAutomation(currentHour);
        break;
        
      case 'generate_report':
        result = await automation.generateMarketingReport();
        break;
        
      default:
        throw new Error('Ação não reconhecida');
    }

    return NextResponse.json({
      success: true,
      action,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro no cron job de marketing:', error);
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

// Endpoint para execução automática via GET (para serviços de cron externos)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'full_automation';
    const hour = parseInt(searchParams.get('hour') || '0');
    
    // Verificação de segurança (em produção, usar autenticação adequada)
    const authToken = searchParams.get('token');
    if (authToken !== process.env.CRON_AUTH_TOKEN) {
      return NextResponse.json(
        { error: 'Token de autenticação inválido' },
        { status: 401 }
      );
    }

    const automation = new MarketingAutomation();
    let result;

    switch (action) {
      case 'full_automation':
        await automation.runFullMarketingAutomation();
        result = { message: 'Automação completa executada' };
        break;
        
      case 'scheduled':
        const currentHour = hour || new Date().getHours();
        await automation.runScheduledAutomation(currentHour);
        result = { message: `Automação agendada executada para hora ${currentHour}` };
        break;
        
      case 'report':
        result = await automation.generateMarketingReport();
        break;
        
      default:
        await automation.runFullMarketingAutomation();
        result = { message: 'Automação padrão executada' };
    }

    return NextResponse.json({
      success: true,
      action,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro no cron job de marketing:', error);
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

// Configuração para execução em diferentes horários
const CRON_SCHEDULES = {
  // Execuções diárias
  morning_posts: '0 8 * * *',      // 8:00 AM
  noon_content: '0 12 * * *',      // 12:00 PM  
  afternoon_viral: '0 14 * * *',   // 2:00 PM
  evening_posts: '0 17 * * *',     // 5:00 PM
  night_engagement: '0 20 * * *',  // 8:00 PM
  daily_analysis: '0 22 * * *',    // 10:00 PM
  
  // Execuções horárias
  hourly_optimization: '0 * * * *', // A cada hora
  
  // Execuções semanais
  weekly_seo: '0 9 * * 1',         // Segunda 9:00 AM
  weekly_backlinks: '0 10 * * 3',  // Quarta 10:00 AM
  
  // Execuções mensais
  monthly_report: '0 9 1 * *'      // Primeiro dia do mês 9:00 AM
};

// Instruções para configuração de cron jobs externos
export const CRON_INSTRUCTIONS = `
# Configuração de Cron Jobs para Marketing Automation

## Para usar com serviços como Vercel Cron, GitHub Actions, ou cron tradicional:

### 1. Automação Completa (6x por dia)
curl -X GET "https://seu-dominio.com/api/cron/marketing?action=full_automation&token=SEU_TOKEN"

### 2. Automação por Horário (a cada hora)
curl -X GET "https://seu-dominio.com/api/cron/marketing?action=scheduled&hour=\$(date +%H)&token=SEU_TOKEN"

### 3. Relatório Diário (22:00)
curl -X GET "https://seu-dominio.com/api/cron/marketing?action=report&token=SEU_TOKEN"

## Configuração no crontab (Linux/Mac):
# Adicione estas linhas ao crontab (crontab -e):

# Automação completa a cada 4 horas
0 */4 * * * curl -X GET "https://seu-dominio.com/api/cron/marketing?action=full_automation&token=SEU_TOKEN"

# Automação horária
0 * * * * curl -X GET "https://seu-dominio.com/api/cron/marketing?action=scheduled&hour=\$(date +%H)&token=SEU_TOKEN"

# Relatório diário às 22:00
0 22 * * * curl -X GET "https://seu-dominio.com/api/cron/marketing?action=report&token=SEU_TOKEN"

## Configuração no Vercel (vercel.json):
{
  "crons": [
    {
      "path": "/api/cron/marketing?action=full_automation&token=SEU_TOKEN",
      "schedule": "0 */4 * * *"
    },
    {
      "path": "/api/cron/marketing?action=scheduled&token=SEU_TOKEN", 
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/cron/marketing?action=report&token=SEU_TOKEN",
      "schedule": "0 22 * * *"
    }
  ]
}

## Configuração no GitHub Actions (.github/workflows/marketing-cron.yml):
name: Marketing Automation
on:
  schedule:
    - cron: '0 */4 * * *'  # A cada 4 horas
    - cron: '0 * * * *'    # A cada hora
    - cron: '0 22 * * *'   # Relatório diário

jobs:
  marketing:
    runs-on: ubuntu-latest
    steps:
      - name: Run Marketing Automation
        run: |
          curl -X GET "https://seu-dominio.com/api/cron/marketing?action=full_automation&token=\${{ secrets.CRON_TOKEN }}"

## Variáveis de Ambiente Necessárias:
CRON_AUTH_TOKEN=seu_token_secreto_aqui
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
`;

