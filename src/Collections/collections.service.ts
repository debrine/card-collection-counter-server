import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';

@Injectable()
export default class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async getCollections() {
    return await this.prisma.$queryRaw`
            SELECT
                CAST(id as varchar) as id,
                name
            FROM
                collections
        `;
  }
}
