// src/pages/ClienteEnderecos.tsx
import { useEffect, useState } from 'react';
import { api } from '../utils/api';

type Address = {
  id: string;
  label: string;
  street: string;
  number?: string | null;
  complement?: string | null;
  district: string;
  city: string;
  state: string;
  cep: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
};

const empty: Address = {
  id: '',
  label: '',
  street: '',
  number: '',
  complement: '',
  district: '',
  city: '',
  state: 'AM',
  cep: '',
  isDefaultBilling: false,
  isDefaultShipping: false,
};

export default function ClienteEnderecos() {
  const [items, setItems] = useState<Address[] | null>(null);
  const [editing, setEditing] = useState<Address>(empty);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    try {
      const { addresses } = await api<{ addresses: Address[] }>('/addresses');
      setItems(addresses);
    } catch (e: any) {
      setErr(e?.message || 'Erro ao carregar endereços');
    }
  };

  useEffect(() => { load(); }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const t = e.currentTarget;
    const name = t.name as keyof Address;

    if (t instanceof HTMLInputElement && t.type === 'checkbox') {
      setEditing(prev => ({ ...prev, [name]: t.checked } as any));
    } else {
      setEditing(prev => ({ ...prev, [name]: t.value } as any));
    }
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr(null);
    const body = JSON.stringify({ ...editing, id: undefined });
    try {
      if (editing.id) await api(`/addresses/${editing.id}`, { method: 'PUT', body });
      else await api('/addresses', { method: 'POST', body });
      setEditing(empty);
      await load();
    } catch (e: any) {
      setErr(e?.message || 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm('Excluir este endereço?')) return;
    try {
      await api(`/addresses/${id}`, { method: 'DELETE' });
      await load();
    } catch (e: any) {
      alert(e?.message || 'Erro ao excluir');
    }
  };

  return (
    <div className="space-y-8">
      {/* Lista */}
      <div className="space-y-4">
        {err && <div className="bg-red-50 text-red-700 px-3 py-2 rounded">{err}</div>}
        {!items ? (
          <div className="animate-pulse h-20 bg-white border rounded-xl" />
        ) : items.length === 0 ? (
          <div className="text-gray-600">Nenhum endereço cadastrado.</div>
        ) : (
          items.map(a => (
            <div key={a.id} className="bg-white border rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-semibold">{a.label}</div>
                <div className="text-gray-600 text-sm">
                  {a.street}, {a.number} {a.complement ? `- ${a.complement}` : ''}<br />
                  {a.district} - {a.city}/{a.state} • CEP {a.cep}
                </div>
                <div className="mt-1 text-xs text-gray-500 space-x-2">
                  {a.isDefaultShipping && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">Entrega padrão</span>}
                  {a.isDefaultBilling && <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">Cobrança padrão</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-2 rounded-lg border hover:bg-gray-50"
                  onClick={() => setEditing(a)}>Editar</button>
                <button className="px-3 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => onDelete(a.id)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form */}
      <div className="bg-white border rounded-xl p-5">
        <div className="font-semibold mb-4">{editing.id ? 'Editar endereço' : 'Novo endereço'}</div>
        <form onSubmit={onSave} className="grid md:grid-cols-2 gap-4">
          <input className="border rounded-lg px-3 py-2" placeholder="Rótulo (Comercial, Entrega…)" name="label" value={editing.label} onChange={onChange} />
          <input className="border rounded-lg px-3 py-2" placeholder="CEP" name="cep" value={editing.cep} onChange={onChange} />
          <input className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="Rua" name="street" value={editing.street} onChange={onChange} />
          <input className="border rounded-lg px-3 py-2" placeholder="Número" name="number" value={editing.number || ''} onChange={onChange} />
          <input className="border rounded-lg px-3 py-2" placeholder="Complemento" name="complement" value={editing.complement || ''} onChange={onChange} />
          <input className="border rounded-lg px-3 py-2" placeholder="Bairro" name="district" value={editing.district} onChange={onChange} />
          <input className="border rounded-lg px-3 py-2" placeholder="Cidade" name="city" value={editing.city} onChange={onChange} />
          <select className="border rounded-lg px-3 py-2" name="state" value={editing.state} onChange={onChange}>
            {['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'].map(uf => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>

          <label className="flex items-center gap-2 mt-2">
            <input type="checkbox" name="isDefaultShipping" checked={editing.isDefaultShipping} onChange={onChange} />
            <span>Usar como endereço padrão de entrega</span>
          </label>
          <label className="flex items-center gap-2 mt-2">
            <input type="checkbox" name="isDefaultBilling" checked={editing.isDefaultBilling} onChange={onChange} />
            <span>Usar como endereço padrão de cobrança</span>
          </label>

          <div className="md:col-span-2 flex gap-2 mt-2">
            <button disabled={loading}
              className="bg-primary text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-800 disabled:opacity-60">
              {loading ? 'Salvando…' : (editing.id ? 'Salvar alterações' : 'Adicionar endereço')}
            </button>
            {editing.id && (
              <button type="button" className="px-4 py-3 rounded-lg border" onClick={() => setEditing(empty)}>Cancelar</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
