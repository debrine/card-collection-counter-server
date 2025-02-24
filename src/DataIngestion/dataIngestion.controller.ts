import { Controller, Get, Post } from '@nestjs/common';
import DataIngestionService from './dataIngestion.service';

@Controller('/api/data-ingestion')
export class DataIngestionController {
  constructor(private dataIngestionService: DataIngestionService) {}

  @Get()
  async test() {
    return await this.dataIngestionService.getCardRarityIdByLabelForCollection(
      1
    );
  }

  @Post('/save-card-images')
  async saveImages() {
    return this.dataIngestionService.downloadAndSaveCardImages();
  }

  @Post('/resize-card-images')
  async resizeImages() {
    return this.dataIngestionService.resizeImages();
  }
}
