import { Injectable } from '@nestjs/common';
import { Config, Environment } from './type';

@Injectable()
export class ConfigManager {
  private config: Config;
  constructor(private readonly env: Environment) {}

  initialize() {
    this.config.FIREBASE_API_SERVICE_ACCOUNT =
      process.env.FIREBASE_API_SERVICE_ACCOUNT;
  }
}
