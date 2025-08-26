import { Star, Truck, Handshake, BadgeCheck } from 'lucide-react';
import { basePath } from '../utils/basePath';

const suppliersLine1 = [
  { name: 'Mariza',      logo: 'Mariza.png' },
  { name: 'Toffano',     logo: 'Toffano.png' },
  { name: '3M',          logo: '3M.png' },
  { name: 'Artek',       logo: 'Artek.png' },
  { name: 'Bonna Vitta', logo: 'Bonnavitta.png' },
  { name: 'Brassuco',    logo: 'Brassuco.png' },
  { name: 'Copra',       logo: 'Copra.png' },
  { name: 'Danilla',     logo: 'Danilla.avif' },
  { name: 'Heinz',       logo: 'Heinz.png' },
];

const suppliersLine2 = [
  { name: 'Hileia',      logo: 'Hileia.png' },
  { name: 'JBS',         logo: 'Jbs.png' },
  { name: 'Lupus',       logo: 'Lupus.jpg' },
  { name: 'Virrosas',    logo: 'Virrosas.png' },
  { name: 'Simonetto',   logo: 'Simonetto.png' },
  { name: 'Ocrim',       logo: 'Ocrim.jpg' },
  { name: 'GTex',        logo: 'Gtex.png' },
  { name: 'Jaks',        logo: 'Jaks.svg' },
  { name: 'Start',       logo: 'LimaPergher.png' }, // usa &, o helper encoda
];

const logoUrl = (file: string) => {
  const root = String(basePath || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  return `${root}icon/${encodeURIComponent(file)}`;
};

const benefits = [
  { icon: <Star className="text-yellow-500 w-5 h-5 md:w-6 md:h-6" />, label: 'Marcas renomadas e confiáveis' },
  { icon: <Truck className="text-blue-500 w-5 h-5 md:w-6 md:h-6" />, label: 'Logística eficiente e ágil' },
  { icon: <Handshake className="text-green-600 w-5 h-5 md:w-6 md:h-6" />, label: 'Parcerias duradouras' },
  { icon: <BadgeCheck className="text-indigo-600 w-5 h-5 md:w-6 md:h-6" />, label: 'Excelência em distribuição' },
];

const Card = ({ name, logo }: { name: string; logo: string }) => (
  <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-3.5 md:p-4 h-24 md:h-28 w-36 md:w-40 flex items-center justify-center hover:scale-105 transition-transform duration-300 shrink-0">
    <img src={logoUrl(logo)} alt={name} className="max-h-14 md:max-h-16 object-contain" loading="lazy" draggable={false} />
  </div>
);

const Suppliers = () => {
  const track1 = [...suppliersLine1, ...suppliersLine1]; // conteúdo duplicado
  const track2 = [...suppliersLine2, ...suppliersLine2];

  return (
    <section id="fornecedores" className="py-16 md:py-20 bg-gradient-to-b from-gray-100 to-white scroll-mt-16">
      <div className="max-w-7xl container-tight mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Nossos <span className="text-primary">Fornecedores</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-primary mx-auto mb-3" />
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Confiança, variedade e compromisso com a qualidade. Conheça algumas das marcas que fazem parte da nossa rede de parceiros.
          </p>
        </div>

        {/* Benefícios */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 text-center mb-12 md:mb-14">
          {benefits.map((b, i) => (
            <div key={i} className="flex flex-col items-center space-y-1.5 md:space-y-2">
              {b.icon}
              <p className="text-xs md:text-sm text-gray-700">{b.label}</p>
            </div>
          ))}
        </div>

        {/* Linha 1 – rolagem contínua */}
        <div className="overflow-hidden">
          <div className="marquee-track marquee-gap marquee-track--slow">
            {track1.map((s, idx) => <Card key={`l1-${idx}-${s.name}`} {...s} />)}
          </div>
        </div>

        {/* Linha 2 – sentido oposto */}
        <div className="overflow-hidden mt-5 md:mt-6">
          <div className="marquee-track marquee-gap marquee-track--rev">
            {track2.map((s, idx) => <Card key={`l2-${idx}-${s.name}`} {...s} />)}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Suppliers;
