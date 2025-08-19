'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  Share2,
  Calendar,
  Settings,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

interface DashboardStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalViews: number;
  monthlyViews: number;
  totalClicks: number;
  monthlyClicks: number;
  subscribers: number;
  ctr: number;
  rpm: number;
}

interface AgentStatus {
  name: string;
  status: 'running' | 'stopped' | 'error';
  lastRun: string;
  nextRun: string;
  performance: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 12450.80,
    monthlyRevenue: 3250.40,
    totalViews: 125000,
    monthlyViews: 45000,
    totalClicks: 2500,
    monthlyClicks: 890,
    subscribers: 1250,
    ctr: 2.1,
    rpm: 4.85
  });

  const [agents, setAgents] = useState<AgentStatus[]>([
    {
      name: 'Social Media Manager',
      status: 'running',
      lastRun: '2025-01-18 14:30',
      nextRun: '2025-01-18 16:00',
      performance: 95
    },
    {
      name: 'SEO Booster',
      status: 'running',
      lastRun: '2025-01-18 14:00',
      nextRun: '2025-01-18 15:00',
      performance: 88
    },
    {
      name: 'Ad Revenue Optimizer',
      status: 'running',
      lastRun: '2025-01-18 14:45',
      nextRun: '2025-01-18 15:45',
      performance: 92
    },
    {
      name: 'Viral Content Creator',
      status: 'running',
      lastRun: '2025-01-18 13:30',
      nextRun: '2025-01-18 17:30',
      performance: 87
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const runAgent = async (agentName: string, action: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/agents/run-marketing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent: agentName.toLowerCase().replace(' ', '_'),
          action: action
        }),
      });

      const result = await response.json();
      console.log('Agent result:', result);
      
      // Atualiza status do agente
      setAgents(prev => prev.map(agent => 
        agent.name === agentName 
          ? { ...agent, lastRun: new Date().toLocaleString('pt-BR'), status: 'running' }
          : agent
      ));
    } catch (error) {
      console.error('Erro ao executar agente:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const runAllAgents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/agents/run-marketing');
      const result = await response.json();
      console.log('All agents result:', result);
      
      // Atualiza todos os agentes
      setAgents(prev => prev.map(agent => ({
        ...agent,
        lastRun: new Date().toLocaleString('pt-BR'),
        status: 'running' as const
      })));
    } catch (error) {
      console.error('Erro ao executar todos os agentes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">FinanceHub Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={runAllAgents}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                Executar Todos os Agentes
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Receita Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-green-600">
                  +R$ {stats.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} este mês
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Visualizações</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalViews.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-blue-600">
                  +{stats.monthlyViews.toLocaleString('pt-BR')} este mês
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MousePointer className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">CTR Médio</p>
                <p className="text-2xl font-bold text-gray-900">{stats.ctr}%</p>
                <p className="text-sm text-purple-600">
                  {stats.monthlyClicks.toLocaleString('pt-BR')} cliques este mês
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Assinantes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.subscribers.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-orange-600">RPM: R$ {stats.rpm}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Agents Status */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Status dos Agentes</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agents.map((agent) => (
                <div key={agent.name} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{agent.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        agent.status === 'running' ? 'bg-green-500' :
                        agent.status === 'stopped' ? 'bg-gray-400' : 'bg-red-500'
                      }`} />
                      <span className={`text-sm font-medium ${
                        agent.status === 'running' ? 'text-green-600' :
                        agent.status === 'stopped' ? 'text-gray-600' : 'text-red-600'
                      }`}>
                        {agent.status === 'running' ? 'Ativo' :
                         agent.status === 'stopped' ? 'Parado' : 'Erro'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Última execução:</span>
                      <span>{agent.lastRun}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Próxima execução:</span>
                      <span>{agent.nextRun}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Performance:</span>
                      <span className="font-medium text-green-600">{agent.performance}%</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => runAgent(agent.name, 'execute')}
                      disabled={isLoading}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                      Executar Agora
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                      {agent.status === 'running' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Receita dos Últimos 30 Dias</h2>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Gráfico de receita será exibido aqui</p>
                  <p className="text-sm text-gray-400">Integração com Google Analytics</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Tráfego por Fonte</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900">Busca Orgânica</span>
                  </div>
                  <span className="text-sm text-gray-600">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900">Redes Sociais</span>
                  </div>
                  <span className="text-sm text-gray-600">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900">Direto</span>
                  </div>
                  <span className="text-sm text-gray-600">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900">Referências</span>
                  </div>
                  <span className="text-sm text-gray-600">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Atividade Recente</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-900">Social Media Manager executado com sucesso</span>
                <span className="text-sm text-gray-500 ml-auto">há 30 min</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-900">SEO Booster otimizou 5 artigos</span>
                <span className="text-sm text-gray-500 ml-auto">há 1 hora</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-900">Ad Revenue Optimizer aumentou CTR em 0.3%</span>
                <span className="text-sm text-gray-500 ml-auto">há 2 horas</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-900">Viral Content Creator publicou 3 memes</span>
                <span className="text-sm text-gray-500 ml-auto">há 3 horas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

