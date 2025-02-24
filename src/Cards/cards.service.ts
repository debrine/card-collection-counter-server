import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { getCards } from './db.actions';
import { groupCardsBySetAndBooster } from './cards.utils';

@Injectable()
export default class CardsService {
  constructor(private prisma: PrismaService) {}

  async getCards(
    collection_id: number,
    { shouldGroup = false }: { shouldGroup?: boolean }
  ) {
    const cards = await getCards(this.prisma, collection_id);

    if (!shouldGroup) {
      return [{ cards }];
      //   return cards;
    }

    const { groupedCards, setIDs, boosterIDs } =
      groupCardsBySetAndBooster(cards);

    console.log('setIDs', setIDs);
    console.log('boosterIDs', boosterIDs);

    return groupedCards;
  }
}
