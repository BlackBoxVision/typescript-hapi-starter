import * as DotEnv from 'dotenv';
import 'reflect-metadata';
import { IServerFactory } from './interfaces';
import container from './ioc';
import Types from './ioc/types';

(async () => {
    DotEnv.config({
        path: `${process.cwd()}/.env`,
    });

    const factory = await container.get<IServerFactory>(Types.Factories.ServerFactory);
    const server = await factory.create();
    server.start();
})();
