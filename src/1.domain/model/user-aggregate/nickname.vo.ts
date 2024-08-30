import { DomainError, DomainErrorCode } from '../../error/domain-error';
import { ValueObject } from '../base/value-object';

export type NicknameCreateParams = {
  value: string;
};

export class Nickname extends ValueObject {
  private constructor(private value: string) {
    super();
    this.validate();
  }

  static create(params: NicknameCreateParams) {
    const { value } = params;
    return new Nickname(value);
  }

  validate(): void {
    if (typeof this.value !== 'string' || this.value.length > 30) {
      throw new DomainError(DomainErrorCode.NICKNAME_INVALID);
    }
  }
}
