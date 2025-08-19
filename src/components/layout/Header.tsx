'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, TrendingUp, Search, Globe } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';

interface HeaderProps {
  locale: Locale;
  dict: any;
}

const Header = ({ locale, dict }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: dict.navigation.home, href: `/${locale}` },
    { name: dict.navigation.articles, href: `/${locale}/blog` },
    { name: dict.navigation.investments, href: `/${locale}/investimentos` },
    { name: dict.navigation.cards, href: `/${locale}/cartoes` },
    { name: dict.navigation.loans, href: `/${locale}/emprestimos` },
    { name: dict.navigation.about, href: `/${locale}/sobre` },
  ];

  const otherLocale = locale === 'pt-br' ? 'en-us' : 'pt-br';
  const otherLocaleName = locale === 'pt-br' ? 'EN' : 'PT';

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FinanceHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search, Language Switcher and Mobile menu button */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Search className="h-5 w-5" />
            </button>
            
            {/* Language Switcher */}
            <Link
              href={`/${otherLocale}`}
              className="flex items-center space-x-1 p-2 text-gray-400 hover:text-gray-500"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{otherLocaleName}</span>
            </Link>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-2">
                <Link
                  href={`/${otherLocale}`}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Globe className="h-4 w-4" />
                  <span>{otherLocaleName === 'EN' ? 'English' : 'Português'}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

