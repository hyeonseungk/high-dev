import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator<string>(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (user) {
      return user.id;
    } else {
      return null;
    }
  },
);
