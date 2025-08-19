import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/blog/ArticleCard';
import { TrendingUp, DollarSign, CreditCard, PiggyBank, BarChart3, Shield } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { type Locale } from '@/lib/i18n/config';

// Mock data para demonstração
const featuredArticles = [
  {
    title: "Como Escolher o Melhor Cartão de Crédito em 2025",
    excerpt: "Descubra os critérios essenciais para escolher o cartão de crédito ideal para seu perfil financeiro. Analisamos taxas, benefícios e programas de recompensas.",
    slug: "melhor-cartao-credito-2025",
    publishedAt: "2025-01-15",
    readTime: "8 min",
    author: "Maria Silva",
    category: "Cartões",
    imageUrl: "/api/placeholder/800/400",
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
];

export default async function Home({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);

  const categories = [
    {
      name: dict.categories.investments.name,
      icon: TrendingUp,
      description: dict.categories.investments.description,
      color: "bg-blue-500",
    },
    {
      name: dict.categories.cards.name,
      icon: CreditCard,
      description: dict.categories.cards.description,
      color: "bg-green-500",
    },
    {
      name: dict.categories.loans.name,
      icon: DollarSign,
      description: dict.categories.loans.description,
      color: "bg-purple-500",
    },
    {
      name: dict.categories.savings.name,
      icon: PiggyBank,
      description: dict.categories.savings.description,
      color: "bg-orange-500",
    },
    {
      name: dict.categories.analysis.name,
      icon: BarChart3,
      description: dict.categories.analysis.description,
      color: "bg-red-500",
    },
    {
      name: dict.categories.insurance.name,
      icon: Shield,
      description: dict.categories.insurance.description,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={params.locale} dict={dict} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {dict.hero.title} <br />
              <span className="text-blue-200">{dict.hero.subtitle}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              {dict.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {dict.hero.exploreArticles}
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                {dict.hero.newsletter}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {dict.categories.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.name}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {dict.featuredArticles.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                {...article}
                featured={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {dict.newsletter.title}
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            {dict.newsletter.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder={dict.newsletter.placeholder}
              className="px-4 py-3 rounded-lg text-gray-900 flex-1"
            />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              {dict.newsletter.subscribe}
            </button>
          </div>
        </div>
      </section>

      <Footer locale={params.locale} dict={dict} />
    </div>
  );
}

