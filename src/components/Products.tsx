// src/components/Products.tsx
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useCart } from '../Cart/CartSystem';
import { allProducts, listCategories, slugify } from '../data/products';

interface ProductsProps {
  fullPage?: boolean;
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const Products = ({ fullPage = false }: ProductsProps) => {
  const { addItem } = useCart();

  const products = useMemo(() => allProducts, []);
  const categories = useMemo(() => listCategories(), []);

  const visible = fullPage ? products : products.slice(0, 4);

  return (
    <section id="produtos" className="py-24 bg-gradient-to-b from-gray-100 to-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos <span className="text-primary">Produtos</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Oferecemos variedade para abastecer seu negócio com qualidade.
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

        {/* Grade */}
        {visible.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mb-16">Nenhum produto disponível no momento.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {visible.map((product) => (
              <div
                key={product.id}
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden group transition-transform duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={`Imagem de ${product.name}`}
                    className="w-full h-48 object-contain bg-white transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-3">
                      <Link to={`/produto/${product.slug}`}>
                        <button className="bg-white/90 p-2.5 rounded-full hover:bg-white transition-colors" aria-label="Ver detalhes do produto">
                          <Eye className="w-5 h-5 text-gray-800" />
                        </button>
                      </Link>
                      <button
                        className="bg-primary p-2.5 rounded-full hover:bg-blue-800 transition-colors"
                        aria-label="Adicionar ao carrinho (atalho)"
                        onClick={() =>
                          addItem({
                            id: product.id,
                            name: product.name,
                            priceCents: Math.round(product.price * 100),
                            imageUrl: product.image,
                            qty: 1,
                          })
                        }
                      >
                        <ShoppingCart className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  {product.marca && (
                    <p className="text-xs text-gray-500 mb-1">
                      Marca: <strong>{product.marca}</strong>
                    </p>
                  )}
                  {(product.peso || product.unidade) && (
                    <p className="text-xs text-gray-500 mb-3">
                      {product.peso ? `Peso: ${product.peso}` : ''}
                      {product.peso && product.unidade ? ' • ' : ''}
                      {product.unidade ? `Unidade: ${product.unidade}` : ''}
                    </p>
                  )}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{brl.format(product.price)}</span>
                    <button
                      className="bg-primary text-white px-3.5 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2 text-sm"
                      onClick={() =>
                        addItem({
                          id: product.id,
                          name: product.name,
                          priceCents: Math.round(product.price * 100),
                          imageUrl: product.image,
                          qty: 1,
                        })
                      }
                    >
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
