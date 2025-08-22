import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { ShoppingCart, Trash2, X, Plus, Minus } from "lucide-react";

/**
 * CB Comercial – Cart System (single-file)
 * - Context + reducer with localStorage persistence
 * - <CartButton /> badge in header
 * - <CartDrawer /> slide-over mini-cart
 * - useCart() hook to add/remove/update from any component
 *
 * Currency: BRL (centavos). Use priceCents across the app for accuracy.
 */

// -------------------- Types & Utils --------------------
export type CartLine = {
  id: string; // product id
  name: string;
  priceCents: number; // unit price in centavos
  imageUrl?: string;
  qty: number; // integer >= 1
};

export type CartState = {
  lines: CartLine[];
};

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const fmt = (cents: number) => BRL.format(cents / 100);

const STORAGE_KEY = "cbcomercial-cart-v1";

// -------------------- Reducer --------------------

type Action =
  | { type: "ADD"; line: Omit<CartLine, "qty"> & { qty?: number } }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const qty = Math.max(1, Math.floor(action.line.qty ?? 1));
      const idx = state.lines.findIndex(l => l.id === action.line.id);
      if (idx >= 0) {
        const lines = state.lines.slice();
        lines[idx] = { ...lines[idx], qty: lines[idx].qty + qty };
        return { lines };
      }
      return { lines: [...state.lines, { ...action.line, qty }] };
    }
    case "REMOVE": {
      return { lines: state.lines.filter(l => l.id !== action.id) };
    }
    case "SET_QTY": {
      const lines = state.lines
        .map(l => (l.id === action.id ? { ...l, qty: Math.max(1, Math.floor(action.qty)) } : l))
        .filter(l => l.qty > 0);
      return { lines };
    }
    case "CLEAR":
      return { lines: [] };
    default:
      return state;
  }
}

// -------------------- Context --------------------

type CartContextType = {
  state: CartState;
  addItem: (line: Omit<CartLine, "qty"> & { qty?: number }) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalCents: number;
  totalQty: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, undefined, () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as CartState;
    } catch {}
    return { lines: [] } as CartState;
  });

  useEffect(() => {
    // avoid clobbering SSR/first render
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, initialized]);

  const totalCents = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.priceCents * l.qty, 0),
    [state.lines]
  );
  const totalQty = useMemo(() => state.lines.reduce((sum, l) => sum + l.qty, 0), [state.lines]);

  const value: CartContextType = {
    state,
    addItem: line => dispatch({ type: "ADD", line }),
    removeItem: id => dispatch({ type: "REMOVE", id }),
    setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
    clear: () => dispatch({ type: "CLEAR" }),
    totalCents,
    totalQty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

// -------------------- UI Components --------------------

export function CartButton({ onClick }: { onClick?: () => void }) {
  const { totalQty } = useCart();
  return (
    <button
      aria-label="Abrir carrinho"
      onClick={onClick}
      className="relative inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur hover:bg-white/10 transition shadow-sm"
    >
      <ShoppingCart className="h-5 w-5" />
      {totalQty > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[1.25rem] px-1 text-[0.7rem] leading-5 text-white bg-red-600 rounded-full text-center">
          {totalQty}
        </span>
      )}
    </button>
  );
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, setQty, removeItem, totalCents, clear } = useCart();

  return (
    <div className={`fixed inset-0 z-[80] ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white text-gray-900 shadow-2xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Seu carrinho</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="h-[calc(100%-10rem)] overflow-y-auto p-4 space-y-3">
          {state.lines.length === 0 ? (
            <p className="text-sm text-gray-500">Seu carrinho está vazio.</p>
          ) : (
            state.lines.map(line => (
              <div key={line.id} className="flex items-center gap-3 rounded-xl border p-3">
                {line.imageUrl ? (
                  <img src={line.imageUrl} alt={line.name} className="h-16 w-16 rounded-lg object-cover" />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-gray-100" />
                )}
                <div className="flex-1">
                  <div className="font-medium leading-tight">{line.name}</div>
                  <div className="text-sm text-gray-600">{fmt(line.priceCents)} / un.</div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      className="p-2 rounded-md border hover:bg-gray-50"
                      onClick={() => setQty(line.id, line.qty - 1)}
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2ch] text-center">{line.qty}</span>
                    <button
                      className="p-2 rounded-md border hover:bg-gray-50"
                      onClick={() => setQty(line.id, line.qty + 1)}
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      className="ml-auto p-2 rounded-md border hover:bg-gray-50 text-red-600"
                      onClick={() => removeItem(line.id)}
                      aria-label="Remover item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right font-semibold">{fmt(line.priceCents * line.qty)}</div>
              </div>
            ))
          )}
        </div>

        <footer className="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total</span>
            <span className="text-xl font-bold">{fmt(totalCents)}</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              onClick={clear}
              className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Limpar
            </button>
            <button
              onClick={() => alert("Checkout em breve ")}
              className="rounded-xl bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 shadow"
            >
              Finalizar Pedido
            </button>
          </div>
        </footer>
      </aside>
    </div>
  );
}

// -------------------- Example: Hooking into Header --------------------

/**
 * Drop these where you need:
 *
 * 1) Wrap your app once:
 *    <CartProvider>
 *      <App />
 *    </CartProvider>
 *
 * 2) In the Header component:
 *    const [open, setOpen] = useState(false);
 *    ...
 *    <CartButton onClick={() => setOpen(true)} />
 *    <CartDrawer open={open} onClose={() => setOpen(false)} />
 *
 * 3) From any ProductCard:
 *    const { addItem } = useCart();
 *    addItem({ id, name, priceCents, imageUrl, qty: 1 });
 */

export default function DemoArea() {
  // This DemoArea is optional; remove in production.
  const [open, setOpen] = useState(false);
  return (
    <CartProvider>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">CB Comercial – Demo Carrinho</h1>
          <CartButton onClick={() => setOpen(true)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProductCard
            id="arroz-5kg"
            name="Arroz Branco Tipo 1 5kg"
            priceCents={2599}
            imageUrl="https://images.unsplash.com/photo-1604908176997-4314a02e46a8?q=80&w=800&auto=format&fit=crop"
          />
          <ProductCard
            id="feijao-1kg"
            name="Feijão Carioca 1kg"
            priceCents={1299}
            imageUrl="https://images.unsplash.com/photo-1514512364185-4c2b1a0b49b3?q=80&w=800&auto=format&fit=crop"
          />
          <ProductCard
            id="oleo-900ml"
            name="Óleo de Soja 900ml"
            priceCents={899}
            imageUrl="https://images.unsplash.com/photo-1505577080450-7a4e3f1f0572?q=80&w=800&auto=format&fit=crop"
          />
        </div>
      </div>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </CartProvider>
  );
}

function ProductCard({ id, name, priceCents, imageUrl }: Omit<CartLine, "qty">) {
  const { addItem } = useCart();
  return (
    <div className="rounded-2xl border overflow-hidden shadow-sm">
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="h-40 w-full object-cover" />
      ) : (
        <div className="h-40 w-full bg-gray-100" />)
      }
      <div className="p-4">
        <div className="font-semibold leading-tight">{name}</div>
        <div className="text-blue-700 font-bold">{fmt(priceCents)}</div>
        <button
          onClick={() => addItem({ id, name, priceCents, imageUrl, qty: 1 })}
          className="mt-3 w-full rounded-xl bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 shadow"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
