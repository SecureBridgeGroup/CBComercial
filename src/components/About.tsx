import { Users, Truck, Award, Target } from 'lucide-react';
import { basePath } from '../utils/basePath';

const withBase = (p: string) =>
  `${String(basePath || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')}${p.replace(/^\/+/, '')}`;

const About = () => {
  const bgUrl = withBase('assets/capa-manaus.jpg');

  return (
    <section id="empresa" className="py-20 bg-gray-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid com imagem + texto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Imagem com texto sobreposto */}
          <div className="relative">
            <div
              className="aspect-square bg-center bg-no-repeat bg-cover rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300"
              style={{ backgroundImage: `url('${bgUrl}')` }}
              role="img"
              aria-label="Vista de Manaus representando excelência em distribuição"
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 text-center px-4">
                <h3 className="text-4xl font-bold mb-2">Excelência</h3>
                <p className="text-xl">em Distribuição</p>
              </div>
            </div>
          </div>

          {/* Texto descritivo ao lado */}
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-justify">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              A <span className="text-primary">Empresa</span>
            </h2>
            <div className="w-24 h-1 bg-primary mb-6" />

            <p>
              A CB Comercial atende com qualidade e excelência aos segmentos de <strong>padarias, pizzarias, docerias, cafeterias, cozinhas, hotéis, restaurantes, lanchonetes</strong> e muitos outros.
            </p>
            <p>
              Contamos com o profissionalismo de mais de <strong>80 colaboradores</strong> entre vendedores, supervisores, gerentes e equipe operacional. Nossa logística é moderna e eficiente, com veículos novos que garantem a entrega dos pedidos com agilidade e segurança.
            </p>
            <p>
              Buscamos a <strong>excelência</strong> em todo o nosso atendimento. A CB Comercial vem inovando em tecnologia por meio da <strong>reestruturação, capacitação dos colaboradores, novos fornecedores</strong> e da <strong>expansão territorial</strong> no estado do Amazonas.
            </p>
            <p>
              Comprometida com a qualidade, nossa empresa possui <strong>estocagem customizada e capacidade de suprimentos</strong> que garantem a integridade dos mais variados produtos desde a origem até o cliente.
            </p>
            <p>
              <strong>Nossa meta é atingir a perfeição na entrega</strong>. E o caminho para isso passa pelo <strong>trabalho, compromisso, honestidade</strong> e, o mais importante, <strong>acreditar sempre no sucesso</strong>.
            </p>
          </div>
        </div>

        {/* Cards com ícones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[
            { icon: Users, title: 'Equipe Qualificada', text: 'Mais de 80 profissionais especializados' },
            { icon: Truck, title: 'Logística Moderna', text: 'Frota nova para entregas rápidas' },
            { icon: Award, title: 'Qualidade Garantida', text: 'Produtos de fornecedores confiáveis' },
            { icon: Target, title: 'Foco no Cliente', text: 'Atendimento personalizado e eficiente' },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-left"
            >
              <Icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
