import * as Hapi from 'hapi';

import Logger from './helper/logger';
import Plugin from './plugin';
import Router from './router';

export default class Server {
    public static async start(): Promise<any> {
        try {
            // Cast to Hapi.Server to prevent function like connection/start to not be recognized
            // This seems to be due to non updated type definitions
            const server = new Hapi.Server() as Hapi.Server;

            server.connection({
                host: process.env.HOST,
                port: process.env.PORT,
            });

            await Plugin.registerAll(server);
            await Router.loadRoutes(server);

            await server.start();

            Logger.info(`Server - Up and running!`);
        } catch (error) {
            Logger.info(`Server - There was something wrong: ${error}`);
        }
    }
}
