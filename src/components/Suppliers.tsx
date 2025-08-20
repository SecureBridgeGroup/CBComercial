import { Star, Truck, Handshake, BadgeCheck } from 'lucide-react';
import { basePath } from '../utils/basePath';

// nomes iguais aos arquivos em /public/icon
const suppliersLine1 = [
  { name: 'Mariza',       logo: 'Mariza.png' },
  { name: 'Toffano',      logo: 'Toffano.png' },
  { name: '3M',           logo: '3M.png' },
  { name: 'Artek',        logo: 'Artek.png' },
  { name: 'Bonna Vitta',  logo: 'Bonnavitta.png' },
  { name: 'Brassuco',     logo: 'Brassuco.png' },
  { name: 'Copra',        logo: 'Copra.png' },
  { name: 'Danilla',      logo: 'Danilla.avif' },
  { name: 'Heinz',        logo: 'Heinz.png' },
];

const suppliersLine2 = [
  { name: 'Hileia',       logo: 'Hileia.png' },
  { name: 'JBS',          logo: 'Jbs.png' },
  { name: 'Lupus',        logo: 'Lupus.jpg' },
  { name: 'Virrosas',     logo: 'Virrosas.png' },
  { name: 'Simonetto',    logo: 'Simonetto.png' },
  { name: 'Ocrim',        logo: 'Ocrim.jpg' },
  { name: 'GTex',         logo: 'Gtex.png' },
  { name: 'Jaks',         logo: 'Jaks.svg' },
  { name: 'Start',        logo: 'LimaPergher.png' }, // mantém o &; o helper encoda
];

// garante "/" e encoda nomes (resolve &)
const logoUrl = (file: string) => {
  const root = String(basePath || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  return `${root}icon/${encodeURIComponent(file)}`;
};

const benefits = [
  { icon: <Star className="text-yellow-500 w-6 h-6" />, label: 'Marcas renomadas e confiáveis' },
  { icon: <Truck className="text-blue-500 w-6 h-6" />, label: 'Logística eficiente e ágil' },
  { icon: <Handshake className="text-green-600 w-6 h-6" />, label: 'Parcerias duradouras' },
  { icon: <BadgeCheck className="text-indigo-600 w-6 h-6" />, label: 'Excelência em distribuição' },
];

const Suppliers = () => {
  return (
    <section
      id="fornecedores"
      className="py-24 bg-gradient-to-b from-gray-100 to-white scroll-mt-16"
      // se o mascote estiver cobrindo, descomente:
      // className="py-24 bg-gradient-to-b from-gray-100 to-white scroll-mt-16 md:pl-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos <span className="text-primary">Fornecedores</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Confiança, variedade e compromisso com a qualidade. Conheça algumas das marcas que fazem parte da nossa rede de parceiros.
          </p>
        </div>

        {/* Benefícios */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-16">
          {benefits.map((b, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              {b.icon}
              <p className="text-sm text-gray-700">{b.label}</p>
            </div>
          ))}
        </div>

        {/* Linha 1 */}
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-flex animate-marquee space-x-6 min-w-max">
            {[...suppliersLine1, ...suppliersLine1].map((s, idx) => (
              <div
                key={`line1-${idx}`}
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 h-28 w-40 flex items-center justify-center hover:scale-105 transition-transform duration-300 shrink-0"
              >
                <img src={logoUrl(s.logo)} alt={s.name} className="max-h-16 object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Linha 2 */}
        <div className="overflow-hidden whitespace-nowrap mt-6">
          <div className="inline-flex animate-marquee space-x-6 min-w-max">
            {[...suppliersLine2, ...suppliersLine2].map((s, idx) => (
              <div
                key={`line2-${idx}`}
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 h-28 w-40 flex items-center justify-center hover:scale-105 transition-transform duration-300 shrink-0"
              >
                <img src={logoUrl(s.logo)} alt={s.name} className="max-h-16 object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Suppliers;
