// src/pages/CategoriaProdutos.tsx
import { Link, useParams } from 'react-router-dom';
import { getByCategorySlug, slugify } from '../data/products';
import { ShoppingCart, Eye, ArrowLeft } from 'lucide-react';
import { useCart } from '../Cart/CartSystem';

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export default function CategoriaProdutos() {
  const { slug = '' } = useParams<{ slug: string }>();
  const items = getByCategorySlug(slug);
  const { addItem } = useCart();

  const title = items[0]?.category ?? 'Categoria';

  return (
    <section className="py-24 bg-gradient-to-b from-gray-100 to-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link to="/produtos" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Categoria: <span className="text-primary">{title}</span>
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mt-4" />
        </div>

        {items.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum produto encontrado nesta categoria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map(product => (
              <div key={product.id} className="bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden group transition-transform duration-300 hover:scale-105">
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-3">
                      <Link to={`/produto/${product.slug}`}>
                        <button className="bg-white/90 p-2.5 rounded-full hover:bg-white transition-colors" aria-label="Ver detalhes do produto">
                          <Eye className="w-5 h-5 text-gray-800" />
                        </button>
                      </Link>
                      <button
                        className="bg-primary p-2.5 rounded-full hover:bg-blue-800 transition-colors"
                        aria-label="Adicionar ao carrinho"
                        onClick={() =>
                          addItem({
                            id: product.id,
                            name: product.name,
                            priceCents: Math.round(product.price * 100),
                            imageUrl: product.image,
                            qty: 1
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
                  {product.marca && <p className="text-xs text-gray-500 mb-1">Marca: <strong>{product.marca}</strong></p>}
                  <p className="text-primary font-semibold">{brl.format(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
