import { DomainError, DomainErrorCode } from '../../error/domain-error';
import { ValueObject } from '../base/value-object';

export type CompanyEmailCreateParams = {
  value: string;
};

export class CompanyEmail extends ValueObject {
  private constructor(
    private readonly emailId: string,
    private readonly companyDomain: string,
  ) {
    super();
    this.validate();
  }

  static create(params: CompanyEmailCreateParams) {
    const { value } = params;
    const [emailId, companyDomain] = CompanyEmail.splitByAt(value);
    return new CompanyEmail(emailId, companyDomain);
  }

  static splitByAt(companyEmail: string) {
    if (!companyEmail.includes('@')) {
      throw new Error();
    }
    const splitted = companyEmail.split('@');
    return [splitted[0], splitted[1]];
  }

  protected validate(): void {
    if (typeof this.emailId !== 'string' || this.emailId.length > 30) {
      throw new DomainError(DomainErrorCode.NICKNAME_INVALID);
    }
  }
}
