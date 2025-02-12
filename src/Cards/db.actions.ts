import { Prisma, PrismaClient } from '@prisma/client';
import { decodeUnicodeEscapes } from 'src/DataIngestion/utils';

type PrismaTransaction = Prisma.TransactionClient;

export async function getCards(
  prisma: PrismaClient | PrismaTransaction,
  collectionID: number
) {
  const resp = await prisma.$queryRaw<any[]>`
    WITH set_objects AS (
	    SELECT
		    id,
		    json_build_object(
			    'id', CAST(id as VARCHAR),
			    'name', name
		    ) as set_object
	    FROM sets
	    WHERE collection_id = ${collectionID}
),
booster_objects AS (
	SELECT
		id,
		json_build_object(
			'id', CAST(id as VARCHAR),
			'name', name
		) as booster_object
	FROM boosters
	WHERE set_id in (SELECT id FROM sets WHERE collection_id = ${collectionID})
)
SELECT 
	CAST(cards.id as VARCHAR) as id,
	cards.name,
	cards.type,
	cards.set_number,
	set_objects.set_object as set,
	booster_objects.booster_object as booster,
	card_rarities.label as rarity,
	cards.metadata
FROM cards
LEFT JOIN set_objects ON set_objects.id = cards.set_id
LEFT JOIN booster_objects ON booster_objects.id = cards.booster_id
LEFT JOIN card_rarities ON card_rarities.id = cards.rarity
WHERE cards.collection_id = ${collectionID};
    `;

  return resp.map((card) => ({
    ...card,
    rarity: decodeUnicodeEscapes(card.rarity),
  }));
}
