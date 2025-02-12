import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectionsController } from './Collections/collections.controller';
import { CollectionsModule } from './Collections/collections.module';
import { DataIngestionController } from './DataIngestion/dataIngestion.controller';
import { DataIngestionModule } from './DataIngestion/dataIngestion.module';
import { CardsModule } from './Cards/cards.module';
import { CardsController } from './Cards/cards.controller';

@Module({
  imports: [CollectionsModule, DataIngestionModule, CardsModule],
  controllers: [
    AppController,
    CollectionsController,
    DataIngestionController,
    CardsController,
  ],
  providers: [AppService],
})
export class AppModule {}
