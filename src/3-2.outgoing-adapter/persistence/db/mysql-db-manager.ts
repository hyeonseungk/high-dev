import { Prisma, PrismaClient } from '@prisma/client';
import { ConfigManager } from '../../../3-3.config/config-manager';

export class MysqlDbManager {
  prismaClient: PrismaClient;

  constructor(private readonly configManager: ConfigManager) {
    this.prismaClient = new PrismaClient({
      errorFormat: 'pretty',
      log: ['query', 'info', 'warn', 'error'],
      transactionOptions: {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5000, // default: 2000
        timeout: 10000, // default: 5000
      },
    });
  }
}
