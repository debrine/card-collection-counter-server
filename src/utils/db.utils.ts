import { Prisma } from '@prisma/client';

export function getWordSearchSQL(word: string, field: string) {
  // Use Prisma.raw(field) to ensure field is treated as a column name
  // Use a parameter for the ILIKE pattern
  return Prisma.sql`CAST (${Prisma.raw(field)} as VARCHAR) ILIKE ${'%' + word + '%'}`;
}
