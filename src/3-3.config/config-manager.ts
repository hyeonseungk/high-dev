import { Injectable } from '@nestjs/common';
import { Config, Environment } from './type';

@Injectable()
export class ConfigManager {
  private config: Config = {
    FIREBASE_API_SERVICE_ACCOUNT: '',
    JSON_WEB_TOKEN_SECRET_KEY: '',
  };
  constructor(private readonly env: Environment) {
    this.config.FIREBASE_API_SERVICE_ACCOUNT =
      process.env.FIREBASE_API_SERVICE_ACCOUNT;
  }

  getEnv() {
    return this.env;
  }

  getJwtSecretKey() {
    return this.config.JSON_WEB_TOKEN_SECRET_KEY;
  }
}
