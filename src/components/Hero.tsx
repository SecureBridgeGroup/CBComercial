import { ShoppingCart, Phone, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { basePath } from '../utils/basePath';

const withBase = (p: string) =>
  `${String(basePath || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')}${p.replace(/^\/+/, '')}`;

const images = [
  { file: 'img1.avif', source: 'Fonte: www.heinz.com' },
  { file: 'img2.avif', source: 'Fonte: www.kraftheinz.com' },
  { file: 'img3.jpg',  source: 'Fonte: www.pompom.com.br' },
  { file: 'img4.png',  source: 'Fonte: www.toffano.com.br' },
  { file: 'img5.png',  source: 'Fonte: www.copra.com.br' },
  { file: 'img6.png',  source: 'Fonte: www.copra.com.br' },
];

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[68svh] sm:min-h-screen flex items-center justify-center overflow-hidden"
      role="region"
      aria-label="Seção de introdução"
    >
      {/* Carrossel de fundo */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        slidesPerView={1}
        spaceBetween={0}
        loop
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        className="absolute inset-0 z-0 hero-swiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={withBase(`hero-carousel/${encodeURIComponent(img.file)}`)}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover object-center"
                decoding="async"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <p className="hidden sm:block absolute bottom-1 right-1 text-xs text-white/90 italic bg-black/40 px-2 py-1 rounded z-30">
                {img.source}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/70" />
        <div className="hidden sm:block absolute inset-0 bg-black/60" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 sm:p-7 md:p-8 lg:p-9 mb-6 sm:mb-8 md:mb-9 shadow-lg ring-1 ring-white/10">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-5 sm:mb-7 md:mb-8 text-blue-100 leading-relaxed">
              Há mais de 11 anos levando excelência em distribuição para todo o Amazonas.
              Com qualidade, agilidade e confiança, abastecemos o varejo amazonense e fazemos o produto certo chegar onde ele deve estar.
              Distribuindo confiança, de Manaus ao interior.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 justify-center items-center">
              <button
                onClick={() => scrollToSection('produtos')}
                aria-label="Ir para produtos"
                className="group w-full sm:w-auto bg-primary text-white px-5 sm:px-6 md:px-7 py-3 sm:py-3 md:py-3.5 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-xl"
              >
                <ShoppingCart className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span>Ver Produtos</span>
                <ArrowRight className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('contato')}
                aria-label="Ir para contato"
                className="group w-full sm:w-auto border-2 border-white text-white px-5 sm:px-6 md:px-7 py-3 sm:py-3 md:py-3.5 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span>Fale Conosco</span>
              </button>
            </div>
          </div>

          {/* Estatísticas (um passo menor no md/lg) */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-7 lg:gap-8 mt-4 sm:mt-8 md:mt-10 lg:mt-12">
            {[
              { label: 'Colaboradores', value: '80+' },
              { label: 'Fornecedores', value: '20+' },
              { label: 'Produtos', value: '1000+' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 transition-all duration-300 cursor-default ring-1 ring-white/10"
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 mb-1 sm:mb-1.5 md:mb-2">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-sm md:text-base lg:text-lg leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicador de rolagem */}
      <div className="absolute bottom-4 sm:bottom-7 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-5 h-9 sm:w-5 sm:h-9 md:w-6 md:h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
