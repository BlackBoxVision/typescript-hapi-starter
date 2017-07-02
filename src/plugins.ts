import * as Hapi from 'hapi';

import Config from './config';
import Logger from './helper/logger';

export default class Plugins {
    public static async status(server: Hapi.Server): Promise<Error | any> {
        try {
            Logger.info('Plugins - Registering status-monitor');

            await Plugins.register(server, {
                path: '/status',
                options: Config.status.options,
                register: require('hapijs-status-monitor'),
            });
        } catch (error) {
            Logger.info(`Plugins - Ups, something went wrong when registering status plugin: ${error}`);
        }
    }

    public static async swagger(server: Hapi.Server): Promise<Error | any> {
        try {
            Logger.info('Plugins - Registering swagger-ui');

            await Plugins.register(server, [
                require('vision'),
                require('inert'),
                {
                    options: Config.swagger.options,
                    register: require('hapi-swagger'),
                },
            ]);
        } catch (error) {
            Logger.info(`Plugins - Ups, something went wrong when registering swagger-ui plugin: ${error}`);
        }
    }

    private static register(server: Hapi.Server, config: any): Promise<Error | any> {
        return new Promise((resolve, reject) => {
            server.register(config, (error) => {
                if (error) {
                    reject(error);
                }

                resolve();
            });
        });
    }
}
