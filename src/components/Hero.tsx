import { ShoppingCart, Phone, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
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
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="region"
      aria-label="Seção de introdução"
    >
      {/* Fundo/carrossel */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        effect="fade"
        className="absolute inset-0 z-0"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={withBase(`hero-carousel/${encodeURIComponent(img.file)}`)}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
              <p className="absolute bottom-1 right-1 text-xs text-white italic bg-black/40 px-2 py-1 rounded z-30">
                {img.source}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Conteúdo */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 sm:p-10 md:p-12 mb-10 shadow-lg">
          <p className="text-lg sm:text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Há mais de 11 anos levando excelência em distribuição para todo o Amazonas.
            Com qualidade, agilidade e confiança, abastecemos o varejo amazonense e fazemos o produto certo chegar onde ele deve estar.
            Distribuindo confiança, de Manaus ao interior.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => scrollToSection('produtos')}
              aria-label="Ir para produtos"
              className="group bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-xl"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Ver Produtos</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('contato')}
              aria-label="Ir para contato"
              className="group border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <Phone className="w-6 h-6" />
              <span>Fale Conosco</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            { label: 'Colaboradores', value: '80+' },
            { label: 'Fornecedores', value: '20+' },
            { label: 'Produtos', value: '1000+' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-300 cursor-default"
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">{stat.value}</div>
              <div className="text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicador de rolagem */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
