// src/pages/ProdutosPage.tsx
import Products from '../components/Products';

export default function ProdutosPage() {
  return (
    <>
      {/* Reaproveita o mesmo componente em modo full */}
      <Products fullPage />
    </>
  );
}
