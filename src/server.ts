import * as Hapi from 'hapi';

import Logger from './helper/logger';
import Plugins from './plugins';
import Router from './router';

class Server {
    public static async init(): Promise<any> {
        try {
            const server = new Hapi.Server();

            server.connection({
                host: process.env.HOST,
                port: process.env.PORT,
            });

            if (process.env.NODE_ENV === 'development') {
                Plugins.status(server);
                Plugins.swagger(server);
            }

            Router.register(server);

            await server.start();

            Logger.info(`Server is up and running`);
        } catch (error) {
            Logger.info(`There was something wrong: ${error}`);
        }
    }
}

export default Server.init();
