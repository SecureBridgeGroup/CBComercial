import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth, AuthReq } from './middleware.auth.js';

const prisma = new PrismaClient();
const router = Router();

router.get('/', auth, async (req: AuthReq, res) => {
  try {
    const rows = await prisma.order.findMany({
      where: { userId: req.userId! },
      orderBy: { date: 'desc' },
      select: {
        id: true,
        code: true,
        status: true,
        totalCents: true,   // << pegar o campo existente
        date: true,
      },
    });

    // Mapeia para um payload “amigável” ao front
    const orders = rows.map((o) => {
      const total = o.totalCents / 100;
      return {
        id: o.id,
        code: o.code,
        status: o.status,
        date: o.date,
        totalCents: o.totalCents,
        total, // número em reais
        totalBRL: total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      };
    });

    res.json({ orders });
  } catch (e) {
    console.error('GET /orders error:', e);
    res.status(500).json({ error: 'Erro ao carregar pedidos' });
  }
});

export default router;
