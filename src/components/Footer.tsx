import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CB</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">CB Comercial</h3>
                <p className="text-gray-400 text-sm">Distribuidora de Alimentos</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Atendendo com qualidade e excelência padarias, pizzarias, 
              docerias, cafeterias, hotéis e restaurantes em Manaus há anos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('inicio')} className="text-gray-400 hover:text-white transition-colors">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('empresa')} className="text-gray-400 hover:text-white transition-colors">
                  A Empresa
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('produtos')} className="text-gray-400 hover:text-white transition-colors">
                  Produtos
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('fornecedores')} className="text-gray-400 hover:text-white transition-colors">
                  Fornecedores
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contato')} className="text-gray-400 hover:text-white transition-colors">
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Serviços</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Distribuição de Alimentos</li>
              <li>Produtos de Limpeza</li>
              <li>Materiais de Higiene</li>
              <li>Equipamentos</li>
              <li>Logística Especializada</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  Rua Ricardo Ramos, nº 9 - Planalto<br />
                  CEP 69.044-770 - Manaus, AM
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  +55 92 3016-7065<br />
                  +55 92 99981-5891
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  cb@cbcomercial.com.br<br />
                  fiscal@cbcomercial.com.br
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              Copyright © 2025 CB COMERCIAL. Todos os Direitos Reservados.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Desenvolvido com ❤️ por Bolt
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;