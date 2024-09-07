import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { IncomingAdapterModule } from './3-3.config/di/incoming-adapter.module';
import { TransactionSetter } from './3-3.config/di/transaction-setter';

@Module({
  imports: [IncomingAdapterModule, DiscoveryModule],
  controllers: [],
  providers: [TransactionSetter],
})
export class AppModule {}
