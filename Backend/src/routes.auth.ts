import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { auth, AuthReq } from './middleware.auth.js';

const prisma = new PrismaClient();
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const sign = (userId: string | number) =>
  jwt.sign({ sub: String(userId) }, JWT_SECRET, { expiresIn: '7d' });

router.post('/register', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const name = String(req.body.name || '').trim();
    const password = String(req.body.password || '');
    const cpf = req.body.cpf ? String(req.body.cpf).replace(/\D+/g, '') : null;
    const cnpj = req.body.cnpj ? String(req.body.cnpj).replace(/\D+/g, '') : null;
    const phone = req.body.phone ? String(req.body.phone) : null;

    if (!email || !name || !password) {
      return res.status(400).json({ error: 'Dados obrigatórios' });
    }
    if (cpf && cnpj) {
      return res.status(400).json({ error: 'Informe CPF ou CNPJ, não ambos' });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: 'E-mail já cadastrado' });

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hash, cpf, cnpj, phone },
      select: { id: true, name: true, email: true },
    });

    // cria endereço principal, se veio no body
    const a = req.body.address || null;
    if (a?.street && a?.city && a?.state && a?.cep) {
      await prisma.address.create({
        data: {
          userId: user.id,
          label: a.label ? String(a.label) : 'Principal',
          street: String(a.street),
          number: a.number ? String(a.number) : '',
          complement: a.complement ? String(a.complement) : '',
          district: a.district ? String(a.district) : '',
          cep: String(a.cep).replace(/\D+/g, ''),
          city: String(a.city),
          state: String(a.state),
          isDefaultShipping: true,  // ✅ nomes do schema
          isDefaultBilling: true,
        },
      });
    }

    const token = sign(user.id);
    return res.json({ token, user });
  } catch (e) {
    console.error('register error:', e);
    return res.status(500).json({ error: 'Erro no cadastro' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = sign(user.id);
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    console.error('login error:', e);
    return res.status(500).json({ error: 'Erro ao autenticar' });
  }
});

// perfil completo + endereços
router.get('/me', auth, async (req: AuthReq, res) => {
  const me = await prisma.user.findUnique({
    where: { id: req.userId! },
    select: {
      id: true, name: true, email: true,
      cpf: true, cnpj: true, phone: true, createdAt: true, updatedAt: true,
    }
  });

  const addresses = await prisma.address.findMany({
    where: { userId: req.userId! },
    orderBy: [{ isDefaultShipping: 'desc' }, { createdAt: 'desc' }],
    select: {
      id: true, label: true,
      isDefaultShipping: true, isDefaultBilling: true,
      street: true, number: true, complement: true,
      district: true, cep: true, city: true, state: true,
    }
  });

  return res.json({ user: me, addresses });
});

// atualizar perfil
router.put('/me', auth, async (req: AuthReq, res) => {
  try {
    const name = req.body.name ? String(req.body.name).trim() : undefined;
    const phone = req.body.phone ? String(req.body.phone) : undefined;
    const cpf = req.body.cpf ? String(req.body.cpf).replace(/\D+/g, '') : undefined;
    const cnpj = req.body.cnpj ? String(req.body.cnpj).replace(/\D+/g, '') : undefined;

    const data: any = { name, phone };
    if (cpf)  { data.cpf = cpf;  data.cnpj = null; }
    if (cnpj) { data.cnpj = cnpj; data.cpf  = null; }

    const updated = await prisma.user.update({
      where: { id: req.userId! },
      data,
      select: { id: true, name: true, email: true, cpf: true, cnpj: true, phone: true }
    });
    return res.json({ user: updated });
  } catch (e) {
    console.error('update me error:', e);
    return res.status(500).json({ error: 'Erro ao atualizar dados' });
  }
});

export default router;
