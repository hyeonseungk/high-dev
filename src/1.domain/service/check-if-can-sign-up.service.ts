import { Inject } from '@nestjs/common';
import { OutgoingAdapter } from '../../3-3.config/di/outgoing-adapter.module';
import { AuthCode } from '../model/auth-log-aggregate/auth-code.vo';
import { AuthLogRepository } from '../out-port/persistence/auth-log.repository.interface';
import { UserRepository } from '../out-port/persistence/user.repository.interface';

export class CheckIfCanSignUpService {
  constructor(
    @Inject(OutgoingAdapter.UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(OutgoingAdapter.AuthLogRepository)
    private readonly authLogRepository: AuthLogRepository,
  ) {}

  async check(emailAddress: string, authCode: string) {
    const userOptional =
      await this.userRepository.findOneByCompanyEmail(emailAddress);
    const user = userOptional.get();
    if (user) {
      throw new Error();
    }
    const authLog = (
      await this.authLogRepository.findOneMostRecentForSignUpByCompanyEmail(
        emailAddress,
      )
    ).orElseThrow(() => new Error());
    if (!authLog.isAuthCodeSame(AuthCode.create({ value: authCode }))) {
      throw new Error();
    }
  }
}
