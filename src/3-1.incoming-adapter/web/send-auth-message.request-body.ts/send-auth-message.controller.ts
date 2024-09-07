import { Controller, Inject } from '@nestjs/common';
import { SignUpUseCase } from '../../../2.application/in-port/sign-up.usecase/sign-up.usecase';
import { UseCase } from '../../../3-3.config/di/application.module';

@Controller()
export class SendAuthMessageController {
  constructor(
    @Inject(UseCase.SignUpUseCase)
    private readonly signUpService: SignUpUseCase,
  ) {}

  // @Post('/send-auth-message')
  // async process(
  //   @UserId() userId: ID,
  //   @Body() body:
  // ): Promise<any> {
  //   const { filter } = query;
  //   return await this.matchService.showMyMatches(
  //     new ShowMyMatchesQuery(userId, filter),
  //   );
  // }
}
