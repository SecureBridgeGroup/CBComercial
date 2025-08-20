import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  slug: string;
  unidade: string;
  peso: string;
  marca: string;
}

interface ProductsProps {
  fullPage?: boolean;
}

// 👉 Lembre-se de importar ou definir esses arrays em outro arquivo
const products: Product[] = [/* seus produtos */];
const categories: string[] = [/* suas categorias */];

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

const Products = ({ fullPage = false }: ProductsProps) => {
  return (
    <section id="produtos" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos <span className="text-primary">Produtos</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos uma ampla variedade de produtos alimentícios, materiais de limpeza, higiene e muito mais para abastecer seu negócio com qualidade.
          </p>
        </div>

        {/* Filtro por categorias */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/categoria/${slugify(category)}`}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Grade de produtos */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mb-20">Nenhum produto disponível no momento.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden group transition-transform duration-300 transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={`Imagem de ${product.name}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-4">
                      <Link to={`/produto/${product.slug}`}>
                        <button className="bg-white/90 p-3 rounded-full hover:bg-white transition-colors" aria-label="Ver detalhes do produto">
                          <Eye className="w-5 h-5 text-gray-800" />
                        </button>
                      </Link>
                      <button className="bg-primary p-3 rounded-full hover:bg-blue-800 transition-colors" aria-label="Adicionar ao carrinho">
                        <ShoppingCart className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">Marca: <strong>{product.marca}</strong></p>
                  <p className="text-sm text-gray-500 mb-4">
                    {product.peso && `Peso: ${product.peso}`} {product.unidade && ` • Unidade: ${product.unidade}`}
                  </p>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span>Adicionar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botão para página de produtos */}
        {!fullPage && (
          <div className="text-center">
            <Link
              to="/produtos"
              className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-transform transform hover:scale-105 inline-block"
            >
              Ver Todos os Produtos
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
