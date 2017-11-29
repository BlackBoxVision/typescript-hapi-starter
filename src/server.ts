import { objectify } from 'tslint/lib/utils';
import * as Hapi from 'hapi';

import Logger from './helper/logger';
import Plugin from './plugin';
import Router from './router';

export default class Server {
    private static _instance: Hapi.Server;

    public static async start(): Promise<any> {
        try {
            // Cast to Hapi.Server to prevent function like connection/start to not be recognized
            // This seems to be due to non updated type definitions
            Server._instance = new Hapi.Server();

            Server._instance.connection({
                host: process.env.HOST,
                port: process.env.PORT,
            });

            await Plugin.registerAll(Server._instance);
            await Router.loadRoutes(Server._instance);

            await Server._instance.start();

            Logger.info(`Server - Up and running!`);
        } catch (error) {
            Logger.info(`Server - There was something wrong: ${error}`);
        }
    }

    public static instance(): Hapi.Server {
        return Server._instance;
    }
}
