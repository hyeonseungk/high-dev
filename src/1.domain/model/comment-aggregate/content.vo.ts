import { DomainError, DomainErrorCode } from '../../error/domain-error';
import { ValueObject } from '../base/value-object';

export type ContentCreateParams = {
  value: string;
};

export class Content extends ValueObject {
  private constructor(private value: string) {
    super();
    this.validate();
  }

  static create(params: ContentCreateParams) {
    const { value } = params;
    return new Content(value);
  }

  protected validate(): void {
    if (typeof this.value !== 'string' || this.value.length > 30) {
      throw new DomainError(DomainErrorCode.NICKNAME_INVALID);
    }
  }
}
