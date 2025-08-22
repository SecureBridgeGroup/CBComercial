// src/pages/ClienteLayout.tsx
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogOut, UserCircle2 } from 'lucide-react';
import { clearToken } from '../utils/api';
import { basePath } from '../utils/basePath';

const withBase = (p: string) =>
  `${String(basePath || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')}${p.replace(/^\/+/, '')}`;

// Primeira aba aponta para "dados"
const tabs = [
  { to: 'dados',     label: 'Cadastro' },
  { to: 'pedidos',   label: 'Pedidos feitos' },
  { to: 'enderecos', label: 'Endereços' },
  { to: 'financeiro',label: 'Financeiro (NF/Boletos)' },
  { to: 'suporte',   label: 'Suporte' },
  { to: 'senha',     label: 'Alterar senha' },
];

export default function ClienteLayout() {
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate('/cliente', { replace: true });
  };

  return (
    <section className="relative min-h-screen bg-gray-100 py-10 px-6 md:pl-[280px]">
      {/* Mascote fixo à esquerda */}
      <div className="hidden md:block fixed left-0 bottom-0 z-10 pointer-events-none">
        <img
          src={withBase('assets/cezar2.png')}
          alt="Mascote CB"
          className="w-[260px] lg:w-[300px] xl:w-[340px] h-auto object-contain drop-shadow-2xl"
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                <UserCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Área do Cliente</h1>
                <p className="text-gray-600 text-sm">Gerencie seus dados, pedidos e suporte.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/cliente/area/dados')}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium"
              >
                Atualizar cadastro
              </button>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
                title="Sair"
              >
                <LogOut className="w-4 h-4" /> Sair
              </button>
            </div>
          </div>

          {/* Abas */}
          <div className="mt-4 flex flex-wrap gap-3">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-medium ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`
                }
              >
                {t.label}
              </NavLink>
            ))}
          </div>

          {/* Conteúdo da aba */}
          <div className="mt-6">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
