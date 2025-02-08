import { PrismaModule } from 'src/Prisma/prisma.module';
import CollectionsService from './collections.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [CollectionsService],
  exports: [CollectionsService],
})
export class CollectionsModule {}
