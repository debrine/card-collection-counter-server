import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { readFile } from 'fs/promises';
import * as path from 'path';
import {
  getBoosterNameToIdMap,
  getCards,
  getRarityLabelToIdMap,
  getSetNameToIdMap,
  insertManyCards,
} from './db.actions';
import { CardSet, SetBoosters } from './pockettcg.constants';
import { downloadAndSaveImages } from 'src/scripts/imageDownloader';
import { resizeAndSaveImages } from 'src/scripts/imageResizing';

@Injectable()
export default class DataIngestionService {
  constructor(private prisma: PrismaService) {}

  async downloadAndSaveCardImages() {
    const cards = await getCards(this.prisma, 1);
    console.log('cards', cards);
    const formattedCards = cards.map((card) => ({
      url: card.metadata.original_url,
      label: `${card.set_id}_${card.set_number}_${card.name}`,
    }));
    await downloadAndSaveImages(formattedCards);
  }

  async getCardRarityIdByLabelForCollection(collection_id: number) {
    // Build the full path to the JSON file
    const filePath = path.join(process.cwd(), 'data', 'formatted_cards.json');

    // Read and parse the file
    const fileContents = await readFile(filePath, 'utf-8');
    const cardJson = JSON.parse(fileContents);

    const rarityMap = await getRarityLabelToIdMap(this.prisma, collection_id);
    const setMap = await getSetNameToIdMap(this.prisma, collection_id);
    const boosterMap = await getBoosterNameToIdMap(this.prisma, collection_id);

    // console.log('set map', setMap);

    const formattedCards = cardJson.map((card) => {
      return {
        name: card.name,
        collection_id: collection_id,
        set_id: setMap[CardSet[card.set]],
        rarity: rarityMap[card.rarity],
        booster_id: boosterMap[SetBoosters[card.booster_pack]] ?? null,
        type: card.type,
        set_number: Number(card.set_number),
        metadata: {
          original_url: card.url,
        },
        // booster_id: SetBoosters[card.booster],
      };
    });

    // console.log(
    //   'missing',
    //   formattedCards.filter((card) => card.set_id_map == undefined)[0]
    // );
    // await insertManyCards(this.prisma, formattedCards);
  }

  async addCards(cards) {
    return await this.prisma.$queryRaw`
      INSERT INTO
        cards (name, collection_id)
      VALUES
        ${cards}
    `;
  }

  async resizeImages() {
    return await resizeAndSaveImages();
  }
}
