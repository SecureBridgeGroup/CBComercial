// Mascot.tsx
import { useLocation } from 'react-router-dom';
import { basePath } from '../utils/basePath';

const withBase = (p: string) =>
  `${String(basePath || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')}${p.replace(/^\/+/, '')}`;

const BLOCK = ['/cliente', '/cadastro', '/solicite-um-vendedor'];

export default function Mascot() {
  const { pathname } = useLocation();
  const hide = BLOCK.some((r) => pathname === r || pathname.startsWith(r + '/'));
  if (hide) return null;

  return (
    <div className="fixed left-0 bottom-0 z-40 pointer-events-none">
      <img
        src={withBase('assets/cezar.png')}
        alt="Mascote CB Comercial"
        draggable={false}
        className="
          select-none drop-shadow-2xl transition-transform duration-300 hover:scale-[1.03]
          w-[clamp(160px,18vw,340px)]
        "
      />
    </div>
  );
}
