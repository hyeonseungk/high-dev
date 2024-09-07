import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { CompanyEmail } from '../../../1.domain/model/auth-log-aggregate/company-email.vo';
import { Optional } from '../../../1.domain/model/base/type/optional';
import { User } from '../../../1.domain/model/user-aggregate/user.entity';
import { UserRepository } from '../../../1.domain/out-port/persistence/user.repository.interface';
import { MysqlDbManager } from '../db/mysql-db-manager';
import { MysqlDbRepository } from '../db/mysql-db-repository';
import { UserMapper } from './mapper';

@Injectable()
export class UserRepositoryMySQL
  extends MysqlDbRepository
  implements UserRepository
{
  user: Prisma.UserDelegate<DefaultArgs>;
  mapper: UserMapper;

  constructor(private readonly dbManager: MysqlDbManager) {
    super();
    this.user = dbManager.prismaClient.user;
  }

  async findOneByCompanyEmail(emailAddress: string): Promise<Optional<User>> {
    const [companyEmailId, companyEmailDomain] =
      CompanyEmail.splitByAt(emailAddress);
    const raw = await this.user.findFirst({
      where: {
        companyEmailId,
        companyEmailDomain,
      },
    });
    if (raw) {
      return Optional.of(this.mapper.toDomainEntity(raw));
    } else {
      return Optional.of(null);
    }
  }

  async findOneByNickname(nickname: string): Promise<Optional<User>> {
    const raw = await this.user.findFirst({
      where: {
        nickname,
      },
    });
    if (raw) {
      return Optional.of(this.mapper.toDomainEntity(raw));
    } else {
      return Optional.of(null);
    }
  }

  async save(user: User): Promise<void> {
    const raw = this.mapper.toRaw(user);
    await this.user.upsert({
      create: { ...raw, updatedAt: null, deletedAt: null },
      update: { ...raw },
      where: { id: raw.id },
    });
  }
}
