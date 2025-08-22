import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

import { CartProvider } from './Cart/CartSystem'; // ⬅️ novo

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/CBComercial">
    <StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
    </StrictMode>
  </BrowserRouter>
);
