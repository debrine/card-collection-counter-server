import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }
  async getHello() {
    return await this.prismaClient.$queryRaw`
      SELECT 
        id,
        name
      FROM collections
    `;
  }
}
