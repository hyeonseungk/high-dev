import { Module } from '@nestjs/common';
import { CheckIfCanSendAuthEmailService } from '../../1.domain/service/check-if-can-send-auth-email.service';
import { CheckIfCanSignUpService } from '../../1.domain/service/check-if-can-sign-up.service';
import { SignUpService } from '../../2.application/service/sign-up.service';
import { OutgoingAdapterModule } from './outgoing-adapter.module';

export enum UseCase {
  SignUpUseCase = 'SignUpUseCase',
}
@Module({
  imports: [OutgoingAdapterModule],
  providers: [
    {
      provide: UseCase.SignUpUseCase,
      useClass: SignUpService,
    },
    CheckIfCanSendAuthEmailService,
    CheckIfCanSignUpService,
  ],
  exports: [UseCase.SignUpUseCase],
})
export class ApplicationModule {}
