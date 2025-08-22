// src/pages/ClienteLogin.tsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api, setToken } from '../utils/api';

export default function ClienteLogin() {
  const nav = useNavigate();
  const loc = useLocation() as any;
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string|null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '').trim();
    const password = String(fd.get('password') || '');

    try {
      const { token } = await api<{token:string}>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      // só grava se a API retornou OK
      setToken(token);
      nav(loc.state?.from || '/cliente/area/pedidos', { replace: true });
    } catch (e: any) {
      // backend deve mandar 401 + { error: 'Usuário ou senha inválidos' }
      setErr(e?.message || 'Usuário ou senha inválidos');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-md">
      <h2 className="text-2xl font-semibold">Entrar</h2>
      {err && <div className="bg-red-50 text-red-700 px-3 py-2 rounded">{err}</div>}

      <div>
        <label className="block text-sm font-medium">E-mail</label>
        <input name="email" type="email" required className="mt-1 w-full rounded border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Senha</label>
        <input name="password" type="password" required className="mt-1 w-full rounded border px-3 py-2" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-5 py-3 rounded font-semibold hover:bg-blue-800 disabled:opacity-60"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
