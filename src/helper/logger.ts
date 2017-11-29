import { Logger, transports as Transports, LoggerInstance } from 'winston';
import 'winston-daily-rotate-file';

export class ApiLogger {
    public static newInstance(): LoggerInstance {
        const rotateFileTransport = new Transports.DailyRotateFile({
            level: process.env.LOG_LEVEL,
            datePattern: 'dd-MM-yyyy.',
            dirname: './logs',
            filename: './log',
            prepend: true,
        });

        const consoleTransport = new Transports.Console({
            colorize: true,
            prettyPrint: true,
            level: process.env.NODE_ENV === 'test' ? 'warn' : 'info',
        });

        return new Logger({
            transports: [rotateFileTransport, consoleTransport],
        });
    }
}

export default ApiLogger.newInstance();
