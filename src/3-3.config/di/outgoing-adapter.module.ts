import { Module } from '@nestjs/common';
import { AsyncLocalStorageManager } from '../../3-2.outgoing-adapter/async-local-storage/async-local-storage-manager';
import { AuthEmailSenderAwsSes } from '../../3-2.outgoing-adapter/etc/auth-email-sender.aws-ses';
import { CustomLoggerWinston } from '../../3-2.outgoing-adapter/logging/custom-logger.winston';
import { AuthLogRepositoryMySQL } from '../../3-2.outgoing-adapter/persistence/auth-log-repository.mysql/auth-log-repository.mysql';
import { MysqlDbManager } from '../../3-2.outgoing-adapter/persistence/db/mysql-db-manager';
import { UserMapper } from '../../3-2.outgoing-adapter/persistence/user-repository.mysql/mapper';
import { UserRepositoryMySQL } from '../../3-2.outgoing-adapter/persistence/user-repository.mysql/user-repository.mysql';
import { ConfigModule } from './config.module';

export enum OutgoingAdapter {
  UserRepository = 'UserRepository',
  AuthLogRepository = 'AuthLogRepository',
  AuthEmailSender = 'AuthEmailSender',
  CustomLogger = 'CustomLogger',
  AsyncLocalStorageManager = 'AsyncLocalStorageManager',
}

@Module({
  imports: [ConfigModule],
  providers: [
    MysqlDbManager,
    {
      provide: OutgoingAdapter.UserRepository,
      useClass: UserRepositoryMySQL,
    },
    UserMapper,
    {
      provide: OutgoingAdapter.AuthLogRepository,
      useClass: AuthLogRepositoryMySQL,
    },
    {
      provide: OutgoingAdapter.AuthEmailSender,
      useClass: AuthEmailSenderAwsSes,
    },
    {
      provide: OutgoingAdapter.CustomLogger,
      useClass: CustomLoggerWinston,
    },
    AsyncLocalStorageManager,
  ],
  exports: [
    OutgoingAdapter.UserRepository,
    OutgoingAdapter.AuthLogRepository,
    OutgoingAdapter.AuthEmailSender,
    OutgoingAdapter.CustomLogger,
    AsyncLocalStorageManager,
  ],
})
export class OutgoingAdapterModule {}
