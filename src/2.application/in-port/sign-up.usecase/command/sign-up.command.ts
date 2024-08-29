import { DeviceType } from '../../../../1.domain/model/user-aggregate/user-meta.vo';

export class SignUpCommand {
  constructor(
    readonly companyEmail: string,
    readonly authCode: string,
    readonly nickname: string,
    readonly agreedToMarketing: boolean,
    readonly deviceType: DeviceType,
    readonly pushToken: string,
  ) {}
}
