import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, Phone, MapPin, Instagram } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { basePath } from '../utils/basePath';

const withBase = (p: string) =>
  `${String(basePath || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')}${p.replace(/^\/+/, '')}`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const go = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    };
    if (!isHome) {
      navigate('/');
      setTimeout(go, 120);
    } else go();
  };

  const goToVendedorPage = () => {
    setIsMenuOpen(false);
    navigate('/solicite-vendedor');
  };

  return (
    // O bloco inteiro (topo + barra principal) gruda no topo e NÃO sobrepõe o conteúdo
    <div className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          {/* Desktop: layout completo */}
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
              <a href="#" className="hover:text-blue-100 transition flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Área do Cliente</span>
              </a>
              <a href="#" className="hover:text-blue-100 transition flex items-center gap-1">
                <ShoppingCart className="w-4 h-4" />
                <span>Carrinho</span>
              </a>
            </div>
          </div>

          {/* Mobile: ticker rolando */}
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
              {/* duplica para loop contínuo */}
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
      <header className={`transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('inicio')}>
              <img
                src={withBase('logotipo.png')}
                alt="CB Comercial"
                className="h-10 w-auto"
              />
              <div className="leading-tight">
                <h1 className="text-xl font-bold text-gray-900">CB Comercial</h1>
                <p className="text-sm text-gray-600">Distribuidora de Alimentos</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              {['inicio','empresa','produtos','fornecedores','contato'].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
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
                {['inicio','empresa','produtos','fornecedores','contato'].map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-left text-gray-700 hover:text-primary transition-colors font-medium py-2"
                  >
                    {id === 'inicio' ? 'Início' : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
                <button
                  onClick={goToVendedorPage}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium text-center mt-4"
                >
                  Solicitar Vendedor
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
