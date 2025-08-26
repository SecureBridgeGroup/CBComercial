// src/components/Contact.tsx
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contato" className="py-20 md:py-24 bg-gradient-to-b from-blue-50/50 to-white scroll-mt-16">
      <div className="max-w-7xl container-tight mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Fale <span className="text-primary">Conosco</span>
          </h2>
          <div className="w-20 md:w-24 h-1 bg-primary mx-auto mb-4" />
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Tire dúvidas, faça orçamentos e fale com nosso time comercial.
          </p>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 gap-compact">
          {/* Coluna: informações */}
          <div className="space-y-5 md:space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 card-compact">
              <div className="flex items-start gap-3 md:gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">Endereço</h3>
                  <p className="text-sm md:text-base text-gray-600 mt-1">
                    Rua Ricardo Ramos, nº 9 - Planalto<br />
                    CEP 69.044-770 - Manaus, AM
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 card-compact">
              <div className="flex items-start gap-3 md:gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary">
                  <Phone className="w-5 h-5 md:w-6 md:h-6" />
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">Telefones</h3>
                  <p className="text-sm md:text-base text-gray-600 mt-1">
                    +55 92 3016-7065<br />
                    +55 92 99981-5891
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 card-compact">
              <div className="flex items-start gap-3 md:gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">E-mails</h3>
                  <p className="text-sm md:text-base text-gray-600 mt-1">
                    cb@cbcomercial.com.br<br />
                    fiscal@cbcomercial.com.br
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna: formulário */}
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 lg:p-8 card-compact">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
              Envie sua Mensagem
            </h3>

            <form
              className="space-y-4 md:space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Mensagem enviada! Em breve entraremos em contato.');
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
                <input
                  type="text"
                  className="w-full h-11 md:h-12 px-3.5 md:px-4 text-sm md:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-0"
                  placeholder="Digite seu nome"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu E-mail</label>
                <input
                  type="email"
                  className="w-full h-11 md:h-12 px-3.5 md:px-4 text-sm md:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-0"
                  placeholder="voce@empresa.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input
                  type="tel"
                  className="w-full h-11 md:h-12 px-3.5 md:px-4 text-sm md:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-0"
                  placeholder="(92) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sua Mensagem</label>
                <textarea
                  className="w-full min-h-[9rem] md:min-h-[10rem] px-3.5 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-0 resize-y"
                  placeholder="Como podemos ajudar?"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-800 text-white rounded-lg px-4 md:px-6 h-11 md:h-12 text-sm md:text-base font-semibold transition-colors"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
