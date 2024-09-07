import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthEmailSenderAwsSes implements AuthEmailSenderAwsSes {
  private readonly sesClient: SESClient;
  private sourceEmail: string;

  constructor() {
    this.sourceEmail = 'hello@pollit.kr';
    this.sesClient = new SESClient({});
  }

  async send(emailAddress: string, emailTitle: string, emailContent: string) {
    const sendEmailCommand = new SendEmailCommand({
      Source: this.sourceEmail,
      Destination: {
        ToAddresses: [emailAddress],
      },
      Message: {
        Subject: {
          Data: emailTitle,
        },
        Body: {
          Text: {
            Data: emailContent,
          },
        },
      },
    });
    await this.sesClient.send(sendEmailCommand);
  }
}
