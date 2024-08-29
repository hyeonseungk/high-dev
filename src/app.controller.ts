import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

async function testMethod() {
  console.log('what the fuck!!');
  throw new Error('kichkich');
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    // testMethod();
    // return this.appService.getHello();
    try {
      testMethod();
      return this.appService.getHello();
    } catch (e) {
      console.log('caught error!!!');
      console.log(e.message);
    }
  }
}

process.on('unhandledRejection', (reason, promise) => {
  console.log('caught unhandledRejection!');
});

process.on('uncaughtException', (error, origin) => {
  console.log('caught unhandledException!');
});
