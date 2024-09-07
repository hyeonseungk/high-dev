import { Inject, Injectable } from '@nestjs/common';
import { OutgoingAdapter } from '../../3-3.config/di/outgoing-adapter.module';
import { UserRepository } from '../out-port/persistence/user.repository.interface';

@Injectable()
export class CheckIfCanSendAuthEmailService {
  constructor(
    @Inject(OutgoingAdapter.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async check(emailAddress: string) {
    const userOptional =
      await this.userRepository.findOneByCompanyEmail(emailAddress);
    const user = userOptional.get();
    if (user) {
      throw new Error();
    }
  }
}
