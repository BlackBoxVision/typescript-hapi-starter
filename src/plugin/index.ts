import * as Hapi from 'hapi';

import Config from '../config';
import Logger from '../helper/logger';

export default class Plugins {
    public static async status(server: Hapi.Server): Promise<Error | any> {
        try {
            Logger.info('Plugins - Registering status-monitor');

            await Plugins.register(server, {
                path: Config.status.path,
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

    public static async boom(server: Hapi.Server): Promise<Error | any> {
        try {
            Logger.info('Plugins - Registering hapi-boom-decorators');

            await Plugins.register(server, {
                register: require('hapi-boom-decorators'),
            });
        } catch (error) {
            Logger.info(`Plugins - Ups, something went wrong when registering hapi-boom-decorators plugin: ${error}`);
        }
    }

    public static async registerAll(server: Hapi.Server): Promise<Error | any> {
        if (process.env.NODE_ENV === 'development') {
            await Plugins.status(server);
            await Plugins.swagger(server);
        }

        await Plugins.boom(server);
    }

    private static register(server: Hapi.Server, plugin: any): Promise<Error | any> {
        return new Promise((resolve, reject) => {
            server.register(plugin, error => {
                if (error) {
                    reject(error);
                }

                resolve();
            });
        });
    }
}
