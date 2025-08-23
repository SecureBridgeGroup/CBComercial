// src/pages/ProdutoDetalhe.tsx
import { useParams, Link } from 'react-router-dom';
import { getBySlug } from '../data/products';
import { useCart } from '../Cart/CartSystem';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export default function ProdutoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getBySlug(slug) : undefined;
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-gray-600 mb-6">Produto não encontrado.</p>
        <Link to="/produtos" className="text-primary hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar para produtos
        </Link>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <Link to="/produtos" className="text-primary hover:underline inline-flex items-center gap-2 mb-6">
          <ArrowLeft className="w-4 h-4" /> Voltar para produtos
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden grid md:grid-cols-2">
          <img src={product.image} alt={product.name} className="w-full h-80 md:h-full object-cover" />
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-500 mt-1 text-sm">
              {product.marca ? <>Marca: <strong>{product.marca}</strong></> : null}
              {(product.peso || product.unidade) && (
                <>
                  {product.marca ? ' • ' : ''}
                  {product.peso ? `Peso: ${product.peso}` : ''}
                  {product.peso && product.unidade ? ' • ' : ''}
                  {product.unidade ? `Unidade: ${product.unidade}` : ''}
                </>
              )}
            </p>

            <p className="text-gray-700 mt-4">{product.description}</p>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-3xl font-bold text-primary">{brl.format(product.price)}</span>
              <button
                onClick={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    priceCents: Math.round(product.price * 100),
                    imageUrl: product.image,
                    qty: 1
                  })
                }
                className="bg-primary text-white px-5 py-3 rounded-xl hover:bg-blue-800 transition-colors inline-flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
