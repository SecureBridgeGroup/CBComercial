// src/pages/ClienteSuporte.tsx
import { useEffect, useState } from 'react';
import { api } from '../utils/api';

type Ticket = {
  id: string;
  subject: string;
  status: string; // ABERTO | FECHADO
  createdAt: string;
};

const dt = (s: string) => new Date(s).toLocaleString('pt-BR');

export default function ClienteSuporte() {
  const [items, setItems] = useState<Ticket[] | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    try {
      const { tickets } = await api<{ tickets: Ticket[] }>('/tickets');
      setItems(tickets);
    } catch (e: any) {
      setErr(e?.message || 'Erro ao carregar chamados');
    }
  };
  useEffect(() => { load(); }, []);

  const onOpen = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true); setErr(null);
    try {
      await api('/tickets', { method: 'POST', body: JSON.stringify({ subject, message }) });
      setSubject(''); setMessage('');
      await load();
    } catch (e: any) {
      setErr(e?.message || 'Erro ao abrir chamado');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={onOpen} className="bg-white border rounded-xl p-5 space-y-3">
        <div className="font-semibold">Abrir novo chamado</div>
        {err && <div className="bg-red-50 text-red-700 px-3 py-2 rounded">{err}</div>}

        <input className="border rounded-lg px-3 py-2 w-full" placeholder="Assunto"
               value={subject} onChange={e=>setSubject(e.target.value)} required />
        <textarea className="border rounded-lg px-3 py-2 w-full resize-none" rows={4}
                  placeholder="Descreva sua solicitação…" value={message}
                  onChange={e=>setMessage(e.target.value)} required />
        <button disabled={sending}
          className="bg-primary text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-800 disabled:opacity-60">
          {sending ? 'Enviando…' : 'Enviar'}
        </button>
      </form>

      <div className="space-y-3">
        <div className="font-semibold">Meus chamados</div>
        {!items ? (
          <div className="animate-pulse h-20 bg-white border rounded-xl" />
        ) : items.length === 0 ? (
          <div className="text-gray-600">Nenhum chamado aberto.</div>
        ) : (
          items.map(t => (
            <div key={t.id} className="bg-white border rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{t.subject}</div>
                <div className="text-sm text-gray-500">{dt(t.createdAt)}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                t.status === 'ABERTO' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'
              }`}>
                {t.status}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
