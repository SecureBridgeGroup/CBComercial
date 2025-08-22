import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

/** Layout / seções públicas */
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Suppliers from './components/Suppliers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Mascot from './components/Mascot';

/** Área do Cliente */
import ClienteLayout from './pages/ClienteLayout';
import ClienteGateway from './pages/ClienteGateway';
import ClienteLogin from './pages/ClienteLogin';
import ClienteCadastro from './pages/ClienteCadastro';
import ClientePedidos from './pages/ClientePedidos';
import ClienteEnderecos from './pages/ClienteEnderecos';
import ClienteFinanceiro from './pages/ClienteFinanceiro';
import ClienteSuporte from './pages/ClienteSuporte';
import ClienteSenha from './pages/ClienteSenha';
import ClienteDados from './pages/ClienteDados';
import ProtectedRoute from './components/ProtectedRoute';
import SoliciteVendedor from './pages/SoliciteVendedor';
import Pagamento from './pages/Pagamento';

/** Placeholder rápido para o carrinho por enquanto */
const Placeholder = ({ title }: { title: string }) => (
  <div className="text-gray-600">Em breve: {title}</div>
);

function App() {
  const location = useLocation();
  const isSolicitePage = location.pathname === '/solicite-vendedor';
  const isCliente = location.pathname.startsWith('/cliente');
  const hideMascot = isSolicitePage || isCliente;

  return (
    <HelmetProvider>
      <Helmet>
        <title>CB Comercial — Distribuidora de Alimentos em Manaus</title>
        <meta
          name="description"
          content="Qualidade e excelência no fornecimento de alimentos e materiais para padarias, hotéis, lanchonetes e restaurantes."
        />
        <meta property="og:title" content="CB Comercial" />
        <meta
          property="og:description"
          content="Distribuidora de Alimentos em Manaus — excelência, variedade e agilidade."
        />
        <meta property="og:image" content="/og-cover.jpg" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <Routes>
        {/* Home (raiz) */}
        <Route
          path=""
          element={
            <>
              <Hero />
              <About />
              <Products />
              <Suppliers />
              <Contact />
            </>
          }
        />

        {/* Página pública */}
        <Route path="solicite-vendedor" element={<SoliciteVendedor />} />

        {/* >>> Pagamento no nível raiz (URL limpa) <<< */}
        <Route path="pagamento/:code" element={<Pagamento />} />

        {/* Área do Cliente – públicas */}
        <Route path="cliente" element={<ClienteGateway />} />
        <Route path="cliente/login" element={<ClienteLogin />} />
        <Route path="cliente/cadastro" element={<ClienteCadastro />} />

        {/* Área do Cliente – protegida */}
        <Route
          path="cliente/area"
          element={
            <ProtectedRoute>
              <ClienteLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="pedidos" replace />} />
          {/* Dados / Atualização de cadastro */}
          <Route path="dados" element={<ClienteDados />} />
          <Route path="cadastro" element={<Navigate to="../dados" replace />} />
          {/* Abas */}
          <Route path="pedidos" element={<ClientePedidos />} />
          <Route path="enderecos" element={<ClienteEnderecos />} />
          <Route path="financeiro" element={<ClienteFinanceiro />} />
          <Route path="suporte" element={<ClienteSuporte />} />
          <Route path="senha" element={<ClienteSenha />} />
          <Route path="produtos" element={<Products fullPage />} />
          {/* (NADA de rota absoluta aqui) */}
        </Route>

        {/* Carrinho protegido (placeholder) */}
        <Route
          path="carrinho"
          element={
            <ProtectedRoute>
              <Placeholder title="Carrinho" />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>

      <Footer />

      {/* Mascote só na home/públicas */}
      {!hideMascot && <Mascot />}

      {/* Botão flutuante do WhatsApp */}
      <a
        href="https://wa.me/5592999815891"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
        aria-label="Abrir WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M20.52 3.48a11.88 11.88 0 0 0-16.8 0c-4.64 4.64-4.64 12.16 0 16.8a11.88 11.88 0 0 0 16.8 0c4.64-4.64 4.64-12.16 0-16.8zM12 22c-2.29 0-4.4-.7-6.18-1.88l-4.48 1.18 1.18-4.48A9.98 9.98 0 1 1 12 22zm5.1-7.65c-.27-.14-1.6-.8-1.85-.9-.25-.1-.43-.14-.6.14-.18.27-.7.9-.85 1.08-.16.18-.3.2-.57.07a7.52 7.52 0 0 1-2.2-1.37 8.27 8.27 0 0 1-1.5-1.9c-.16-.28-.02-.43.12-.57.12-.12.27-.3.4-.45.13-.15.18-.25.28-.42.1-.18.05-.34-.02-.47-.07-.13-.6-1.44-.83-1.97-.22-.52-.44-.45-.6-.46h-.52c-.18 0-.46.06-.7.3-.24.24-.94.92-.94 2.23 0 1.3.95 2.56 1.09 2.74.13.17 1.88 2.88 4.56 4.05.64.28 1.14.45 1.53.57.64.2 1.22.17 1.68.1.51-.08 1.6-.66 1.82-1.3.23-.64.23-1.2.16-1.3-.07-.1-.25-.16-.52-.3z" />
        </svg>
      </a>
    </HelmetProvider>
  );
}

export default App;
