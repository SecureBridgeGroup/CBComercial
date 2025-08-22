// src/pages/ClientePedidos.tsx
import { useEffect, useState } from 'react';
import { api } from '../utils/api';

type Order = {
  id: string;
  code: string;
  totalCents: number;
  status: string;
  date: string;
};

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const dt = (s: string) => new Date(s).toLocaleDateString('pt-BR');

const Status = ({ s }: { s: string }) => {
  const map: Record<string, string> = {
    'EM_SEPARACAO': 'bg-yellow-100 text-yellow-800',
    'EM_ENTREGA': 'bg-blue-100 text-blue-800',
    'ENTREGUE': 'bg-green-100 text-green-800',
    'CANCELADO': 'bg-red-100 text-red-700',
  };
  const cls = map[s] || 'bg-gray-100 text-gray-700';
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls}`}>{s.replace(/_/g, ' ')}</span>;
};

export default function ClientePedidos() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { orders } = await api<{ orders: Order[] }>('/orders');
        setOrders(orders);
      } catch (e: any) {
        setErr(e?.message || 'Erro ao carregar pedidos');
      }
    })();
  }, []);

  if (err) return <div className="text-red-600">{err}</div>;
  if (!orders)
    return (
      <div className="space-y-4">
        {[0,1].map(i=>(
          <div key={i} className="p-4 bg-white rounded-xl shadow-sm border animate-pulse h-24" />
        ))}
      </div>
    );

  if (orders.length === 0)
    return <div className="text-gray-600">Você ainda não possui pedidos.</div>;

  return (
    <div className="space-y-4">
      {orders.map(o => (
        <div key={o.id} className="bg-white rounded-xl border shadow-sm p-4 md:p-5 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Pedido</div>
            <div className="font-semibold text-gray-900">#{o.code}</div>
            <div className="text-sm text-gray-500">Data: {dt(o.date)}</div>
          </div>
          <div className="flex items-center gap-4">
            <Status s={o.status} />
            <div className="text-right">
              <div className="text-sm text-gray-500">Total</div>
              <div className="font-semibold">{brl.format(o.totalCents / 100)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
