import React from 'react';
import { Users, Truck, Award, Target } from 'lucide-react';

const About = () => {
  return (
    <section id="empresa" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-red-600 to-red-800 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                    <Award className="w-16 h-16" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Excelência</h3>
                  <p className="text-xl">em Distribuição</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                A <span className="text-red-600">Empresa</span>
              </h2>
              <div className="w-24 h-1 bg-red-600 mb-8"></div>
            </div>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                A CB Comercial atende com qualidade e excelência aos segmentos de padarias, 
                pizzarias, docerias, cafeterias, cozinhas, hotéis, restaurantes, lanchonetes, 
                entre outros.
              </p>
              <p>
                Contamos com o profissionalismo de mais de 80 colaboradores entre vendedores, 
                supervisores, gerentes e operacional. Nossa logística conta com veículos novos 
                atendendo os pedidos de nossos clientes.
              </p>
              <p>
                Buscamos a excelência em todo nosso atendimento. A CB Comercial vem inovando 
                em tecnologia, através da reestruturação e capacitação dos colaboradores, 
                novos fornecedores e expansão territorial no estado do Amazonas.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Users className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Equipe Qualificada</h3>
                <p className="text-gray-600">Mais de 80 profissionais especializados</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Truck className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Logística Moderna</h3>
                <p className="text-gray-600">Frota nova para entregas rápidas</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Award className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Qualidade Garantida</h3>
                <p className="text-gray-600">Produtos de fornecedores confiáveis</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Target className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Foco no Cliente</h3>
                <p className="text-gray-600">Atendimento personalizado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;