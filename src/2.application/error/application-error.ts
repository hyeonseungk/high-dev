export enum ApplicationErrorCode {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  POST_NOT_FOUND = 'POST_NOT_FOUND',
}

export class ApplicationError extends Error {
  readonly code: ApplicationErrorCode;
  constructor(code: ApplicationErrorCode) {
    super();
    this.code = code;
  }
}
