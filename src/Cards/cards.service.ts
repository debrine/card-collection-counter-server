import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { getCards } from './db.actions';

@Injectable()
export default class CardsService {
  constructor(private prisma: PrismaService) {}

  async getCards(collection_id: number) {
    return await getCards(this.prisma, collection_id);
  }
}
