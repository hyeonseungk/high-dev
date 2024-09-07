import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt from 'jsonwebtoken';
import { ConfigManager } from '../../../../3-3.config/config-manager';
import { AccessLevel } from './access-level';
import { UserJwt } from './jwt';

const keyword = 'accessLevel';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly configManager: ConfigManager,
    // @Inject(OutAdapter.CustomLogger)
    // protected readonly logger: CustomLogger,
    // @Inject(OutAdapter.UserRepository)
    // protected readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessLevels = this.reflector.getAllAndMerge<string[]>(keyword, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (accessLevels.length === 0) {
      throw new Error(
        `컨트롤러에 AccessLevel이 설정되어 있지 않습니다. 설정해주세요!`,
      );
    }
    if (accessLevels.includes(AccessLevel.ANY)) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authString = request.headers.authorization;
    const jwtString = authString.split('Bearer ')[1];
    const jwtSecret = this.configManager.getJwtSecretKey();
    const payload = jwt.verify(jwtString, jwtSecret) as jwt.JwtPayload;
    const { userId } = payload as UserJwt;
    if (userId) {
      return true;
    }
  }
}

export const AccessControl = (...roles: string[]) =>
  SetMetadata(keyword, roles);
