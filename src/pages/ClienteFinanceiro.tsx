// src/pages/ClienteFinanceiro.tsx
import { useEffect, useState } from 'react';
import { api } from '../utils/api';

type Doc = {
  id: string;
  type: 'BOLETO'|'NFE'|string;
  number?: string | null;
  dueDate?: string | null;
  amountCents: number;
  status: string; // PAGO | EM_ABERTO
  pdfUrl?: string | null;
  line?: string | null;
  createdAt: string;
};

const brl = new Intl.NumberFormat('pt-BR',{ style:'currency', currency:'BRL' });
const dt = (s?: string | null) => s ? new Date(s).toLocaleDateString('pt-BR') : '-';

const Status = ({ s }: { s: string }) => {
  const cls = s === 'PAGO' ? 'bg-green-100 text-green-700' :
              s === 'EM_ABERTO' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-700';
  return <span className={`px-2 py-1 text-xs rounded-full ${cls}`}>{s.replace('_',' ')}</span>;
};

export default function ClienteFinanceiro() {
  const [docs, setDocs] = useState<Doc[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { docs } = await api<{ docs: Doc[] }>('/docs');
        setDocs(docs);
      } catch (e: any) {
        setErr(e?.message || 'Erro ao carregar documentos');
      }
    })();
  }, []);

  if (err) return <div className="text-red-600">{err}</div>;
  if (!docs) return <div className="animate-pulse h-24 bg-white border rounded-xl" />;

  const boletos = docs.filter(d => d.type === 'BOLETO');
  const nfe = docs.filter(d => d.type === 'NFE');

  const Table = ({ rows, isBoleto }: { rows: Doc[]; isBoleto?: boolean }) => (
    <div className="overflow-x-auto bg-white border rounded-xl">
      <table className="min-w-[680px] w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b">
            <th className="p-3">Número</th>
            <th className="p-3">{isBoleto ? 'Vencimento' : 'Emissão'}</th>
            <th className="p-3">Valor</th>
            <th className="p-3">Status</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(d => (
            <tr key={d.id} className="border-b last:border-0">
              <td className="p-3">{d.number || '-'}</td>
              <td className="p-3">{isBoleto ? dt(d.dueDate) : dt(d.createdAt)}</td>
              <td className="p-3">{brl.format(d.amountCents / 100)}</td>
              <td className="p-3"><Status s={d.status} /></td>
              <td className="p-3 space-x-2">
                {d.pdfUrl && (
                  <a href={d.pdfUrl} target="_blank" className="text-primary hover:underline">PDF</a>
                )}
                {isBoleto && d.line && (
                  <button className="text-gray-700 hover:underline" onClick={() => navigator.clipboard.writeText(d.line!)}>
                    Copiar linha digitável
                  </button>
                )}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td className="p-3 text-gray-500" colSpan={5}>Sem registros.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="font-semibold mb-2">Boletos</div>
        <Table rows={boletos} isBoleto />
      </div>

      <div>
        <div className="font-semibold mb-2">Notas Fiscais (NFe)</div>
        <Table rows={nfe} />
      </div>
    </div>
  );
}
