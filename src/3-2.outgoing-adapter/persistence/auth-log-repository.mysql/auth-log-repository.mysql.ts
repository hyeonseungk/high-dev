import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { AuthLog } from '../../../1.domain/model/auth-log-aggregate/auth-log.entity';
import { Optional } from '../../../1.domain/model/base/type/optional';
import { AuthLogRepository } from '../../../1.domain/out-port/persistence/auth-log.repository.interface';
import { MysqlDbManager } from '../db/mysql-db-manager';
import { MysqlDbRepository } from '../db/mysql-db-repository';
import { UserMapper } from './mapper';

@Injectable()
export class AuthLogRepositoryMySQL
  extends MysqlDbRepository
  implements AuthLogRepository
{
  user: Prisma.UserDelegate<DefaultArgs>;
  mapper: UserMapper;

  constructor(private readonly dbManager: MysqlDbManager) {
    super();
    this.user = dbManager.prismaClient.user;
  }
  findOneMostRecentForSignUpByCompanyEmail(
    emailAddress: string,
  ): Promise<Optional<AuthLog>> {
    throw new Error('Method not implemented.');
  }
}
