import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CustomLogger } from '../../../../1.domain/out-port/logging/custom-logger.interface';
import {
  AsyncLocalStorageManager,
  RequestIdStore,
  TransactionStore,
} from '../../../../3-2.outgoing-adapter/async-local-storage/async-local-storage-manager';
import { OutgoingAdapter } from '../../../../3-3.config/di/outgoing-adapter.module';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  constructor(
    @Inject(OutgoingAdapter.CustomLogger)
    private readonly logger: CustomLogger,
    private readonly alsManager: AsyncLocalStorageManager,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    this.logger.debug('Request Id allocated to a request');
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    this.logger.info(
      `Request Info(userId: ${req.user?.id} method: ${req.method} path: ${req.url})`,
    );

    return new Observable((subscriber) => {
      const requestId = uuidv4();
      const store: RequestIdStore & TransactionStore = {
        requestId,
        tx: null,
      };
      const subscription = this.alsManager.getAls().run(store, () => {
        return next
          .handle()
          .pipe(
            map((data) => {
              this.logger.debug('Success response transformed');
              return { data: data || {} };
            }),
            catchError((e) => {
              // 에러를 깔끔하게 filter로 보내고 filter에서 아래같은 에러 로깅을 하면 좋겠지만 throw e를 하는 순간, asynclocalstorage의 범위를 벗어나게 되어서 store 값을 가져올 수 없게됨(requestId 유실 문제)
              this.logger.error(
                // requestId 있으면 custom logger에서 메시지 맨 앞에 자동으로 넣어줌
                `Error!!!(userId: ${req.user?.id} method: ${req.method} path: ${req.url})\nname: ${e.name}\nmessage: ${e.message}\nstack: ${e.stack}`,
              );
              throw e; // global-exception-filter에서 잡힘
            }),
          )
          .subscribe(subscriber);
        // 주의) next.handle에서는 에러가 발생해도 어차피 observable 안에 존재?
      });
      return () => subscription.unsubscribe();
      // https://stackoverflow.com/questions/67136005/how-to-use-asynclocalstorage-for-an-observable
    });
  }
}
