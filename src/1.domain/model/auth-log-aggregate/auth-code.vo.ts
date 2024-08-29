import { ValueObject } from '../base/value-object';

export type AuthCodeCreateParams = {
  value: string;
};

export class AuthCode extends ValueObject {
  private constructor(private readonly value: string) {
    super();
    this.validate();
  }

  static create(params: AuthCodeCreateParams) {
    const { value } = params;
    return new AuthCode(value);
  }

  equals(authCode: AuthCode) {
    return this.value === authCode.value;
  }

  protected validate(): void {
    if (typeof this.value !== 'string' || this.value.length !== 4) {
      //throw new DomainError(DomainErrorCodeNICKNAME_INVALID.); TODO
    }
  }
}
