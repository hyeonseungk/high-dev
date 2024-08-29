import { User } from '../../../1.domain/model/user-aggregate/user.entity';
import { CheckIfNicknameDuplicateQuery } from './command/check-if-nickname-duplicate.query';
import { SignUpCommand } from './command/sign-up.command';
import { SignUpSendAuthCodeCommand } from './command/sign-up.send-auth-code.command';
import { CheckIfNicknameDuplicateResult } from './query/check-if-nickname-duplicate.result';
import { SignUpCheckAuthCodeQuery } from './query/sign-up.check-auth-code.query';
import { SignUpCheckAuthCodeResult } from './query/sign-up.check-auth-code.result';

export interface SignUpUseCase {
  checkIfNicknameDuplicate(
    query: CheckIfNicknameDuplicateQuery,
  ): Promise<CheckIfNicknameDuplicateResult>;
  sendAuthMessage(command: SignUpSendAuthCodeCommand): Promise<void>;
  checkAuthMessage(
    command: SignUpCheckAuthCodeQuery,
  ): Promise<SignUpCheckAuthCodeResult>;
  signUp(command: SignUpCommand): Promise<User>;
}
