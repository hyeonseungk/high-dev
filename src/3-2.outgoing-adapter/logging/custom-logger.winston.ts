import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { CustomLogger } from '../../1.domain/out-port/logging/custom-logger.interface';
import { ConfigManager } from '../../3-3.config/config-manager';
import { Environment } from '../../3-3.config/type';
import { AsyncLocalStorageManager } from '../async-local-storage/async-local-storage-manager';

@Injectable()
export class CustomLoggerWinston implements CustomLogger {
  private readonly logger: winston.Logger;
  constructor(
    private readonly configManager: ConfigManager,
    private readonly alsManager: AsyncLocalStorageManager,
  ) {
    this.logger = createWinstonLogger(configManager.getEnv());
  }

  error(msg: string) {
    this.logger.error(createLog(msg));
  }

  warn(msg: string) {
    this.logger.warn(createLog(msg));
  }

  info(msg: string) {
    this.logger.info(createLog(msg));
  }

  debug(msg: string) {
    this.logger.debug(createLog(msg));
  }
}

// 로그 레벨 참조: https://ivvve.github.io/2020/05/31/js/js/winston-02-logging-level/
function createWinstonLogger(env: Environment) {
  if (env === Environment.LOCAL) {
    return winston.createLogger({
      transports: [
        new winston.transports.Console({
          level: 'silly',
          format: winston.format.combine(
            winston.format.printf(getLogFormat),
            winston.format.colorize({ all: true }),
          ),
        }),
      ],
    });
  }
  // else if (env === Environment.TEST) {
  //   return winston.createLogger({
  //     transports: [
  //       new winston.transports.Console({
  //         silent: true,
  //         format: winston.format.combine(
  //           winston.format.printf(getLogFormat),
  //           winston.format.colorize({ all: true }),
  //         ),
  //       }),
  //     ],
  //   });
  // }
  else if (env === Environment.DEV) {
    return winston.createLogger({
      transports: [
        new winston.transports.Console({
          level: 'silly',
          format: winston.format.combine(
            winston.format.printf(getLogFormat),
            winston.format.colorize({ all: true }),
          ),
        }),
      ],
    });
  } else if (env === Environment.PRD) {
    return winston.createLogger({
      transports: [
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.printf(getLogFormat),
            winston.format.uncolorize(),
          ),
        }),
      ],
    });
  } else {
    throw new Error(`환경은 LOCAL, TEST, DEV, PRD만 가능합니다.`);
  }
}

function createLog(msg: string) {
  const requestId = this.alsManager.getRequestId();
  if (requestId) {
    return `[RequestId:${requestId}] ${msg}`;
  } else {
    return msg;
  }
}

function getLogFormat(info: winston.Logform.TransformableInfo) {
  const LEVEL = info.level.toUpperCase();
  if (info.context) {
    return `[${info.context}] [${LEVEL}] ${info.message}`;
  } else {
    return `[${LEVEL}] ${info.message}`;
  }
}
