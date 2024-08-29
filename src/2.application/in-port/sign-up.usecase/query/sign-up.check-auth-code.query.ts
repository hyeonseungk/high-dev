export class SignUpCheckAuthCodeQuery {
  constructor(
    readonly emailAddress: string,
    readonly authCode: string,
  ) {}
}
