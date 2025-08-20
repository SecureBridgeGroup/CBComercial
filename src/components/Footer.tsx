import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-blue-950 text-white animate-fade-in-up relative overflow-hidden">
      {/* Gradient Border Top */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-blue-800 to-blue-900" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src="./logotipobranco.png" alt="CB" className="w-20 h-10 object-contain" />
              <div>
                <h3 className="text-xl font-bold">CB Comercial</h3>
                <p className="text-gray-400 text-sm">Distribuidora de Alimentos</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Atendendo com qualidade e excelência padarias, pizzarias, docerias, cafeterias, hotéis e restaurantes em Manaus há anos.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/cbcomercialoficial?utm_source=ig_web_button_share_sheet&igsh=cmNxMjMzbmVqbWIz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-blue-800 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.facebook.com/cbcomercialoficial"
                 target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-blue-800 transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {[
                { label: 'Início', id: 'inicio' },
                { label: 'A Empresa', id: 'empresa' },
                { label: 'Produtos', id: 'produtos' },
                { label: 'Fornecedores', id: 'fornecedores' },
                { label: 'Contato', id: 'contato' },
              ].map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className="text-gray-400 hover:text-white hover:underline transition-all"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Serviços</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Distribuição de Alimentos</li>
              <li>Produtos de Limpeza</li>
              <li>Materiais de Higiene</li>
              <li>Equipamentos</li>
              <li>Logística Especializada</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contato</h4>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  Rua Ricardo Ramos, nº 9 - Planalto<br />
                  CEP 69.044-770 - Manaus, AM
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  +55 92 3016-7065<br />
                  +55 92 99981-5891
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  cb@cbcomercial.com.br<br />
                  fiscal@cbcomercial.com.br
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2025 CB COMERCIAL. Todos os Direitos Reservados.</p>
            <p className="mt-4 md:mt-0">Desenvolvido por SB DevSolutions</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
