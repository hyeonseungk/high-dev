export interface AuthEmailSender {
  send(
    emailAddress: string,
    emailTitle: string,
    emailContent: string,
  ): Promise<void>;
}
