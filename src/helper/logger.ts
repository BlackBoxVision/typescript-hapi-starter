import * as Dotenv from 'dotenv';
import * as Winston from 'winston';

Dotenv.config();

export class ApiLogger {
  public static newInstance(): Winston.Logger {
    const consoleTransport = new Winston.transports.Console({
      format: Winston.format.combine(
        Winston.format.colorize(),
        Winston.format.timestamp(),
        Winston.format.align(),
        Winston.format.printf(info => {
          const { timestamp, level, message, ...args } = info;

          const ts = timestamp.slice(0, 19).replace('T', ' ');
          return `${ts} [${level}]: ${message} ${
            Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
          }`;
        })
      ),
      level: process.env.LOG_LEVEL,
    });

    return Winston.createLogger({
      transports: [consoleTransport],
    });
  }
}

export default ApiLogger.newInstance();
