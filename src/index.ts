import * as Hapi from 'hapi';

import Logger from './helper/logger';
import * as Router from './router';
import Plugins from './plugins';

class Server {
    public static init() : void {
        const server = new Hapi.Server();

        server.connection({
            host: process.env.HOST,
            port: process.env.PORT
        });

        if (process.env.NODE_ENV === 'development') {
            Plugins.status(server);
            Plugins.swagger(server);
        }

        Router.register(server);

        server.start(error =>  {
            if (error) {
                Logger.info(`There was something wrong: ${error}`);
            }

            Logger.info('Server is up and running!');
        });
    }
}

export default Server.init();