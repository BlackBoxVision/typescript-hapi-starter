import * as DotEnv from 'dotenv';
import 'reflect-metadata';
import { ILogger, IServerFactory } from 'app/interfaces';
import container from 'app/ioc';
import Types from 'app/ioc/types';

(async () => {
    DotEnv.config({
        path: `${process.cwd()}/.env`,
    });

    const factory = await container.get<IServerFactory>(Types.Factories.ServerFactory);
    const server = await factory.create();

    server.start(() => {
        const logger = container.get<ILogger>(Types.Services.Logger);

        logger.info(`Server Listening on port ${process.env.PORT}`);

        if (process.env.NODE_ENV === 'development') {
            logger.info('Swagger docs available at /docs');
        }
    });
})();
