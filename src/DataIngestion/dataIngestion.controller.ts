import { Controller, Get } from '@nestjs/common';
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
}
