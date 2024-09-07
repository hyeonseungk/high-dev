import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { AsyncLocalStorage } from 'async_hooks';

export type TransactionStore = {
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  > | null;
};

export type RequestIdStore = {
  requestId: string;
};

@Injectable()
export class AsyncLocalStorageManager {
  private readonly als: AsyncLocalStorage<TransactionStore & RequestIdStore>;

  constructor() {
    this.als = new AsyncLocalStorage<TransactionStore & RequestIdStore>();
  }

  getAls() {
    return this.als;
  }

  getStore() {
    return this.als.getStore();
  }

  getTransaction() {
    return (this.als.getStore() as TransactionStore).tx;
  }

  setTransaction(
    tx: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ) {
    (this.getStore() as TransactionStore).tx = tx;
  }

  getRequestId() {
    return (this.als.getStore() as RequestIdStore).requestId;
  }
}
