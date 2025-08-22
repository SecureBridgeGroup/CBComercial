import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
// subindo um nível para encontrar o middleware
import { auth, AuthReq } from '../middleware.auth.js';

const prisma = new PrismaClient();
const router = Router();

// Listar
router.get('/', auth, async (req: AuthReq, res) => {
  const items = await prisma.address.findMany({
    where: { userId: req.userId! },
    orderBy: [{ isDefaultShipping: 'desc' }, { createdAt: 'desc' }], // ✅ campos corretos
  });
  res.json({ addresses: items });
});

// Criar
router.post('/', auth, async (req: AuthReq, res) => {
  const b = req.body || {};
  if (!b.street || !b.city || !b.state || !b.cep) {
    return res.status(400).json({ error: 'Campos obrigatórios: street, city, state, cep' });
  }

  const created = await prisma.address.create({
    data: {
      userId: req.userId!,
      label: b.label || 'Entrega',
      street: String(b.street),
      number: b.number ? String(b.number) : '',
      complement: b.complement ? String(b.complement) : '',
      district: b.district ? String(b.district) : '',
      cep: String(b.cep).replace(/\D+/g, ''),
      city: String(b.city),
      state: String(b.state),

      // ✅ usar os nomes do schema
      isDefaultShipping: Boolean(b.isDefaultShipping) || false,
      isDefaultBilling: Boolean(b.isDefaultBilling) || false,
    },
  });

  // Se marcou como default, desmarque os demais daquele tipo
  if (created.isDefaultShipping) {
    await prisma.address.updateMany({
      where: { userId: req.userId!, NOT: { id: created.id } },
      data: { isDefaultShipping: false },
    });
  }
  if (created.isDefaultBilling) {
    await prisma.address.updateMany({
      where: { userId: req.userId!, NOT: { id: created.id } },
      data: { isDefaultBilling: false },
    });
  }

  res.status(201).json({ address: created });
});

// Atualizar
router.put('/:id', auth, async (req: AuthReq, res) => {
  const id = String(req.params.id);
  const b = req.body || {};

  const exists = await prisma.address.findFirst({ where: { id, userId: req.userId! } });
  if (!exists) return res.status(404).json({ error: 'Endereço não encontrado' });

  const updated = await prisma.address.update({
    where: { id },
    data: {
      label: b.label ?? exists.label,
      street: b.street ?? exists.street,
      number: b.number ?? exists.number,
      complement: b.complement ?? exists.complement,
      district: b.district ?? exists.district,
      cep: b.cep ? String(b.cep).replace(/\D+/g, '') : exists.cep,
      city: b.city ?? exists.city,
      state: b.state ?? exists.state,

      isDefaultShipping:
        typeof b.isDefaultShipping === 'boolean' ? b.isDefaultShipping : exists.isDefaultShipping,
      isDefaultBilling:
        typeof b.isDefaultBilling === 'boolean' ? b.isDefaultBilling : exists.isDefaultBilling,
    },
  });

  if (updated.isDefaultShipping) {
    await prisma.address.updateMany({
      where: { userId: req.userId!, NOT: { id } },
      data: { isDefaultShipping: false },
    });
  }
  if (updated.isDefaultBilling) {
    await prisma.address.updateMany({
      where: { userId: req.userId!, NOT: { id } },
      data: { isDefaultBilling: false },
    });
  }

  res.json({ address: updated });
});

// Remover
router.delete('/:id', auth, async (req: AuthReq, res) => {
  const id = String(req.params.id);
  const exists = await prisma.address.findFirst({ where: { id, userId: req.userId! } });
  if (!exists) return res.status(404).json({ error: 'Endereço não encontrado' });

  await prisma.address.delete({ where: { id } });
  res.status(204).end();
});

export default router;
