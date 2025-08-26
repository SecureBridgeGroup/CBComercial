// src/pages/ClienteLogin.tsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api, setToken } from '../utils/api';
import { basePath } from '../utils/basePath';

const withBase = (p: string) =>
  `${String(basePath || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')}${p.replace(/^\/+/, '')}`;

const MASC_W = 'clamp(220px,24vw,380px)'; // largura do mascote e do spacer

export default function ClienteLogin() {
  const nav = useNavigate();
  const loc = useLocation() as any;
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '').trim();
    const password = String(fd.get('password') || '');

    try {
      const { token } = await api<{ token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setToken(token);
      nav(loc.state?.from || '/cliente/area/pedidos', { replace: true });
    } catch (e: any) {
      setErr(e?.message || 'Usuário ou senha inválidos');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet><title>Área do Cliente | Login</title></Helmet>

      <section className="relative min-h-screen bg-gray-100 py-16 px-6 overflow-x-clip">
        {/* Mascote fixo na lateral */}
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
          {/* Linha com spacer (mesma largura do mascote) + conteúdo */}
          <div className="md:flex md:gap-10 items-stretch">
            <div className="hidden md:block shrink-0" style={{ width: MASC_W }} />

            {/* Grid com os 2 cards */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card: Já tenho cadastro */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Já tenho cadastro</h2>
                <p className="text-gray-600 mb-6">
                  Acesse sua conta para ver pedidos e dados.
                </p>

                {err && <div className="mb-4 bg-red-50 text-red-700 px-3 py-2 rounded">{err}</div>}

                <form onSubmit={onSubmit} className="grid gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">E-mail</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Senha</label>
                    <input
                      name="password"
                      type="password"
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition shadow-md disabled:opacity-60"
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </button>

                  <button
                    type="button"
                    onClick={() => nav('/cliente/esqueci-senha')}
                    className="text-sm text-gray-600 underline justify-self-start"
                  >
                    Esqueci minha senha
                  </button>
                </form>
              </div>

              {/* Card: Sou novo por aqui */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Sou novo por aqui</h2>
                <p className="text-gray-600 mb-6">
                  Crie seu cadastro para fazer pedidos e acompanhar sua conta.
                </p>
                <ul className="space-y-3 text-gray-700 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary"></span>
                    Acompanhe pedidos e entregas
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary"></span>
                    2ª via de boletos e notas
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary"></span>
                    Atualize seus dados e endereços
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => nav('/cadastro')}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition shadow-md"
                >
                  Criar cadastro
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
