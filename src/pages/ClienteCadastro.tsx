// src/pages/ClienteCadastro.tsx
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api, setToken } from '../utils/api';
import { basePath } from '../utils/basePath';

const withBase = (p: string) =>
  `${String(basePath || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')}${p.replace(/^\/+/, '')}`;

const estados = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RO','RR','RS','SC','SE','SP','TO'];
const onlyDigits = (s: string) => (s || '').replace(/\D+/g, '');

export default function ClienteCadastro() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') || '/cliente/area/pedidos';

  const [tipoPessoa, setTipoPessoa] = useState<'cpf' | 'cnpj'>('cpf');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim().toLowerCase();
    const password = String(fd.get('password') || '');
    const ddd = onlyDigits(String(fd.get('ddd') || ''));
    const phoneNum = onlyDigits(String(fd.get('phone') || ''));
    const phone = ddd && phoneNum ? `${ddd}${phoneNum}` : '';

    const cpfValue = onlyDigits(String(fd.get('cpf') || ''));
    const cnpjValue = onlyDigits(String(fd.get('cnpj') || ''));

    const address = {
      street: String(fd.get('addressStreet') || '').trim(),
      number: String(fd.get('addressNumber') || '').trim(),
      complement: String(fd.get('addressComp') || '').trim(),
      district: String(fd.get('addressDistrict') || '').trim(),
      cep: onlyDigits(String(fd.get('addressCep') || '')),
      city: String(fd.get('addressCity') || '').trim(),
      state: String(fd.get('addressState') || '').trim(),
    };

    const payload: any = {
      name,
      email,
      password,
      phone,
      ...(tipoPessoa === 'cpf' ? { cpf: cpfValue } : { cnpj: cnpjValue }),
      address,
    };

    try {
      const { token } = await api<{ token: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setToken(token);
      navigate('/cliente/area/pedidos');
    } catch (e: any) {
      setErr(e?.message || 'Falha no cadastro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Cadastro | Área do Cliente</title></Helmet>

      {/* SEÇÃO COM MASCOTE FIXO */}
      <section className="relative bg-gray-100">
        {/* Mascote próprio da página (o global fica oculto em /cliente/*) */}
        <div className="hidden md:block fixed left-0 bottom-0 z-10 pointer-events-none">
          <img
            src={withBase('assets/cezar2.png')}
            alt="Mascote CB"
            className="h-[75vh] max-h-[680px] w-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Conteúdo com espaço reservado ao mascote no desktop */}
        <div className="min-h-screen max-w-6xl mx-auto py-12 px-4 md:pl-[320px]">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            {/* Cabeçalho */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Crie sua <span className="text-primary">conta</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Preencha seus dados para acessar a área do cliente, acompanhar pedidos e atualizar informações.
              </p>
            </div>

            {err && <div className="mb-6 bg-red-50 text-red-700 px-3 py-2 rounded">{err}</div>}

            {/* Formulário centralizado */}
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome / Rua */}
              <div>
                <label className="font-medium text-gray-700">Nome completo</label>
                <input name="name" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" required />
              </div>
              <div>
                <label className="font-medium text-gray-700">Rua</label>
                <input name="addressStreet" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" required />
              </div>

              {/* Documento */}
              <div className="md:col-span-2">
                <label className="font-medium text-gray-700 block">Documento</label>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
                    <button type="button" onClick={() => setTipoPessoa('cpf')}
                      className={`px-3 py-1 text-sm ${tipoPessoa === 'cpf' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}>
                      CPF
                    </button>
                    <button type="button" onClick={() => setTipoPessoa('cnpj')}
                      className={`px-3 py-1 text-sm ${tipoPessoa === 'cnpj' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}>
                      CNPJ
                    </button>
                  </div>
                  <input
                    name={tipoPessoa === 'cpf' ? 'cpf' : 'cnpj'}
                    className="flex-1 min-w-[240px] rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                    inputMode="numeric" pattern="[0-9]*" placeholder="Somente números" required
                  />
                  <span className="text-xs text-red-600">* apenas números</span>
                </div>
              </div>

              {/* Número / Complemento */}
              <div>
                <label className="font-medium text-gray-700">Número</label>
                <input name="addressNumber" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" inputMode="numeric" pattern="[0-9]*" />
              </div>
              <div>
                <label className="font-medium text-gray-700">Complemento</label>
                <input name="addressComp" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
              </div>

              {/* Bairro / CEP */}
              <div>
                <label className="font-medium text-gray-700">Bairro</label>
                <input name="addressDistrict" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" required />
              </div>
              <div>
                <label className="font-medium text-gray-700">CEP</label>
                <input name="addressCep" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" inputMode="numeric" pattern="[0-9]*" placeholder="Apenas números" required />
              </div>

              {/* Telefone (DDD + número) */}
              <div>
                <label className="font-medium text-gray-700">Telefone</label>
                <div className="flex gap-2">
                  <input name="ddd" className="mt-1 w-24 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="DDD" inputMode="numeric" pattern="[0-9]*" required />
                  <input name="phone" className="mt-1 flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Número" inputMode="numeric" pattern="[0-9]*" required />
                </div>
              </div>

              {/* Cidade / Estado */}
              <div>
                <label className="font-medium text-gray-700">Cidade</label>
                <input name="addressCity" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" required />
              </div>
              <div>
                <label className="font-medium text-gray-700">Estado</label>
                <select name="addressState" defaultValue="AM" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" required>
                  <option value="">Selecione o Estado</option>
                  {estados.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </div>

              {/* E-mail / Senha */}
              <div>
                <label className="font-medium text-gray-700">E-mail</label>
                <input name="email" type="email" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" required />
              </div>
              <div>
                <label className="font-medium text-gray-700">Senha</label>
                <input name="password" type="password" maxLength={10} className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" required />
                <p className="text-xs text-red-600 mt-1">* Máximo de 10 caracteres.</p>
              </div>

              {/* Ações */}
              <div className="md:col-span-2">
                <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition shadow-md disabled:opacity-60">
                  {loading ? 'Cadastrando...' : 'Criar conta'}
                </button>
                <p className="mt-3 text-center text-sm text-gray-600">
                  Já tem cadastro?{' '}
                  <button type="button" onClick={() => navigate(`/cliente?next=${encodeURIComponent(next)}`)} className="text-primary hover:underline">
                    Faça login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
