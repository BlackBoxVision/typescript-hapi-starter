import * as Hapi from 'hapi';

import Logger from './helper/logger';
import Plugins from './plugin';
import Router from './router';

class Server {
    public static async init(): Promise<any> {
        try {
            // Cast to Hapi.Server to prevent function like connection/start to not be recognized
            // This seems to be due to non updated type definitions
            const server = new Hapi.Server() as Hapi.Server;

            server.connection({
                host: process.env.HOST,
                port: process.env.PORT,
            });

            if (process.env.NODE_ENV === 'development') {
                await Plugins.status(server);
                await Plugins.swagger(server);
            }

            await Router.init(server);

            await server.start();

            Logger.info(`Server - Up and running!`);
        } catch (error) {
            Logger.info(`Server - There was something wrong: ${error}`);
        }
    }
}

export default Server.init();
