import { Module } from '@nestjs/common';
import { ConfigManager } from '../config-manager';
import { Environment } from '../type';

@Module({
  providers: [
    {
      provide: ConfigManager,
      useFactory: async () => {
        return new ConfigManager(process.env.NODE_ENV as Environment);
      },
    },
  ],
  exports: [ConfigManager],
})
export class ConfigModule {}
