import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { SignUpService } from '../../2.application/service/sign-up.service';
import { TRANSACTION } from '../../2.application/transaction/transactional';
import { AsyncLocalStorageManager } from '../../3-2.outgoing-adapter/async-local-storage/async-local-storage-manager';
import { MysqlDbManager } from '../../3-2.outgoing-adapter/persistence/db/mysql-db-manager';

@Injectable()
export class TransactionSetter implements OnModuleInit {
  prismaClient: PrismaClient;

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly alsManager: AsyncLocalStorageManager,
    private readonly dbManager: MysqlDbManager,
  ) {
    this.prismaClient = dbManager.prismaClient;
  }

  onModuleInit() {
    this.bootstrapTransaction();
  }

  private bootstrapTransaction() {
    const providers = this.discoveryService.getProviders();

    providers
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter((wrapper) => {
        const { instance, metatype } = wrapper;
        if (!instance || metatype !== SignUpService) {
          return false;
        }

        const allPropertyNames = Object.getOwnPropertyNames(metatype.prototype);
        const allMethodNames = allPropertyNames.filter(
          (property) => typeof instance[property] === 'function',
        );
        for (const methodName of allMethodNames) {
          const originalMethod = instance[methodName];
          const transaction = this.reflector.get<string>(
            TRANSACTION,
            originalMethod,
          );
          if (transaction) {
            const transactionWrapped = async (...args: unknown[]) => {
              return this.prismaClient.$transaction(async (tx) => {
                this.alsManager.setTransaction(tx);
                const ret = await (originalMethod as () => any).call(
                  instance,
                  ...args,
                );
                return ret;
              });
            };
            instance[methodName] = transactionWrapped;
          }
        }
      });
  }
}
