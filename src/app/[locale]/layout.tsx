import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { i18n, type Locale } from '@/lib/i18n/config';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isPortuguese = params.locale === 'pt-br';
  
  return {
    title: isPortuguese 
      ? "FinanceHub - Portal de Finanças Pessoais e Investimentos"
      : "FinanceHub - Personal Finance and Investment Portal",
    description: isPortuguese
      ? "Seu portal completo para finanças pessoais, investimentos e educação financeira. Artigos, dicas e análises para construir sua riqueza."
      : "Your complete portal for personal finance, investments and financial education. Articles, tips and analysis to build your wealth.",
    keywords: isPortuguese
      ? "finanças pessoais, investimentos, educação financeira, cartão de crédito, empréstimos, ações, criptomoedas"
      : "personal finance, investments, financial education, credit card, loans, stocks, cryptocurrencies",
    authors: [{ name: "FinanceHub" }],
    openGraph: {
      title: isPortuguese 
        ? "FinanceHub - Portal de Finanças Pessoais e Investimentos"
        : "FinanceHub - Personal Finance and Investment Portal",
      description: isPortuguese
        ? "Seu portal completo para finanças pessoais, investimentos e educação financeira."
        : "Your complete portal for personal finance, investments and financial education.",
      type: "website",
      locale: params.locale === 'pt-br' ? 'pt_BR' : 'en_US',
    },
    twitter: {
      card: "summary_large_image",
      title: isPortuguese 
        ? "FinanceHub - Portal de Finanças Pessoais e Investimentos"
        : "FinanceHub - Personal Finance and Investment Portal",
      description: isPortuguese
        ? "Seu portal completo para finanças pessoais, investimentos e educação financeira."
        : "Your complete portal for personal finance, investments and financial education.",
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <html lang={params.locale}>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}

