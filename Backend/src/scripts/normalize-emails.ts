import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ select: { id: true, email: true } });

  let changed = 0;

  for (const u of users) {
    const normalized = (u.email || '').trim().toLowerCase();
    if (normalized !== u.email) {
      await prisma.user.update({
        where: { id: u.id },
        data: { email: normalized },
      });
      changed++;
      console.log(`✓ ${u.email} -> ${normalized}`);
    }
  }

  console.log(`\nConcluído. ${changed} registro(s) ajustado(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
