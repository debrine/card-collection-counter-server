import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { getCards } from './db.actions';
import {
  extractCardSearchDetailsFromSearchString,
  groupCards,
} from './cards.utils';
import {
  getFirstMatchConsecutiveWordsFromString,
  getNumbersFromString,
} from 'src/utils/string.utils';

@Injectable()
export default class CardsService {
  constructor(private prisma: PrismaService) {}

  async getCards(
    collection_id: number,
    { shouldGroup = true }: { shouldGroup?: boolean },
    searchString?: string
  ) {
    const cards = await getCards(this.prisma, collection_id, searchString);

    if (!shouldGroup) {
      return [{ cards }];
    }

    return groupCards(cards);
  }
}
