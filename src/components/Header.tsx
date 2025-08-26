import { useState, useEffect, useRef } from 'react';
import { Menu, X, User, Phone, MapPin, Instagram } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { basePath } from '../utils/basePath';
import { isAuthed, clearToken, TOKEN_KEY } from '../utils/api';
import { CartButton, CartDrawer } from '../Cart/CartSystem';

const withBase = (p: string) =>
  `${String(basePath || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')}${p.replace(/^\/+/, '')}`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authed, setAuthed] = useState(isAuthed());
  const [showAccount, setShowAccount] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sync = () => setAuthed(isAuthed());
    sync();
    const onStorage = (e: StorageEvent) => { if (e.key === TOKEN_KEY) sync(); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [location.pathname]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setShowAccount(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'produtos') { // agora Produtos é página
      setIsMenuOpen(false);
      navigate('/produtos');
      return;
    }
    const go = () => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); };
    if (!isHome) { navigate('/'); setTimeout(go, 120); } else go();
  };

  const goToVendedorPage = () => { setIsMenuOpen(false); navigate('/solicite-vendedor'); };
  const goCliente = () => { setIsMenuOpen(false); navigate('/cliente'); };

  const handleLogout = () => {
    clearToken();
    setShowAccount(false);
    setIsMenuOpen(false);
    setAuthed(false);
    navigate('/cliente', { replace: true });
  };

  async function checkout({ lines, totalCents }: { lines: Array<{id: string; name: string; priceCents: number; qty: number}>; totalCents: number }) {
    try {
      const payload = {
        items: lines.map(l => ({
          productId: l.id,
          name: l.name,
          unitPriceCents: l.priceCents,
          qty: l.qty,
          lineTotalCents: l.priceCents * l.qty,
        })),
        totalCents,
      };

      const res = await fetch('/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem(TOKEN_KEY) ? { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Falha ao criar pedido');
      const data = await res.json() as { order: { id: string; code: string } };

      navigate(`/pagamento/${encodeURIComponent(data.order.code)}`);
    } catch (e: any) {
      console.error(e);
      alert(e?.message || 'Não foi possível fechar o pedido.');
    }
  }

  return (
    <div className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          {/* Desktop */}
          <div className="hidden lg:flex flex-wrap items-center justify-between text-sm">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Rua Ricardo Ramos, nº 9 - Planalto - Manaus</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>+55 92 3016-7065 | +55 92 99981-5891</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-blue-100 transition">Facebook</a>
              <a
                href="https://www.instagram.com/cbcomercialoficial?utm_source=ig_web_button_share_sheet&igsh=cmNxMjMzbmVqbWIz"
                target="_blank" rel="noopener noreferrer"
                className="hover:text-blue-100 transition"
              >
                Instagram
              </a>

              {!authed ? (
                <button onClick={goCliente} className="hover:text-blue-100 transition flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>Área do Cliente</span>
                </button>
              ) : (
                <div className="relative z-[61]" ref={accountRef}>
                  <button
                    onClick={() => setShowAccount(v => !v)}
                    className="hover:text-blue-100 transition flex items-center gap-1"
                  >
                    <User className="w-4 h-4" />
                    <span>Minha conta</span>
                  </button>

                  {showAccount && (
                    <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-xl ring-1 ring-black/5 z-[60]">
                      <button
                        onClick={() => { setShowAccount(false); navigate('/cliente/area/pedidos'); }}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-50"
                      >
                        Meus pedidos
                      </button>
                      <button
                        onClick={() => { setShowAccount(false); navigate('/cliente/area/cadastro'); }}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-50"
                      >
                        Meu cadastro
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Carrinho */}
              <div className="ml-1">
                <CartButton onClick={() => setOpenCart(true)} />
              </div>
            </div>
          </div>

          {/* Mobile ticker */}
          <div className="lg:hidden overflow-hidden">
            <div className="flex items-center gap-8 whitespace-nowrap animate-marquee will-change-transform">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Rua Ricardo Ramos, nº 9 - Planalto - Manaus
              </span>
              <span className="inline-flex items-center gap-1">
                <Phone className="w-4 h-4" /> +55 92 3016-7065 | +55 92 99981-5891
              </span>
              <a
                href="https://www.instagram.com/cbcomercialoficial?utm_source=ig_web_button_share_sheet&igsh=cmNxMjMzbmVqbWIz"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-blue-100"
              >
                <Instagram className="w-4 h-4" /> @cbcomercialoficial
              </a>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Rua Ricardo Ramos, nº 9 - Planalto - Manaus
              </span>
              <span className="inline-flex items-center gap-1">
                <Phone className="w-4 h-4" /> +55 92 3016-7065 | +55 92 99981-5891
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-1.5' : 'bg-white/95 backdrop-blur-sm py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('inicio')}>
              <img src={withBase('logotipo.png')} alt="CB Comercial" className="h-10 w-auto" />
              <div className="leading-tight">
                <h1 className="text-xl font-bold text-gray-900">CB Comercial</h1>
                <p className="text-sm text-gray-600">Distribuidora de Alimentos</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              {['inicio', 'empresa', 'produtos', 'fornecedores', 'contato'].map((id) => (
                <button
                  key={id}
                  onClick={() => (id === 'produtos' ? navigate('/produtos') : scrollToSection(id))}
                  className="text-gray-700 hover:text-primary transition-colors font-medium"
                >
                  {id === 'inicio' ? 'Início' : id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
              <button
                onClick={goToVendedorPage}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium"
              >
                Solicitar Vendedor
              </button>
            </nav>

            {/* Mobile Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Abrir menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="lg:hidden mt-3 pb-4 border-t border-gray-200 animate-slide-down">
              <nav className="flex flex-col space-y-2 pt-4">
                {['inicio', 'empresa', 'produtos', 'fornecedores', 'contato'].map((id) => (
                  <button
                    key={id}
                    onClick={() => { setIsMenuOpen(false); id === 'produtos' ? navigate('/produtos') : scrollToSection(id); }}
                    className="text-left text-gray-700 hover:text-primary transition-colors font-medium py-2"
                  >
                    {id === 'inicio' ? 'Início' : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}

                {!authed ? (
                  <button
                    onClick={() => { setIsMenuOpen(false); goCliente(); }}
                    className="flex items-center gap-2 border border-gray-300 rounded-lg py-3 px-3 text-gray-700 hover:bg-gray-100"
                  >
                    <User className="w-5 h-5" /> Área do Cliente
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => { setIsMenuOpen(false); navigate('/cliente/area/pedidos'); }}
                      className="text-left text-gray-700 hover:text-primary transition-colors font-medium py-2"
                    >
                      Meus pedidos
                    </button>
                    <button
                      onClick={() => { setIsMenuOpen(false); navigate('/cliente/area/cadastro'); }}
                      className="text-left text-gray-700 hover:text-primary transition-colors font-medium py-2"
                    >
                      Meu cadastro
                    </button>
                    <button
                      onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                      className="text-left text-red-600 hover:text-red-700 transition-colors font-medium py-2"
                    >
                      Sair
                    </button>
                  </>
                )}

                <button
                  onClick={() => { setIsMenuOpen(false); setOpenCart(true); }}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium text-center"
                >
                  Abrir Carrinho
                </button>

                <button
                  onClick={goToVendedorPage}
                  className="bg-primary/90 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium text-center"
                >
                  Solicitar Vendedor
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Drawer do Carrinho */}
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
        onCheckout={checkout}
      />
    </div>
  );
};

export default Header;
