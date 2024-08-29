import { ValueObject } from '../base/value-object';

export type DeviceType = 'ios' | 'android';

export type UserMetaCreateParams = {
  deviceType: DeviceType;
  pushToken: string;
};

export class UserMeta extends ValueObject {
  private constructor(
    private deviceType: string,
    private pushToken: string,
  ) {
    super();
    this.validate();
  }

  static create(params: UserMetaCreateParams) {
    const { deviceType, pushToken } = params;
    return new UserMeta(deviceType, pushToken);
  }

  protected validate(): void {
    if (typeof this.deviceType !== 'string' || this.deviceType.length > 30) {
      throw new Error();
    }
    if (typeof this.pushToken !== 'string' || this.pushToken.length > 30) {
      throw new Error();
    }
  }
}
