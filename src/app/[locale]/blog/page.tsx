import { articleService } from '@/lib/supabase';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { type Locale } from '@/lib/i18n/config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/blog/ArticleCard';
import { Search, Filter, TrendingUp } from 'lucide-react';

export default async function BlogPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  
  // Em produção, isso viria do Supabase
  const articles = [
    {
      title: "Como Escolher o Melhor Cartão de Crédito em 2025",
      excerpt: "Descubra os critérios essenciais para escolher o cartão de crédito ideal para seu perfil financeiro. Analisamos taxas, benefícios e programas de recompensas.",
      slug: "melhor-cartao-credito-2025",
      publishedAt: "2025-01-15",
      readTime: "8 min",
      author: "Maria Silva",
      category: "Cartões",
      imageUrl: "/api/placeholder/400/200",
      featured: true,
    },
    {
      title: "Investindo em Ações: Guia Completo para Iniciantes",
      excerpt: "Aprenda os fundamentos do investimento em ações, desde a abertura de conta até a análise de empresas e estratégias de diversificação.",
      slug: "investindo-acoes-iniciantes",
      publishedAt: "2025-01-14",
      readTime: "12 min",
      author: "João Santos",
      category: "Investimentos",
      imageUrl: "/api/placeholder/400/200",
    },
    {
      title: "Empréstimo Pessoal: Como Conseguir as Melhores Taxas",
      excerpt: "Estratégias para negociar taxas de juros mais baixas e evitar armadilhas comuns ao contratar empréstimos pessoais.",
      slug: "emprestimo-pessoal-melhores-taxas",
      publishedAt: "2025-01-13",
      readTime: "6 min",
      author: "Ana Costa",
      category: "Empréstimos",
      imageUrl: "/api/placeholder/400/200",
    },
    {
      title: "Criptomoedas em 2025: Vale a Pena Investir?",
      excerpt: "Análise completa do mercado de criptomoedas, riscos, oportunidades e estratégias para investidores iniciantes e experientes.",
      slug: "criptomoedas-2025-vale-pena-investir",
      publishedAt: "2025-01-12",
      readTime: "10 min",
      author: "Carlos Mendes",
      category: "Investimentos",
      imageUrl: "/api/placeholder/400/200",
    },
    {
      title: "Planejamento Financeiro: 10 Passos para 2025",
      excerpt: "Guia prático para organizar suas finanças pessoais, definir metas e construir um futuro financeiro sólido.",
      slug: "planejamento-financeiro-10-passos-2025",
      publishedAt: "2025-01-11",
      readTime: "15 min",
      author: "Fernanda Lima",
      category: "Planejamento",
      imageUrl: "/api/placeholder/400/200",
    },
    {
      title: "Seguros: Quais São Realmente Necessários?",
      excerpt: "Descubra quais seguros são essenciais para proteger você e sua família, e quais podem ser dispensáveis.",
      slug: "seguros-quais-sao-necessarios",
      publishedAt: "2025-01-10",
      readTime: "7 min",
      author: "Roberto Silva",
      category: "Seguros",
      imageUrl: "/api/placeholder/400/200",
    }
  ];

  const categories = [
    "Todos",
    "Investimentos", 
    "Cartões",
    "Empréstimos",
    "Planejamento",
    "Seguros",
    "Criptomoedas"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={params.locale} dict={dict} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {dict.blog?.title || "Blog FinanceHub"}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              {dict.blog?.description || "Artigos atualizados diariamente sobre finanças pessoais, investimentos e educação financeira."}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={dict.blog?.searchPlaceholder || "Buscar artigos..."}
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === "Todos"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>Mais Recentes</option>
                  <option>Mais Populares</option>
                  <option>Mais Lidos</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>{articles.length} artigos encontrados</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                {...article}
                featured={index === 0}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Carregar Mais Artigos
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Receba Novos Artigos por Email
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Seja o primeiro a ler nossos artigos sobre finanças pessoais e investimentos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="px-4 py-3 rounded-lg text-gray-900 flex-1"
            />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Assinar
            </button>
          </div>
        </div>
      </section>

      <Footer locale={params.locale} dict={dict} />
    </div>
  );
}

