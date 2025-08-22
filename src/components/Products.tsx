import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useCart } from '../Cart/CartSystem';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;   // R$
  image: string;
  category: string;
  slug?: string;
  unidade?: string;
  peso?: string;
  marca?: string;
};

interface ProductsProps {
  fullPage?: boolean;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** seed de 10 produtos (idem anterior) */
const seed: Product[] = [
  { id:'arroz-5kg', name:'Arroz Branco Tipo 1 5kg', description:'Arroz grão longo, rende bem e solto.',
    price:25.99, image:'https://images.unsplash.com/photo-1604908176997-4314a02e46a8?q=80&w=1200&auto=format&fit=crop',
    category:'Mercearia', unidade:'Pacote', peso:'5kg', marca:'Cereal Bom' },
  { id:'feijao-1kg', name:'Feijão Carioca 1kg', description:'Grãos selecionados, cozimento uniforme.',
    price:12.99, image:'https://images.unsplash.com/photo-1514512364185-4c2b1a0b49b3?q=80&w=1200&auto=format&fit=crop',
    category:'Mercearia', unidade:'Pacote', peso:'1kg', marca:'Sabor Real' },
  { id:'oleo-soja-900', name:'Óleo de Soja 900ml', description:'Refinado, ideal para preparo diário.',
    price:8.99, image:'https://images.unsplash.com/photo-1505577080450-7a4e3f1f0572?q=80&w=1200&auto=format&fit=crop',
    category:'Mercearia', unidade:'Garrafa', peso:'900ml', marca:'NutriVida' },
  { id:'acucar-5kg', name:'Açúcar Refinado 5kg', description:'Açúcar refinado de alta qualidade.',
    price:22.5, image:'https://images.unsplash.com/photo-1615486364462-8574a8d3b98b?q=80&w=1200&auto=format&fit=crop',
    category:'Mercearia', unidade:'Pacote', peso:'5kg', marca:'Doce Lar' },
  { id:'cafe-500', name:'Café Torrado e Moído 500g', description:'Blend equilibrado, torra média.',
    price:15.9, image:'https://images.unsplash.com/photo-1503481766315-7a586b20f66d?q=80&w=1200&auto=format&fit=crop',
    category:'Bebidas/Quentes', unidade:'Pacote', peso:'500g', marca:'Serra Alta' },
  { id:'agua-500', name:'Água Mineral 500ml (c/ 12un)', description:'Sem gás, embalagem econômica.',
    price:18.0, image:'https://images.unsplash.com/photo-1560841653-005d0632e1f2?q=80&w=1200&auto=format&fit=crop',
    category:'Bebidas', unidade:'Fardo', peso:'12x500ml', marca:'Fonte Pura' },
  { id:'refrigerante-2l', name:'Refrigerante Cola 2L', description:'Sabor cola, linha econômica.',
    price:7.5, image:'https://images.unsplash.com/photo-1626074353766-5f5d3b2d7517?q=80&w=1200&auto=format&fit=crop',
    category:'Bebidas', unidade:'Garrafa', peso:'2L', marca:'ColaMix' },
  { id:'sabao-po-5kg', name:'Sabão em Pó 5kg', description:'Limpeza profunda, rende muito.',
    price:38.9, image:'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop',
    category:'Limpeza', unidade:'Pacote', peso:'5kg', marca:'Brilho' },
  { id:'detergente-500', name:'Detergente Neutro 500ml', description:'Não agride as mãos, alto rendimento.',
    price:3.49, image:'https://images.unsplash.com/photo-1626776876697-512c6b3c4b1a?q=80&w=1200&auto=format&fit=crop',
    category:'Limpeza', unidade:'Frasco', peso:'500ml', marca:'LimpMax' },
  { id:'papel-higienico-12', name:'Papel Higiênico 12 rolos', description:'Folha dupla, macio e resistente.',
    price:21.9, image:'https://images.unsplash.com/photo-1584559581921-2f2c1c4385f1?q=80&w=1200&auto=format&fit=crop',
    category:'Higiene', unidade:'Fardo', peso:'12 rolos', marca:'Comforto' }
];

const Products = ({ fullPage = false }: ProductsProps) => {
  const { addItem } = useCart();

  const products = useMemo(() => seed.map(p => ({ ...p, slug: p.slug || slugify(p.name) })), []);
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products]);

  // Home: 4 itens; /produtos: todos
  const visible = fullPage ? products : products.slice(0, 4);

  return (
    // === mesmo fundo da seção Fornecedores ===
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

        {/* Grade de produtos */}
        {visible.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mb-16">Nenhum produto disponível no momento.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {visible.map((product) => (
              <div
                key={product.id}
                // === mesmo estilo translúcido dos cards de Fornecedores ===
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden group transition-transform duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={`Imagem de ${product.name}`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
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
                            qty: 1
                          })
                        }
                      >
                        <ShoppingCart className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                  {/* badge de categoria foi removido */}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  {product.marca && <p className="text-xs text-gray-500 mb-1">Marca: <strong>{product.marca}</strong></p>}
                  {(product.peso || product.unidade) && (
                    <p className="text-xs text-gray-500 mb-3">
                      {product.peso ? `Peso: ${product.peso}` : ''}{product.peso && product.unidade ? ' • ' : ''}{product.unidade ? `Unidade: ${product.unidade}` : ''}
                    </p>
                  )}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">{product.description}</p>

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
                          qty: 1
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
