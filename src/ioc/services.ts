import 'winston-daily-rotate-file';
import { interfaces } from 'inversify';
import { Logger, TransportInstance, transports } from 'winston';
import Config from 'app/config';
import { IConfig, ILogger } from 'app/interfaces';
import Types from 'app/ioc/types';

export default (c: interfaces.Container): void => {
    c.bind<interfaces.Container>(Types.Services.Container).toConstantValue(c);

    c.bind<IConfig>(Types.Services.Config).toConstantValue(Config);

    c.bind<TransportInstance>('LoggerTransport').toConstantValue(
        new transports.DailyRotateFile({
            level: process.env.LOG_LEVEL,
            datePattern: 'dd-MM-yyyy.',
            dirname: './logs',
            filename: './log',
            prepend: true,
        }),
    );

    c.bind<TransportInstance>('LoggerTransport').toConstantValue(
        new transports.Console({
            colorize: true,
            prettyPrint: true,
            level: process.env.NODE_ENV === 'test' ? 'warn' : 'info',
        }),
    );

    c.bind<ILogger>(Types.Services.Logger).toDynamicValue((context: interfaces.Context) => {
        return new Logger({
            transports: context.container.getAll('LoggerTransport'),
        });
    });
};
