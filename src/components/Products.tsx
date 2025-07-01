import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Molho Bolonhesa Quero",
      category: "Heinz",
      price: "R$ 75,77",
      image: "https://images.pexels.com/photos/6297/food-lunch-box-can.jpg?auto=compress&cs=tinysrgb&w=400",
      description: "SC 32/240G"
    },
    {
      id: 2,
      name: "Azeitona Verde Premium",
      category: "Alimentícios",
      price: "R$ 262,43",
      image: "https://images.pexels.com/photos/33307/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400",
      description: "Com caroço - 500G"
    },
    {
      id: 3,
      name: "Massa Concha",
      category: "Massas",
      price: "R$ 65,74",
      image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "10X500G"
    },
    {
      id: 4,
      name: "Biscoito Trigolino",
      category: "Biscoitos",
      price: "R$ 100,56",
      image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Maria Chocolate 20 X 345G"
    },
    {
      id: 5,
      name: "Esponja Scotch Brite",
      category: "Limpeza",
      price: "R$ 175,36",
      image: "https://images.pexels.com/photos/4099464/pexels-photo-4099464.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Esfera C/1 CX C/60"
    },
    {
      id: 6,
      name: "Batata Palha Natural",
      category: "Alimentícios",
      price: "R$ 94,13",
      image: "https://images.pexels.com/photos/162971/potatoes-french-mourning-chips-162971.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Mariza 24X75g"
    }
  ];

  const categories = [
    "Alimentícios", "Bebidas", "Biscoitos", "Doces", "Heinz", 
    "Limpeza", "Massas", "Temperos", "Papel", "Adesivos"
  ];

  return (
    <section id="produtos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Nossos <span className="text-red-600">Produtos</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos uma ampla variedade de produtos alimentícios, 
            materiais de limpeza e muito mais para seu negócio
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-4">
                    <button className="bg-white/90 p-3 rounded-full hover:bg-white transition-colors">
                      <Eye className="w-5 h-5 text-gray-800" />
                    </button>
                    <button className="bg-red-600 p-3 rounded-full hover:bg-red-700 transition-colors">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-600">{product.price}</span>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors transform hover:scale-105">
            Ver Todos os Produtos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;