import { getDictionary } from '@/lib/i18n/get-dictionary';
import { type Locale } from '@/lib/i18n/config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Calendar, Clock, User, Share2, Bookmark, Eye } from 'lucide-react';
import { Metadata } from 'next';

interface ArticlePageProps {
  params: {
    locale: Locale;
    slug: string;
  };
}

// Mock article data - em produção viria do Supabase
const getArticleBySlug = async (slug: string) => {
  const articles = {
    'melhor-cartao-credito-2025': {
      title: "Como Escolher o Melhor Cartão de Crédito em 2025",
      content: `
# Como Escolher o Melhor Cartão de Crédito em 2025

Escolher o cartão de crédito ideal pode ser uma tarefa desafiadora, especialmente com tantas opções disponíveis no mercado brasileiro. Neste guia completo, vamos abordar todos os critérios essenciais que você deve considerar para tomar a melhor decisão.

## 1. Analise Seu Perfil Financeiro

Antes de escolher qualquer cartão, é fundamental entender seu próprio perfil:

- **Renda mensal**: Determine quanto você pode comprometer com anuidade
- **Gastos mensais**: Calcule seus gastos médios para definir o limite ideal
- **Histórico de crédito**: Verifique seu CPF no SPC e Serasa

## 2. Tipos de Cartão de Crédito

### Cartões Básicos
Ideais para quem está começando ou tem renda mais baixa:
- Anuidade gratuita ou baixa
- Limite inicial menor
- Poucos benefícios extras

### Cartões Premium
Para quem tem renda mais alta e busca benefícios:
- Anuidade mais alta
- Limites elevados
- Programas de recompensas
- Acesso a salas VIP

### Cartões Corporativos
Específicos para empresários e profissionais liberais:
- Controle de gastos empresariais
- Relatórios detalhados
- Benefícios para viagens de negócios

## 3. Principais Critérios de Escolha

### Anuidade
A anuidade é um dos fatores mais importantes:
- **Gratuita**: Ideal para gastos baixos
- **Isenção por gastos**: Gaste um valor mínimo e não pague
- **Valor fixo**: Avalie se os benefícios compensam

### Taxa de Juros
Mesmo que você não pretenda parcelar, é importante conhecer:
- Taxa do rotativo
- Taxa de parcelamento
- Juros de atraso

### Programa de Recompensas
Se você gasta bastante, programas de recompensas podem ser vantajosos:
- **Cashback**: Dinheiro de volta
- **Pontos**: Troque por produtos ou milhas
- **Milhas**: Para quem viaja frequentemente

## 4. Benefícios Extras

### Seguros Inclusos
Muitos cartões oferecem seguros gratuitos:
- Seguro viagem
- Seguro compra protegida
- Seguro fraude

### Descontos e Parcerias
Verifique se o cartão oferece:
- Descontos em farmácias
- Parcerias com restaurantes
- Benefícios em postos de gasolina

## 5. Como Solicitar

### Documentação Necessária
- CPF e RG
- Comprovante de renda
- Comprovante de residência

### Dicas para Aprovação
- Mantenha o CPF limpo
- Comprove renda adequada
- Tenha relacionamento bancário

## 6. Cartões Recomendados por Perfil

### Para Iniciantes
1. **Nubank Roxinho**: Sem anuidade, controle pelo app
2. **Inter**: Gratuito, cashback em algumas compras
3. **C6 Bank**: Sem anuidade, programa de pontos

### Para Renda Média
1. **Itaú Click**: Anuidade com isenção por gastos
2. **Bradesco Elo**: Bom programa de recompensas
3. **Santander SX**: Benefícios equilibrados

### Para Alta Renda
1. **Itaú Personnalité**: Benefícios premium
2. **Bradesco Prime**: Acesso a salas VIP
3. **Santander Unique**: Programa de milhas

## 7. Erros Comuns a Evitar

- Escolher apenas pela anuidade gratuita
- Não ler o contrato completo
- Solicitar vários cartões ao mesmo tempo
- Não considerar o limite de crédito oferecido

## 8. Dicas de Uso Responsável

### Controle de Gastos
- Use aplicativos de controle financeiro
- Defina um limite mensal
- Acompanhe a fatura regularmente

### Pagamento da Fatura
- Sempre pague o valor total
- Configure débito automático
- Evite o rotativo a todo custo

## Conclusão

A escolha do cartão de crédito ideal depende do seu perfil financeiro e objetivos. Analise cuidadosamente cada opção, compare benefícios e custos, e sempre use o cartão de forma responsável.

Lembre-se: o melhor cartão é aquele que se adequa às suas necessidades e não compromete seu orçamento familiar.

---

*Este artigo foi atualizado em janeiro de 2025 com as informações mais recentes do mercado financeiro brasileiro.*
      `,
      excerpt: "Descubra os critérios essenciais para escolher o cartão de crédito ideal para seu perfil financeiro. Analisamos taxas, benefícios e programas de recompensas.",
      author: "Maria Silva",
      publishedAt: "2025-01-15",
      readTime: "8 min",
      category: "Cartões",
      imageUrl: "/api/placeholder/800/400",
      views: 1250
    }
  };

  return articles[slug] || null;
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Artigo não encontrado - FinanceHub',
    };
  }

  return {
    title: `${article.title} - FinanceHub`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const dict = await getDictionary(params.locale);
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header locale={params.locale} dict={dict} />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artigo não encontrado</h1>
          <p className="text-gray-600">O artigo que você está procurando não existe ou foi removido.</p>
        </div>
        <Footer locale={params.locale} dict={dict} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={params.locale} dict={dict} />
      
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><a href={`/${params.locale}`} className="hover:text-blue-600">Home</a></li>
            <li>/</li>
            <li><a href={`/${params.locale}/blog`} className="hover:text-blue-600">Blog</a></li>
            <li>/</li>
            <li className="text-gray-900">{article.category}</li>
          </ol>
        </nav>

        {/* Article Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              {article.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{article.views} visualizações</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{article.author}</p>
                <p className="text-sm text-gray-600">Especialista em Finanças</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <p className="text-blue-800 font-medium">
              💡 {article.excerpt}
            </p>
          </div>

          {/* AdSense Placeholder */}
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-8">
            <p className="text-gray-500">📢 Espaço para Google AdSense</p>
            <p className="text-sm text-gray-400">Anúncio será exibido aqui</p>
          </div>

          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ 
              __html: article.content.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, '<h2>').replace(/<h2>/g, '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">') 
            }}
          />

          {/* Mid-article AdSense */}
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center my-8">
            <p className="text-gray-500">📢 Anúncio Google AdSense</p>
            <p className="text-sm text-gray-400">Formato responsivo</p>
          </div>
        </div>

        {/* Article Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-gray-600">Tags:</span>
            {['cartão de crédito', 'finanças pessoais', 'educação financeira'].map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Última atualização: {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Share2 className="h-4 w-4" />
                Compartilhar
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Artigos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mock related articles */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src="/api/placeholder/400/200"
                  alt="Artigo relacionado"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Artigo Relacionado {i}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Descrição do artigo relacionado sobre finanças pessoais...
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>5 min de leitura</span>
                    <span>15 Jan 2025</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Gostou do Artigo?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Receba mais conteúdos como este diretamente no seu email.
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

