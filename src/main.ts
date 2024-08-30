import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// class User {
//   constructor(
//     private readonly name: string,
//     private readonly phoneNumber: PhoneNumber,
//   ) {}
// }

// class PhoneNumber {
//   constructor(private readonly value: string) {}
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  // console.log(process.env.DATABASE_URL)
}
bootstrap();

// const user1 = new User('Michael', new PhoneNumber('01012341234'));
// const user2 = structuredClone(user1);
// console.log(user2);
