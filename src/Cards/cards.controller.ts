import { Controller, Get, Param, Query } from '@nestjs/common';
import CardsService from './cards.service';

@Controller('/api/collection/:collectionID/cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  async getCards(
    @Param('collectionID') collectionID: number,
    @Query('searchString') searchString?: string
  ) {
    return await this.cardsService.getCards(
      Number(collectionID),
      {},
      searchString || undefined
    );
  }
}
