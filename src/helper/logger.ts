import { Logger, transports as Transports } from 'winston';
import 'winston-daily-rotate-file';

export class ApiLogger {
    static newInstance() {
        const rotateFileTransport = new Transports.DailyRotateFile({
            level: process.env.LOG_LEVEL,
            datePattern: 'dd-MM-yyyy.',
            dirname: './logs',
            filename: './log',
            prepend: true
        });

        const consoleTransport = new Transports.Console({
            colorize: true,
            prettyPrint: true
        });

        return new Logger({
            transports: [rotateFileTransport, consoleTransport]
        });
    }
}

export default ApiLogger.newInstance();
