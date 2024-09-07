import { IsString } from 'class-validator';

export class SendAuthMessageRequestBody {
  @IsString()
  emailAddress: string;
}
