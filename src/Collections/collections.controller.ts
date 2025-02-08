import { Controller, Get } from '@nestjs/common';
import CollectionsService from './collections.service';

@Controller('/api/collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Get()
  async getCollections() {
    return await this.collectionsService.getCollections();
  }
}
