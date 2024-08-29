export enum DomainErrorCode {
  NICKNAME_INVALID = 'NICKNAME_INVALID',
  PHONENUMBER_INVALID = 'PHONENUMBER_INVALID',
  CONTENT_INVALID = 'CONTENT_INVALID',
}

export class DomainError extends Error {
  readonly code: DomainErrorCode;
  constructor(code: DomainErrorCode) {
    super();
    this.code = code;
  }
}
