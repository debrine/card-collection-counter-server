import { Controller, Get, Param } from '@nestjs/common';
import CardsService from './cards.service';

@Controller('/api/collection/:collectionID/cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  async getCards(@Param('collectionID') collectionID: number) {
    return await this.cardsService.getCards(Number(collectionID));
  }
}
