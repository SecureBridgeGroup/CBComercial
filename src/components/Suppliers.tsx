import React from 'react';
import { Building2 } from 'lucide-react';

const Suppliers = () => {
  const suppliers = [
    { name: "3M DO BRASIL LTDA", category: "Materiais e Adesivos" },
    { name: "HEINZ BRASIL S.A.", category: "Alimentos" },
    { name: "HILEIA IND. ALIMENTÍCIOS", category: "Produtos Regionais" },
    { name: "BRASSUCO IND COM LTDA", category: "Alimentícios" },
    { name: "COPRA IND ALIM LTDA", category: "Óleos e Gorduras" },
    { name: "DANILLA FOODS BRASIL", category: "Doces e Confeitos" },
    { name: "LUPUS ALIMENTOS", category: "Nutrição Animal" },
    { name: "MARIZA IND ALIMENTÍCIA", category: "Conservas" },
    { name: "TOFFANO PRODUTOS", category: "Alimentícios" },
    { name: "JBS S.A.", category: "Carnes e Derivados" },
    { name: "ARTEK EKO ENERGIA", category: "Lâmpadas e Elétricos" },
    { name: "BONNA VITTA", category: "Higiene e Cuidados" }
  ];

  return (
    <section id="fornecedores" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Nossos <span className="text-red-600">Fornecedores</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trabalhamos com as melhores marcas do mercado para garantir 
            qualidade e variedade em nossos produtos
          </p>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {suppliers.map((supplier, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-red-600 transition-colors">
                    {supplier.name}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{supplier.category}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Quer ser nosso parceiro?</h3>
          <p className="text-lg mb-6 text-red-100">
            Estamos sempre em busca de novos fornecedores que compartilhem 
            nossos valores de qualidade e excelência
          </p>
          <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors transform hover:scale-105">
            Entre em Contato
          </button>
        </div>
      </div>
    </section>
  );
};

export default Suppliers;