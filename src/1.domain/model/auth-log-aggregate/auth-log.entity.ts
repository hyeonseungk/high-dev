import { AggregateRoot } from '../base/aggreaget-root';
import { ID } from '../base/type/id';
import { AuthCode } from './auth-code.vo';
import { CompanyEmail } from './company-email.vo';

export enum AuthCase {
  SIGN_UP = 'SIGN_UP',
  LOGIN = 'LOGIN',
}

export type AuthLogCreateParams = {
  id: ID;
  companyEmail: string;
  authCode: string;
  authCase: AuthCase;
  createdAt: Date | null;
};

export class AuthLog extends AggregateRoot {
  private constructor(
    id: ID,
    private readonly companyEmail: CompanyEmail,
    private readonly authCode: AuthCode,
    private readonly authCase: AuthCase,
    private readonly createdAt: Date | null,
  ) {
    super(id);
    this.validate();
  }

  static create(params: AuthLogCreateParams) {
    const { id, companyEmail, authCode, authCase, createdAt } = params;
    return new AuthLog(
      id,
      CompanyEmail.create({ value: companyEmail }),
      AuthCode.create({ value: authCode }),
      authCase,
      createdAt,
    );
  }

  protected validate() {
    if (
      this.authCase !== AuthCase.LOGIN &&
      this.authCase !== AuthCase.SIGN_UP
    ) {
      throw new Error(); // TODO. enum 값 모두 조회
    }
  }

  isAuthCodeSame(authCode: AuthCode) {
    return this.authCode.equals(authCode);
  }
}
