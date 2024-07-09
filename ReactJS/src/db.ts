import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({
  log: ['query'], // Enable query logging
});

export default db;
