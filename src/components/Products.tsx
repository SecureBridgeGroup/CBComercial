// src/components/Products.tsx
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useCart } from '../Cart/CartSystem';
import { allProducts, listCategories, slugify } from '../data/products';

// Swiper (carrossel) – já usa no Hero, então só reaproveitar
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductsProps {
  fullPage?: boolean; // Home: false (carrossel) | /produtos: true (grade)
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const Products = ({ fullPage = false }: ProductsProps) => {
  const { addItem } = useCart();

  const products = useMemo(() => allProducts, []);
  const categories = useMemo(() => listCategories(), []);

  // Home mostra todos no carrossel; se preferir, troque por .slice(0, N)
  const visible = fullPage ? products : products;

  // UI sizes (um pouco menores na Home)
  const imgHeight      = fullPage ? 'h-48 md:h-56'       : 'h-40 md:h-44';
  const titleSize      = fullPage ? 'text-base md:text-lg' : 'text-sm md:text-base';
  const descSize       = fullPage ? 'text-xs md:text-sm'   : 'text-[12px] md:text-xs';
  const priceSize      = fullPage ? 'text-lg md:text-xl'   : 'text-base md:text-lg';
  const cardPadding    = fullPage ? 'p-3 md:p-4'           : 'p-2.5 md:p-3';

  const Card = (product: any) => (
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden group transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={`Imagem de ${product.name}`}
          className={`w-full ${imgHeight} object-contain bg-white group-hover:scale-[1.03] transition-transform duration-500`}
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
      </div>

      <div className={cardPadding}>
        <h3 className={`${titleSize} font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors`}>
          {product.name}
        </h3>

        {product.marca && (
          <p className="text-[11px] text-gray-500 mb-1">
            Marca: <strong>{product.marca}</strong>
          </p>
        )}

        {(product.peso || product.unidade) && (
          <p className="text-[11px] text-gray-500 mb-2.5">
            {product.peso ? `Peso: ${product.peso}` : ''}
            {product.peso && product.unidade ? ' • ' : ''}
            {product.unidade ? `Unidade: ${product.unidade}` : ''}
          </p>
        )}

        <p className={`text-gray-600 mb-3 ${descSize} leading-relaxed line-clamp-2`}>
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className={`${priceSize} font-bold text-primary`}>{brl.format(product.price)}</span>
          <button
            className="bg-primary text-white px-3 py-2 md:px-3.5 md:py-2.5 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2 text-[12px] md:text-sm"
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
  );

  return (
    <section id="produtos" className="py-14 md:py-18 bg-gradient-to-b from-gray-100 to-white scroll-mt-16">
      <div className="max-w-7xl container-tight mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="text-center mb-7 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2.5">
            Nossos <span className="text-primary">Produtos</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-primary mx-auto mb-2.5" />
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Oferecemos variedade para abastecer seu negócio com qualidade.
          </p>
        </div>

        {/* Filtro por categorias */}
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3.5 mb-7 md:mb-9">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/categoria/${slugify(category)}`}
              className="px-4 md:px-5 py-2.5 md:py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Carrossel na Home / Grade na página completa */}
        {!fullPage ? (
          <Swiper
            modules={[Navigation, Pagination, Keyboard, A11y]}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            spaceBetween={16}
            breakpoints={{
              0:   { slidesPerView: 1.1, spaceBetween: 12 },
              480: { slidesPerView: 1.6, spaceBetween: 12 },
              640: { slidesPerView: 2.1, spaceBetween: 14 },
              768: { slidesPerView: 2.5, spaceBetween: 16 },
              1024:{ slidesPerView: 3.2, spaceBetween: 18 },
              1280:{ slidesPerView: 4,   spaceBetween: 20 },
            }}
            className="!pb-10"
          >
            {visible.map((p) => (
              <SwiperSlide key={p.id}>
                {Card(p)}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {visible.map((p) => (
              <div key={p.id}>{Card(p)}</div>
            ))}
          </div>
        )}

        {/* Botão "ver todos" (só na Home) */}
        {!fullPage && (
          <div className="text-center mt-8">
            <Link
              to="/produtos"
              className="bg-primary text-white px-5 md:px-6 py-3 md:py-3.5 rounded-lg text-sm md:text-base font-semibold hover:bg-blue-800 transition-transform transform hover:scale-105 inline-block"
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
