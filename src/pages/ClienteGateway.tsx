// src/pages/ClienteGateway.tsx
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { basePath } from '../utils/basePath';
import { api, setToken } from '../utils/api';

const withBase = (p: string) =>
  `${String(basePath || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')}${p.replace(/^\/+/, '')}`;

// largura do mascote (e do spacer) – ajuste fino aqui se quiser menor/maior
const MASC_W = 'clamp(160px,18vw,300px)';

const ClienteGateway = () => {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const [params] = useSearchParams();
  const next = params.get('next') || '/cliente/area/pedidos';

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // (opcional) garantir que qualquer mascote global esteja oculto nesta tela
  useEffect(() => {
    const g = document.querySelector<HTMLElement>('[data-global-mascot]');
    if (g) g.style.display = 'none';
    return () => { if (g) g.style.display = ''; };
  }, []);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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
      navigate(next, { replace: true });
    } catch (e: any) {
      setErr(e?.message || 'Usuário ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Área do Cliente | CB Comercial</title>
      </Helmet>

      <section className="relative min-h-screen bg-gray-100 py-16 px-6 overflow-x-clip">
        {/* Mascote fixo na esquerda (tamanho controlado) */}
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
          {/* Linha com spacer + conteúdo */}
          <div className="md:flex md:gap-10 items-stretch">
            {/* Spacer invisível: reserva a lateral do mascote */}
            <div className="hidden md:block shrink-0" style={{ width: MASC_W }} />

            {/* Grid com dois cards bem largos */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Login */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Já tenho cadastro</h1>
                <p className="text-gray-600 mb-6">Acesse sua conta para ver pedidos e dados.</p>

                {location.state?.reason === 'auth' && (
                  <div className="mb-4 bg-yellow-50 text-yellow-800 px-3 py-2 rounded">
                    Faça login para acessar a área do cliente.
                  </div>
                )}

                {err && <div className="mb-4 bg-red-50 text-red-700 px-3 py-2 rounded">{err}</div>}

                <form onSubmit={onLogin} className="space-y-4">
                  <div>
                    <label className="font-medium text-gray-700">E-mail</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="mt-1 rounded-lg border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Senha</label>
                    <input
                      name="password"
                      type="password"
                      required
                      className="mt-1 rounded-lg border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-primary focus:outline-none"
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
                    onClick={() => navigate('/cliente/senha')}
                    className="w-full text-sm text-gray-600 hover:text-primary underline"
                  >
                    Esqueci minha senha
                  </button>
                </form>
              </div>

              {/* Criar conta */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Sou novo por aqui</h2>
                  <p className="text-gray-600 mb-4">
                    Crie seu cadastro para fazer pedidos e acompanhar sua conta.
                  </p>
                  <ul className="text-gray-700 space-y-2 mb-6 list-disc pl-5">
                    <li>Acompanhe pedidos e entregas</li>
                    <li>2ª via de boletos e notas</li>
                    <li>Atualize seus dados e endereços</li>
                  </ul>
                </div>

                <button
                  onClick={() => navigate(`/cliente/cadastro?next=${encodeURIComponent(next)}`)}
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
};

export default ClienteGateway;
