// src/pages/ClienteSenha.tsx
import { useState } from 'react';
import { api } from '../utils/api';

export default function ClienteSenha() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (next !== confirm) return setErr('Confirmação de senha não confere');
    setErr(null); setMsg(null); setLoading(true);
    try {
      await api('/auth/change-password', { method: 'POST', body: JSON.stringify({ current, next }) });
      setMsg('Senha alterada com sucesso.');
      setCurrent(''); setNext(''); setConfirm('');
    } catch (e: any) {
      setErr(e?.message || 'Erro ao alterar senha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white border rounded-xl p-5 space-y-4 max-w-xl">
      {err && <div className="bg-red-50 text-red-700 px-3 py-2 rounded">{err}</div>}
      {msg && <div className="bg-green-50 text-green-700 px-3 py-2 rounded">{msg}</div>}

      <div>
        <label className="font-medium text-gray-700">Senha atual</label>
        <input type="password" className="mt-1 w-full border rounded-lg px-3 py-2" value={current} onChange={e=>setCurrent(e.target.value)} required />
      </div>
      <div>
        <label className="font-medium text-gray-700">Nova senha</label>
        <input type="password" className="mt-1 w-full border rounded-lg px-3 py-2" value={next} onChange={e=>setNext(e.target.value)} required />
      </div>
      <div>
        <label className="font-medium text-gray-700">Confirmar nova senha</label>
        <input type="password" className="mt-1 w-full border rounded-lg px-3 py-2" value={confirm} onChange={e=>setConfirm(e.target.value)} required />
      </div>

      <button disabled={loading}
        className="bg-primary text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-800 disabled:opacity-60">
        {loading ? 'Alterando…' : 'Alterar senha'}
      </button>
    </form>
  );
}
