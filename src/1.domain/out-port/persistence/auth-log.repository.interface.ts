import { AuthLog } from '../../model/auth-log-aggregate/auth-log.entity';
import { Optional } from '../../model/base/type/optional';

export interface AuthLogRepository {
  findOneMostRecentForSignUpByCompanyEmail(
    emailAddress: string,
  ): Promise<Optional<AuthLog>>;
}
