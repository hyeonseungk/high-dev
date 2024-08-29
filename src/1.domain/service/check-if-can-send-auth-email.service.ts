import { UserRepository } from '../out-port/persistence/user.repository.interface';

export class CheckIfCanSendAuthEmailService {
  constructor(private readonly userRepository: UserRepository) {}

  async check(emailAddress: string) {
    const userOptional =
      await this.userRepository.findOneByCompanyEmail(emailAddress);
    const user = userOptional.get();
    if (user) {
      throw new Error();
    }
  }
}
