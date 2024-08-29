export interface AuthEmailSender {
  send(emailAddress: string, emailContent: string): Promise<void>;
}
