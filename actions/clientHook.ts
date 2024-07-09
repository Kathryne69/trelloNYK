// clientHooks.ts

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export const useClient = () => {
  return {
    client: db,
  };
};
