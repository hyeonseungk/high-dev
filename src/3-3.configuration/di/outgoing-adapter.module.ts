import { Module } from '@nestjs/common';
import { AuthEmailSenderAwsSes } from '../../3-2.outgoing-adapter/etc/auth-email-sender.aws-ses';
import { MysqlDbManager } from '../../3-2.outgoing-adapter/persistence/db/mysql-db-manager';
import { UserMapper } from '../../3-2.outgoing-adapter/persistence/user-repository.mysql/mapper';
import { UserRepositoryMySQL } from '../../3-2.outgoing-adapter/persistence/user-repository.mysql/user-repository.mysql';
import { ConfigModule } from '../../3-3.config/di/config.module';

export enum OutgoingAdapter {
  UserRepository = 'UserRepository',
  AuthEmailSender = 'AuthEmailSender',
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
      provide: OutgoingAdapter.AuthEmailSender,
      useClass: AuthEmailSenderAwsSes,
    },
  ],
})
export class OutgoingAdapterModule {}
