import { Inject } from '@nestjs/common';
import { AuthCode } from '../../1.domain/model/auth-log-aggregate/auth-code.vo';
import { User } from '../../1.domain/model/user-aggregate/user.entity';
import { AuthLogRepository } from '../../1.domain/out-port/persistence/auth-log.repository.interface';
import { UserRepository } from '../../1.domain/out-port/persistence/user.repository.interface';
import { CheckIfCanSendAuthEmailService } from '../../1.domain/service/check-if-can-send-auth-email.service';
import { CheckIfCanSignUpService } from '../../1.domain/service/check-if-can-sign-up.service';
import { OutgoingAdapter } from '../../3-3.config/di/outgoing-adapter.module';
import { CheckIfNicknameDuplicateQuery } from '../in-port/sign-up.usecase/command/check-if-nickname-duplicate.query';
import { SignUpCommand } from '../in-port/sign-up.usecase/command/sign-up.command';
import { SignUpSendAuthCodeCommand } from '../in-port/sign-up.usecase/command/sign-up.send-auth-code.command';
import { CheckIfNicknameDuplicateResult } from '../in-port/sign-up.usecase/query/check-if-nickname-duplicate.result';
import { SignUpCheckAuthCodeQuery } from '../in-port/sign-up.usecase/query/sign-up.check-auth-code.query';
import { SignUpCheckAuthCodeResult } from '../in-port/sign-up.usecase/query/sign-up.check-auth-code.result';
import { SignUpUseCase } from '../in-port/sign-up.usecase/sign-up.usecase';
import { AuthEmailSender } from '../out-port/etc/auth-email-sender.interface';
import { Transactional } from '../transaction/transactional';

export class SignUpService implements SignUpUseCase {
  constructor(
    @Inject(OutgoingAdapter.UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(OutgoingAdapter.AuthLogRepository)
    private readonly authLogRepository: AuthLogRepository,
    @Inject(OutgoingAdapter.AuthEmailSender)
    private readonly authEmailSender: AuthEmailSender,
    private readonly checkIfCanSendAuthEmailService: CheckIfCanSendAuthEmailService,
    private readonly checkIfCanSignUpService: CheckIfCanSignUpService,
  ) {}

  @Transactional()
  async sendAuthMessage(command: SignUpSendAuthCodeCommand): Promise<void> {
    const { emailAddress } = command;
    this.checkIfCanSendAuthEmailService.check(emailAddress);
    const { emailTitle, emailContent } = User.generateAuthEmail();
    await this.authEmailSender.send(emailAddress, emailTitle, emailContent);
  }

  async checkAuthMessage(
    query: SignUpCheckAuthCodeQuery,
  ): Promise<SignUpCheckAuthCodeResult> {
    const { emailAddress, authCode } = query;
    const authLog = (
      await this.authLogRepository.findOneMostRecentForSignUpByCompanyEmail(
        emailAddress,
      )
    ).orElseThrow(() => new Error());
    return {
      isAuthCodeMatched: authLog.isAuthCodeSame(
        AuthCode.create({ value: authCode }),
      ),
    };
  }

  async checkIfNicknameDuplicate(
    query: CheckIfNicknameDuplicateQuery,
  ): Promise<CheckIfNicknameDuplicateResult> {
    const { nickname } = query;
    const user = (await this.userRepository.findOneByNickname(nickname)).get();
    return { isDuplicate: !!user };
  }

  async signUp(command: SignUpCommand): Promise<User> {
    const { companyEmail, authCode, nickname, deviceType, pushToken } = command;
    await this.checkIfCanSignUpService.check(companyEmail, authCode);
    const user = User.create({
      id: User.generateNewId(),
      companyEmail,
      nickname,
      deviceType,
      pushToken,
    });
    await this.userRepository.save(user);
    return user;
  }
}
