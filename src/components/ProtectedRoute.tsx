// src/components/ProtectedRoute.tsx
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { api, getToken, clearToken } from '../utils/api';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const loc = useLocation();
  const [status, setStatus] = useState<'checking'|'ok'|'fail'>('checking');

  useEffect(() => {
    const t = getToken();
    if (!t) { setStatus('fail'); return; }
    api('/auth/me')
      .then(() => setStatus('ok'))
      .catch(() => { clearToken(); setStatus('fail'); });
  }, []);

  if (status === 'checking') {
    return <div className="py-16 text-center text-gray-500">Verificando sessão...</div>;
  }
  if (status === 'fail') {
    return <Navigate to="/cliente" state={{ from: loc.pathname, reason: 'auth' }} replace />;
  }
  return <>{children}</>;
}
