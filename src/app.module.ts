import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectionsController } from './Collections/collections.controller';
import { CollectionsModule } from './Collections/collections.module';
import { DataIngestionController } from './DataIngestion/dataIngestion.controller';
import { DataIngestionModule } from './DataIngestion/dataIngestion.module';

@Module({
  imports: [CollectionsModule, DataIngestionModule],
  controllers: [AppController, CollectionsController, DataIngestionController],
  providers: [AppService],
})
export class AppModule {}
