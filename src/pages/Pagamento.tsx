import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { TOKEN_KEY } from "../utils/api";

// Tipos básicos
export type OrderItem = {
  productId: string;
  name: string;
  unitPriceCents: number;
  qty: number;
};

export type Order = {
  id: string;
  code: string;
  totalCents: number;
  status: "AGUARDANDO_PAGAMENTO" | "PAGO" | "CANCELADO" | "FALHA" | string;
  items?: OrderItem[];
  createdAt?: string;
};

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function Pagamento() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // Modal PIX
  const [pixVisible, setPixVisible] = useState(false);
  const [pixData, setPixData] = useState<{ qrCodeBase64?: string; copiaCola?: string } | null>(null);

  // Carrega o pedido (GET /orders/:code)
  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(`/orders/${encodeURIComponent(code || "")}`, {
          headers: {
            ...(localStorage.getItem(TOKEN_KEY)
              ? { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` }
              : {}),
          },
        });
        if (!res.ok) throw new Error("Pedido não encontrado");
        const data = (await res.json()) as { order: Order };
        setOrder(data.order);
      } catch (e: any) {
        setErr(e?.message || "Falha ao carregar pedido");
      } finally {
        setLoading(false);
      }
    })();
  }, [code]);

  // Inicia pagamento (POST /payments/init)
  async function iniciarPagamento(metodo: "pix" | "cartao" | "boleto") {
    if (!order) return;
    try {
      const res = await fetch(`/payments/init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem(TOKEN_KEY)
            ? { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` }
            : {}),
        },
        body: JSON.stringify({ orderCode: order.code, method: metodo }),
      });
      if (!res.ok) throw new Error("Falha ao iniciar pagamento");
      const data = (await res.json()) as {
        redirectUrl?: string; // cartão/boleto
        qrCodeBase64?: string; // pix
        copiaCola?: string; // pix
      };

      // Redirecionar para o provedor (cartão/boleto)
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }

      // PIX
      if (metodo === "pix" && (data.qrCodeBase64 || data.copiaCola)) {
        setPixData({ qrCodeBase64: data.qrCodeBase64, copiaCola: data.copiaCola });
        setPixVisible(true);
        return;
      }

      alert("Pagamento iniciado. Siga as instruções do provedor.");
    } catch (e: any) {
      alert(e?.message || "Erro ao iniciar pagamento");
    }
  }

  // (Opcional) Polling simples do status do pedido
  useEffect(() => {
    if (!order || order.status === "PAGO" || order.status === "CANCELADO") return;
    const id = setInterval(async () => {
      try {
        const res = await fetch(`/orders/${encodeURIComponent(order.code)}`, {
          headers: {
            ...(localStorage.getItem(TOKEN_KEY)
              ? { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` }
              : {}),
          },
        });
        if (!res.ok) return;
        const data = (await res.json()) as { order: Order };
        setOrder(data.order);
      } catch {}
    }, 5000);
    return () => clearInterval(id);
  }, [order?.code, order?.status]);

  const statusClass = useMemo(() => {
    const s = (order?.status || "").toUpperCase();
    if (s === "PAGO") return "bg-green-100 text-green-800";
    if (s === "AGUARDANDO_PAGAMENTO") return "bg-yellow-100 text-yellow-800";
    if (s === "CANCELADO" || s === "FALHA") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  }, [order?.status]);

  if (loading) return <div className="p-6">Carregando pedido...</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;
  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-xl border shadow-sm p-5">
        <h1 className="text-2xl font-bold">Pagamento do Pedido</h1>
        <div className="mt-2 text-sm text-gray-600">
          Código do pedido: <span className="font-mono">{order.code}</span>
        </div>
        <div className="mt-1 text-sm text-gray-600">
          Status: <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>{order.status}</span>
        </div>
        <div className="mt-3 text-xl font-bold">{brl.format(order.totalCents / 100)}</div>
      </div>

      {order.items && order.items.length > 0 && (
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-3">Itens</h2>
          <div className="divide-y">
            {order.items.map((it, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-gray-600">{it.qty} × {brl.format(it.unitPriceCents / 100)}</div>
                </div>
                <div className="font-semibold">{brl.format((it.unitPriceCents * it.qty) / 100)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border shadow-sm p-5">
        <h2 className="text-lg font-semibold mb-3">Escolha a forma de pagamento</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button onClick={() => iniciarPagamento("pix")} className="rounded-xl bg-green-600 text-white px-4 py-3 hover:bg-green-700 shadow">
            PIX
          </button>
          <button onClick={() => iniciarPagamento("cartao")} className="rounded-xl bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 shadow">
            Cartão
          </button>
          <button onClick={() => iniciarPagamento("boleto")} className="rounded-xl bg-gray-800 text-white px-4 py-3 hover:bg-gray-900 shadow">
            Boleto
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Assim que o pagamento for confirmado pelo provedor, a CB receberá o pedido automaticamente e dará sequência interna (separação, envio, etc.).
        </p>
      </div>

      {/* Modal PIX */}
      {pixVisible && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setPixVisible(false)} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Pague com PIX</h3>
              <button className="p-2 rounded-md hover:bg-gray-100" onClick={() => setPixVisible(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            {pixData?.qrCodeBase64 ? (
              <img
                src={`data:image/png;base64,${pixData.qrCodeBase64}`}
                alt="QR Code PIX"
                className="w-64 h-64 object-contain mx-auto"
              />
            ) : (
              <div className="w-full h-64 grid place-items-center bg-gray-50 rounded-xl">QR Code indisponível</div>
            )}
            <div className="mt-4">
              <label className="text-sm text-gray-600">Copia e Cola</label>
              <textarea
                className="mt-1 w-full border rounded-lg p-2 text-sm"
                rows={3}
                value={pixData?.copiaCola || ""}
                readOnly
              />
              <button
                onClick={() => {
                  if (pixData?.copiaCola) navigator.clipboard.writeText(pixData.copiaCola);
                }}
                className="mt-2 w-full rounded-xl bg-green-600 text-white px-4 py-2 text-sm hover:bg-green-700"
              >
                Copiar código
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ações finais */}
      {order.status === "PAGO" && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4">
          Pagamento confirmado! Em instantes você receberá a confirmação e a CB dará sequência na separação e envio.
        </div>
      )}
    </div>
  );
}
