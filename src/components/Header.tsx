import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, Phone, MapPin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-red-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Rua Ricardo Ramos, nº 9 - Planalto - Manaus</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>+55 92 3016-7065 | +55 92 99981-5891</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-red-200 transition-colors">Facebook</a>
            <a href="#" className="hover:text-red-200 transition-colors">Instagram</a>
            <a href="#" className="hover:text-red-200 transition-colors flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>Área do Cliente</span>
            </a>
            <a href="#" className="hover:text-red-200 transition-colors flex items-center space-x-1">
              <ShoppingCart className="w-4 h-4" />
              <span>Carrinho</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CB</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CB Comercial</h1>
                <p className="text-sm text-gray-600">Distribuidora de Alimentos</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button onClick={() => scrollToSection('inicio')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                Início
              </button>
              <button onClick={() => scrollToSection('empresa')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                A Empresa
              </button>
              <button onClick={() => scrollToSection('produtos')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                Produtos
              </button>
              <button onClick={() => scrollToSection('fornecedores')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                Fornecedores
              </button>
              <button onClick={() => scrollToSection('contato')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                Contato
              </button>
              <button onClick={() => scrollToSection('contato')} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium">
                Solicitar Vendedor
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2 pt-4">
                <button onClick={() => scrollToSection('inicio')} className="text-left text-gray-700 hover:text-red-600 transition-colors font-medium py-2">
                  Início
                </button>
                <button onClick={() => scrollToSection('empresa')} className="text-left text-gray-700 hover:text-red-600 transition-colors font-medium py-2">
                  A Empresa
                </button>
                <button onClick={() => scrollToSection('produtos')} className="text-left text-gray-700 hover:text-red-600 transition-colors font-medium py-2">
                  Produtos
                </button>
                <button onClick={() => scrollToSection('fornecedores')} className="text-left text-gray-700 hover:text-red-600 transition-colors font-medium py-2">
                  Fornecedores
                </button>
                <button onClick={() => scrollToSection('contato')} className="text-left text-gray-700 hover:text-red-600 transition-colors font-medium py-2">
                  Contato
                </button>
                <button onClick={() => scrollToSection('contato')} className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium text-center mt-4">
                  Solicitar Vendedor
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;