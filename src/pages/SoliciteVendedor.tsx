// src/pages/SoliciteVendedor.tsx
import { Helmet } from 'react-helmet-async';
import { basePath } from '../utils/basePath';

const withBase = (p: string) =>
  `${String(basePath || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')}${p.replace(/^\/+/, '')}`;

const estados = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RO','RR','RS','SC','SE','SP','TO'];

// 👉 mesmo tamanho do ClienteGateway
const MASC_W = 'clamp(160px,18vw,300px)';

const SoliciteVendedor = () => {
  return (
    <>
      <Helmet>
        <title>Solicite um Vendedor | CB Comercial</title>
      </Helmet>

      <section className="relative min-h-screen bg-gray-100 py-16 px-6 overflow-x-clip">
        {/* Mascote FIXO na lateral (altura/escala iguais ao ClienteGateway) */}
        <div
          className="hidden md:block fixed left-0 bottom-0 z-10 pointer-events-none select-none"
          aria-hidden="true"
          style={{ width: MASC_W }}
        >
          <img
            src={withBase('assets/cezar2.png')}
            alt="Mascote CB"
            className="w-full h-auto object-contain drop-shadow-2xl"
            draggable={false}
          />
        </div>

        <div className="mx-auto w-full max-w-7xl">
          {/* Spacer = mesma largura do mascote (só em md+) */}
          <div className="md:flex md:gap-8 items-stretch">
            <div className="hidden md:block shrink-0" style={{ width: MASC_W }} />

            {/* Card do formulário */}
            <div className="w-full max-w-3xl md:max-w-4xl bg-white rounded-2xl shadow-2xl p-8 md:p-10 mx-auto md:mx-0">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Solicite <span className="text-primary">Um Vendedor</span>
              </h1>
              <p className="text-gray-600 mb-8">
                Preencha os campos abaixo para solicitar atendimento comercial.
              </p>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Empresa', type: 'text' },
                  { label: 'Responsável', type: 'text' },
                  { label: 'Endereço', type: 'text', full: true },
                  { label: 'Número', type: 'text' },
                  { label: 'Bairro', type: 'text' },
                  { label: 'Conjunto', type: 'text' },
                  { label: 'Ponto de Referência', type: 'text' },
                  { label: 'Cidade', type: 'text' },
                ].map(({ label, type, full }, index) => (
                  <div key={index} className={`flex flex-col ${full ? 'md:col-span-2' : ''}`}>
                    <label className="font-medium text-gray-700">{label}</label>
                    <input
                      type={type}
                      className="mt-1 rounded-lg border border-gray-300 px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                ))}

                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Estado</label>
                  <select className="mt-1 rounded-lg border border-gray-300 px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-primary focus:outline-none">
                    <option value="">Selecione o Estado</option>
                    {estados.map((uf) => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Data</label>
                  <input type="date" className="mt-1 rounded-lg border border-gray-300 px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Horário</label>
                  <input type="time" className="mt-1 rounded-lg border border-gray-300 px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Telefones</label>
                  <input type="text" className="mt-1 rounded-lg border border-gray-300 px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Celular</label>
                  <input type="text" className="mt-1 rounded-lg border border-gray-300 px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="font-medium text-gray-700">E-mail</label>
                  <input type="email" className="mt-1 rounded-lg border border-gray-300 px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="font-medium text-gray-700">Mensagem</label>
                  <textarea
                    rows={4}
                    className="mt-1 rounded-lg border border-gray-300 px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                    placeholder="Caso queira fazer mais algum comentário..."
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition shadow-md"
                  >
                    Enviar Solicitação
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SoliciteVendedor;
