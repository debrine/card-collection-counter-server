import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectionsController } from './Collections/collections.controller';
import { CollectionsModule } from './Collections/collections.module';

@Module({
  imports: [CollectionsModule],
  controllers: [AppController, CollectionsController],
  providers: [AppService],
})
export class AppModule {}
