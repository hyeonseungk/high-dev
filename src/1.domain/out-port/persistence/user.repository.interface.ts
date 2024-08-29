import { Optional } from '../../model/base/type/optional';
import { User } from '../../model/user-aggregate/user.entity';

export interface UserRepository {
  findOneByCompanyEmail(emailAddress: string): Promise<Optional<User>>;
  findOneByNickname(phoneNumber: string): Promise<Optional<User>>;
  create(user: User): Promise<void>;
}
