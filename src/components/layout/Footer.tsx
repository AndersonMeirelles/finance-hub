import Link from 'next/link';
import { TrendingUp, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Finanças': [
      { name: 'Cartões de Crédito', href: '/cartoes' },
      { name: 'Empréstimos', href: '/emprestimos' },
      { name: 'Financiamentos', href: '/financiamentos' },
      { name: 'Seguros', href: '/seguros' },
    ],
    'Investimentos': [
      { name: 'Ações', href: '/investimentos/acoes' },
      { name: 'Fundos', href: '/investimentos/fundos' },
      { name: 'Renda Fixa', href: '/investimentos/renda-fixa' },
      { name: 'Criptomoedas', href: '/investimentos/crypto' },
    ],
    'Educação': [
      { name: 'Guias', href: '/guias' },
      { name: 'Calculadoras', href: '/calculadoras' },
      { name: 'Glossário', href: '/glossario' },
      { name: 'Cursos', href: '/cursos' },
    ],
    'Empresa': [
      { name: 'Sobre Nós', href: '/sobre' },
      { name: 'Contato', href: '/contato' },
      { name: 'Política de Privacidade', href: '/privacidade' },
      { name: 'Termos de Uso', href: '/termos' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">FinanceHub</span>
            </div>
            <p className="text-gray-300 mb-4">
              Seu portal completo para finanças pessoais e investimentos. 
              Educação financeira de qualidade para construir sua riqueza.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                contato@financehub.com
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
              <p className="text-gray-300">
                Receba as melhores dicas de finanças direto no seu e-mail.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500 flex-1 md:w-64"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-200">
                Assinar
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {currentYear} FinanceHub. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

