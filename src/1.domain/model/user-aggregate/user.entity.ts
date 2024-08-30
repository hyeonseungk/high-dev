import { AggregateRoot } from '../base/aggreaget-root';
import { ID } from '../base/type/id';
import { CompanyEmail } from './company-email.vo';
import { Nickname } from './nickname.vo';
import { DeviceType, UserMeta } from './user-meta.vo';

export type UserCreateParams = {
  id: ID;
  companyEmail: string;
  nickname: string;
  deviceType: DeviceType;
  pushToken: string;
};

export type UserDTO = {
  id: ID;
  companyEmail: {
    emailId: string;
    companyDomain: string;
  };
  nickname: {
    value: string;
  };
  userMeta: {
    deviceType: DeviceType;
    pushToken: string;
  };
};

// Parameter properties
export class User extends AggregateRoot {
  private constructor(
    id: ID,
    readonly companyEmail: CompanyEmail,
    private nickname: Nickname,
    private userMeta: UserMeta,
  ) {
    super(id);
    this.validate();
  }

  static create(params: UserCreateParams) {
    const { id, companyEmail, nickname, deviceType, pushToken } = params;

    return new User(
      id,
      CompanyEmail.create({ value: companyEmail }),
      Nickname.create({ value: nickname }),
      UserMeta.create({ deviceType: deviceType, pushToken }),
    );
  }

  static generateAuthEmailContent() {
    // TODO
    return '인증번호는 12341234입니다.';
  }

  validate() {}

  toDTO(): UserDTO {
    return structuredClone(this) as unknown as UserDTO;
  }
}
