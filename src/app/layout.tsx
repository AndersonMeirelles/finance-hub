import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FinanceHub - Portal de Finanças Pessoais e Investimentos",
  description: "Seu portal completo para finanças pessoais, investimentos e educação financeira. Artigos, dicas e análises para construir sua riqueza.",
  keywords: "finanças pessoais, investimentos, educação financeira, cartão de crédito, empréstimos, ações, criptomoedas",
  authors: [{ name: "FinanceHub" }],
  openGraph: {
    title: "FinanceHub - Portal de Finanças Pessoais e Investimentos",
    description: "Seu portal completo para finanças pessoais, investimentos e educação financeira.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinanceHub - Portal de Finanças Pessoais e Investimentos",
    description: "Seu portal completo para finanças pessoais, investimentos e educação financeira.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7836578167955841"
          crossOrigin="anonymous"></script>
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}

