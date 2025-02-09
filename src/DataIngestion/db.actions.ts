import { Prisma, PrismaClient } from '@prisma/client';
import { decodeUnicodeEscapes, renameKeys } from './utils';

type PrismaTransaction = Prisma.TransactionClient;

export async function getRarityLabelToIdMap(
  prisma: PrismaClient | PrismaTransaction,
  collection_id: number
) {
  const resp = await prisma.$queryRaw`
        SELECT
            json_object_agg(label, id)
        FROM
            card_rarities
        WHERE
            collection_id = ${collection_id}
        `;

  let returnValue = resp?.[0]?.json_object_agg;
  const mappedKeys = {};
  Object.entries(returnValue).forEach(([key, value]) => {
    const output = decodeUnicodeEscapes(key);
    mappedKeys[key] = output;
  });
  returnValue = renameKeys(returnValue, mappedKeys);

  return returnValue;
}

export async function getSetNameToIdMap(
  prisma: PrismaClient | PrismaTransaction,
  collection_id: number
) {
  const resp = await prisma.$queryRaw`
        SELECT
            json_object_agg(sets.name, sets.id)
        FROM
            sets
        WHERE
            sets.collection_id = ${collection_id}
        `;

  let returnValue = resp?.[0]?.json_object_agg;
  const mappedKeys = {};
  Object.entries(returnValue).forEach(([key, value]) => {
    const output = decodeUnicodeEscapes(key);
    mappedKeys[key] = output;
  });
  returnValue = renameKeys(returnValue, mappedKeys);

  return returnValue;
}

export async function getBoosterNameToIdMap(
  prisma: PrismaClient | PrismaTransaction,
  collection_id: number
) {
  const resp = await prisma.$queryRaw`
        SELECT
            json_object_agg(boosters.name, boosters.id)
        FROM
            boosters
        JOIN 
          sets ON sets.id = boosters.set_id
        WHERE
            sets.collection_id = ${collection_id}
        `;

  let returnValue = resp?.[0]?.json_object_agg;
  const mappedKeys = {};
  Object.entries(returnValue).forEach(([key, value]) => {
    const output = decodeUnicodeEscapes(key);
    mappedKeys[key] = output;
  });
  returnValue = renameKeys(returnValue, mappedKeys);

  return returnValue;
}

export async function insertManyCards(
  prisma: PrismaClient | PrismaTransaction,
  cards: any[]
) {
  return await prisma.cards.createMany({
    data: cards,
  });
}
