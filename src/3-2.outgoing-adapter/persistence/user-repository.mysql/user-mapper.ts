import { Injectable } from '@nestjs/common';
import { ID } from '../../../1.domain/model/base/type/id';
import { User } from '../../../1.domain/model/user-aggregate/user.entity';
import { RawMetaData } from '../type';

export type UserRaw = {
  id: ID;
  companyEmailId: string;
  companyEmailDomain: string;
  nickname: string;
  deviceType: string;
  pushToken: string;
};

@Injectable()
export class UserMapper {
  toRaw(entity: User): UserRaw {
    const { id, companyEmail, nickname, userMeta } = entity.toDTO();
    const raw: UserRaw = {
      id,
      companyEmailId: companyEmail.emailId,
      companyEmailDomain: companyEmail.companyDomain,
      nickname: nickname.value,
      deviceType: userMeta.deviceType,
      pushToken: userMeta.pushToken,
    };
    return raw;
  }

  toDomainEntity(raw: UserRaw & RawMetaData) {
    const {
      id,
      companyEmailId,
      companyEmailDomain,
      nickname,
      deviceType,
      pushToken,
    } = raw;
    return User.create({
      id,
      companyEmail: `${companyEmailId}@${companyEmailDomain}`,
      nickname,
      deviceType,
      pushToken,
    });
  }
}
