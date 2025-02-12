import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/Prisma/prisma.module';
import CardsService from './cards.service';

@Module({
  imports: [PrismaModule],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
