import React from 'react';
import { ShoppingCart, Phone, ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-800"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            CB <span className="text-yellow-400">Comercial</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-4 font-light">
            Distribuidora de Alimentos
          </p>
          <p className="text-xl md:text-2xl mb-12 text-red-100 max-w-3xl mx-auto leading-relaxed">
            Mais de 80 colaboradores atendendo com qualidade e excelência 
            padarias, pizzarias, docerias, cafeterias, hotéis e restaurantes em Manaus
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => scrollToSection('produtos')}
              className="group bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-xl"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Ver Produtos</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => scrollToSection('contato')}
              className="group border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <Phone className="w-6 h-6" />
              <span>Fale Conosco</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-yellow-400 mb-2">80+</div>
              <div className="text-lg">Colaboradores</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-yellow-400 mb-2">20+</div>
              <div className="text-lg">Fornecedores</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-yellow-400 mb-2">1000+</div>
              <div className="text-lg">Produtos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;