import { PrismaModule } from 'src/Prisma/prisma.module';
import { Module } from '@nestjs/common';
import DataIngestionService from './dataIngestion.service';

@Module({
  imports: [PrismaModule],
  providers: [DataIngestionService],
  exports: [DataIngestionService],
})
export class DataIngestionModule {}
