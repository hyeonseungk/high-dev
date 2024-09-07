import { Module } from '@nestjs/common';
import { SendAuthMessageController } from '../../3-1.incoming-adapter/web/send-auth-message.request-body.ts/send-auth-message.controller';
import { ApplicationModule } from './application.module';
import { OutgoingAdapterModule } from './outgoing-adapter.module';

@Module({
  imports: [OutgoingAdapterModule, ApplicationModule],
  controllers: [SendAuthMessageController],
  providers: [
    // {
    //   provide: APP_PIPE,
    //   useClass: GlobalValidationPipe,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: GlobalAccessGuard,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: GlobalInterceptor,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: GlobalExceptionFilter,
    // },
  ],
})
export class IncomingAdapterModule {}
